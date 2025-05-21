import { Endpoint, PayloadRequest } from 'payload'

// Import your seed function (adjust the path if needed)
import { removeSeed } from '../../../seedRemove'

export const removeSeedEndpoint: Endpoint = {
    path: '/removeseed',
    method: 'get',
    handler: async (req: PayloadRequest) => {
        try {
            await removeSeed({ req })
            return Response.json({
                status: 'ok',
                message: 'Seed removed successfully',
                timestamp: new Date().toISOString(),
            })
        } catch (error: any) {
            return Response.json({
                status: 'error',
                message: error.message,
                timestamp: new Date().toISOString(),
            }, { status: 500 })
        }
    },
}