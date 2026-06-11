export type { EventCategory, EventEnvelope, EventMetadata } from './envelope/EventEnvelope'
export {
  createEvent,
  createCorrelatedEvent,
  buildRoutingKey,
  setTraceContextExtractor,
} from './envelope/createEvent'
export type { CreateEventInput } from './envelope/createEvent'
export type {
  AggregateType,
  BoundedContext,
  IntegrationEventType,
  InboundEventType,
  NotificationEventType,
  IntegrationEvent,
  InboundEvent,
  NotificationEvent,
  IntegrationEventPayloadMap,
  InboundEventPayloadMap,
  NotificationEventPayloadMap,
} from './envelope/EventTypeMap'

export type { IEventBus, SubscriberHandler } from './bus/IEventBus'
export { RabbitMQEventBus } from './bus/RabbitMQEventBus'

export type { IdempotencyStore, IdempotencyRecord } from './idempotency/IdempotencyStore'
export { PostgresIdempotencyStore } from './idempotency/PostgresIdempotencyStore'
export { withIdempotency } from './idempotency/idempotencyMiddleware'

export { EventRegistry } from './registry/EventRegistry'
export type { EventRegistryEntry } from './registry/EventRegistry'
export { eventRegistry } from './registry/catalog'

export { UpcasterRegistry } from './upcasting/UpcasterRegistry'
export type { EventUpcaster } from './upcasting/UpcasterRegistry'

export { initTelemetry, getTracer, getMeter } from './tracing/telemetry'
export { setupOTelSDK } from './tracing/sdk'
export { createEventLogger, eventLogger } from './tracing/logger'
export { MESSAGING_ATTR, DOMAIN_ATTR } from './tracing/spanAttributes'
export { EVENT_METRICS } from './tracing/metrics'
export { injectTraceContextIntoEnvelope, extractTraceContextFromEnvelope, createSpanContextFromMetadata, setSpanContextFromEnvelope } from './tracing/tracePropagation'

export { declareTopology } from './topology/declarations'
export { QUEUE_BINDINGS } from './topology/bindings'
export type { QueueBinding } from './topology/bindings'

export { registerEventModules } from './di'

export * as TourEvents from './integration/tour'
export * as PaqueteEvents from './integration/paquete'
export * as IdentityInboundEvents from './inbound/identity'
