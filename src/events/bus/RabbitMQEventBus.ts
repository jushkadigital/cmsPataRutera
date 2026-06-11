import { randomUUID } from 'node:crypto'
import { SpanStatusCode, type Span } from '@opentelemetry/api'
import type { ChannelModel, ConfirmChannel, ConsumeMessage, Message, Options } from 'amqplib'

import type { EventCategory, EventEnvelope } from '@/events/envelope'
import { buildRoutingKey } from '@/events/envelope'
import { declareTopology } from '@/events/topology'
import { QUEUE_BINDINGS, type QueueBinding } from '@/events/topology/bindings'
import { getTracer, getMeter, withContextAsync } from '@/events/tracing/telemetry'
import { setSpanContextFromEnvelope } from '@/events/tracing/tracePropagation'
import { MESSAGING_ATTR, DOMAIN_ATTR } from '@/events/tracing/spanAttributes'
import { getEventMetrics } from '@/events/tracing/metrics'
import { createEventLogger } from '@/events/tracing/logger'
import type { IEventBus, SubscriberHandler } from './IEventBus'
import { createConnection, createConfirmChannel, RECONNECT_DELAY_MS } from './connection'

interface Subscription {
  category: EventCategory
  routingPattern: string
  handler: SubscriberHandler
}

const CATEGORY_EXCHANGE_MAP: Record<EventCategory, string> = {
  integration: 'tourism.integration',
  notification: 'tourism.notify',
  inbound: 'identity.events',
  capacity: 'capacity.events',
}

const DEFAULT_MAX_RETRIES = 3
const DEFAULT_PREFETCH = 10
const DEFAULT_RETRY_DELAY_MS = 30000

/**
 * Maps (consumerGroup, exchange) → QueueBinding so that subscribe()
 * can resolve the correct queue even when a consumer group has
 * queues on multiple exchanges (e.g. identity on tourism.integration
 * AND identity.events).
 */
const QUEUE_BY_GROUP_AND_EXCHANGE = new Map<string, QueueBinding>()

for (const binding of QUEUE_BINDINGS) {
  const consumerGroup = binding.queueName.replace(/\.(integration|notify|inbound)\.queue$/, '')
  QUEUE_BY_GROUP_AND_EXCHANGE.set(`${consumerGroup}|${binding.exchange}`, binding)
}

function resolveQueue(consumerGroup: string, category: EventCategory): string {
  const exchange = CATEGORY_EXCHANGE_MAP[category]
  const binding = QUEUE_BY_GROUP_AND_EXCHANGE.get(`${consumerGroup}|${exchange}`)
  if (binding) return binding.queueName
  return `${consumerGroup}.${category}.queue`
}

function matchTopicPattern(routingKey: string, pattern: string): boolean {
  const keyParts = routingKey.split('.')
  const patternParts = pattern.split('.')

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i] === '#') return true
    if (patternParts[i] === '*') {
      if (keyParts[i] === undefined) return false
      continue
    }
    if (keyParts[i] !== patternParts[i]) return false
  }

  return keyParts.length === patternParts.length
}

function getEffectiveRoutingKey(msg: ConsumeMessage, queueName: string): string {
  const isRetry =
    msg.fields.routingKey === queueName &&
    msg.properties.headers?.['x-retry-count'] !== undefined

  if (isRetry) {
    const original = msg.properties.headers?.['x-original-routing-key']
    if (typeof original === 'string' && original.length > 0) {
      return original
    }
  }

  return msg.fields.routingKey
}

export class RabbitMQEventBus implements IEventBus {
  private connection: ChannelModel | null = null
  private channel: ConfirmChannel | null = null
  private reconnectTimer: NodeJS.Timeout | null = null
  private startPromise: Promise<void> | null = null
  private isConnecting = false
  private shouldReconnect = true
  private returnedMessageIds = new Set<string>()

  private subscriptions = new Map<string, Subscription[]>()
  private consumingQueues = new Set<string>()

  private readonly logger = createEventLogger('event-bus')
  private metrics: ReturnType<typeof getEventMetrics> | null = null

  private readonly maxRetries = this.parsePositiveInteger(
    process.env.RABBITMQ_MAX_RETRIES,
    DEFAULT_MAX_RETRIES,
  )
  private readonly prefetch = this.parsePositiveInteger(
    process.env.RABBITMQ_PREFETCH,
    DEFAULT_PREFETCH,
  )
  private readonly retryDelayMs = this.parsePositiveInteger(
    process.env.RABBITMQ_RETRY_DELAY_MS,
    DEFAULT_RETRY_DELAY_MS,
  )

  constructor() {}

  private getMetrics() {
    if (!this.metrics) {
      this.metrics = getEventMetrics(getMeter())
    }
    return this.metrics
  }

  public subscribe<T extends EventEnvelope>(
    category: EventCategory,
    routingPattern: string,
    handler: SubscriberHandler<T>,
    consumerGroup?: string,
  ): void {
    const queueName = consumerGroup
      ? resolveQueue(consumerGroup, category)
      : `${category}.default.queue`

    if (!this.subscriptions.has(queueName)) {
      this.subscriptions.set(queueName, [])
    }

    this.subscriptions.get(queueName)?.push({
      category,
      routingPattern,
      handler: handler as SubscriberHandler,
    })

    if (this.channel) {
      const exchange = CATEGORY_EXCHANGE_MAP[category]
      this.bindAndConsumeQueue(queueName, exchange).catch((error: unknown) => {
        this.logger.error({ err: error instanceof Error ? error : new Error(String(error)), queueName }, 'Failed to bind queue')
      })
    }
  }

  public async emit(category: EventCategory, envelope: EventEnvelope): Promise<void> {
    const exchange = CATEGORY_EXCHANGE_MAP[category]
    const routingKey = buildRoutingKey(category, envelope.metadata)
    const tracer = getTracer()

    const span = tracer.startSpan('event.publish', {
      attributes: {
        [MESSAGING_ATTR.SYSTEM]: 'rabbitmq',
        [MESSAGING_ATTR.DESTINATION]: exchange,
        [MESSAGING_ATTR.DESTINATION_KIND]: 'topic',
        [MESSAGING_ATTR.ROUTING_KEY]: routingKey,
        [MESSAGING_ATTR.MESSAGE_ID]: envelope.metadata.eventId,
        [MESSAGING_ATTR.CONVERSATION_ID]: envelope.metadata.correlationId,
        [MESSAGING_ATTR.OPERATION]: 'publish',
        [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType,
        [DOMAIN_ATTR.EVENT_VERSION]: envelope.metadata.eventVersion,
        [DOMAIN_ATTR.EVENT_CATEGORY]: category,
        [DOMAIN_ATTR.AGGREGATE_TYPE]: envelope.metadata.aggregateType,
        [DOMAIN_ATTR.AGGREGATE_ID]: envelope.metadata.aggregateId,
        [DOMAIN_ATTR.PRODUCER]: envelope.metadata.producer,
      },
    })

    try {
      const channel = await this.getReadyChannel()
      const buffer = Buffer.from(JSON.stringify(envelope))

      await this.publishAndConfirm(channel, exchange, routingKey, buffer, {
        messageId: envelope.metadata.eventId,
        contentType: 'application/json',
        deliveryMode: 2,
        persistent: true,
        timestamp: Date.now(),
        headers: {
          correlationId: envelope.metadata.correlationId,
          causationId: envelope.metadata.causationId,
          traceId: envelope.metadata.traceId,
        },
      })

      this.getMetrics().eventsPublished.add(1, {
        [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType,
        [DOMAIN_ATTR.AGGREGATE_TYPE]: envelope.metadata.aggregateType,
      })

      this.logger.info(
        { exchange, routingKey, eventId: envelope.metadata.eventId, eventType: envelope.metadata.eventType, correlationId: envelope.metadata.correlationId, payload: envelope.payload },
        'Event published',
      )
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: error instanceof Error ? error.message : 'Unknown error' })
      span.recordException(error instanceof Error ? error : new Error(String(error)))
      throw error
    } finally {
      span.end()
    }
  }

  public async start(): Promise<void> {
    if (this.connection) return

    if (this.startPromise) {
      await this.startPromise
      return
    }

    this.shouldReconnect = true
    this.startPromise = this.connect()

    try {
      await this.startPromise
    } finally {
      this.startPromise = null
    }
  }

  public async close(): Promise<void> {
    this.shouldReconnect = false

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }

    const channel = this.channel
    const connection = this.connection
    this.channel = null
    this.connection = null
    this.consumingQueues.clear()

    await channel?.close()
    await connection?.close()
  }

  public async healthCheck(): Promise<{ connected: boolean; queueDepth?: number }> {
    const isConnected = this.connection !== null && this.channel !== null
    return { connected: isConnected }
  }

  private async connect(): Promise<void> {
    if (this.isConnecting) return

    this.isConnecting = true

    try {
      this.logger.info('Starting RabbitMQ connection')
      const url = this.getRabbitMQUrl()
      this.connection = await createConnection(url)

      this.connection.once('close', () => this.handleConnectionClose())
      this.connection.once('error', (error: Error) => {
        this.logger.error({ err: error }, 'RabbitMQ connection error')
      })

      this.channel = await createConfirmChannel(this.connection)

      this.channel.once('close', () => this.handleChannelClose())
      this.channel.once('error', (error: Error) => {
        this.logger.error({ err: error }, 'RabbitMQ channel error')
      })
      this.channel.on('return', (msg: Message) => this.handleReturnedMessage(msg))

      await declareTopology(this.channel)
      await this.channel.prefetch(this.prefetch)

      for (const [queueName, subs] of this.subscriptions.entries()) {
        const firstSub = subs[0]
        if (firstSub) {
          const exchange = CATEGORY_EXCHANGE_MAP[firstSub.category]
          await this.bindAndConsumeQueue(queueName, exchange)
        }
      }

      this.logger.info(
        { prefetch: this.prefetch, maxRetries: this.maxRetries },
        'EventBus connected',
      )
    } catch (error) {
      this.logger.error({ err: error instanceof Error ? error : new Error(String(error)) }, 'Connection error')
      await this.resetConnection()
      this.scheduleReconnect()
    } finally {
      this.isConnecting = false
    }
  }

  private async bindAndConsumeQueue(queueName: string, exchange: string): Promise<void> {
    if (!this.channel) return

    const subs = this.subscriptions.get(queueName)
    if (!subs || subs.length === 0) return

    const uniquePatterns = [...new Set(subs.map((s) => s.routingPattern))]
    for (const pattern of uniquePatterns) {
      await this.channel.bindQueue(queueName, exchange, pattern)
    }

    if (!this.consumingQueues.has(queueName)) {
      await this.channel.consume(queueName, (msg) => {
        this.handleMessage(msg, queueName).catch((error: unknown) => {
          this.logger.error({ err: error instanceof Error ? error : new Error(String(error)), queueName }, 'Unexpected consumer error')
        })
      })

      this.consumingQueues.add(queueName)
    }
  }

  private async handleMessage(msg: ConsumeMessage | null, queueName: string): Promise<void> {
    if (!msg) return

    const channel = this.channel
    if (!channel) return

    const effectiveRoutingKey = getEffectiveRoutingKey(msg, queueName)

    this.logger.debug(
      {
        queueName,
        exchange: msg.fields.exchange,
        routingKey: effectiveRoutingKey,
        messageId: msg.properties.messageId,
        contentType: msg.properties.contentType,
        headers: msg.properties.headers,
        redelivered: msg.fields.redelivered,
        payloadSize: msg.content.length,
        rawPayload: msg.content.toString(),
      },
      'RabbitMQ message received',
    )

    const handlers = this.getMatchingHandlers(queueName, effectiveRoutingKey)

    if (handlers.length === 0) {
      this.logger.debug({ queueName, routingKey: effectiveRoutingKey }, 'No matching handlers — acking message')
      channel.ack(msg)
      return
    }

    let envelope: EventEnvelope
    let parsed: unknown
    try {
      parsed = JSON.parse(msg.content.toString())
      envelope = this.normalizeToEnvelope(parsed, msg)
    } catch (parseError) {
      this.logger.error({ err: parseError instanceof Error ? parseError : new Error(String(parseError)), queueName, routingKey: effectiveRoutingKey }, 'Failed to parse event envelope')
      channel.ack(msg)
      return
    }

    this.logger.debug(
      {
        queueName,
        routingKey: effectiveRoutingKey,
        eventId: envelope.metadata.eventId,
        eventType: envelope.metadata.eventType,
        eventVersion: envelope.metadata.eventVersion,
        aggregateType: envelope.metadata.aggregateType,
        aggregateId: envelope.metadata.aggregateId,
        correlationId: envelope.metadata.correlationId,
        causationId: envelope.metadata.causationId,
        producer: envelope.metadata.producer,
        occurredAt: envelope.metadata.occurredAt,
        actorId: envelope.metadata.actorId,
        payload: envelope.payload,
        handlerCount: handlers.length,
      },
      'Event envelope parsed — dispatching to handlers',
    )

    const tracer = getTracer()

    const traceContext = setSpanContextFromEnvelope(envelope)

    await withContextAsync(traceContext, async () => {
      const span = tracer.startSpan('event.process', {
        attributes: {
          [MESSAGING_ATTR.SYSTEM]: 'rabbitmq',
          [MESSAGING_ATTR.DESTINATION]: queueName,
          [MESSAGING_ATTR.ROUTING_KEY]: effectiveRoutingKey,
          [MESSAGING_ATTR.MESSAGE_ID]: envelope.metadata.eventId,
          [MESSAGING_ATTR.CONVERSATION_ID]: envelope.metadata.correlationId,
          [MESSAGING_ATTR.CONSUMER_ID]: queueName,
          [MESSAGING_ATTR.OPERATION]: 'process',
          [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType,
          [DOMAIN_ATTR.EVENT_VERSION]: envelope.metadata.eventVersion,
          [DOMAIN_ATTR.AGGREGATE_TYPE]: envelope.metadata.aggregateType,
          [DOMAIN_ATTR.AGGREGATE_ID]: envelope.metadata.aggregateId,
          [DOMAIN_ATTR.PRODUCER]: envelope.metadata.producer,
        },
      })

      const startTime = Date.now()

      try {
        await Promise.all(handlers.map((handler) => handler(envelope)))

        this.getMetrics().eventsConsumed.add(1, {
          [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType,
          [DOMAIN_ATTR.AGGREGATE_TYPE]: envelope.metadata.aggregateType,
        })

        this.logger.info(
          { queueName, routingKey: effectiveRoutingKey, eventId: envelope.metadata.eventId, eventType: envelope.metadata.eventType },
          'Event consumed',
        )

        channel.ack(msg)
      } catch (error) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: error instanceof Error ? error.message : 'Unknown error' })
        span.recordException(error instanceof Error ? error : new Error(String(error)))

        this.getMetrics().eventsFailed.add(1, {
          [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType,
          [DOMAIN_ATTR.AGGREGATE_TYPE]: envelope.metadata.aggregateType,
        })

        this.logger.error(
          { err: error instanceof Error ? error : new Error(String(error)), queueName, routingKey: effectiveRoutingKey, eventId: envelope.metadata.eventId, eventType: envelope.metadata.eventType },
          'Event processing failed',
        )

        try {
          await this.retryOrDeadLetter(channel, msg, queueName, error)
        } catch (retryError) {
          this.logger.error({ err: retryError instanceof Error ? retryError : new Error(String(retryError)), queueName }, 'Retry/DLQ publish failed; resetting channel')
          await this.resetConnection()
          this.scheduleReconnect()
        }
      } finally {
        const durationMs = Date.now() - startTime
        this.getMetrics().processingDuration.record(durationMs, {
          [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType,
        })
        span.end()
      }
    })
  }

  private getMatchingHandlers(queueName: string, routingKey: string): SubscriberHandler[] {
    const subs = this.subscriptions.get(queueName)
    if (!subs) return []

    return subs
      .filter((sub) => matchTopicPattern(routingKey, sub.routingPattern))
      .map((sub) => sub.handler)
  }

  private async retryOrDeadLetter(
    channel: ConfirmChannel,
    msg: ConsumeMessage,
    queueName: string,
    error: unknown,
  ): Promise<void> {
    const retryCount = this.getRetryCount(msg) + 1
    const retryQueueName = `${queueName}.retry`
    const dlqName = `${queueName}.dlq`
    const dlxName = 'tourism.dlx'

    if (retryCount <= this.maxRetries) {
      await this.publishAndConfirm(channel, '', retryQueueName, msg.content, {
        ...this.copyPublishOptions(msg),
        expiration: String(this.retryDelayMs),
        headers: {
          'x-original-routing-key': getEffectiveRoutingKey(msg, queueName),
          'x-retry-count': retryCount,
        },
      })

      channel.ack(msg)
      this.logger.warn(
        { retryCount, maxRetries: this.maxRetries, routingKey: getEffectiveRoutingKey(msg, queueName), retryQueueName },
        'Retrying event',
      )
      return
    }

    await this.publishAndConfirm(channel, dlxName, dlqName, msg.content, {
      ...this.copyPublishOptions(msg),
      headers: {
        'x-death-reason': this.getErrorName(error),
        'x-original-exchange': msg.fields.exchange,
        'x-original-routing-key': getEffectiveRoutingKey(msg, queueName),
        'x-retry-count': retryCount - 1,
      },
    })

    channel.ack(msg)
    this.logger.error({ dlqName, maxRetries: this.maxRetries }, 'Event moved to DLQ')
  }

  private async getReadyChannel(): Promise<ConfirmChannel> {
    if (!this.channel) {
      await this.start()
    }

    if (!this.channel) {
      throw new Error('RabbitMQ channel is not available')
    }

    return this.channel
  }

  private publish(
    channel: ConfirmChannel,
    exchange: string,
    routingKey: string,
    content: Buffer,
    options: Options.Publish,
  ): void {
    const accepted = channel.publish(exchange, routingKey, content, {
      ...options,
      persistent: true,
      deliveryMode: 2,
    })

    if (!accepted) {
      this.logger.warn('RabbitMQ publish buffer is full; waiting for confirms')
    }
  }

  private async publishAndConfirm(
    channel: ConfirmChannel,
    exchange: string,
    routingKey: string,
    content: Buffer,
    options: Options.Publish,
  ): Promise<void> {
    const messageId = options.messageId ?? randomUUID()
    this.returnedMessageIds.delete(messageId)

    this.publish(channel, exchange, routingKey, content, {
      ...options,
      mandatory: true,
      messageId,
    })

    await channel.waitForConfirms()

    if (this.returnedMessageIds.delete(messageId)) {
      throw new Error(`RabbitMQ returned unroutable message for routing key: ${routingKey}`)
    }
  }

  private copyPublishOptions(msg: ConsumeMessage): Options.Publish {
    return {
      contentType: msg.properties.contentType ?? 'application/json',
      correlationId: msg.properties.correlationId,
      deliveryMode: 2,
      expiration: msg.properties.expiration,
      messageId: msg.properties.messageId,
      persistent: true,
      priority: msg.properties.priority,
      timestamp: msg.properties.timestamp ?? Date.now(),
      type: msg.properties.type,
    }
  }

  private getRetryCount(msg: ConsumeMessage): number {
    const retryCount = msg.properties.headers?.['x-retry-count']

    if (typeof retryCount === 'number' && Number.isInteger(retryCount) && retryCount >= 0) {
      return retryCount
    }

    if (typeof retryCount === 'string') {
      const parsed = Number.parseInt(retryCount, 10)
      return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0
    }

    return 0
  }

  private getErrorName(error: unknown): string {
    return error instanceof Error ? error.name : 'Error'
  }

  private handleConnectionClose(): void {
    this.connection = null
    this.channel = null
    this.consumingQueues.clear()
    this.scheduleReconnect()
  }

  private handleChannelClose(): void {
    this.channel = null
    this.consumingQueues.clear()
    this.scheduleReconnect()
  }

  private handleReturnedMessage(msg: Message): void {
    const messageId = msg.properties.messageId

    if (typeof messageId === 'string') {
      this.returnedMessageIds.add(messageId)
    }

    this.logger.error({ routingKey: msg.fields.routingKey }, 'RabbitMQ returned unroutable message')
  }

  private scheduleReconnect(): void {
    if (!this.shouldReconnect) return
    if (this.reconnectTimer) return

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      this.start().catch((error: unknown) => {
        this.logger.error({ err: error instanceof Error ? error : new Error(String(error)) }, 'RabbitMQ reconnect failed')
        this.scheduleReconnect()
      })
    }, RECONNECT_DELAY_MS)
  }

  private async resetConnection(): Promise<void> {
    const channel = this.channel
    const connection = this.connection
    this.channel = null
    this.connection = null
    this.consumingQueues.clear()

    await channel?.close().catch(() => undefined)
    await connection?.close().catch(() => undefined)
  }

  private getRabbitMQUrl(): string {
    if (!process.env.RABBITMQ_URL) {
      throw new Error('RABBITMQ_URL is required')
    }

    return process.env.RABBITMQ_URL
  }

  /**
   * Normalizes a parsed JSON message into an EventEnvelope.
   * If the message already follows the envelope spec (has `spec` field), returns as-is.
   * Otherwise, transforms from flat body + RabbitMQ headers format into EventEnvelope.
   */
  private normalizeToEnvelope(parsed: unknown, msg: ConsumeMessage): EventEnvelope {
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'spec' in parsed &&
      'metadata' in parsed
    ) {
      return parsed as EventEnvelope
    }

    const body = parsed as Record<string, unknown>
    const headers = (msg.properties.headers ?? {}) as Record<string, unknown>

    const eventTypeRaw = this.extractHeaderString(headers, 'x-event-type')
    // Strip version suffix (e.g. "admin.registered.v1" → "admin.registered")
    const eventType = eventTypeRaw?.replace(/\.v\d+$/, '') ?? ''
    const eventVersion = Number(this.extractHeaderString(headers, 'x-event-version') ?? body.eventVersion ?? 1)
    const aggregateType = (this.extractHeaderString(headers, 'x-aggregate-type') ?? '').toLowerCase()

    return {
      spec: 'tourism-events/v1',
      metadata: {
        eventId: this.extractHeaderString(headers, 'x-event-id') ?? String(body.eventId ?? randomUUID()),
        eventType,
        eventVersion: Number.isInteger(eventVersion) && eventVersion > 0 ? eventVersion : 1,
        aggregateId: this.extractHeaderString(headers, 'x-aggregate-id') ?? String(body.aggregateId ?? ''),
        aggregateType,
        correlationId: this.extractHeaderString(headers, 'x-correlation-id') ?? String(body.correlationId ?? randomUUID()),
        causationId: this.extractHeaderString(headers, 'x-causation-id') ?? (body.causationId as string | null) ?? null,
        traceId: this.extractHeaderString(headers, 'x-trace-id') ?? String(body.traceId ?? 'missing'),
        spanId: this.extractHeaderString(headers, 'x-span-id') ?? String(body.spanId ?? 'missing'),
        producer: this.extractHeaderString(headers, 'x-producer') ?? String(body.producer ?? 'unknown'),
        occurredAt: this.extractHeaderString(headers, 'x-occurred-at') ?? String(body.occurredOn ?? new Date().toISOString()),
        actorId: this.extractHeaderString(headers, 'x-actor-id') ?? (body.actorId as string | null) ?? null,
        tenantId: this.extractHeaderString(headers, 'x-tenant-id') ?? (body.tenantId as string | null) ?? null,
      },
      payload: body,
    }
  }

  private extractHeaderString(headers: Record<string, unknown>, key: string): string | undefined {
    const value = headers[key]
    if (typeof value === 'string' && value.length > 0) return value
    if (value instanceof Buffer) {
      const decoded = value.toString('utf8')
      return decoded.length > 0 ? decoded : undefined
    }
    return undefined
  }

  private parsePositiveInteger(value: string | undefined, fallback: number): number {
    if (!value) return fallback

    const parsed = Number.parseInt(value, 10)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
  }
}
