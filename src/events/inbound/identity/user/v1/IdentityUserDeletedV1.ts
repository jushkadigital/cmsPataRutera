import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'
import { z } from 'zod'
import type { UserType } from './IdentityUserCreatedV1'

export interface IdentityUserDeletedV1Payload {
  aggregateId: string
  email: string
  userType: UserType
}

export const IdentityUserDeletedV1Schema = z.object({
  aggregateId: z.string(),
  email: z.string(),
  userType: z.enum(['PASSENGER', 'ADMIN']),
})

export type IdentityUserDeletedV1Event = EventEnvelope<IdentityUserDeletedV1Payload>

export function createIdentityUserDeletedV1(
  payload: IdentityUserDeletedV1Payload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): IdentityUserDeletedV1Event {
  return createEvent({
    eventType: 'identity.user.deleted',
    eventVersion: 1,
    aggregateId: payload.aggregateId,
    aggregateType: 'user',
    producer: 'user-service',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as IdentityUserDeletedV1Event
}
