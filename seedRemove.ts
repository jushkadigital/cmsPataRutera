import { type CollectionSlug, getPayload, PayloadRequest } from 'payload'
import config from '@/payload.config'

const collections: CollectionSlug[] = [
    'destinations',
    'media',
    'pages',
    'posts',
    'tours',
    'ofertas',
    'tourCategory',
    'blogCategories',
    'paquetes',
]

export const removeSeed = async ({ req }: { req: PayloadRequest }) => {
    const payload = await getPayload({ config });
    await payload.logger.info('Removing seed data...');


    await Promise.all(
        collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
    )


    await Promise.all(
        collections
            .filter((collection) => Boolean(payload.collections[collection].config.versions))
            .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
    )
    await payload.delete({
        collection: 'users',
        depth: 0,
        where: {
        },
    })

    payload.logger.info('Seed data removed successfully');
}