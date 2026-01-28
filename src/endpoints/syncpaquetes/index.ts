import { Endpoint, PayloadRequest } from 'payload';
import { syncTour } from '../../../syncpaquete'

export const syncpaquetes: Endpoint = {
  path: '/syncpaquetes',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    try {

      await syncTour({ req })
      return Response.json({
        status: 'ok',
        message: 'Paquete Synced successfully',
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
};
