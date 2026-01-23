import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib'
import { Payload } from 'payload'

// Definimos el tipo de las dependencias que inyectará Awilix
interface RabbitMQDependencies {
  payload: Payload
}

export type SubscriberHandler<T = any> = (data: T) => Promise<void>

export class RabbitMQEventBus {
  private payload: Payload
  private connection: Connection | null = null
  private channel: Channel | null = null

  // Mapa de suscriptores
  private subscribers: Map<string, SubscriberHandler[]> = new Map()

  private exchangeName = 'tourism-exchange'
  private queueName = 'cms_sync_queue'

  // ✅ INYECCIÓN DE DEPENDENCIAS:
  // Awilix buscará 'payload' en el contenedor y lo pasará aquí automáticamente.
  constructor({ payload }: RabbitMQDependencies) {
    this.payload = payload
  }

  // Método para registrar suscriptores
  public subscribe(routingKey: string, handler: SubscriberHandler) {
    if (!this.subscribers.has(routingKey)) {
      this.subscribers.set(routingKey, [])
    }
    this.subscribers.get(routingKey)?.push(handler)

    // Si ya estamos conectados, hacemos bind dinámico
    if (this.channel) {
      this.bindKey(routingKey).catch(console.error)
    }
  }

  async start() {
    if (this.connection) return

    try {
      console.log('🐰 [EventBus] Inicializando conexión...')
      this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://admin:admin123@172.17.0.1:5672')
      this.channel = await this.connection.createChannel()

      await this.channel.assertExchange(this.exchangeName, 'topic', { durable: true })
      const q = await this.channel.assertQueue(this.queueName, { durable: true })

      // Bind de todos los suscriptores registrados
      for (const routingKey of this.subscribers.keys()) {
        await this.bindKey(routingKey, q.queue)
      }

      this.channel.consume(q.queue, this.handleMessage.bind(this))
      console.log('✅ [EventBus] Conectado y escuchando eventos')

    } catch (error) {
      console.error('❌ [EventBus] Error de conexión:', error)
      setTimeout(() => this.start(), 5000)
    }
  }

  private async bindKey(routingKey: string, queue?: string) {
    if (!this.channel) return
    const qName = queue || this.queueName
    await this.channel.bindQueue(qName, this.exchangeName, routingKey)
  }

  private async handleMessage(msg: ConsumeMessage | null) {
    if (!msg) return

    const routingKey = msg.fields.routingKey
    const handlers = this.subscribers.get(routingKey)

    if (!handlers?.length) {
      this.channel?.ack(msg)
      return
    }

    try {
      const content = JSON.parse(msg.content.toString())
      // Ejecutamos los handlers.
      // NOTA: Ya no pasamos 'payload' como argumento al handler, 
      // porque los suscriptores deberían tener sus propias dependencias si las necesitan,
      // o usar el payload global si son funciones simples.
      await Promise.all(handlers.map(handler => handler(content)))
      this.channel?.ack(msg)
    } catch (error) {
      console.error(`❌ [EventBus] Error en ${routingKey}:`, error)
      this.channel?.nack(msg, false, false)
    }
  }
}
