import { type CollectionSlug, getPayload, PayloadRequest } from 'payload'
import config from '@/payload.config'

const collections: CollectionSlug[] = [
    'destinations',
    'tourCategory',
    'blogCategories',
    'pages',
    'posts',
    'tours',
    'ofertas',
    'paquetes',
]

export const removeSeed = async ({ req }: { req: PayloadRequest }) => {
    const payload = await getPayload({ config });
    payload.logger.info('Removing seed data...');

    // Delete all documents from collections
    for (const collection of collections) {
        try {
            await payload.delete({
                collection,
                where: {
                    id: { exists: true },
                },
            })
            payload.logger.info(`— Deleted all documents from ${collection}`)
        } catch (error: any) {
            payload.logger.error(`— Error deleting from ${collection}: ${error.message}`)
        }
    }

    payload.logger.info('Removing versions...');

    // Delete versions for collections that have versioning enabled
    for (const collection of collections) {
        if (payload.collections[collection]?.config?.versions) {
            try {
                await payload.db.deleteVersions({ collection, req, where: {} })
                payload.logger.info(`— Deleted versions from ${collection}`)
            } catch (error: any) {
                payload.logger.error(`— Error deleting versions from ${collection}: ${error.message}`)
            }
        }
    }

    // Delete all users (use with caution - this deletes ALL users)
    payload.logger.info('Removing users...');
    try {
        await payload.delete({
            collection: 'users',
            where: {
                id: { exists: true },
            },
        })
        payload.logger.info('— Deleted all users')
    } catch (error: any) {
        payload.logger.error(`— Error deleting users: ${error.message}`)
    }

    payload.logger.info('Seed data removed successfully');
}