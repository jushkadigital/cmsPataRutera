import { Endpoint, PayloadRequest } from 'payload'

// Import your seed function (adjust the path if needed)
import { seed } from '../../../seed2'


export const seedEndpoint: Endpoint = {
  path: '/seed',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    try {
      await seed()
      return Response.json({
        status: 'ok',
        message: 'Seed completed successfully',
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