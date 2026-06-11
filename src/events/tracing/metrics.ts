import type { Counter, Histogram, Meter } from '@opentelemetry/api'

export const EVENT_METRICS = {
  EVENTS_PUBLISHED: 'tourism.events.published',
  EVENTS_CONSUMED: 'tourism.events.consumed',
  EVENTS_FAILED: 'tourism.events.failed',
  EVENTS_DEDUPLICATED: 'tourism.events.deduplicated',
  EVENTS_UPCASTED: 'tourism.events.upcasted',
  CONSUMER_LAG: 'tourism.consumer.lag',
  PROCESSING_DURATION: 'tourism.processing.duration',
} as const

export const EVENT_METRIC_DESCRIPTIONS: Record<string, string> = {
  [EVENT_METRICS.EVENTS_PUBLISHED]: 'Total events published',
  [EVENT_METRICS.EVENTS_CONSUMED]: 'Total events consumed',
  [EVENT_METRICS.EVENTS_FAILED]: 'Total events that failed processing',
  [EVENT_METRICS.EVENTS_DEDUPLICATED]: 'Total events deduplicated by idempotency',
  [EVENT_METRICS.EVENTS_UPCASTED]: 'Total events upcasted to newer version',
  [EVENT_METRICS.CONSUMER_LAG]: 'Consumer lag in messages',
  [EVENT_METRICS.PROCESSING_DURATION]: 'Event processing duration in milliseconds',
} as const

export interface EventMetricsInstruments {
  eventsPublished: Counter
  eventsConsumed: Counter
  eventsFailed: Counter
  eventsDeduplicated: Counter
  eventsUpcasted: Counter
  consumerLag: Histogram
  processingDuration: Histogram
}

export function createEventMetrics(meter: Meter): EventMetricsInstruments {
  return {
    eventsPublished: meter.createCounter(EVENT_METRICS.EVENTS_PUBLISHED, {
      description: EVENT_METRIC_DESCRIPTIONS[EVENT_METRICS.EVENTS_PUBLISHED],
    }),
    eventsConsumed: meter.createCounter(EVENT_METRICS.EVENTS_CONSUMED, {
      description: EVENT_METRIC_DESCRIPTIONS[EVENT_METRICS.EVENTS_CONSUMED],
    }),
    eventsFailed: meter.createCounter(EVENT_METRICS.EVENTS_FAILED, {
      description: EVENT_METRIC_DESCRIPTIONS[EVENT_METRICS.EVENTS_FAILED],
    }),
    eventsDeduplicated: meter.createCounter(EVENT_METRICS.EVENTS_DEDUPLICATED, {
      description: EVENT_METRIC_DESCRIPTIONS[EVENT_METRICS.EVENTS_DEDUPLICATED],
    }),
    eventsUpcasted: meter.createCounter(EVENT_METRICS.EVENTS_UPCASTED, {
      description: EVENT_METRIC_DESCRIPTIONS[EVENT_METRICS.EVENTS_UPCASTED],
    }),
    consumerLag: meter.createHistogram(EVENT_METRICS.CONSUMER_LAG, {
      description: EVENT_METRIC_DESCRIPTIONS[EVENT_METRICS.CONSUMER_LAG],
    }),
    processingDuration: meter.createHistogram(EVENT_METRICS.PROCESSING_DURATION, {
      description: EVENT_METRIC_DESCRIPTIONS[EVENT_METRICS.PROCESSING_DURATION],
    }),
  }
}

let _instruments: EventMetricsInstruments | null = null

export function getEventMetrics(meter: Meter): EventMetricsInstruments {
  if (!_instruments) {
    _instruments = createEventMetrics(meter)
  }
  return _instruments
}
