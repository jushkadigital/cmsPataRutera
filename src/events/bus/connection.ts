import amqp, { type ChannelModel, type ConfirmChannel } from 'amqplib'
import { createEventLogger } from '@/events/tracing/logger'

const logger = createEventLogger('event-bus-connection')

export const RECONNECT_DELAY_MS = 5000

export async function createConnection(url: string): Promise<ChannelModel> {
  const connection = await amqp.connect(url)

  connection.once('error', (error: Error) => {
    logger.error({ err: error }, 'RabbitMQ connection error')
  })

  connection.once('close', () => {
    logger.warn('RabbitMQ connection closed')
  })

  return connection
}

export async function createConfirmChannel(connection: ChannelModel): Promise<ConfirmChannel> {
  const channel = await connection.createConfirmChannel()

  channel.once('error', (error: Error) => {
    logger.error({ err: error }, 'RabbitMQ channel error')
  })

  channel.once('close', () => {
    logger.warn('RabbitMQ channel closed')
  })

  return channel
}
