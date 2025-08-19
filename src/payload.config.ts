// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres' // database-adapter-import
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
// Import collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tours } from './collections/Tours'
import { Ofertas } from './collections/Ofertas'
import { Pages } from './collections/Pages'
import { TourCategory } from './collections/TourCategory'
import { Destinations } from './collections/Destinations'
// Import new blog collections from their directories
import { BlogCategory } from './collections/BlogCategory'
import { Post } from './collections/Post'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types"
// Import Globals

// Import Blocks

// Import plugins
// import { toursPlugin } from './plugins/tours' // Remove this
// import { passengersPlugin } from './plugins/passengers' // Remove this

// Import endpoints
import { healthCheckEndpoint } from './endpoints/health'
import { configEndpoint } from './endpoints/config'
import { Paquetes } from './collections/Paquetes'
import { getServerSideURL } from '@/utilities/getURL'
import type { Page, Post as PostType, Paquete as PaqueteType, Tour as TourType } from './payload-types'

// We'll implement these plugins properly in phase 2
// import { usersPlugin } from './plugins/core/users'
// import { mediaPlugin } from './plugins/core/media'

//Migrations
import { migrations } from './migrations'

import { seedEndpoint } from './endpoints/seed'
import { removeSeedEndpoint } from './endpoints/removeSeed'
import { SociosCarousel } from './globals/sociosCarousel/config'
import { ReconocimientosCarousel } from './globals/reconocimientosCarousel/config'
import { Footer } from './globals/Footer/config'
import { RedesNegocio } from './globals/redesNegocio/config'

import { s3Storage } from '@payloadcms/storage-s3'
import { projectGetSourceForAsset } from 'next/dist/build/swc/generated-native'
import { ToursPageGlobal } from './globals/TourPage/config'
import { PaquetePageGlobal } from './globals/PaquetePage/config'
import { BlogPageGlobal } from './globals/BlogPage/config'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Helper function to get server URL for CORS
const generateTitle: GenerateTitle<TourType | PaqueteType | PostType | Page> = ({ doc }) => {
    return doc?.title ? `${doc.title} | ${process.env.NAME_BUSINESS}` : 'Mi sitio'
}

const generateURL: GenerateURL<TourType | PaqueteType | PostType | Page> = ({ doc, collectionSlug }) => {
    const url = process.env.NEXTJS_FRONTEND_URL || 'http://localhost:3000'
    return doc?.slug ? collectionSlug == 'pages' ? `${url}/${doc?.slug}` : `${url}/${collectionSlug}/${doc?.slug}` : url
}



export default buildConfig({
    admin: {
        importMap: {
            baseDir: path.resolve(dirname),
        },
        user: Users.slug,
        livePreview: {
            breakpoints: [
                {
                    label: 'Mobile',
                    name: 'mobile',
                    width: 375,
                    height: 667,
                },
                {
                    label: 'Tablet',
                    name: 'tablet',
                    width: 768,
                    height: 1024,
                },
                {
                    label: 'Desktop',
                    name: 'desktop',
                    width: 1440,
                    height: 900,
                },
            ],
        }
        // We'll add more components here later as needed
    },
    collections: [Users, Media, Pages, Tours, Ofertas, TourCategory, Destinations, BlogCategory, Post, Paquetes],
    globals: [ReconocimientosCarousel, SociosCarousel, Footer, RedesNegocio, ToursPageGlobal, PaquetePageGlobal, BlogPageGlobal],
    editor: lexicalEditor({
        // Configure default lexical editor options
    }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    // database-adapter-config-start
    db: postgresAdapter({
        push: false,
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
        migrationDir: './src/migrations',
        prodMigrations: migrations
    }),
    // database-adapter-config-end
    sharp,
    plugins: [
        seoPlugin({
            generateTitle: generateTitle,
            generateURL: generateURL,
        }),
        s3Storage({
            collections: {
                media: true
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
                requestHandler: {
                    httpAgent: {
                        maxSockets: 300,
                        keepAlive: true,
                    },
                    httpsAgent: {
                        maxSockets: 300,
                        keepAlive: true,
                    },
                    connectionTimeout: 5 * 1000,
                    requestTimeout: 5 * 1000,
                },
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
                },
                region: process.env.S3_REGION
            }

        }),
        // toursPlugin(), // Remove this
        // passengersPlugin(), // Remove this
        // Will enable these once implemented properly
        // usersPlugin(),
        // mediaPlugin(),
        // storage-adapter-placeholder
    ],
    i18n: {
        supportedLanguages: { es, en },
        fallbackLanguage: 'en'
    },
    // Add CORS configurationauthenticatedOrPublished
    serverURL: process.env.PAYLOAD_DOMAIN_URL || 'http://localhost:3000',
    cors: [process.env.PAYLOAD_DOMAIN_URL || 'http://localhost:3000', process.env.NEXTJS_FRONTEND_URL || 'http://localhost:4000'],
    // Implementing endpoints
    endpoints: [
        healthCheckEndpoint,
        configEndpoint,
        seedEndpoint,
        removeSeedEndpoint
    ],
    // Configure job queue for background tasks (if needed)
    jobs: {
        access: {
            run: ({ req }: { req: PayloadRequest }): boolean => {
                // Allow authenticated users to run jobs
                if (req.user) return true
                return false
            },
        },
        tasks: [],
    },
})
