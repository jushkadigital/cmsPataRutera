import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'
import { z } from 'zod'

export interface TourUpdatedV1Data {
  destination: string
  description: Record<string, unknown>
  duration_days: number
  thumbnail: string
  completeThumbnail: {
    large?: string | null
    medium?: string | null
    small?: string | null
    og?: string | null
    square?: string | null
  } | null
  price: number
  categories: { name: string }[]
  destinos: { name: string }
  difficulty: string
}

export interface TourUpdatedV1Payload {
  id: number
  slug: string
  data: TourUpdatedV1Data
}

export const TourUpdatedV1Schema = z.object({
  id: z.number(),
  slug: z.string(),
  data: z.object({
    destination: z.string(),
    description: z.record(z.unknown()),
    duration_days: z.number(),
    thumbnail: z.string(),
    completeThumbnail: z.object({
      large: z.string().nullable().optional(),
      medium: z.string().nullable().optional(),
      small: z.string().nullable().optional(),
      og: z.string().nullable().optional(),
      square: z.string().nullable().optional(),
    }).nullable(),
    price: z.number(),
    categories: z.array(z.object({ name: z.string() })),
    destinos: z.object({ name: z.string() }),
    difficulty: z.string(),
  }),
})

export type TourUpdatedV1Event = EventEnvelope<TourUpdatedV1Payload>

export function createTourUpdatedV1(
  payload: TourUpdatedV1Payload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): TourUpdatedV1Event {
  return createEvent({
    eventType: 'tour.updated',
    eventVersion: 1,
    aggregateId: String(payload.id),
    aggregateType: 'tour',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as TourUpdatedV1Event
}
