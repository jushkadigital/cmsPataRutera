import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'

export interface PaqueteUpdatedWebhookPayload {
  paqueteId: string
  paqueteSlug: string
  channels: ('email' | 'webhook')[]
}

export type PaqueteUpdatedWebhookEvent = EventEnvelope<PaqueteUpdatedWebhookPayload>

export function createPaqueteUpdatedWebhook(
  payload: PaqueteUpdatedWebhookPayload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): PaqueteUpdatedWebhookEvent {
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
  }) as PaqueteUpdatedWebhookEvent
}
