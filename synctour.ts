import { type CollectionSlug, getPayload, PayloadRequest } from 'payload'
import config from '@/payload.config'
import FormData from 'form-data';
import crypto from 'crypto'
import path from 'path'
import { Media } from '@/payload-types';
interface AssetResponse {
  id: string;
  name: string;
  source: string;
  preview: string;
}
export const syncTour = async ({ req }: { req: PayloadRequest }) => {

  const payload = await getPayload({ config });
  payload.logger.info('Removing seed data...');

  // Delete all users (use with caution - this deletes ALL users)

  const toursQuery = await payload.find({
    collection: 'tours', // Asegúrate que este sea el slug correcto
    draft: false,         // <--- ESTA es la clave: Trae la última versión existente
    limit: 20,
  });

  const tours = toursQuery.docs;




  // OPCIÓN A: Secuencial (Uno por uno)
  // Úsalo si la API externa es estricta con el Rate Limit
  // ---------------------------------------------------------
  let token
  try {
    const response = await fetch('http://172.17.0.1:9000/auth/user/emailpass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": "admin@medusa-test.com",
        "password": "supersecret"
      })
    })
    if (!response.ok) {
      // --- BLOQUE DE ERROR ---
      try {
        const errorData = await response.json(); // Consumo 1
        console.log("Error JSON:", errorData);
      } catch (e) {
        // Nota: Aquí fallaría si intentas response.text() porque response.json() ya intentó leerlo.
        // Para hacer esto bien necesitarías response.clone(), pero es mejor la Opción 1.
        console.log("No se pudo parsear error JSON");
      }

      return null; // <--- OBLIGATORIO: Salir de la función aquí
    }

    // --- BLOQUE DE ÉXITO ---
    // Solo llegamos aquí si response.ok es true y el body NO ha sido leído
    const res = await response.json(); // Consumo 1 (exitoso)
    payload.logger.info(res)
    token = res.token

  } catch (error) {
    payload.logger.error(error)
    throw new Error()
  }

  const promises = tours.map(async (tour) => {
    payload.logger.info("TRAP")
    console.log("WAA")
    const thumbnail = (tour.meta?.image as Media)?.sizes?.og?.url
    console.log(thumbnail)
    try {
      //const asset = await uploadAssetFromUrl((tour.meta?.image as Media).sizes?.square?.url as string)

      const response = await fetch('http://172.17.0.1:9000/admin/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({

          "destination": tour.title,
          "description": tour.meta?.description || 'description',
          "duration_days": tour.layout?.find(ele => ele.blockType == "dataTour")?.duration.valueDia || 1,
          "max_capacity": tour.layout?.find(ele => ele.blockType == "dataTour")?.groupSize.value || 15,
          "available_dates": [
          ],
          ...(thumbnail && { thumbnail }),
          "prices": {
            "adult": tour.priceGeneral,
            "child": tour.priceGeneral * 0.8,
            "infant": 0,
            "currency_code": "pen"
          }

        }),
      });

      if (!response.ok) {
        // --- BLOQUE DE ERROR ---
        try {
          const errorData = await response.json(); // Consumo 1
          console.log("Error JSON:", errorData);
        } catch (e) {
          // Nota: Aquí fallaría si intentas response.text() porque response.json() ya intentó leerlo.
          // Para hacer esto bien necesitarías response.clone(), pero es mejor la Opción 1.
          console.log("No se pudo parsear error JSON");
        }

        return null; // <--- OBLIGATORIO: Salir de la función aquí
      }

      // --- BLOQUE DE ÉXITO ---
      // Solo llegamos aquí si response.ok es true y el body NO ha sido leído
      const res = await response.json(); // Consumo 1 (exitoso)

      payload.logger.info(res)
      const meme = await payload.update({
        collection: 'tours',
        id: tour.id, // Es CRUCIAL pasar el ID específico de cada iteración
        data: {
          medusaId: res.tour.product.id,
        },
        context: { disable: true },
        req: req
      });

      //payload.logger.info(meme)

    } catch (err) {
      payload.logger.error(err)

    }
    return { id: tour.id, status: 'ok' };

  });
  const results = await Promise.all(promises);



  // Retornar respuesta
  // Nota: Si usas Payload 3.0 (Next.js), devuelve Response.json(results)
  // Si usas Payload 2.0 (Express), usa res.status(200).json(results)

  return new Response(JSON.stringify({ message: 'Proceso completado', results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  payload.logger.info('Tours sync successfully');
}
