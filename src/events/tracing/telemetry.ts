import {
  trace,
  metrics,
  type Tracer,
  type Meter,
  type Context,
  context,
} from '@opentelemetry/api'
import { setTraceContextExtractor } from '@/events/envelope'

let tracerInstance: Tracer | null = null
let meterInstance: Meter | null = null
let isInitialized = false

export function initTelemetry(serviceName = 'tourism-events'): void {
  if (isInitialized) return

  tracerInstance = trace.getTracer(serviceName)
  meterInstance = metrics.getMeter(serviceName)

  setTraceContextExtractor(() => {
    const activeContext = context.active()
    const spanContext = trace.getSpanContext(activeContext)
    if (spanContext) {
      return { traceId: spanContext.traceId, spanId: spanContext.spanId }
    }
    return { traceId: 'missing', spanId: 'missing' }
  })

  isInitialized = true
}

export function getTracer(): Tracer {
  if (!tracerInstance) {
    initTelemetry()
  }
  return tracerInstance ?? trace.getTracer('tourism-events')
}

export function getMeter(): Meter {
  if (!meterInstance) {
    initTelemetry()
  }
  return meterInstance ?? metrics.getMeter('tourism-events')
}

export function getActiveContext(): Context {
  return context.active()
}

export function withContext<T>(ctx: Context, fn: () => T): T {
  return context.with(ctx, fn)
}

export function withContextAsync<T>(ctx: Context, fn: () => Promise<T>): Promise<T> {
  return context.with(ctx, fn)
}
