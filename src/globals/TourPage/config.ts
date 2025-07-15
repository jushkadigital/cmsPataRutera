import type { CollectionConfig, GlobalConfig } from 'payload'
// Only import necessary features and types for this file
import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import DescrPrice from '@/blocks/DescrPrice/config'
import GuiaTour from '@/blocks/GuiaTour/config'
import { slugField } from '@/fields/slug'
import { GridTours } from '@/blocks/GridTours/config'
import { createdBy, createdByGlobal, populatePublishedAt, populatePublishedAtGlobal } from '@/hooks/populatePublishedAt'
import { PostRelationTourBlock } from '@/blocks/PostRelationTour/config'
import { YouTubeLinksBlock } from '@/blocks/YouTubeLinksBlock/config'
import { SociosBlock } from '@/blocks/Socios/config'
import { ReconocimientosBlock } from '@/blocks/Reconocimientos/config'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { heroTour } from '@/heros/TourHero'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload';
import config from '@payload-config';
import { TextContentBlock } from '@/blocks/TextContentBlock/config'
import { GridBlogs } from '@/blocks/GridBlogs/config'
import { RevistaBlock } from '@/blocks/RevistaBlock/config'
import { FormBitrixBlock } from '@/blocks/FormBitrix/config'
import { RowBlock } from '@/blocks/RowBlock/config'
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'
import { revalidateTour } from './hooks/revalidateTour'
import { heroPage } from '@/heros/MainHero'

// Import the custom feature






export const ToursPageGlobal: GlobalConfig = {
    slug: 'touP',
    label: 'Tour Page',
    access: {
        read: authenticatedOrPublished,
        update: authenticated,
    },
    admin: {
    },

    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [heroPage],
                    label: 'Hero',
                },
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            blocks: [DescrPrice, GuiaTour, GridTours, GridBlogs, RowBlock, PostRelationTourBlock, YouTubeLinksBlock, TextContentBlock, SociosBlock, ReconocimientosBlock, FormBitrixBlock, RevistaBlock],
                            defaultValue: [
                            ],
                        },
                    ],
                    label: 'Content'
                },
                {
                    label: 'SEO',
                    name: 'meta',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        })
                        ,
                        MetaTitleField({
                            hasGenerateFn: true
                        }),
                        MetaImageField({
                            relationTo: 'media'
                        }),
                        MetaDescriptionField({
                        }),
                        PreviewField({
                            hasGenerateFn: true,
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description'
                        }),
                    ]
                }
            ]
        },
        {
            name: 'createdBy',
            type: 'relationship',
            relationTo: 'users', // Assumes a 'users' collection slug
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
            access: {
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                }
            },
        },
    ],
    hooks: {
        afterChange: [revalidateTour],
        beforeChange: [populatePublishedAtGlobal, createdByGlobal],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 350 // We set this interval for optimal live preview
            },
            schedulePublish: true,
        },
    },
}