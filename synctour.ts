import { PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'
import { type IEventBus } from '@/events/bus/IEventBus'
import { createTourPublishedV1 } from '@/events/integration/tour/v1'
import { createTourPublishedEmail } from '@/events/notification/email/TourPublishedEmail'
import { createTourPublishedWebhook } from '@/events/notification/webhook/TourPublishedWebhook'
import { MeiliImage } from '@/utilities/convertToMeiliImage'

export const syncTour = async ({ req }: { req: PayloadRequest }) => {

  const payload = req.payload
  payload.logger.info('Syncing published tours...');

  const toursQuery = await payload.find({
    collection: 'tours',
    draft: false,
    limit: 2000,
    depth: 2
  });

  const tours = toursQuery.docs;

  const { getContainer } = await import('@/container')
  const container = await getContainer()
  const eventBus = container.resolve<IEventBus>('rabbitMQEventBus')

  for (const tour of tours) {
    const destino = typeof tour.destinos === 'object' && tour.destinos !== null
      ? tour.destinos
      : null

    // With depth: 2, categorias comes populated as objects {id, name, ...}
    // Extract IDs before using them in a where clause
    const categoriaIds = (tour.categorias ?? [])
      .map((cat: unknown) => typeof cat === 'object' && cat !== null ? (cat as { id: number }).id : cat)
      .filter((id: unknown): id is number => typeof id === 'number')

    const categories = await payload.find({
      collection: 'tourCategory',
      depth: 2,
      overrideAccess: true,
      limit: 1000,
      where: {
        id: {
          in: categoriaIds,
        },
      },
    })

    const image = typeof tour.featuredImage === 'object' ? tour.featuredImage as Media : null

    const integrationPayload = {
      id: tour.id,
      slug: tour.slug ?? '',
      data: {
        destination: tour.title ?? '',
        description: tour.miniDescription as Record<string, unknown>,
        duration_days: tour.durationGeneral || 1,
        max_capacity: tour.maxPassengersGeneral || 20,
        thumbnail: image?.sizes?.og?.url ?? '',
        completeThumbnail: image ? MeiliImage(image) : null,
        price: tour.priceGeneral ?? 0,
        categories: categories.docs.map((categoria) => ({ name: categoria.name })),
        destinos: { name: destino?.name ?? '' },
        difficulty: tour.difficulty ?? '',
      },
    }

    const notificationPayload = {
      tourId: String(tour.id),
      tourSlug: tour.slug ?? '',
      channels: ['email', 'webhook'] as ('email' | 'webhook' | 'push')[],
    }

    await eventBus.emit('integration', createTourPublishedV1(integrationPayload))
    await eventBus.emit('notification', createTourPublishedEmail(notificationPayload))
    await eventBus.emit('notification', createTourPublishedWebhook(notificationPayload))
  }

  return new Response(JSON.stringify({ message: 'Proceso completado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

}
