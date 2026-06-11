import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Tour, Media } from '@/payload-types'
import type { IEventBus } from '@/events/bus/IEventBus'
import {
  createTourPublishedV1,
  createTourDeletedV1,
  createTourUpdatedV1,
} from '@/events/integration/tour/v1'
import { createTourPublishedEmail } from '@/events/notification/email/TourPublishedEmail'
import { createTourPublishedWebhook } from '@/events/notification/webhook/TourPublishedWebhook'
import { createTourUpdatedEmail } from '@/events/notification/email/TourUpdatedEmail'
import { createTourUpdatedWebhook } from '@/events/notification/webhook/TourUpdatedWebhook'
import { MeiliImage } from '@/utilities/convertToMeiliImage'

export const emitTourChange: CollectionAfterChangeHook<Tour> = async ({
  doc,
  req,
}) => {
  const isPublished = doc._status === 'published'

  if (!isPublished) {
    return doc
  }

  try {
    // Read the captured publish state from beforeChange hook (capturePublishedState).
    // This is more reliable than previousDoc._status which returns 'draft' when
    // drafts+autosave are enabled, causing false "published" events on re-publish.
    const wasPreviouslyPublished = req.context?.wasPreviouslyPublished === true

    const { getContainer } = await import('@/container')
    const container = await getContainer()
    const eventBus = container.resolve<IEventBus>('rabbitMQEventBus')

    const destino = await req.payload.findByID({
      collection: 'destinations',
      id: doc.destinos as number,
      depth: 2,
      overrideAccess: true,
    })

    const categories = await req.payload.find({
      collection: 'tourCategory',
      depth: 2,
      overrideAccess: true,
      limit: 1000,
      where: {
        id: {
          in: doc.categorias,
        },
      },
    })

    const image = typeof doc.featuredImage === 'object' ? doc.featuredImage as Media : null

    const integrationPayload = {
      id: doc.id,
      slug: doc.slug ?? '',
      data: {
        destination: doc.title,
        description: doc.miniDescription as Record<string, unknown>,
        duration_days: doc.durationGeneral || 1,
        thumbnail: image?.sizes?.og?.url ?? '',
        completeThumbnail: image ? MeiliImage(image) : null,
        price: doc.priceGeneral,
        categories: categories.docs.map((categoria) => ({ name: categoria.name })),
        destinos: { name: destino.name },
        difficulty: doc.difficulty,
      },
    }

    const notificationPayload = {
      tourId: String(doc.id),
      tourSlug: doc.slug ?? '',
      channels: ['email', 'webhook'] as ('email' | 'webhook' | 'push')[],
    }

    if (wasPreviouslyPublished) {
      await eventBus.emit('integration', createTourUpdatedV1(integrationPayload, req.user?.id))
      await eventBus.emit('notification', createTourUpdatedEmail(notificationPayload, req.user?.id))
      await eventBus.emit('notification', createTourUpdatedWebhook(notificationPayload, req.user?.id))
    } else {
      await eventBus.emit('integration', createTourPublishedV1(integrationPayload, req.user?.id))
      await eventBus.emit('notification', createTourPublishedEmail(notificationPayload, req.user?.id))
      await eventBus.emit('notification', createTourPublishedWebhook(notificationPayload, req.user?.id))
    }
  } catch (err) {
    req.payload.logger.error(`Failed to emit tour event: ${err}`)
    throw err
  }
  return doc
}

export const emitTourDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  try {
    const { getContainer } = await import('@/container')
    const container = await getContainer()
    const eventBus = container.resolve<IEventBus>('rabbitMQEventBus')

    await eventBus.emit(
      'integration',
      createTourDeletedV1(
        {
          id: String(doc.id),
          slug: doc.slug ?? '',
          deletedAt: new Date().toISOString(),
        },
        req.user?.id,
      ),
    )
  } catch (err) {
    req.payload.logger.error(`Failed to emit tour delete event: ${err}`)
    throw err
  }
  return doc
}
