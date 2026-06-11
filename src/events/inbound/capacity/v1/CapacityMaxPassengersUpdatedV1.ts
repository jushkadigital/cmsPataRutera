import { createEvent } from '@/events/envelope'
import type { EventEnvelope } from '@/events/envelope'
import { z } from 'zod'

export interface CapacityMaxPassengersUpdatedV1Payload {
  aggregateType: 'tour' | 'paquete'
  aggregateId: number
  maxPassengers: number
}

export const CapacityMaxPassengersUpdatedV1Schema = z.object({
  aggregateType: z.enum(['tour', 'paquete']),
  aggregateId: z.number().int().positive(),
  maxPassengers: z.number().int().min(1),
})

export type CapacityMaxPassengersUpdatedV1Event = EventEnvelope<CapacityMaxPassengersUpdatedV1Payload>

export function createCapacityMaxPassengersUpdatedV1(
  payload: CapacityMaxPassengersUpdatedV1Payload,
  actorId?: string | null,
  correlationId?: string,
  causationId?: string | null,
): CapacityMaxPassengersUpdatedV1Event {
  return createEvent({
    eventType: 'capacity.max_passengers.updated',
    eventVersion: 1,
    aggregateId: String(payload.aggregateId),
    aggregateType: payload.aggregateType,
    producer: 'capacity-service',
    actorId,
    correlationId,
    causationId,
    payload,
  }) as CapacityMaxPassengersUpdatedV1Event
}
