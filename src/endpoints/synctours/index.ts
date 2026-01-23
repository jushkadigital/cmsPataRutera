import { Endpoint, PayloadRequest } from 'payload';
import { syncTour } from '../../../synctour'

export const synctours: Endpoint = {
  path: '/synctours',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    try {

      await syncTour({ req })
      return Response.json({
        status: 'ok',
        message: 'Tours Synced successfully',
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
