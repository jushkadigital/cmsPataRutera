import { trace, context, propagation, type Context, type SpanContext } from '@opentelemetry/api'
import type { EventEnvelope, EventMetadata } from '@/events/envelope'

export function injectTraceContextIntoEnvelope(envelope: EventEnvelope): EventEnvelope {
  const carrier: Record<string, string> = {}
  propagation.inject(context.active(), carrier)

  return {
    ...envelope,
    metadata: {
      ...envelope.metadata,
      traceId: envelope.metadata.traceId,
      spanId: envelope.metadata.spanId,
    },
  }
}

export function extractTraceContextFromEnvelope(envelope: EventEnvelope): Context {
  const carrier: Record<string, string> = {
    traceparent: `00-${envelope.metadata.traceId}-${envelope.metadata.spanId}-01`,
  }

  const extractedContext = propagation.extract(context.active(), carrier)
  return extractedContext
}

export function createSpanContextFromMetadata(metadata: EventMetadata): SpanContext | null {
  if (!metadata.traceId || !metadata.spanId) {
    return null
  }

  return {
    traceId: metadata.traceId,
    spanId: metadata.spanId,
    traceFlags: 1,
    isRemote: true,
  }
}

export function setSpanContextFromEnvelope(envelope: EventEnvelope): Context {
  const spanContext = createSpanContextFromMetadata(envelope.metadata)
  if (!spanContext) {
    return context.active()
  }

  const span = trace.wrapSpanContext(spanContext)
  return trace.setSpan(context.active(), span)
}
