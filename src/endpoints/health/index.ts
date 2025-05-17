import { Endpoint, PayloadRequest } from 'payload'

export const healthCheckEndpoint: Endpoint = {
  path: '/health',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    })
  },
} 