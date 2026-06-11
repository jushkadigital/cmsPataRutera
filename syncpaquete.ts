import { PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'
import { type IEventBus } from '@/events/bus/IEventBus'
import { createPackagePublishedV1 } from '@/events/integration/package/v1'
import { createPaquetePublishedEmail } from '@/events/notification/email/PaquetePublishedEmail'
import { createPaquetePublishedWebhook } from '@/events/notification/webhook/PaquetePublishedWebhook'
import { MeiliImage } from '@/utilities/convertToMeiliImage'

export const syncPaquete = async ({ req }: { req: PayloadRequest }) => {

  const payload = req.payload
  payload.logger.info('Syncing published paquetes...');

  const paquetesQuery = await payload.find({
    collection: 'paquetes',
    draft: false,
    limit: 200,
    depth: 2
  });

  const paquetes = paquetesQuery.docs;

  const { getContainer } = await import('@/container')
  const container = await getContainer()
  const eventBus = container.resolve<IEventBus>('rabbitMQEventBus')

  for (const paquete of paquetes) {
    // With depth: 2, destinos comes populated as objects — extract IDs before querying
    const destinoIds = (paquete.destinos ?? [])
      .map((d: unknown) => typeof d === 'object' && d !== null ? (d as { id: number }).id : d)
      .filter((id: unknown): id is number => typeof id === 'number')

    const destinos = await payload.find({
      collection: 'destinations',
      depth: 2,
      overrideAccess: true,
      limit: 1000,
      where: {
        id: {
          in: destinoIds,
        },
      },
    })

    const image = typeof paquete.featuredImage === 'object' ? paquete.featuredImage as Media : null

    const integrationPayload = {
      id: paquete.id,
      slug: paquete.slug ?? '',
      data: {
        destination: paquete.title ?? '',
        description: paquete.miniDescription as Record<string, unknown>,
        duration_days: paquete.durationGeneral || 3,
        max_capacity: paquete.maxPassengersGeneral || 20,
        thumbnail: image?.sizes?.og?.url ?? '',
        completeThumbnail: image ? MeiliImage(image) : null,
        price: paquete.priceGeneral ?? 0,
        destinos: destinos.docs.map((d) => ({ name: d.name })),
        difficulty: paquete.difficulty ?? '',
      },
    }

    const notificationPayload = {
      paqueteId: String(paquete.id),
      paqueteSlug: paquete.slug ?? '',
      channels: ['email', 'webhook'] as ('email' | 'webhook')[],
    }

    await eventBus.emit('integration', createPackagePublishedV1(integrationPayload))
    await eventBus.emit('notification', createPaquetePublishedEmail(notificationPayload))
    await eventBus.emit('notification', createPaquetePublishedWebhook(notificationPayload))
  }

  return new Response(JSON.stringify({ message: 'Proceso completado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

}
