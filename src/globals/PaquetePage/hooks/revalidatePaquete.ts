import type { GlobalAfterChangeHook } from 'payload'


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

export const revalidatePaquete: GlobalAfterChangeHook = async ({
    doc,
    previousDoc,
    req: { payload, context },
}) => {
    if (!context.disableRevalidate) {
        const pathsToRevalidate = []
        const tagsToRevalidate = ['paquetes-sitemap', 'paquetesPage']

        // Revalidar el tour específico y la página principal de tours
        if (doc._status === 'published') {
            // Revalidar la página individual del tour
            payload.logger.info(`Solicitando revalidación de tour en ruta: paquetesPage`)

            // Revalidar la página principal de tours
            pathsToRevalidate.push('/paquetes')

            // Si el tour tiene categorías, revalidar esas páginas también
        }

        // Revalidar la ruta anterior si el tour fue despublicado
        if (previousDoc?._status === 'published' && doc._status !== 'published') {
            // También revalidar la página principal de tours
            payload.logger.info(`Solicitando revalidación de tour en ruta: paquetesPage`)
            pathsToRevalidate.push('/paquetes')
        }

        // Solo enviar la solicitud si hay rutas para revalidar
        if (pathsToRevalidate.length > 0) {
            await sendRevalidationRequest(payload, pathsToRevalidate, tagsToRevalidate)
        }
    }
    return doc
}
