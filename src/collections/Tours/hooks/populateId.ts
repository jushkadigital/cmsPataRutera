import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, FieldHook, PayloadRequest } from 'payload'
import type { Media, Tour } from '@/payload-types'
import crypto from 'crypto'
import { getPayloadSession } from "payload-authjs"

export const PopulateId: CollectionAfterChangeHook<Tour> = async ({ doc, req, operation, context, originalDoc }) => {
  // 1. REGLAS DE SEGURIDAD Y FILTRADO
  // ---------------------------------------------------------

  // A. Evitar bucles infinitos: Si Medusa nos está actualizando, paramos.
  if (req.headers && req.headers['x-sync-source'] === 'medusa') {
    console.log('Sync ignorado: Viene de Medusa');
    return;
  }

  if (context.disable) {
    return
  }

  // B. Solo sincronizar si el estado final es 'published'
  // Si guardas como borrador, no se envía nada a Medusa.
  if (doc._status !== 'published') {
    console.log('Sync ignorado: El documento es un borrador');
    return;
  }

  async function getAuthSession(req: PayloadRequest) {
    const res = await fetch(
      `http://localhost:3000/api/auth/session`,
      {
        headers: {
          cookie: req.headers.get("cookie") ?? "",
        },
      }
    )

    return res.json()
  }
  const rr = await getAuthSession(req)
  console.log(rr.accessToken)

  // Ahora ya tienes acceso al token
  // 2. PREPARAR DATOS
  // ---------------------------------------------------------
  const medusaUrl = process.env.MEDUSA_BACKEND_URL; // Ej: http://localhost:9000
  const medusaToken = process.env.MEDUSA_API_TOKEN;

  let token
  try {
    const response = await fetch('http://172.17.0.1:9000/auth/user/keycloak/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${rr.accessToken}` },
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

    const dataMedusa = await response.json()
    console.log(dataMedusa)
    token = dataMedusa.token
    const completeImage = await req.payload.findByID({
      collection: 'media', // El slug de tu colección de uploads
      id: (doc.meta?.image as number),   // El ID (número o string) que tienes en doc
      depth: 2,            // Depth 1 asegura traer los datos, no solo el ID
    });

    const thumbnail = (completeImage)?.sizes?.og?.url
    if (doc.medusaId) {
      req.payload.logger.info(`DENTRO CON ${doc.medusaId}`);
      req.payload.logger.info(doc.title);
      req.payload.logger.info(completeImage)
      const response = await fetch(`http://172.17.0.1:9000/admin/tours/${doc.medusaId}/hehe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({

          "destination": doc.title,
          "description": doc.meta?.description || 'description',
          "duration_days": doc.layout?.find(ele => ele.blockType == "dataTour")?.duration.valueDia || 1,
          "max_capacity": doc.layout?.find(ele => ele.blockType == "dataTour")?.groupSize.value || 15,
          "available_dates": [
          ],
          ...(thumbnail && { thumbnail }),
        }),
      });

      req.payload.logger.info("E");
      if (!response.ok) {
        // --- BLOQUE DE ERROR ---
        try {
          const errorData = await response.json(); // Consumo 1
          console.log("Error JSON:", errorData);
        } catch (e) {
          console.log(e)
          // Nota: Aquí fallaría si intentas response.text() porque response.json() ya intentó leerlo.
          // Para hacer esto bien necesitarías response.clone(), pero es mejor la Opción 1.
          console.log("No se pudo parsear error JSON");
        }

        return null; // <--- OBLIGATORIO: Salir de la función aquí
      }

      // --- BLOQUE DE ÉXITO ---
      // Solo llegamos aquí si response.ok es true y el body NO ha sido leído
      const res = await response.json(); // Consumo 1 (exitoso)
      req.payload.logger.info(res)


    }
    else {
      try {
        //const asset = await uploadAssetFromUrl((tour.meta?.image as Media).sizes?.square?.url as string)

        const response = await fetch('http://172.17.0.1:9000/admin/tours', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({

            "destination": doc.title,
            "description": doc.meta?.description || 'description',
            "duration_days": doc.layout?.find(ele => ele.blockType == "dataTour")?.duration.valueDia || 1,
            "max_capacity": doc.layout?.find(ele => ele.blockType == "dataTour")?.groupSize.value || 15,
            "available_dates": [
            ],
            ...(thumbnail && { thumbnail }),
            "prices": {
              "adult": doc.priceGeneral,
              "child": doc.priceGeneral * 0.8,
              "infant": 0,
              "currency_code": "pen"
            }

          }),
        });

        req.payload.logger.info("E");
        if (!response.ok) {
          // --- BLOQUE DE ERROR ---
          try {
            const errorData = await response.json(); // Consumo 1
            console.log("Error JSON:", errorData);
          } catch (e) {
            console.log(e)
            // Nota: Aquí fallaría si intentas response.text() porque response.json() ya intentó leerlo.
            // Para hacer esto bien necesitarías response.clone(), pero es mejor la Opción 1.
            console.log("No se pudo parsear error JSON");
          }

          return null; // <--- OBLIGATORIO: Salir de la función aquí
        }

        // --- BLOQUE DE ÉXITO ---
        // Solo llegamos aquí si response.ok es true y el body NO ha sido leído
        const res = await response.json(); // Consumo 1 (exitoso)
        req.payload.logger.info(res)
        if (res.tour.id) {
          // Actualizamos Payload con el nuevo ID de Medusa.
          // Usamos 'req.payload.update' pasando el header para que NO se vuelva a disparar este hook.
          await req.payload.update({
            collection: 'tours',
            id: doc.id,
            data: { medusaId: res.tour.id },
            req: {
              ...req,
              headers: {
                ...req.headers,
                'x-sync-source': 'medusa' // <--- Engañamos al hook para que crea que fuimos nosotros mismos
              }
            }
          });
          console.log(`Vinculación exitosa. Medusa ID: ${res.tour.id}`);
        } else {

          console.log(`Vinculación erorr. Medusa ID: `);
          return null
        }

      } catch (err) {
        req.payload.logger.error(err)

      }

    }
    /*
      const payloadToSend = {
        title: doc.title,
        handle: doc.slug, // El slug suele ser el handle
        // Importante: Enviamos el ID de Payload en metadata para que Medusa sepa quién es su padre
        metadata: {
          payload_id: doc.id
        }
      };
    
      try {
        // ---------------------------------------------------------
        // 3. LÓGICA: ¿CREAR O ACTUALIZAR?
        // ---------------------------------------------------------
    
        // CASO A: ACTUALIZAR (Ya tenemos un medusaId guardado)
        if (doc.medusaId) {
          console.log(`Actualizando producto en Medusa: ${doc.medusaId}`);
    
          // Medusa usa POST para updates en /admin/products/:id
          await fetch(`${medusaUrl}/admin/products/${doc.medusaId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${medusaToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payloadToSend)
          });
    
        }
        // CASO B: CREAR (Es la primera vez que se publica)
        else {
          console.log('Creando nuevo producto en Medusa...');
    
          // Datos mínimos requeridos por Medusa para crear
          const createPayload = {
            ...payloadToSend,
            options: [{ title: "Default" }], // Requerido por Medusa al crear
            variants: [{ title: "Standard", prices: [{ amount: 0, currency_code: "usd" }] }]
          };
    
          const res = await fetch(`${medusaUrl}/admin/products`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${medusaToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(createPayload)
          });
    
          const data = await res.json();
    
          // ---------------------------------------------------------
          // 4. GUARDAR EL ID DE VUELTA (CRUCIAL)
          // ---------------------------------------------------------
          if (data.product && data.product.id) {
            // Actualizamos Payload con el nuevo ID de Medusa.
            // Usamos 'req.payload.update' pasando el header para que NO se vuelva a disparar este hook.
            await req.payload.update({
              collection: 'tours',
              id: doc.id,
              data: { medusaId: data.product.id },
              req: {
                ...req,
                headers: {
                  ...req.headers,
                  'x-sync-source': 'medusa' // <--- Engañamos al hook para que crea que fuimos nosotros mismos
                }
              }
            });
            console.log(`Vinculación exitosa. Medusa ID: ${data.product.id}`);
          }
        }
    
      */
  } catch (error) {
    console.error('Error sincronizando con Medusa:', error);
    // Aquí podrías agregar lógica para notificar al admin si falla
  }
}

export const PopulateIdd: CollectionBeforeChangeHook<Tour> = async ({ data, operation, context, originalDoc }) => {
  // Devuelve los datos tal como vinieron para evitar errores.
  if (operation === 'create' && !context?.autosave && !data.domainTourId) {

    console.log("from create")
    const response = await fetch(
      'http://172.17.0.1:8081/api/catalog/tours',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: crypto.randomUUID(),
          name: "aoeaoe",
          description: "aoeaoeaoe",
          basePrice: 100,
          currency: "USD",
          durationHours: 3,
          services: []
        }),
      }
    )
    console.log(data.id)
    console.log(response.status)
    if (!response.ok) { // Si el status no está entre 200-299
      //console.error(`Error Status: ${response.status}`);

      try {
        const errorData = await response.json(); // Si el servidor devuelve JSON
        console.log("Detalles del error (JSON):", errorData);
      } catch (e) {
        const errorText = await response.text(); // Si el servidor devuelve texto plano o HTML
        console.log("Detalles del error (Texto):", errorText);
      }

      return data
    }
    const dataInfo = await response.json()
    data.domainTourId = dataInfo.id
    data.bussiness!.externalStatus = 'DRAFT';
    return data
  }

  if (operation === 'update') {
    console.log("from update")
    // Caso A: El backend ya está en DRAFT.
    // Simplemente actualizamos el mismo ID.
    if (originalDoc?.bussiness!.externalStatus === 'DRAFT') {
      await fetch(`http://172.17.0.1:8081/api/catalog/tours/${originalDoc.domainTourId}`, {
        method: 'PUT',
        body: JSON.stringify({
          code: data.bussiness?.nombreDelProyecto,
          name: "oeuu",
          description: "aoeaoeaoe",
          basePrice: data.priceGeneral,
          currency: "USD",
          durationHours: 3,
        }),
      });
      const services = data.bussiness!.servicesSet!.length > 0 ? Object.groupBy(data.bussiness!.servicesSet!, ele => ele.blockType) : []
      console.log(services)
      for (const nombre in services) {
        switch (nombre) {
          case "svticket": {
            console.log("LLEGHE")
            const promesasTicket = services[nombre].length > 0 ? services[nombre].map(async (ele) => {
              console.log(ele)
              console.log(originalDoc.domainTourId)
              const response = await fetch(`http://172.17.0.1:8081/api/catalog/tours/${originalDoc.domainTourId}/services`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "serviceType": "TICKET",
                  "serviceName": ele['title']['titleText'],
                  "basePrice": Number(ele['price']),
                  "currency": "USD",
                  "quantity": Number(ele['quantity']),
                  "isMandatory": true,
                  "durationHours": Number(ele['time'])
                }),
              })

              console.log(response.status)
              if (!response.ok) { // Si el status no está entre 200-299
                console.error(`Error Status: ${response.status}`);

                // Intenta leer el mensaje de error del servidor
                try {
                  const errorData = await response.text(); // Si el servidor devuelve JSON
                  console.log("Detalles del error (JSON):", errorData);
                } catch (e) {
                  console.log("Detalles del error (Texto):", e);
                }
                return;
              }
              if (!response.ok) throw new Error('Error en endpoint')

            }) : []

            const resultados = await Promise.all(promesasTicket);
            console.log(resultados);
            console.log("GAAA")

          }

            // Lógica especial para el administrador
            break;
          case "svfood":
            {
              const promesasTicket = services[nombre].length > 0 ? services[nombre].map(async (ele) => {
                console.log(ele)
                console.log(originalDoc.domainTourId)
                const response = await fetch(`http://172.17.0.1:8081/api/catalog/tours/${originalDoc.domainTourId}/services`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    "serviceType": "FOOD",
                    "serviceName": ele['title']['titleText'],
                    "basePrice": Number(ele['price']),
                    "currency": "USD",
                    "quantity": Number(ele['quantity']),
                    "isMandatory": true,
                    "durationHours": Number(ele['time'])
                  }),
                })

                console.log(response.status)
                if (!response.ok) { // Si el status no está entre 200-299
                  console.error(`Error Status: ${response.status}`);

                  // Intenta leer el mensaje de error del servidor
                  try {
                    const errorData = await response.json(); // Si el servidor devuelve JSON
                    console.log("Detalles del error (JSON):", errorData);
                  } catch (e) {
                    const errorText = await response.text(); // Si el servidor devuelve texto plano o HTML
                    console.log("Detalles del error (Texto):", errorText);
                  }
                  return response;
                }
                if (!response.ok) throw new Error('Error en endpoint')

              }) : []

              const resultados = await Promise.all(promesasTicket);
              console.log(resultados);
              console.log("GAAA")
            }
            // Lógica para invitados
            break;
          default:
          // Lógica general
        }
      }

      const combinations = data.bussiness!.comb
      const combinationsRes = combinations?.length > 0 ? combinations?.map(async (ele) => {
        const response = await fetch(`http://172.17.0.1:8081/api/catalog/tours/${originalDoc.domainTourId}/combinations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: ele.title.titleText,
            description: "aoeoeuoeu",
            services:
              ele.itemsSel!.map(ele2 => ele2.label.split(") ")[1].trim())
          }),
        })


        console.log(response.status)
        if (!response.ok) { // Si el status no está entre 200-299
          console.error(`Error Status: ${response.status}`);

          // Intenta leer el mensaje de error del servidor
          try {
            const errorData = await response.json(); // Si el servidor devuelve JSON
            console.log("Detalles del error (JSON):", errorData);
          } catch (e) {
            const errorText = await response.text(); // Si el servidor devuelve texto plano o HTML
            console.log("Detalles del error (Texto):", errorText);
          }
          return response;
        }
        if (!response.ok) throw new Error('Error en endpoint')


      }) : []
      const resultadosComb = await Promise.all(combinationsRes);
      console.log(resultadosComb);
      console.log("GAAA")

      return data;
    }

    // Caso B: El backend está PUBLISHED, pero estamos editando en Payload.
    // NECESITAMOS UNA NUEVA VERSIÓN EN EL BACKEND.
    if (originalDoc?.bussiness.externalStatus === 'PUBLISHED') {

      // Llamamos al endpoint "Crear nueva versión"
      const response = await fetch(`http://172.17.0.1:8081/api/catalog/tours/${originalDoc.domainTourId}/new-version`, {
        method: 'POST',
      });
      const nextVersion = await response.json();

      // ¡CRÍTICO! Cambiamos el externalId en Payload AL VUELO.
      // Ahora este borrador de Payload apuntará al NUEVO ID del backend (ID_B).
      data.domainTourId = nextVersion.id;
      data.bussiness!.externalStatus = 'DRAFT';

      // Opcional: Ahora que tenemos ID_B, le mandamos los cambios actuales
      await fetch(`http://mi-backend/api/catalog/tours/${nextVersion.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          code: "BANANA_OSHHHT",
          name: "oeuu",
          description: "aoeaoeaoe",
          basePrice: data.priceGeneral,
          currency: "USD",
          durationHours: 3,
        }),
      });
    }
  }
  return data;

}



