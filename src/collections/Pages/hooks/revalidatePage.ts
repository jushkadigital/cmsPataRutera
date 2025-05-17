import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Page } from '../../../payload-types'

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

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const pathsToRevalidate = []
    const tagsToRevalidate = ['pages-sitemap']

    // Revalidar la página actual si está publicada
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
      payload.logger.info(`Solicitando revalidación de página en ruta: ${path}`)
      pathsToRevalidate.push(path)
    }

    // Revalidar la ruta anterior si la página fue despublicada
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`
      payload.logger.info(`Solicitando revalidación de antigua ruta: ${oldPath}`)
      pathsToRevalidate.push(oldPath)
    }

    // Solo enviar la solicitud si hay rutas para revalidar
    if (pathsToRevalidate.length > 0) {
      await sendRevalidationRequest(payload, pathsToRevalidate, tagsToRevalidate)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`
    payload.logger.info(`Solicitando revalidación después de eliminar: ${path}`)

    await sendRevalidationRequest(payload, [path], ['pages-sitemap'])
  }

  return doc
}
