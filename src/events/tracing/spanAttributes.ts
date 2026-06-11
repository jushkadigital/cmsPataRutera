export const MESSAGING_ATTR = {
  SYSTEM: 'messaging.system',
  DESTINATION: 'messaging.destination',
  DESTINATION_KIND: 'messaging.destination_kind',
  ROUTING_KEY: 'messaging.rabbitmq.routing_key',
  MESSAGE_ID: 'messaging.message_id',
  CONVERSATION_ID: 'messaging.conversation_id',
  CONSUMER_ID: 'messaging.consumer_id',
  OPERATION: 'messaging.operation',
} as const

export const DOMAIN_ATTR = {
  EVENT_TYPE: 'tourism.event.type',
  EVENT_VERSION: 'tourism.event.version',
  EVENT_CATEGORY: 'tourism.event.category',
  AGGREGATE_TYPE: 'tourism.aggregate.type',
  AGGREGATE_ID: 'tourism.aggregate.id',
  PRODUCER: 'tourism.producer',
  ACTOR_ID: 'tourism.actor.id',
  IDEMPOTENCY_GROUP: 'tourism.idempotency.consumer_group',
  IDEMPOTENCY_EVENT_ID: 'tourism.idempotency.event_id',
  IDEMPOTENCY_RESULT: 'tourism.idempotency.claim_result',
  SUBSCRIBER_EVENT: 'tourism.subscriber.event',
  SUBSCRIBER_ACTION: 'tourism.subscriber.action',
  SUBSCRIBER_EMAIL: 'tourism.subscriber.email',
  SUBSCRIBER_ROLES: 'tourism.subscriber.roles',
  SUBSCRIBER_USER_ID: 'tourism.subscriber.user_id',
} as const
