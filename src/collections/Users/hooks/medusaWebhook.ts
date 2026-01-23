
import type { CollectionBeforeChangeHook, CollectionAfterChangeHook } from 'payload'
import type { User } from '@/payload-types'
import { response } from 'express'

const WEBHOOK_URL = process.env.MEDUSA_WEBHOOK_URL || 'http://localhost:8081/webhooks/payload'
const WEBHOOK_SECRET = process.env.MEDUSA_WEBHOOK_SECRET || 'my-secure-webhook-secret'

// Store plain password temporarily before it gets hashed


export const syncToMedusa: CollectionAfterChangeHook<User> = async ({
  doc,
  operation,
  req,
}) => {
  // Only trigger on create
  if (operation !== 'create') {
    return doc
  }

  // Skip webhook if URL is not configured or is default localhost
  if (!process.env.MEDUSA_WEBHOOK_URL) {
    req.payload.logger.info(`Skipping webhook for user ${doc.email}: MEDUSA_WEBHOOK_URL not configured`)
    return doc
  }

  try {
    // Get the plain password we captured before hashing
    const keycloakId = doc.accounts!.find(ele => ele.provider == 'keycloak')?.providerAccountId
    req.payload.logger.info(` keycloakId for new user: ${keycloakId}`)
    req.payload.logger.info(` keycloakId for new user: ${doc.accounts}`)
    req.payload.logger.info(`doc.id ${doc.email}`)

    const webhookPayload = {
      "keycloak_sub": keycloakId,
      "email": doc.email,
      "first_name": 'Nombre',
      "last_name": 'Apellido',
      "metadata": {
        "cms_role": mapRoleToType(doc.roles),
        "cms_user_id": doc.id
      }
    }

    req.payload.logger.info(`Sending webhook for new user: ${doc.email} to ${WEBHOOK_URL}`)

    // Add timeout with AbortController

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': WEBHOOK_SECRET,
      },
      body: JSON.stringify(webhookPayload),
    })



    if (!response.ok) {
      const errorText = await response.text()
      req.payload.logger.error(`Webhook failed for user ${doc.email}: ${response.status} - ${errorText}`)
    } else {
      const dataText = await response.json();
      req.payload.logger.info(`Webhook success for user: ${doc.email}`)
      req.payload.logger.info(`Webhook providerid: ${dataText}`)

      // Persist the OAuth account link using payload.update
      // afterChange hook modifications to doc are not automatically persisted
      // Use setImmediate to run after the current transaction commits

    }
  } catch (error: any) {
    const errorMessage = error?.message || error?.cause?.message || String(error)
    const errorCode = error?.cause?.code || error?.code || 'UNKNOWN'
    req.payload.logger.error(`Webhook error for user ${doc.email}: [${errorCode}] ${errorMessage}`)
  }

  return doc
}

function mapRoleToType(roles: User['roles']): string {
  if (roles?.includes('admin')) return 'ADMIN'
  if (roles?.includes('editor')) return 'EDITOR'
  return 'PASSENGER'
}
