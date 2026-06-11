import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'
import { z } from 'zod'

export interface TourDeletedV1Payload {
  id: string
  slug: string
  deletedAt: string
}

export const TourDeletedV1Schema = z.object({
  id: z.string(),
  slug: z.string(),
  deletedAt: z.string(),
})

export type TourDeletedV1Event = EventEnvelope<TourDeletedV1Payload>

export function createTourDeletedV1(
  payload: TourDeletedV1Payload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): TourDeletedV1Event {
  return createEvent({
    eventType: 'tour.deleted',
    eventVersion: 1,
    aggregateId: payload.id,
    aggregateType: 'tour',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as TourDeletedV1Event
}
