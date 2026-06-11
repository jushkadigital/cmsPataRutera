import type { EventCategory, EventEnvelope } from '@/events/envelope'

export type SubscriberHandler<T = EventEnvelope> = (envelope: T) => Promise<void>

export interface IEventBus {
  emit(category: EventCategory, envelope: EventEnvelope): Promise<void>
  subscribe<T extends EventEnvelope>(
    category: EventCategory,
    routingPattern: string,
    handler: SubscriberHandler<T>,
    consumerGroup?: string,
  ): void
  start(): Promise<void>
  close(): Promise<void>
  healthCheck(): Promise<{ connected: boolean; queueDepth?: number }>
}
