import type { CollectionBeforeChangeHook, CollectionAfterChangeHook } from 'payload'
import type { User } from '@/payload-types'
import { response } from 'express'

const WEBHOOK_URL = process.env.USER_WEBHOOK_URL || 'http://localhost:8081/webhooks/payload'
const WEBHOOK_SECRET = process.env.USER_WEBHOOK_SECRET || 'my-secure-webhook-secret'

// Store plain password temporarily before it gets hashed
const pendingPasswords = new Map<string, string>()

type UserDataWithPassword = Partial<User> & { password?: string; email: string }

export const capturePassword: CollectionBeforeChangeHook<User> = async ({
  data,
  operation,
}) => {
  const userData = data as UserDataWithPassword
  if (operation === 'create' && userData.password && userData.email) {
    // Use email as key since we don't have ID yet
    pendingPasswords.set(userData.email, userData.password)
  }
  return data
}

export const syncToWebhook: CollectionAfterChangeHook<User> = async ({
  doc,
  operation,
  req,
}) => {
  // Only trigger on create
  if (operation !== 'create') {
    return doc
  }

  if (req.context?.preventRecursion) return doc;
  // Skip webhook if URL is not configured or is default localhost
  if (!process.env.USER_WEBHOOK_URL) {
    req.payload.logger.info(`Skipping webhook for user ${doc.email}: USER_WEBHOOK_URL not configured`)
    pendingPasswords.delete(doc.email)
    return doc
  }

  try {
    // Get the plain password we captured before hashing
    const plainPassword = pendingPasswords.get(doc.email) || ''
    // Clean up
    pendingPasswords.delete(doc.email)

    const webhookPayload = {
      email: doc.email,
      password: plainPassword,
      type: mapRoleToType(doc.roles),
      clientId: process.env.AUTH_KEYCLOAK_ID
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
      req.payload.logger.info(`Webhook providerid: ${dataText.providerid}`)

      // Persist the OAuth account link using payload.update
      // afterChange hook modifications to doc are not automatically persisted
      // Use setImmediate to run after the current transaction commits
      if (dataText.providerid) {
        const userId = doc.id
        const userEmail = doc.email
        const existingAccounts = doc.accounts || []
        const providerAccountId = dataText.providerid
        const payload = req.payload
        try {
          const updateDoc = await payload.update({
            collection: 'users',
            id: userId,
            depth: 0,
            req: req,
            data: {
              accounts: [
                ...existingAccounts,
                {
                  provider: 'keycloak',
                  providerAccountId: providerAccountId,
                  type: 'oidc',
                },
              ],
            },
            context: {
              preventRecursion: true
            }
          })

          payload.logger.info(`OAuth account linked for user: ${userEmail}`)
          return updateDoc
        } catch (updateError: any) {
          payload.logger.error(`Failed to link OAuth account for ${userEmail}: ${updateError.message}`)

        }
      }
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
