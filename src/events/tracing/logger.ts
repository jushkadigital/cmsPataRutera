import { trace, context } from '@opentelemetry/api'
import pino from 'pino'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { getObservabilityConfig } from './observabilityConfig'

const config = getObservabilityConfig()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pinoMixin = (): Record<string, string> => {
  const activeContext = context.active()
  const spanContext = trace.getSpanContext(activeContext)
  if (spanContext) {
    return {
      trace_id: spanContext.traceId,
      span_id: spanContext.spanId,
    }
  }
  return {}
}

const transports: pino.TransportTargetOptions[] = []

if (config.logging.otlpPush && config.logging.otlpEndpoint) {
  transports.push({
    target: join(__dirname, 'pinoOtlpTransport.cjs'),
    options: { endpoint: config.logging.otlpEndpoint },
  })
}

if (config.logging.format === 'pretty') {
  transports.push({
    target: join(__dirname, 'pinoPrettyTransport.cjs'),
    options: { colorize: true, translateTime: 'SYS:HH:MM:ss.l' },
  })
}

export const eventLogger = pino({
  name: config.otel.resourceAttributes.serviceName,
  level: config.logging.level,
  mixin: pinoMixin,
  transport: transports.length > 0 ? { targets: transports } : undefined,
  serializers: {
    err: (err: Error) => ({
      stack: err.stack,
      message: err.message,
    }),
  },
})

export function createEventLogger(component: string) {
  return eventLogger.child({ component })
}
