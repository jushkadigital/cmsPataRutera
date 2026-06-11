import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'

export interface PaqueteUpdatedEmailPayload {
  paqueteId: string
  paqueteSlug: string
  channels: ('email' | 'webhook')[]
}

export type PaqueteUpdatedEmailEvent = EventEnvelope<PaqueteUpdatedEmailPayload>

export function createPaqueteUpdatedEmail(
  payload: PaqueteUpdatedEmailPayload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): PaqueteUpdatedEmailEvent {
  return createEvent({
    eventType: 'package.updated',
    eventVersion: 1,
    aggregateId: payload.paqueteId,
    aggregateType: 'package',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as PaqueteUpdatedEmailEvent
}
