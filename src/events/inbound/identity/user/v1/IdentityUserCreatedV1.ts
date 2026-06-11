import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'
import { z } from 'zod'

export type UserType = 'PASSENGER' | 'ADMIN'

export type ClientRole = 'basic' | 'standard' | 'premium' | 'editor' | 'admin' | 'super-admin'

export interface IdentityUserCreatedV1Payload {
  aggregateId: string
  email: string
  userType: UserType
  clientRoles: ClientRole[]
}

export const IdentityUserCreatedV1Schema = z.object({
  aggregateId: z.string(),
  email: z.string(),
  userType: z.enum(['PASSENGER', 'ADMIN']),
  clientRoles: z.array(z.enum(['basic', 'standard', 'premium', 'editor', 'admin', 'super-admin'])),
})

export type IdentityUserCreatedV1Event = EventEnvelope<IdentityUserCreatedV1Payload>

export function createIdentityUserCreatedV1(
  payload: IdentityUserCreatedV1Payload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): IdentityUserCreatedV1Event {
  return createEvent({
    eventType: 'identity.user.created',
    eventVersion: 1,
    aggregateId: payload.aggregateId,
    aggregateType: 'user',
    producer: 'user-service',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as IdentityUserCreatedV1Event
}
