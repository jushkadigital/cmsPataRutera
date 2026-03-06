import { type CollectionSlug, getPayload, PayloadRequest } from 'payload'
import config from '@/payload.config'
import FormData from 'form-data';
import crypto from 'crypto'
import path from 'path'
import { Destination, Media, TourCategory } from '@/payload-types';
import { RabbitMQEventBus } from '@/services/rabbitmq-consumer';
interface AssetResponse {
  id: string;
  name: string;
  source: string;
  preview: string;
}


const MEDUSA_URL = process.env.MEDUSA_URL || ''
export const syncTour = async ({ req }: { req: PayloadRequest }) => {

  const payload = await getPayload({ config });
  payload.logger.info('Removing seed data...');

  // Delete all users (use with caution - this deletes ALL users)

  const toursQuery = await payload.find({
    collection: 'tours', // Asegúrate que este sea el slug correcto
    draft: false,         // <--- ESTA es la clave: Trae la última versión existente
    limit: 2000,
    depth: 2
  });

  const tours = toursQuery.docs;




  // OPCIÓN A: Secuencial (Uno por uno)
  // Úsalo si la API externa es estricta con el Rate Limit
  // ---------------------------------------------------------
  let token
  const { getContainer } = await import('@/container')
  const container = await getContainer()
  const eventBus = container.resolve<RabbitMQEventBus>('rabbitMQEventBus')
  const routingKey = 'tour.created'

  for (const tour of tours) {
    payload.logger.info("ao")
    await eventBus.emit(routingKey, {
      id: tour.id,
      slug: tour.slug,
      data: {
        destination: tour.title,
        description: tour.miniDescription,
        duration_days: tour.durationGeneral ?? 1,
        max_capacity: tour.maxPassengersGeneral ?? 20,
        thumbnail: (tour.featuredImage as Media)?.sizes?.og?.url ?? '',
        price: tour.priceGeneral,
        categories: (tour.categorias as TourCategory[]).map(categoria => ({ name: categoria.name })),
        destinos: (tour.destinos as Destination)?.name ?? '',
        difficulty: tour.difficulty
      }
    })



  };
  //const results = await Promise.all(promises);



  // Retornar respuesta
  // Nota: Si usas Payload 3.0 (Next.js), devuelve Response.json(results)
  // Si usas Payload 2.0 (Express), usa res.status(200).json(results)

  return new Response(JSON.stringify({ message: 'Proceso completado' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

}
