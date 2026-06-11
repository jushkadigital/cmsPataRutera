import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'

export interface PaquetePublishedWebhookPayload {
  paqueteId: string
  paqueteSlug: string
  channels: ('email' | 'webhook')[]
}

export type PaquetePublishedWebhookEvent = EventEnvelope<PaquetePublishedWebhookPayload>

export function createPaquetePublishedWebhook(
  payload: PaquetePublishedWebhookPayload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): PaquetePublishedWebhookEvent {
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
  }) as PaquetePublishedWebhookEvent
}
