import type { ConfirmChannel } from 'amqplib'

import { QUEUE_BINDINGS } from './bindings'

const DLX_EXCHANGE = 'tourism.dlx'
const RETRY_DELAY_MS = Number(process.env.RABBITMQ_RETRY_DELAY_MS ?? '30000')

export async function declareTopology(channel: ConfirmChannel): Promise<void> {
  await channel.assertExchange('tourism.integration', 'topic', { durable: true })
  await channel.assertExchange('tourism.notify', 'topic', { durable: true })
  await channel.assertExchange('identity.events', 'topic', { durable: true })
  await channel.assertExchange('capacity.events', 'topic', { durable: true })
  await channel.assertExchange(DLX_EXCHANGE, 'fanout', { durable: true })

  for (const binding of QUEUE_BINDINGS) {
    await channel.assertQueue(binding.dlqName, {
      durable: true,
      arguments: {
        'x-queue-type': 'quorum',
      },
    })

    await channel.bindQueue(binding.dlqName, DLX_EXCHANGE, '')

    await channel.assertQueue(binding.retryQueueName, {
      durable: true,
      deadLetterExchange: binding.exchange,
      deadLetterRoutingKey: binding.queueName,
      arguments: {
        'x-queue-type': 'quorum',
        'x-message-ttl': RETRY_DELAY_MS,
      },
    })

    await channel.assertQueue(binding.queueName, {
      durable: true,
      deadLetterExchange: DLX_EXCHANGE,
      arguments: {
        'x-queue-type': 'quorum',
      },
    })

    for (const pattern of binding.routingPatterns) {
      await channel.bindQueue(binding.queueName, binding.exchange, pattern)
    }

    await channel.bindQueue(binding.queueName, binding.exchange, binding.queueName)
  }
}
