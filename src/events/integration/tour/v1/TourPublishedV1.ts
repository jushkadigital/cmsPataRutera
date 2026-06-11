import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'
import { z } from 'zod'

export interface TourPublishedV1Data {
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

export interface TourPublishedV1Payload {
  id: number
  slug: string
  data: TourPublishedV1Data
}

export const TourPublishedV1Schema = z.object({
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

export type TourPublishedV1Event = EventEnvelope<TourPublishedV1Payload>

export function createTourPublishedV1(
  payload: TourPublishedV1Payload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): TourPublishedV1Event {
  return createEvent({
    eventType: 'tour.published',
    eventVersion: 1,
    aggregateId: String(payload.id),
    aggregateType: 'tour',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as TourPublishedV1Event
}
