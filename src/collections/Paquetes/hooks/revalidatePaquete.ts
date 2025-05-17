import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Paquete, Tour } from '@/payload-types'

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
                'Authorization': `Bearer ${REVALIDATE_SECRET}`
            },
            body: JSON.stringify({ paths, tags })
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

export const revalidatePaquete: CollectionAfterChangeHook<Paquete> = async ({
    doc,
    previousDoc,
    req: { payload, context },
}) => {
    if (!context.disableRevalidate) {
        const pathsToRevalidate = []
        const tagsToRevalidate = ['paquetes-sitemap', 'paquetes']

        // Revalidar el paquete específico y la página principal de paquetes
        if (doc._status === 'published') {
            // Revalidar la página individual del paquete
            const paquetePath = `/paquetes/${doc.slug}`
            payload.logger.info(`Solicitando revalidación de paquete en ruta: ${paquetePath}`)
            pathsToRevalidate.push(paquetePath)

            // Revalidar la página principal de paquetes
            pathsToRevalidate.push('/paquetes')


            // Si el paquete tiene destinos, revalidar esas páginas también
            if (doc.destinos && Array.isArray(doc.destinos) && doc.destinos.length > 0) {
                payload.logger.info(`Paquete tiene destinos que también necesitan revalidación`)
                pathsToRevalidate.push('/destinos')
            }
        }

        // Revalidar la ruta anterior si el tour fue despublicado
        if (previousDoc?._status === 'published' && doc._status !== 'published') {
            const oldPath = `/paquetes/${previousDoc.slug}`
            payload.logger.info(`Solicitando revalidación de antigua ruta de paquete: ${oldPath}`)
            pathsToRevalidate.push(oldPath)

            // También revalidar la página principal de paquetes
            pathsToRevalidate.push('/paquetes')
        }

        // Solo enviar la solicitud si hay rutas para revalidar
        if (pathsToRevalidate.length > 0) {
            await sendRevalidationRequest(payload, pathsToRevalidate, tagsToRevalidate)
        }
    }
    return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Paquete> = async ({
    doc,
    req: { payload, context }
}) => {
    if (!context.disableRevalidate && doc?.slug) {
        const paquetePath = `/paquetes/${doc.slug}`
        payload.logger.info(`Solicitando revalidación después de eliminar paquete: ${paquetePath}`)

        // Revalidar la página del paquete y la lista principal de paquetes
        const pathsToRevalidate = [paquetePath, '/paquetes']


        if (doc.destinos && Array.isArray(doc.destinos) && doc.destinos.length > 0) {
            pathsToRevalidate.push('/destinos')
        }

        await sendRevalidationRequest(payload, pathsToRevalidate, ['paquetes-sitemap', 'paquetes'])
    }

    return doc
} 