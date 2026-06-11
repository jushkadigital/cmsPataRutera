import type { EventEnvelope } from './EventEnvelope'

export type AggregateType = 'tour' | 'package' | 'user' | 'media' | 'page'

export type BoundedContext = 'catalog' | 'content' | 'identity'

export type IntegrationEventType =
  | 'tour.published'
  | 'tour.updated'
  | 'tour.deleted'
  | 'package.published'
  | 'package.updated'
  | 'package.deleted'

export type InboundEventType =
  | 'identity.user.created'
  | 'identity.user.deleted'

export type NotificationEventType =
  | 'tour.published'
  | 'tour.updated'
  | 'package.published'
  | 'package.updated'

export interface IntegrationEventPayloadMap {
  'tour.published': {
    id: number
    slug: string
    data: {
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
      categories: { name: string }[]
      destinos: { name: string }
      difficulty: string
    }
  }
  'tour.updated': {
    id: number
    slug: string
    data: {
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
      categories: { name: string }[]
      destinos: { name: string }
      difficulty: string
    }
  }
  'tour.deleted': { id: string; slug: string; deletedAt: string }
  'package.published': {
    id: number
    slug: string
    data: {
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
  }
  'package.updated': {
    id: number
    slug: string
    data: {
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
  }
  'package.deleted': { id: string; slug: string; deletedAt: string }
}

export interface InboundEventPayloadMap {
  'identity.user.created': { aggregateId: string; email: string; userType: 'PASSENGER' | 'ADMIN'; clientRoles: string[] }
  'identity.user.deleted': { aggregateId: string; email: string; userType: 'PASSENGER' | 'ADMIN' }
}

export interface NotificationEventPayloadMap {
  'tour.published': {
    tourId: string
    tourSlug: string
    channels: ('email' | 'webhook' | 'push')[]
  }
  'tour.updated': {
    tourId: string
    tourSlug: string
    channels: ('email' | 'webhook' | 'push')[]
  }
  'package.published': {
    paqueteId: string
    paqueteSlug: string
    channels: ('email' | 'webhook')[]
  }
  'package.updated': {
    paqueteId: string
    paqueteSlug: string
    channels: ('email' | 'webhook')[]
  }
}

export type IntegrationEvent<K extends IntegrationEventType = IntegrationEventType> = EventEnvelope<
  IntegrationEventPayloadMap[K]
>
export type InboundEvent<K extends InboundEventType = InboundEventType> = EventEnvelope<
  InboundEventPayloadMap[K]
>
export type NotificationEvent<
  K extends NotificationEventType = NotificationEventType,
> = EventEnvelope<NotificationEventPayloadMap[K]>
