// app/src/collections/Post/index.ts
import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical'; // Assuming Lexical is the default editor
import { ReconocimientosBlock } from '@/blocks/Reconocimientos/config';
import { SociosBlock } from '@/blocks/Socios/config';
import { anyone } from '@/access/anyone';
import { authenticated } from '@/access/authenticated';
import { generatePreviewPath } from '@/utilities/generatePreviewPath';
import { slugField } from '@/fields/slug';
import { populatePublishedAt } from '@/hooks/populatePublishedAt';
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost';

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

        // Add Author and Published Date to sidebar if uncommented

        // Tabs field containing the main content structure
        {
            type: 'tabs',
            tabs: [
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
                            name: 'backgroundImage',
                            label: 'Background Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: false,
                        },
                        {
                            name: 'content',
                            label: 'Main Content',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ defaultFeatures }) => [
                                    ...defaultFeatures,
                                    //CustomListServerFeature(),
                                ],
                            }),
                            required: true,
                        },
                        {
                            name: 'gallery',
                            label: 'Image Gallery',
                            type: 'array',
                            minRows: 0,
                            fields: [
                                {
                                    name: 'image',
                                    label: 'Image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                                {
                                    name: 'caption',
                                    label: 'Caption',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            type: 'blocks',
                            name: 'blocks',
                            label: 'Blocks',
                            blocks: [ReconocimientosBlock, SociosBlock],
                        }
                    ],
                },
            ],
        },
        // Uncomment author relationship
        {
            name: 'author',
            label: 'Author',
            type: 'relationship',
            relationTo: 'users', // Assumes a 'users' collection slug
            required: true,
            admin: {
                position: 'sidebar',
            }
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
        },
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidatePost],
        beforeChange: [populatePublishedAt],
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