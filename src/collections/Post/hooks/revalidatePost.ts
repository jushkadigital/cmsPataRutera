import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Post, Tour } from '@/payload-types'

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

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
    doc,
    previousDoc,
    req: { payload, context },
}) => {
    if (!context.disableRevalidate) {
        const pathsToRevalidate = []
        const tagsToRevalidate = ['tours-sitemap', 'tours']

        // Revalidar el tour específico y la página principal de tours
        if (doc._status === 'published') {
            // Revalidar la página individual del tour
            const postPath = `/posts/${doc.slug}`
            payload.logger.info(`Solicitando revalidación de post en ruta: ${postPath}`)
            pathsToRevalidate.push(postPath)

            // Revalidar la página principal de tours
            pathsToRevalidate.push('/posts')

            // Si el post tiene categorías, revalidar esas páginas también
            if (doc.categories && Array.isArray(doc.categories) && doc.categories.length > 0) {
                payload.logger.info(`Post tiene categorías que también necesitan revalidación`)
                pathsToRevalidate.push('/categorias')
            }

        }

        // Revalidar la ruta anterior si el post fue despublicado
        if (previousDoc?._status === 'published' && doc._status !== 'published') {
            const oldPath = `/posts/${previousDoc.slug}`
            payload.logger.info(`Solicitando revalidación de antigua ruta de post: ${oldPath}`)
            pathsToRevalidate.push(oldPath)

            // También revalidar la página principal de posts
            pathsToRevalidate.push('/posts')
        }

        // Solo enviar la solicitud si hay rutas para revalidar
        if (pathsToRevalidate.length > 0) {
            await sendRevalidationRequest(payload, pathsToRevalidate, tagsToRevalidate)
        }
    }
    return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
    doc,
    req: { payload, context }
}) => {
    if (!context.disableRevalidate && doc?.slug) {
        const postPath = `/posts/${doc.slug}`
        payload.logger.info(`Solicitando revalidación después de eliminar post: ${postPath}`)

        // Revalidar la página del post y la lista principal de posts
        const pathsToRevalidate = [postPath, '/posts']

        // Revalidar categorías si es necesario
        if (doc.categories && Array.isArray(doc.categories) && doc.categories.length > 0) {
            pathsToRevalidate.push('/categorias')
        }


        await sendRevalidationRequest(payload, pathsToRevalidate, ['posts-sitemap', 'posts'])
    }

    return doc
} 