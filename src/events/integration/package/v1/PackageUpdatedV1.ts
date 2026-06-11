import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'
import { z } from 'zod'

export interface PackageUpdatedV1Data {
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
  destinos: { name: string }[]
  difficulty: string
}

export interface PackageUpdatedV1Payload {
  id: number
  slug: string
  data: PackageUpdatedV1Data
}

export const PackageUpdatedV1Schema = z.object({
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
    destinos: z.array(z.object({ name: z.string() })),
    difficulty: z.string(),
  }),
})

export type PackageUpdatedV1Event = EventEnvelope<PackageUpdatedV1Payload>

export function createPackageUpdatedV1(
  payload: PackageUpdatedV1Payload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): PackageUpdatedV1Event {
  return createEvent({
    eventType: 'package.updated',
    eventVersion: 1,
    aggregateId: String(payload.id),
    aggregateType: 'package',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as PackageUpdatedV1Event
}
