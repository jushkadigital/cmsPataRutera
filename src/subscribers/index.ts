import type { AwilixContainer } from 'awilix'
import type { IEventBus } from '@/events/bus/IEventBus'
import type { IdempotencyStore } from '@/events/idempotency/IdempotencyStore'
import { withIdempotency } from '@/events/idempotency/idempotencyMiddleware'
import type { EventEnvelope } from '@/events/envelope'
import type { IdentityUserCreatedV1Event } from '@/events/inbound/identity/user/v1'
import { IdentityUserCreatedV1Schema } from '@/events/inbound/identity/user/v1'
import type { IdentityUserDeletedV1Event } from '@/events/inbound/identity/user/v1'
import { IdentityUserDeletedV1Schema } from '@/events/inbound/identity/user/v1'
import type { CapacityMaxPassengersUpdatedV1Event } from '@/events/inbound/capacity/v1'
import { CapacityMaxPassengersUpdatedV1Schema } from '@/events/inbound/capacity/v1'
import { Payload } from 'payload'
import { createEventLogger } from '@/events/tracing/logger'
import { getTracer } from '@/events/tracing/telemetry'
import { SpanStatusCode } from '@opentelemetry/api'
import { DOMAIN_ATTR } from '@/events/tracing/spanAttributes'

const logger = createEventLogger('subscribers')

const ROLE_MAP: Record<string, 'admin' | 'editor' | 'user'> = {
  'super-admin': 'admin',
  admin: 'admin',
  editor: 'editor',
  premium: 'user',
  standard: 'user',
  basic: 'user',
}

function mapRole(role: string): 'admin' | 'editor' | 'user' {
  return ROLE_MAP[role] ?? 'user'
}

const DUPLICATE_EMAIL_PATTERN = /duplicate.*email|unique.*constraint.*email|violates.*unique.*email/i

function isDuplicateEmailError(error: unknown): boolean {
  if (error instanceof Error) {
    return DUPLICATE_EMAIL_PATTERN.test(error.message)
  }
  return false
}

async function createUserIfNotExists(
  payload: Payload,
  data: { email: string; password: string; roles: ('user' | 'admin' | 'editor')[]; accounts: { provider: string; providerAccountId: string; type: string }[] },
  eventId: string,
): Promise<void> {
  const tracer = getTracer()

  const span = tracer.startSpan('subscriber.users.create', {
    attributes: {
      [DOMAIN_ATTR.SUBSCRIBER_EVENT]: eventId,
      [DOMAIN_ATTR.SUBSCRIBER_ACTION]: 'create_user',
      [DOMAIN_ATTR.SUBSCRIBER_EMAIL]: data.email,
      [DOMAIN_ATTR.SUBSCRIBER_ROLES]: data.roles.join(','),
    },
  })

  try {
    const doc = await payload.create({
      collection: 'users',
      data,
      overrideAccess: true,
      context: { source: 'rabbitmq' },
    })
    span.setAttribute(DOMAIN_ATTR.SUBSCRIBER_USER_ID, doc.id)
    logger.info({ eventId, email: data.email, docId: doc.id }, 'User created')
  } catch (error) {
    if (isDuplicateEmailError(error)) {
      span.setAttribute('tourism.subscriber.idempotent_skip', true)
      span.setAttribute(DOMAIN_ATTR.SUBSCRIBER_EMAIL, data.email)
      logger.info({ eventId, email: data.email }, 'User already exists — idempotent skip')
      span.end()
      return
    }
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error instanceof Error ? error.message : 'Unknown error',
    })
    span.end()
    throw error
  }

  span.end()
}

const USER_NOT_FOUND_PATTERN = /not found|no document|document not found/i

function isUserNotFoundError(error: unknown): boolean {
  if (error instanceof Error) {
    return USER_NOT_FOUND_PATTERN.test(error.message)
  }
  return false
}

async function deleteUserIfExists(
  payload: Payload,
  email: string,
  eventId: string,
): Promise<void> {
  const tracer = getTracer()

  const span = tracer.startSpan('subscriber.users.delete', {
    attributes: {
      [DOMAIN_ATTR.SUBSCRIBER_EVENT]: eventId,
      [DOMAIN_ATTR.SUBSCRIBER_ACTION]: 'delete_user',
      [DOMAIN_ATTR.SUBSCRIBER_EMAIL]: email,
    },
  })

  try {
    const result = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
      context: { source: 'rabbitmq' },
    })

    if (result.docs.length === 0) {
      span.setAttribute('tourism.subscriber.idempotent_skip', true)
      span.setAttribute(DOMAIN_ATTR.SUBSCRIBER_EMAIL, email)
      logger.info({ eventId, email }, 'User not found — idempotent skip')
      span.end()
      return
    }

    const doc = result.docs[0]!
    await payload.delete({
      collection: 'users',
      id: doc.id,
      overrideAccess: true,
      context: { source: 'rabbitmq' },
    })
    span.setAttribute(DOMAIN_ATTR.SUBSCRIBER_USER_ID, doc.id)
    logger.info({ eventId, email, docId: doc.id }, 'User deleted')
  } catch (error) {
    if (isUserNotFoundError(error)) {
      span.setAttribute('tourism.subscriber.idempotent_skip', true)
      span.setAttribute(DOMAIN_ATTR.SUBSCRIBER_EMAIL, email)
      logger.info({ eventId, email }, 'User not found — idempotent skip')
      span.end()
      return
    }
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error instanceof Error ? error.message : 'Unknown error',
    })
    span.end()
    throw error
  }

  span.end()
}

export const registerSubscribers = (container: AwilixContainer) => {
  const bus = container.resolve<IEventBus>('rabbitMQEventBus')
  const idempotencyStore = container.resolve<IdempotencyStore>('idempotencyStore')
  const payload = container.resolve<Payload>('payload')

  const identityUserCreatedHandler = withIdempotency(idempotencyStore, 'payload-inbound')(
    async (envelope: IdentityUserCreatedV1Event) => {
      const tracer = getTracer()
      const eventId = envelope.metadata.eventId

      logger.info(
        {
          eventId,
          eventType: envelope.metadata.eventType,
          eventVersion: envelope.metadata.eventVersion,
          aggregateId: envelope.metadata.aggregateId,
          correlationId: envelope.metadata.correlationId,
          producer: envelope.metadata.producer,
          occurredAt: envelope.metadata.occurredAt,
          payload: envelope.payload,
        },
        'identity.user.created event received',
      )

      // Span: subscriber.validate
      const validateSpan = tracer.startSpan('subscriber.validate', {
        attributes: {
          [DOMAIN_ATTR.SUBSCRIBER_EVENT]: eventId,
          [DOMAIN_ATTR.SUBSCRIBER_ACTION]: 'schema_validation',
          [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType ?? '',
        },
      })

      const parsed = IdentityUserCreatedV1Schema.safeParse(envelope.payload)
      if (!parsed.success) {
        validateSpan.setAttribute('tourism.subscriber.validation_result', 'invalid')
        validateSpan.setStatus({ code: SpanStatusCode.ERROR, message: 'Schema validation failed' })
        validateSpan.end()
        logger.error({ errors: parsed.error.flatten(), eventId }, 'Invalid identity.user.created payload — skipping')
        return
      }

      validateSpan.setAttribute('tourism.subscriber.validation_result', 'valid')
      validateSpan.end()

      logger.info({ eventId }, 'identity.user.created schema validation passed')

      const { aggregateId, email, userType, clientRoles } = parsed.data

      // Span: subscriber.user_type_check
      const roleSpan = tracer.startSpan('subscriber.user_type_check', {
        attributes: {
          [DOMAIN_ATTR.SUBSCRIBER_EVENT]: eventId,
          [DOMAIN_ATTR.SUBSCRIBER_ACTION]: 'user_type_filter',
          [DOMAIN_ATTR.SUBSCRIBER_ROLES]: clientRoles.join(','),
          [DOMAIN_ATTR.AGGREGATE_ID]: aggregateId,
        },
      })

      if (userType !== 'ADMIN') {
        roleSpan.setAttribute('tourism.subscriber.user_type_check_result', 'skipped')
        roleSpan.end()
        logger.info({ eventId, userType, clientRoles }, 'identity.user.created skipped — not ADMIN user type')
        return
      }

      roleSpan.setAttribute('tourism.subscriber.user_type_check_result', 'passed')
      roleSpan.end()

      const mappedRoles = clientRoles.map(mapRole)
      logger.info({ eventId, rawRoles: clientRoles, mappedRoles }, 'identity.user.created creating admin user')

      await createUserIfNotExists(payload, {
        email,
        password: 'dummy-password-managed-by-keycloak',
        roles: mappedRoles as ('user' | 'admin' | 'editor')[],
        accounts: [{ provider: 'keycloak', providerAccountId: aggregateId, type: 'oidc' }],
      }, eventId)

      logger.info({ eventId, email }, 'identity.user.created admin user created successfully')
    }
  )

  bus.subscribe('inbound', 'identity.user.created.#', identityUserCreatedHandler, 'payload')

  const identityUserDeletedHandler = withIdempotency(idempotencyStore, 'payload-inbound')(
    async (envelope: IdentityUserDeletedV1Event) => {
      const tracer = getTracer()
      const eventId = envelope.metadata.eventId

      logger.info(
        {
          eventId,
          eventType: envelope.metadata.eventType,
          eventVersion: envelope.metadata.eventVersion,
          aggregateId: envelope.metadata.aggregateId,
          correlationId: envelope.metadata.correlationId,
          producer: envelope.metadata.producer,
          occurredAt: envelope.metadata.occurredAt,
          payload: envelope.payload,
        },
        'identity.user.deleted event received',
      )

      // Span: subscriber.validate
      const validateSpan = tracer.startSpan('subscriber.validate', {
        attributes: {
          [DOMAIN_ATTR.SUBSCRIBER_EVENT]: eventId,
          [DOMAIN_ATTR.SUBSCRIBER_ACTION]: 'schema_validation',
          [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType ?? '',
        },
      })

      const parsed = IdentityUserDeletedV1Schema.safeParse(envelope.payload)
      if (!parsed.success) {
        validateSpan.setAttribute('tourism.subscriber.validation_result', 'invalid')
        validateSpan.setStatus({ code: SpanStatusCode.ERROR, message: 'Schema validation failed' })
        validateSpan.end()
        logger.error({ errors: parsed.error.flatten(), eventId }, 'Invalid identity.user.deleted payload — skipping')
        return
      }

      validateSpan.setAttribute('tourism.subscriber.validation_result', 'valid')
      validateSpan.end()

      logger.info({ eventId }, 'identity.user.deleted schema validation passed')

      const { email, userType } = parsed.data

      // Span: subscriber.user_type_check
      const typeSpan = tracer.startSpan('subscriber.user_type_check', {
        attributes: {
          [DOMAIN_ATTR.SUBSCRIBER_EVENT]: eventId,
          [DOMAIN_ATTR.SUBSCRIBER_ACTION]: 'user_type_filter',
          [DOMAIN_ATTR.AGGREGATE_ID]: parsed.data.aggregateId,
        },
      })

      if (userType !== 'ADMIN') {
        typeSpan.setAttribute('tourism.subscriber.user_type_check_result', 'skipped')
        typeSpan.end()
        logger.info({ eventId, userType }, 'identity.user.deleted skipped — not ADMIN user type')
        return
      }

      typeSpan.setAttribute('tourism.subscriber.user_type_check_result', 'passed')
      typeSpan.end()

      logger.info({ eventId, email }, 'identity.user.deleted deleting admin user')

      await deleteUserIfExists(payload, email, eventId)

      logger.info({ eventId, email }, 'identity.user.deleted admin user deleted successfully')
    }
  )

  bus.subscribe('inbound', 'identity.user.deleted.#', identityUserDeletedHandler, 'payload')

  const AGGREGATE_TYPE_TO_COLLECTION: Record<string, 'tours' | 'paquetes'> = {
    tour: 'tours',
    paquete: 'paquetes',
  }

  const capacityMaxPassengersHandler = withIdempotency(idempotencyStore, 'payload-capacity')(
    async (envelope: CapacityMaxPassengersUpdatedV1Event) => {
      const tracer = getTracer()
      const eventId = envelope.metadata.eventId

      logger.info(
        {
          eventId,
          eventType: envelope.metadata.eventType,
          eventVersion: envelope.metadata.eventVersion,
          aggregateId: envelope.metadata.aggregateId,
          correlationId: envelope.metadata.correlationId,
          producer: envelope.metadata.producer,
          payload: envelope.payload,
        },
        'capacity.max_passengers.updated event received',
      )

      const validateSpan = tracer.startSpan('subscriber.validate', {
        attributes: {
          [DOMAIN_ATTR.SUBSCRIBER_EVENT]: eventId,
          [DOMAIN_ATTR.SUBSCRIBER_ACTION]: 'schema_validation',
          [DOMAIN_ATTR.EVENT_TYPE]: envelope.metadata.eventType ?? '',
        },
      })

      const parsed = CapacityMaxPassengersUpdatedV1Schema.safeParse(envelope.payload)
      if (!parsed.success) {
        validateSpan.setAttribute('tourism.subscriber.validation_result', 'invalid')
        validateSpan.setStatus({ code: SpanStatusCode.ERROR, message: 'Schema validation failed' })
        validateSpan.end()
        logger.error({ errors: parsed.error.flatten(), eventId }, 'Invalid capacity.max_passengers.updated payload — skipping')
        return
      }

      validateSpan.setAttribute('tourism.subscriber.validation_result', 'valid')
      validateSpan.end()

      const { aggregateType, aggregateId, maxPassengers } = parsed.data
      const collectionSlug = AGGREGATE_TYPE_TO_COLLECTION[aggregateType]

      if (!collectionSlug) {
        logger.error({ eventId, aggregateType }, 'Unknown aggregateType in capacity event — skipping')
        return
      }

      const updateSpan = tracer.startSpan('subscriber.capacity.update', {
        attributes: {
          [DOMAIN_ATTR.SUBSCRIBER_EVENT]: eventId,
          [DOMAIN_ATTR.SUBSCRIBER_ACTION]: 'update_max_passengers',
          [DOMAIN_ATTR.AGGREGATE_ID]: String(aggregateId),
          [DOMAIN_ATTR.AGGREGATE_TYPE]: aggregateType,
        },
      })

      try {
        await payload.update({
          collection: collectionSlug,
          id: aggregateId,
          data: {
            maxPassengersGeneral: maxPassengers,
          },
          overrideAccess: true,
          context: { source: 'rabbitmq' },
        })

        updateSpan.setAttribute('tourism.subscriber.max_passengers', maxPassengers)
        logger.info({ eventId, aggregateType, aggregateId, maxPassengers }, 'Max passengers updated via capacity event')
      } catch (error) {
        updateSpan.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : 'Unknown error',
        })
        updateSpan.end()
        throw error
      }

      updateSpan.end()
    }
  )

  bus.subscribe('capacity', 'capacity.max_passengers.updated.#', capacityMaxPassengersHandler, 'payload')

  logger.info('Subscribers registered')
  bus.start()
}
