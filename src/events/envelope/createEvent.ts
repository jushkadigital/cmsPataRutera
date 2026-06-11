import type { EventCategory, EventEnvelope, EventMetadata } from './EventEnvelope'

export interface CreateEventInput {
  eventType: string
  eventVersion: number
  aggregateId: string
  aggregateType: string
  producer: string
  actorId?: string | null
  tenantId?: string | null
  correlationId?: string
  causationId?: string | null
  payload: unknown
}

type TraceContextExtractor = () => { traceId: string; spanId: string }

let traceContextExtractor: TraceContextExtractor | null = null

export function setTraceContextExtractor(extractor: TraceContextExtractor): void {
  traceContextExtractor = extractor
}

function getTraceContext(): { traceId: string; spanId: string } {
  if (traceContextExtractor) {
    try {
      return traceContextExtractor()
    } catch {
      return { traceId: 'missing', spanId: 'missing' }
    }
  }
  return { traceId: 'missing', spanId: 'missing' }
}

export function createEvent(input: CreateEventInput): EventEnvelope<unknown> {
  const traceContext = getTraceContext()

  const metadata: EventMetadata = {
    eventId: crypto.randomUUID(),
    eventType: input.eventType,
    eventVersion: input.eventVersion,
    aggregateId: input.aggregateId,
    aggregateType: input.aggregateType,
    correlationId: input.correlationId ?? crypto.randomUUID(),
    causationId: input.causationId ?? null,
    traceId: traceContext.traceId,
    spanId: traceContext.spanId,
    producer: input.producer,
    occurredAt: new Date().toISOString(),
    actorId: input.actorId ?? null,
    tenantId: input.tenantId ?? null,
  }

  return {
    spec: 'tourism-events/v1',
    metadata,
    payload: input.payload,
  }
}

export function createCorrelatedEvent(
  parentEnvelope: EventEnvelope,
  input: Omit<CreateEventInput, 'correlationId' | 'causationId'>,
): EventEnvelope<unknown> {
  return createEvent({
    ...input,
    correlationId: parentEnvelope.metadata.correlationId,
    causationId: parentEnvelope.metadata.eventId,
  })
}

const CATEGORY_PREFIX_MAP: Record<EventCategory, string> = {
  integration: 'integration',
  notification: 'notify',
  inbound: 'inbound',
}

export function buildRoutingKey(category: EventCategory, metadata: EventMetadata): string {
  const prefix = CATEGORY_PREFIX_MAP[category]
  const action = metadata.eventType.split('.')[1] ?? metadata.eventType
  return `${prefix}.${metadata.aggregateType}.${action}.v${metadata.eventVersion}`
}
