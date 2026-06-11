import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'

export interface TourPublishedWebhookPayload {
  tourId: string
  tourSlug: string
  channels: ('email' | 'webhook' | 'push')[]
}

export type TourPublishedWebhookEvent = EventEnvelope<TourPublishedWebhookPayload>

export function createTourPublishedWebhook(
  payload: TourPublishedWebhookPayload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): TourPublishedWebhookEvent {
  return createEvent({
    eventType: 'tour.published',
    eventVersion: 1,
    aggregateId: payload.tourId,
    aggregateType: 'tour',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as TourPublishedWebhookEvent
}
