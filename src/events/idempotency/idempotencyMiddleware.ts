import type { EventEnvelope } from '@/events/envelope'
import type { SubscriberHandler } from '@/events/bus/IEventBus'
import type { IdempotencyStore } from './IdempotencyStore'
import { getTracer } from '@/events/tracing/telemetry'
import { SpanStatusCode } from '@opentelemetry/api'
import { DOMAIN_ATTR } from '@/events/tracing/spanAttributes'

export function withIdempotency(
  store: IdempotencyStore,
  consumerGroup: string,
  staleTimeoutMs?: number,
): <T extends EventEnvelope>(handler: SubscriberHandler<T>) => SubscriberHandler<T> {
  return (handler) => async (envelope) => {
    const eventId = envelope.metadata.eventId
    const tracer = getTracer()

    // Span: idempotency.claim
    const claimSpan = tracer.startSpan('idempotency.claim', {
      attributes: {
        [DOMAIN_ATTR.IDEMPOTENCY_GROUP]: consumerGroup,
        [DOMAIN_ATTR.IDEMPOTENCY_EVENT_ID]: eventId,
      },
    })

    const result = await store.claim(consumerGroup, eventId, staleTimeoutMs)
    claimSpan.setAttribute(DOMAIN_ATTR.IDEMPOTENCY_RESULT, result)
    claimSpan.end()

    if (result === 'completed') return
    if (result === 'locked') return

    try {
      await handler(envelope)

      // Span: idempotency.markCompleted
      const completeSpan = tracer.startSpan('idempotency.markCompleted', {
        attributes: {
          [DOMAIN_ATTR.IDEMPOTENCY_GROUP]: consumerGroup,
          [DOMAIN_ATTR.IDEMPOTENCY_EVENT_ID]: eventId,
        },
      })
      await store.markCompleted(consumerGroup, eventId)
      completeSpan.end()
    } catch (error) {
      // Span: idempotency.markFailed
      const failSpan = tracer.startSpan('idempotency.markFailed', {
        attributes: {
          [DOMAIN_ATTR.IDEMPOTENCY_GROUP]: consumerGroup,
          [DOMAIN_ATTR.IDEMPOTENCY_EVENT_ID]: eventId,
        },
      })
      failSpan.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error',
      })
      await store.markFailed(consumerGroup, eventId)
      failSpan.end()

      throw error
    }
  }
}
