export type EventCategory = 'integration' | 'notification' | 'inbound' | 'capacity'

export interface EventMetadata {
  eventId: string
  eventType: string
  eventVersion: number
  aggregateId: string
  aggregateType: string

  /**
   * Links all events in a single business flow.
   * Root events generate a new correlationId; handlers propagate it.
   */
  correlationId: string

  /**
   * eventId of the event that CAUSED this one.
   * null for root events. Set by handlers that emit events as a reaction.
   */
  causationId: string | null

  traceId: string
  spanId: string
  producer: string
  /** ISO 8601 — when the business event occurred, not when it was published */
  occurredAt: string
  actorId: string | null
  tenantId?: string | null
}

export interface EventEnvelope<T = unknown> {
  spec: 'tourism-events/v1'
  metadata: EventMetadata
  payload: T
}
