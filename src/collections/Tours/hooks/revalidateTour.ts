import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Tour } from '@/payload-types'

// URL del endpoint de revalidación de la aplicación Next.js
// Esto debe configurarse como variable de entorno
const NEXTJS_REVALIDATE_URL = process.env.NEXTJS_REVALIDATE_URL || 'http://localhost:4000/api/revalidate'
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET_TOKEN || 'your-secret-token'

/**
 * Función utilitaria para enviar solicitudes de revalidación a Next.js
 */
async function sendRevalidationRequest(payload: any, paths: string[], tags: string[] = []) {
  try {
    const response = await fetch(NEXTJS_REVALIDATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paths, tags, secret: REVALIDATE_SECRET })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Error HTTP ${response.status}: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    payload.logger.info(`Revalidación confirmada por Next.js: ${JSON.stringify(data)}`)
    return data
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    payload.logger.error(`Error al solicitar revalidación a Next.js: ${errorMessage}`)
    // No lanzamos el error para evitar interrumpir el flujo de Payload
    return null
  }
}

export const revalidateTour: CollectionAfterChangeHook<Tour> = async ({
  doc,
  previousDoc,
  operation,
  req: { payload, context },
}) => {


  // Función auxiliar para ver si cambió algo IMPORTANTE

  payload.logger.info("ENTREE 2")
  if (!context.disableRevalidate) {
    const pathsToRevalidate = []
    const tagsToRevalidate = ['tours-sitemap', 'tours']

    // Revalidar el tour específico y la página principal de tours
    if (doc._status === 'published') {


      if (previousDoc._status !== 'published') {

        if (doc.domainTourId) {
          payload.logger.info('BOTON PUBLICADO')
          const resdomain = await fetch(`http://172.17.0.1:8081/api/catalog/tours/${doc.domainTourId}/publish`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          if (!resdomain.ok) { // Si el status no está entre 200-299
            console.error(`Error Status: ${resdomain.status}`);

            // Intenta leer el mensaje de error del servidor
            try {
              const errorData = await resdomain.text(); // Si el servidor devuelve JSON
              console.log("Detalles del error (JSON):", errorData);
            } catch (e) {
              console.log("Detalles del error (Texto):", e);
            }
            return;
          }
          const res = await resdomain.json()
          payload.logger.info(res)

        }

      }

      // Revalidar la página individual del tour
      const tourPath = `/tours/${doc.slug}`
      payload.logger.info(`Solicitando revalidación de tour en ruta: ${tourPath}`)
      pathsToRevalidate.push(tourPath)

      // Revalidar la página principal de tours
      pathsToRevalidate.push('/tours')

      // Si el tour tiene categorías, revalidar esas páginas también
      if (doc.categorias && Array.isArray(doc.categorias) && doc.categorias.length > 0) {
        payload.logger.info(`Tour tiene categorías que también necesitan revalidación`)
        pathsToRevalidate.push('/categorias')
      }

      // Si el tour tiene destinos, revalidar esas páginas también
      if (doc.destinos && Array.isArray(doc.destinos) && doc.destinos.length > 0) {
        payload.logger.info(`Tour tiene destinos que también necesitan revalidación`)
        pathsToRevalidate.push('/destinos')
      }
    }
    const hasRelevantChanges = Object.keys(doc).some((key) => {
      // 1. Si la key está en la lista de ignorados, pasamos al siguiente

      // 2. Ignoramos campos de sistema
      if (['updatedAt', 'createdAt', 'id'].includes(key)) return false;

      // 3. Comparamos el valor nuevo con el anterior
      // Nota: Para objetos/arrays anidados, usa JSON.stringify o lodash
      return JSON.stringify(doc['bussiness']) !== JSON.stringify(previousDoc['bussiness']);
    });

    if (!hasRelevantChanges) {
      return doc; // No hacemos nada
    }

    // Revalidar la ruta anterior si el tour fue despublicado
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/tours/${previousDoc.slug}`
      payload.logger.info(`Solicitando revalidación de antigua ruta de tour: ${oldPath}`)
      pathsToRevalidate.push(oldPath)

      // También revalidar la página principal de tours
      pathsToRevalidate.push('/tours')
    }

    // Solo enviar la solicitud si hay rutas para revalidar
    if (pathsToRevalidate.length > 0) {
      await sendRevalidationRequest(payload, pathsToRevalidate, tagsToRevalidate)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Tour> = async ({
  doc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    const tourPath = `/tours/${doc.slug}`
    payload.logger.info(`Solicitando revalidación después de eliminar tour: ${tourPath}`)

    // Revalidar la página del tour y la lista principal de tours
    const pathsToRevalidate = [tourPath, '/tours']

    // Revalidar categorías y destinos si es necesario
    if (doc.categorias && Array.isArray(doc.categorias) && doc.categorias.length > 0) {
      pathsToRevalidate.push('/categorias')
    }

    if (doc.destinos && Array.isArray(doc.destinos) && doc.destinos.length > 0) {
      pathsToRevalidate.push('/destinos')
    }

    await sendRevalidationRequest(payload, pathsToRevalidate, ['tours-sitemap', 'tours'])
  }

  return doc
} 
