import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'
import { z } from 'zod'

export interface PackageDeletedV1Payload {
  id: string
  slug: string
  deletedAt: string
}

export const PackageDeletedV1Schema = z.object({
  id: z.string(),
  slug: z.string(),
  deletedAt: z.string(),
})

export type PackageDeletedV1Event = EventEnvelope<PackageDeletedV1Payload>

export function createPackageDeletedV1(
  payload: PackageDeletedV1Payload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): PackageDeletedV1Event {
  return createEvent({
    eventType: 'package.deleted',
    eventVersion: 1,
    aggregateId: payload.id,
    aggregateType: 'package',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as PackageDeletedV1Event
}
