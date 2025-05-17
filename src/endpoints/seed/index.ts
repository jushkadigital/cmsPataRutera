import type { Payload, PayloadRequest, CollectionSlug } from 'payload'

const collections: CollectionSlug[] = ['users', 'media']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // Clear existing collections
  payload.logger.info(`— Clearing collections...`)
  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  // Clear versions if the collection has versioning enabled
  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection]?.config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Creating admin user...`)
  
  // Create admin user
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'password',
      roles: ['admin'],
    },
  })

  payload.logger.info('✅ Seed completed successfully!')
} 