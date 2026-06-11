export interface QueueBinding {
  queueName: string
  exchange: string
  routingPatterns: string[]
  dlqName: string
  retryQueueName: string
}

export const QUEUE_BINDINGS: QueueBinding[] = [
  {
    queueName: 'search.integration.queue',
    exchange: 'tourism.integration',
    routingPatterns: [
      'integration.tour.#',
      'integration.package.#',
    ],
    dlqName: 'search.integration.queue.dlq',
    retryQueueName: 'search.integration.queue.retry',
  },
  {
    queueName: 'email.notify.queue',
    exchange: 'tourism.notify',
    routingPatterns: ['notify.#'],
    dlqName: 'email.notify.queue.dlq',
    retryQueueName: 'email.notify.queue.retry',
  },
  {
    queueName: 'webhook.notify.queue',
    exchange: 'tourism.notify',
    routingPatterns: ['notify.#'],
    dlqName: 'webhook.notify.queue.dlq',
    retryQueueName: 'webhook.notify.queue.retry',
  },
  {
    queueName: 'payload.inbound.queue',
    exchange: 'identity.events',
    routingPatterns: ['identity.user.created.#', 'identity.user.deleted.#'],
    dlqName: 'payload.inbound.queue.dlq',
    retryQueueName: 'payload.inbound.queue.retry',
  },
  {
    queueName: 'payload.capacity.queue',
    exchange: 'capacity.events',
    routingPatterns: ['capacity.#'],
    dlqName: 'payload.capacity.queue.dlq',
    retryQueueName: 'payload.capacity.queue.retry',
  },
]
