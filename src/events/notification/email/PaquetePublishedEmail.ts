import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'

export interface PaquetePublishedEmailPayload {
  paqueteId: string
  paqueteSlug: string
  channels: ('email' | 'webhook')[]
}

export type PaquetePublishedEmailEvent = EventEnvelope<PaquetePublishedEmailPayload>

export function createPaquetePublishedEmail(
  payload: PaquetePublishedEmailPayload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): PaquetePublishedEmailEvent {
  return createEvent({
    eventType: 'package.published',
    eventVersion: 1,
    aggregateId: payload.paqueteId,
    aggregateType: 'package',
    producer: 'catalog',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as PaquetePublishedEmailEvent
}
