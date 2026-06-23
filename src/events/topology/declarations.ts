import type { ConfirmChannel } from 'amqplib'

import { EXCHANGE_CONFIG, QUEUE_BINDINGS } from './bindings'

const RETRY_DELAY_MS = Number(process.env.RABBITMQ_RETRY_DELAY_MS ?? '30000')

export async function declareTopology(channel: ConfirmChannel): Promise<void> {
  await channel.assertExchange(EXCHANGE_CONFIG.integration, 'topic', { durable: true })
  await channel.assertExchange(EXCHANGE_CONFIG.notification, 'topic', { durable: true })
  await channel.assertExchange(EXCHANGE_CONFIG.identityEvents, 'topic', { durable: true })
  await channel.assertExchange(EXCHANGE_CONFIG.capacityEvents, 'topic', { durable: true })

  const declaredDlx = new Set<string>()
  for (const binding of QUEUE_BINDINGS) {
    if (!declaredDlx.has(binding.dlxExchange)) {
      declaredDlx.add(binding.dlxExchange)
      await channel.assertExchange(binding.dlxExchange, binding.dlxType, { durable: true })
    }
  }

  for (const binding of QUEUE_BINDINGS) {
    await channel.assertQueue(binding.dlqName, {
      durable: true,
      arguments: {
        'x-queue-type': 'quorum',
      },
    })

    if (binding.dlxType === 'fanout') {
      await channel.bindQueue(binding.dlqName, binding.dlxExchange, '')
    } else {
      await channel.bindQueue(binding.dlqName, binding.dlxExchange, binding.dlqName)
    }

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
      deadLetterExchange: binding.dlxExchange,
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
