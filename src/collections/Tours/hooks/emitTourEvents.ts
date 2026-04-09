import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { RabbitMQEventBus } from '@/services/rabbitmq-consumer'
import type { Tour } from '@/payload-types'
import { MeiliImage } from '@/utilities/convertToMeiliImage'

export const emitTourChange: CollectionAfterChangeHook<Tour> = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  try {
    const isPublished = doc._status === 'published'
    const wasPublished = previousDoc?._status === 'published'

    if (!isPublished) {
      return doc
    }

    const { getContainer } = await import('@/container')
    const container = await getContainer()
    const eventBus = container.resolve<RabbitMQEventBus>('rabbitMQEventBus')
    const routingKey = wasPublished ? 'tour.updated' : 'tour.created'

    const image = await req.payload.findByID({
      collection: 'media',
      id: doc.featuredImage as number,
      depth: 2,
      overrideAccess: true, // <--- Muy importante si el usuario no tiene permisos de lectura
    })

    const destino = await req.payload.findByID({
      collection: 'destinations',
      id: doc.destinos as number,
      depth: 2,
      overrideAccess: true, // <--- Muy importante si el usuario no tiene permisos de lectura
    })

    const categories = await req.payload.find({
      collection: 'tourCategory',
      depth: 2,
      overrideAccess: true, // <--- Muy importante si el usuario no tiene permisos de lectura
      limit: 1000,
      where: {
        id: {
          in: doc.categorias, // Esto busca todos los IDs que estén en el array
        },
      },
    })

    await eventBus.emit(routingKey, {
      id: doc.id,
      slug: doc.slug,
      data: {
        destination: doc.title,
        description: doc.miniDescription,
        duration_days: doc.durationGeneral,
        max_capacity: doc.maxPassengersGeneral,
        thumbnail: image?.sizes?.og?.url ?? '',
        completeThumbnail: MeiliImage(image),
        price: doc.priceGeneral,
        categories: categories.docs.map((categoria) => ({ name: categoria.name })),
        destinos: { name: destino.name },
        difficulty: doc.difficulty,
      },
    })
  } catch (err) {
    req.payload.logger.error(`Failed to emit tour ${operation} event: ${err}`)
  }
  return doc
}

export const emitTourDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  try {
    const { getContainer } = await import('@/container')
    const container = await getContainer()
    const eventBus = container.resolve<RabbitMQEventBus>('rabbitMQEventBus')
    const routingKey = 'tour.deleted'

    await eventBus.emit(routingKey, {
      id: doc.id,
    })
  } catch (err) {
    req.payload.logger.error(`Failed to emit tour delete event: ${err}`)
  }
  return doc
}
