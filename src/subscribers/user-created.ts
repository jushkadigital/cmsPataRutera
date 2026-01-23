import { SubscriberHandler } from '@/services/rabbitmq-consumer'
import { Payload } from 'payload'

// Interface del mensaje específico
interface UserMessage {
  email: string
  externalId: string
}

export const createUserHandler = (payload: Payload) => async (data: any) => {
  console.log(`👤 [Subscriber] Creando usuario: ${data.email}`)


  await payload.create({
    collection: 'users',
    data: {
      email: data.email,
      password: 'dummy-password-managed-by-keycloak', // Payload exige pass, ponemos uno dummy
      roles: ['admin'],
      accounts: [
        {
          provider: 'keycloak',
          providerAccountId: data.externalId,
          type: 'oidc',
        },
      ],
      // Mapea otros campos según tu esquema
    },
    context: {
      source: 'rabbitmq'
    }
  })
}
