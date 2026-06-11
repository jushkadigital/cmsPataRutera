import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'

export interface TourPublishedEmailPayload {
  tourId: string
  tourSlug: string
  channels: ('email' | 'webhook' | 'push')[]
}

export type TourPublishedEmailEvent = EventEnvelope<TourPublishedEmailPayload>

export function createTourPublishedEmail(
  payload: TourPublishedEmailPayload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): TourPublishedEmailEvent {
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
  }) as TourPublishedEmailEvent
}
