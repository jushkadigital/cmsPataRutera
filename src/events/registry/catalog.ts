import { EventRegistry } from './EventRegistry'
import { EXCHANGE_CONFIG } from '@/events/topology/bindings'

export const eventRegistry = new EventRegistry()

eventRegistry.register({
  eventType: 'tour.published',
  eventVersion: 1,
  category: 'integration',
  aggregateType: 'tour',
  producer: 'catalog',
  description: 'Tour was published and is now visible to customers',
  exchange: EXCHANGE_CONFIG.integration,
  routingKeyPattern: 'integration.tour.published.v1',
})

eventRegistry.register({
  eventType: 'tour.updated',
  eventVersion: 1,
  category: 'integration',
  aggregateType: 'tour',
  producer: 'catalog',
  description: 'Published tour was updated',
  exchange: EXCHANGE_CONFIG.integration,
  routingKeyPattern: 'integration.tour.updated.v1',
})

eventRegistry.register({
  eventType: 'tour.deleted',
  eventVersion: 1,
  category: 'integration',
  aggregateType: 'tour',
  producer: 'catalog',
  description: 'Tour was permanently deleted',
  exchange: EXCHANGE_CONFIG.integration,
  routingKeyPattern: 'integration.tour.deleted.v1',
})

eventRegistry.register({
  eventType: 'package.published',
  eventVersion: 1,
  category: 'integration',
  aggregateType: 'package',
  producer: 'catalog',
  description: 'Package was published and is now visible to customers',
  exchange: EXCHANGE_CONFIG.integration,
  routingKeyPattern: 'integration.package.published.v1',
})

eventRegistry.register({
  eventType: 'package.updated',
  eventVersion: 1,
  category: 'integration',
  aggregateType: 'package',
  producer: 'catalog',
  description: 'Published package was updated',
  exchange: EXCHANGE_CONFIG.integration,
  routingKeyPattern: 'integration.package.updated.v1',
})

eventRegistry.register({
  eventType: 'package.deleted',
  eventVersion: 1,
  category: 'integration',
  aggregateType: 'package',
  producer: 'catalog',
  description: 'Package was permanently deleted',
  exchange: EXCHANGE_CONFIG.integration,
  routingKeyPattern: 'integration.package.deleted.v1',
})

eventRegistry.register({
  eventType: 'tour.published',
  eventVersion: 1,
  category: 'notification',
  aggregateType: 'tour',
  producer: 'catalog',
  description: 'Notification that a tour was published',
  exchange: EXCHANGE_CONFIG.notification,
  routingKeyPattern: 'notify.tour.published.v1',
})

eventRegistry.register({
  eventType: 'tour.updated',
  eventVersion: 1,
  category: 'notification',
  aggregateType: 'tour',
  producer: 'catalog',
  description: 'Notification that a published tour was updated',
  exchange: EXCHANGE_CONFIG.notification,
  routingKeyPattern: 'notify.tour.updated.v1',
})

eventRegistry.register({
  eventType: 'package.published',
  eventVersion: 1,
  category: 'notification',
  aggregateType: 'package',
  producer: 'catalog',
  description: 'Notification that a package was published',
  exchange: EXCHANGE_CONFIG.notification,
  routingKeyPattern: 'notify.package.published.v1',
})

eventRegistry.register({
  eventType: 'package.updated',
  eventVersion: 1,
  category: 'notification',
  aggregateType: 'package',
  producer: 'catalog',
  description: 'Notification that a published package was updated',
  exchange: EXCHANGE_CONFIG.notification,
  routingKeyPattern: 'notify.package.updated.v1',
})

eventRegistry.register({
  eventType: 'identity.user.created',
  eventVersion: 1,
  category: 'inbound',
  aggregateType: 'user',
  producer: 'user-service',
  description: 'User created in external identity service',
  exchange: EXCHANGE_CONFIG.identityEvents,
  routingKeyPattern: 'identity.user.created.v1',
})

eventRegistry.register({
  eventType: 'identity.user.deleted',
  eventVersion: 1,
  category: 'inbound',
  aggregateType: 'user',
  producer: 'user-service',
  description: 'User deleted in external identity service',
  exchange: EXCHANGE_CONFIG.identityEvents,
  routingKeyPattern: 'identity.user.deleted.v1',
})

eventRegistry.register({
  eventType: 'capacity.max_passengers.updated',
  eventVersion: 1,
  category: 'capacity',
  aggregateType: 'tour',
  producer: 'capacity-service',
  description: 'External capacity service updated max passengers for a tour or paquete',
  exchange: EXCHANGE_CONFIG.capacityEvents,
  routingKeyPattern: 'capacity.max_passengers.updated.v1',
})
