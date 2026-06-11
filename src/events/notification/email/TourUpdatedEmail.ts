import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'

export interface TourUpdatedEmailPayload {
  tourId: string
  tourSlug: string
  channels: ('email' | 'webhook' | 'push')[]
}

export type TourUpdatedEmailEvent = EventEnvelope<TourUpdatedEmailPayload>

export function createTourUpdatedEmail(
  payload: TourUpdatedEmailPayload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): TourUpdatedEmailEvent {
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
  }) as TourUpdatedEmailEvent
}
