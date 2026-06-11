import { asClass, asValue, type AwilixContainer } from 'awilix'
import type { Payload } from 'payload'
import { RabbitMQEventBus } from '@/events/bus/RabbitMQEventBus'
import { PostgresIdempotencyStore } from '@/events/idempotency/PostgresIdempotencyStore'
import { eventRegistry } from '@/events/registry/catalog'
import { UpcasterRegistry } from '@/events/upcasting/UpcasterRegistry'
import { initTelemetry } from '@/events/tracing/telemetry'

export function registerEventModules(container: AwilixContainer, payload: Payload): void {
  container.register('rabbitMQEventBus', asClass(RabbitMQEventBus, { lifetime: 'SINGLETON' }))
  container.register('idempotencyStore', asClass(PostgresIdempotencyStore, { lifetime: 'SINGLETON' }))
  container.register('eventRegistry', asValue(eventRegistry))
  container.register('upcasterRegistry', asValue(new UpcasterRegistry()))

  initTelemetry()
}
