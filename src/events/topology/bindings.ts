export interface QueueBinding {
  queueName: string
  exchange: string
  routingPatterns: string[]
  dlqName: string
  retryQueueName: string
  dlxExchange: string
  dlxType: 'direct' | 'fanout'
}

export const EXCHANGE_CONFIG = {
  integration: process.env.CMS_EXCHANGE_INTEGRATION ?? 'tourism.integration',
  notification: process.env.CMS_EXCHANGE_NOTIFICATION ?? 'tourism.notify',
  identityEvents: process.env.CMS_EXCHANGE_IDENTITY_EVENTS ?? 'identity.events',
  capacityEvents: process.env.CMS_EXCHANGE_CAPACITY_EVENTS ?? 'capacity.events',
} as const

function dlxFor(exchange: string): string {
  return `${exchange}.dlx`
}

export const QUEUE_BINDINGS: QueueBinding[] = [
  {
    queueName: 'search.integration.queue',
    exchange: EXCHANGE_CONFIG.integration,
    routingPatterns: [
      'integration.tour.#',
      'integration.package.#',
    ],
    dlqName: 'search.integration.queue.dlq',
    retryQueueName: 'search.integration.queue.retry',
    dlxExchange: dlxFor(EXCHANGE_CONFIG.integration),
    dlxType: 'direct',
  },
  {
    queueName: 'email.notify.queue',
    exchange: EXCHANGE_CONFIG.notification,
    routingPatterns: ['notify.#'],
    dlqName: 'email.notify.queue.dlq',
    retryQueueName: 'email.notify.queue.retry',
    dlxExchange: dlxFor(EXCHANGE_CONFIG.notification),
    dlxType: 'direct',
  },
  {
    queueName: 'webhook.notify.queue',
    exchange: EXCHANGE_CONFIG.notification,
    routingPatterns: ['notify.#'],
    dlqName: 'webhook.notify.queue.dlq',
    retryQueueName: 'webhook.notify.queue.retry',
    dlxExchange: dlxFor(EXCHANGE_CONFIG.notification),
    dlxType: 'direct',
  },
  {
    queueName: 'payload.inbound.queue',
    exchange: EXCHANGE_CONFIG.identityEvents,
    routingPatterns: ['identity.user.created.#', 'identity.user.deleted.#'],
    dlqName: 'payload.inbound.queue.dlq',
    retryQueueName: 'payload.inbound.queue.retry',
    dlxExchange: dlxFor(EXCHANGE_CONFIG.identityEvents),
    dlxType: 'fanout',
  },
  {
    queueName: 'payload.capacity.queue',
    exchange: EXCHANGE_CONFIG.capacityEvents,
    routingPatterns: ['capacity.#'],
    dlqName: 'payload.capacity.queue.dlq',
    retryQueueName: 'payload.capacity.queue.retry',
    dlxExchange: dlxFor(EXCHANGE_CONFIG.capacityEvents),
    dlxType: 'direct',
  },
]
