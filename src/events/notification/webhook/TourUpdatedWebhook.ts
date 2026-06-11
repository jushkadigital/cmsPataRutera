import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'

export interface TourUpdatedWebhookPayload {
  tourId: string
  tourSlug: string
  channels: ('email' | 'webhook' | 'push')[]
}

export type TourUpdatedWebhookEvent = EventEnvelope<TourUpdatedWebhookPayload>

export function createTourUpdatedWebhook(
  payload: TourUpdatedWebhookPayload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): TourUpdatedWebhookEvent {
  return createEvent({
    eventType: 'tour.updated',
    eventVersion: 1,
    aggregateId: payload.tourId,
    aggregateType: 'tour',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as TourUpdatedWebhookEvent
}
