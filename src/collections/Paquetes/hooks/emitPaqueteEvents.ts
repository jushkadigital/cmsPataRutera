import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Paquete, Media } from '@/payload-types'
import type { IEventBus } from '@/events/bus/IEventBus'
import {
  createPackagePublishedV1,
  createPackageDeletedV1,
  createPackageUpdatedV1,
} from '@/events/integration/package/v1'
import { createPaquetePublishedEmail } from '@/events/notification/email/PaquetePublishedEmail'
import { createPaquetePublishedWebhook } from '@/events/notification/webhook/PaquetePublishedWebhook'
import { createPaqueteUpdatedEmail } from '@/events/notification/email/PaqueteUpdatedEmail'
import { createPaqueteUpdatedWebhook } from '@/events/notification/webhook/PaqueteUpdatedWebhook'
import { MeiliImage } from '@/utilities/convertToMeiliImage'

export const emitPaqueteChange: CollectionAfterChangeHook<Paquete> = async ({
  doc,
  req,
}) => {
  try {
    const isPublished = doc._status === 'published'

    if (!isPublished) {
      return doc
    }

    // Read the captured publish state from beforeChange hook (capturePublishedState).
    // This is more reliable than previousDoc._status which returns 'draft' when
    // drafts+autosave are enabled, causing false "published" events on re-publish.
    const wasPreviouslyPublished = req.context?.wasPreviouslyPublished === true

    const { getContainer } = await import('@/container')
    const container = await getContainer()
    const eventBus = container.resolve<IEventBus>('rabbitMQEventBus')

    const destinos = await req.payload.find({
      collection: 'destinations',
      depth: 2,
      overrideAccess: true,
      limit: 1000,
      where: {
        id: {
          in: doc.destinos,
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
        destinos: destinos.docs.map((d) => ({ name: d.name })),
        difficulty: doc.difficulty,
      },
    }

    const notificationPayload = {
      paqueteId: String(doc.id),
      paqueteSlug: doc.slug ?? '',
      channels: ['email', 'webhook'] as ('email' | 'webhook')[],
    }

    if (wasPreviouslyPublished) {
      // Already published → updated
      await eventBus.emit('integration', createPackageUpdatedV1(integrationPayload, req.user?.id))
      await eventBus.emit('notification', createPaqueteUpdatedEmail(notificationPayload, req.user?.id))
      await eventBus.emit('notification', createPaqueteUpdatedWebhook(notificationPayload, req.user?.id))
    } else {
      // First time published → published
      await eventBus.emit('integration', createPackagePublishedV1(integrationPayload, req.user?.id))
      await eventBus.emit('notification', createPaquetePublishedEmail(notificationPayload, req.user?.id))
      await eventBus.emit('notification', createPaquetePublishedWebhook(notificationPayload, req.user?.id))
    }
  } catch (err) {
    req.payload.logger.error(`Failed to emit paquete event: ${err}`)
    throw err
  }
  return doc
}

export const emitPaqueteDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  try {
    const { getContainer } = await import('@/container')
    const container = await getContainer()
    const eventBus = container.resolve<IEventBus>('rabbitMQEventBus')

    await eventBus.emit(
      'integration',
      createPackageDeletedV1(
        {
          id: String(doc.id),
          slug: doc.slug ?? '',
          deletedAt: new Date().toISOString(),
        },
        req.user?.id,
      ),
    )
  } catch (err) {
    req.payload.logger.error(`Failed to emit paquete delete event: ${err}`)
    throw err
  }
  return doc
}
