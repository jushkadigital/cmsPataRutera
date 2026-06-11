import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { resourceFromAttributes } from '@opentelemetry/resources'
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
  ATTR_DEPLOYMENT_ENVIRONMENT_NAME,
} from '@opentelemetry/semantic-conventions'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import {
  ParentBasedSampler,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base'
import type { SpanProcessor, ReadableSpan, Span } from '@opentelemetry/sdk-trace-base'
import type { Context } from '@opentelemetry/api'
import { getObservabilityConfig } from './observabilityConfig'
import type { MetricReader } from '@opentelemetry/sdk-metrics'

let sdk: NodeSDK | null = null
let isInitialized = false

class FilterSpanProcessor implements SpanProcessor {
  private readonly delegate: SpanProcessor

  constructor(delegate: SpanProcessor) {
    this.delegate = delegate
  }

  onStart(span: Span, parentContext: Context): void {
    this.delegate.onStart(span, parentContext)
  }

  onEnd(span: ReadableSpan): void {
    const target = span.attributes['http.target']
    if (typeof target === 'string') {
      if (target.startsWith('/_next/') || target.startsWith('/__nextjs')) {
        return
      }
    }
    this.delegate.onEnd(span)
  }

  shutdown(): Promise<void> {
    return this.delegate.shutdown()
  }

  forceFlush(): Promise<void> {
    return this.delegate.forceFlush()
  }
}

export function setupOTelSDK(): NodeSDK | null {
  if (isInitialized) {
    return sdk
  }

  const config = getObservabilityConfig()

  if (!config.otel.enabled) {
    isInitialized = true
    return null
  }

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: config.otel.resourceAttributes.serviceName,
    [ATTR_SERVICE_VERSION]: config.otel.resourceAttributes.serviceVersion,
    [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: config.otel.resourceAttributes.deploymentEnvironment,
  })

  const traceExporter = new OTLPTraceExporter({
    url: `${config.otel.endpoint}/v1/traces`,
  })

  const metricExporter = new OTLPMetricExporter({
    url: `${config.otel.endpoint}/v1/metrics`,
  })

  const metricReaders: MetricReader[] = [
    new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: config.otel.metricExportIntervalMs,
    }),
  ]

  if (config.prometheus.enabled) {
    const prometheusExporter = new PrometheusExporter({
      port: config.prometheus.port,
      endpoint: '/metrics',
    })
    metricReaders.push(prometheusExporter)
  }

  const sampler = new ParentBasedSampler({
    root: new TraceIdRatioBasedSampler(config.otel.sampler.ratio),
  })

  const httpInstrumentation = new HttpInstrumentation()

  const spanProcessor = config.otel.simpleExport
    ? new SimpleSpanProcessor(traceExporter)
    : new BatchSpanProcessor(traceExporter)
  const filteredSpanProcessor = new FilterSpanProcessor(spanProcessor)

  sdk = new NodeSDK({
    resource,
    traceExporter,
    metricReaders,
    sampler,
    instrumentations: [httpInstrumentation],
    spanProcessors: [filteredSpanProcessor],
  })

  sdk.start()
  isInitialized = true

  const shutdownHandler = async (): Promise<void> => {
    if (sdk) {
      try {
        await sdk.shutdown()
      } catch {
        // Silently ignore shutdown errors to prevent unhandled rejections during process exit
      }
    }
  }

  process.on('SIGTERM', shutdownHandler)
  process.on('SIGINT', shutdownHandler)

  return sdk
}
