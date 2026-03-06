import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { RabbitMQEventBus } from '@/services/rabbitmq-consumer'
import { Paquete } from '@/payload-types'

export const emitPaqueteChange: CollectionAfterChangeHook<Paquete> = async ({ doc, req, operation }) => {
  try {
    const { getContainer } = await import('@/container')
    const container = await getContainer()
    const eventBus = container.resolve<RabbitMQEventBus>('rabbitMQEventBus')
    const routingKey = operation === 'create' ? 'paquete.created' : 'paquete.updated'
    const image = await req.payload.findByID({
      collection: 'media',
      id: (doc.featuredImage as number),
      depth: 2,
      overrideAccess: true, // <--- Muy importante si el usuario no tiene permisos de lectura
    });
    const destinos = await req.payload.find({
      collection: 'destinations',
      depth: 2,
      overrideAccess: true, // <--- Muy importante si el usuario no tiene permisos de lectura
      limit: 1000,
      where: {
        id: {
          in: doc.destinos, // Esto busca todos los IDs que estén en el array
        },
      },
    });


    await eventBus.emit(routingKey, {
      id: doc.id,
      slug: doc.slug,
      data: {
        destination: doc.title,
        description: doc.miniDescription,
        duration_days: doc.durationGeneral,
        max_capacity: doc.maxPassengersGeneral,
        thumbnail: image.sizes?.og?.url ?? '',
        price: doc.priceGeneral,
        destinos: destinos.docs.map(destino => ({ id: destino.id, name: destino.name })),
        difficulty: doc.difficulty
      }
    })
  } catch (err) {
    req.payload.logger.error(`Failed to emit paquete ${operation} event: ${err}`)
  }
  return doc
}

export const emitPaqueteDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  try {
    const { getContainer } = await import('@/container')
    const container = await getContainer()
    const eventBus = container.resolve<RabbitMQEventBus>('rabbitMQEventBus')
    const routingKey = 'paquete.deleted'

    await eventBus.emit(routingKey, {
      id: doc.id
    })
  } catch (err) {
    req.payload.logger.error(`Failed to emit paquete delete event: ${err}`)
  }
  return doc
}
