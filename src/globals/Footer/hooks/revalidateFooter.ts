
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

export const revalidateFooter: GlobalAfterChangeHook = async ({
    doc,
    req: { payload, context },
}) => {

    if (!context.disableRevalidate) {
        payload.logger.info(`Revalidating footer`)
        await sendRevalidationRequest(payload, [], ['global_footer'])
    }
    return doc
}