import { AwilixContainer } from 'awilix'
import { Payload } from 'payload'
import { createUserHandler } from './user-created'
import { RabbitMQEventBus } from '@/services/rabbitmq-consumer'

export const registerSubscribers = (container: AwilixContainer) => {
  // Sacamos las instancias del contenedor
  const bus = container.resolve<RabbitMQEventBus>('rabbitMQEventBus')
  const payload = container.resolve<Payload>('payload')

  // Registramos los eventos
  // Inyectamos 'payload' al handler aquí (Currying)
  bus.subscribe('admin.registered', createUserHandler(payload))

  // bus.subscribe('product.updated', createProductHandler(payload))

  console.log('📋 Suscriptores registrados en el Event Bus')

  // Iniciamos la conexión a RabbitMQ
  // Es importante hacerlo DESPUÉS de registrar los suscriptores para que haga el bind
  bus.start()
}
