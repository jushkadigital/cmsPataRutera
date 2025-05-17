import { Endpoint, PayloadRequest } from "payload";

export const configEndpoint:Endpoint = {
  path: '/config',
  method: 'get',
  handler: async(req: PayloadRequest) => {
    return Response.json({
      features: {
        enableTourismFeatures: true,
        enableEcommerceFeatures: true,
      },
    })
  },
} 