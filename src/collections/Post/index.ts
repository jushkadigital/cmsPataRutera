// app/src/collections/Post/index.ts
import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical'; // Assuming Lexical is the default editor
import { ReconocimientosBlock } from '@/blocks/Reconocimientos/config';
import { SociosBlock } from '@/blocks/Socios/config';
import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { generatePreviewPath } from '@/utilities/generatePreviewPath';
import { slugField } from '@/fields/slug';
import { createdBy, populatePublishedAt } from '@/hooks/populatePublishedAt';
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost';
import { GridBlogs } from '@/blocks/GridBlogs/config';
import { GridImages } from '@/blocks/GridImages/config';
import { TextContentBlock } from '@/blocks/TextContentBlock/config';
import { YouTubeLinksBlock } from '@/blocks/YouTubeLinksBlock/config';
import { heroPost } from '@/heros/PostHero';
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields';
import { populateAuthors } from './hooks/populatedAuthors';

export const Post: CollectionConfig = {
    slug: 'posts',
    access: {
        // Define access control as needed, e.g.:
        read: anyone,
        create: authenticated,
        update: authenticated,
        delete: authenticated,
    },
    defaultPopulate: {
        title: true,
        slug: true,
        categories: true,
        meta: {
            image: true,
            description: true
        }
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data, req }) => {
                const path = generatePreviewPath({
                    slug: typeof data?.slug === 'string' ? data.slug : '',
                    collection: 'posts',
                    req,
                })

                return path
            },
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'posts',
                req,
            }),
        useAsTitle: 'title',
    },
    fields: [
        // Fields outside tabs
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },

        // Tabs field containing the main content structure
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        heroPost
                    ],
                    label: 'Hero'

                },
                // Thumbnail Tab
                {
                    label: 'Thumbnail',
                    fields: [
                        {
                            name: 'featuredImage',
                            label: 'Featured Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        },
                        {
                            name: 'description',
                            label: 'Short Description / Excerpt',
                            type: 'textarea',
                            required: false, // Or true if you want an excerpt
                        },
                    ],
                },

                // Content Tab
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            label: 'Blocks',
                            blocks: [ReconocimientosBlock, SociosBlock, GridBlogs, GridImages, TextContentBlock, GridImages, YouTubeLinksBlock],
                            required: true,
                        }
                    ],
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: 'media',
                        }),

                        MetaDescriptionField({}),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                    ],
                },
            ],
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
            name: 'categories',
            label: 'Categories',
            type: 'relationship',
            relationTo: 'blogCategories', // Relates to the new BlogCategory collection
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
        // Uncomment published date
        {
            name: 'publishedDate',
            label: 'Published Date',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                }
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidatePost],
        beforeChange: [populatePublishedAt, createdBy],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 350, // We set this interval for optimal live preview
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}; 