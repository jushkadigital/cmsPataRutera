import type { CollectionConfig } from 'payload'
// Only import necessary features and types for this file
import {
    lexicalEditor,
    BlocksFeature,
    ParagraphFeature,
    HeadingFeature,
    UploadFeature,
    UnorderedListFeature, // Keep for filtering
    OrderedListFeature,   // Keep for filtering
    ChecklistFeature,     // Corrected Typo: Keep for filtering
    BoldFeature,
    ItalicFeature,
    LinkFeature,
    FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import DescrPrice from '@/blocks/DescrPrice/config'
import GuiaTour from '@/blocks/GuiaTour/config'
import { slugField } from '@/fields/slug'
import { GridTours } from '@/blocks/GridTours/config'
import { revalidateTour, revalidateDelete } from './hooks/revalidateTour'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
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

// Import the custom feature






export const Tours: CollectionConfig = {
    slug: 'tours',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
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
                    collection: 'tours',
                    req,
                })

                return path
            },
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'tours',
                req,
            }),
        useAsTitle: 'title',
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        heroTour
                    ],
                    label: 'Hero'
                },
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            blocks: [DescrPrice, GuiaTour, GridTours, GridBlogs, RowBlock, PostRelationTourBlock, YouTubeLinksBlock, TextContentBlock, SociosBlock, ReconocimientosBlock, FormBitrixBlock, RevistaBlock],
                            //blocks: [],
                            required: true,
                        },
                    ],
                    label: 'Content'
                },
                {
                    fields: [
                        {
                            name: 'featuredImage',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            label: 'Imagen Destacada',
                        },

                        {
                            name: 'miniDescription',
                            type: 'richText',
                            label: 'Descripción Miniatura',
                            editor: lexicalEditor({
                                features: ({ defaultFeatures }) => [
                                    ...defaultFeatures,
                                    //CustomListServerFeature(),
                                ],
                            }),
                            required: true,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    type: 'collapsible',
                                    label: 'Price Data',
                                    fields: [
                                        {
                                            type: 'text',
                                            name: 'Desde',
                                            required: true,
                                        },
                                        {
                                            type: 'number',
                                            name: 'price',
                                            required: true,

                                        },
                                        {
                                            type: 'text',
                                            name: 'Person desc',
                                            required: true,
                                        },

                                    ]
                                },
                                {
                                    type: 'collapsible',
                                    label: 'Price Data',
                                    fields: [
                                        {
                                            name: 'iconMaxPassengers',
                                            type: 'upload',
                                            relationTo: 'media',
                                            defaultValue: async ({ user, locale, req }) => {
                                                try {
                                                    // Realiza una consulta a la colección 'media' para encontrar la imagen por su nombre de archivo
                                                    // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo
                                                    const payload = await getPayload({ config })
                                                    const result = await payload.find({
                                                        collection: 'media',
                                                        where: {
                                                            filename: {
                                                                equals: 'iconMaxPassengers.svg'
                                                            },
                                                        },
                                                        limit: 1, // Asumimos que solo quieres una imagen con ese nombre
                                                        depth: 0, // No necesitamos poblar relaciones de la imagen en este caso
                                                    });

                                                    // Si se encontró un documento, retorna su ID
                                                    if (result.docs.length > 0) {
                                                        return result.docs[0]!.id;
                                                    }

                                                } catch (error) {
                                                    // Maneja cualquier error durante la consulta
                                                    console.error('Error fetching default image:', error);
                                                }

                                                // Si no se encuentra la imagen o hay un error, retorna null o undefined
                                                // para que el campo quede vacío por defecto.
                                                return null;
                                            },
                                            admin: {
                                                readOnly: true, // Hace que el campo sea de solo lectura
                                            },
                                        },
                                        {
                                            name: 'maxPassengers',
                                            label: 'Máximo de Pasajeros',
                                            type: 'number',
                                            required: true,
                                        },
                                        {
                                            name: 'iconDifficulty',
                                            type: 'upload',
                                            relationTo: 'media',
                                            defaultValue: async ({ user, locale, req }) => {
                                                try {
                                                    // Realiza una consulta a la colección 'media' para encontrar la imagen por su nombre de archivo
                                                    // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo

                                                    const payload = await getPayload({ config })
                                                    const result = await payload.find({
                                                        collection: 'media',
                                                        where: {
                                                            filename: {
                                                                equals: 'iconDifficulty.svg',
                                                            },
                                                        },
                                                        limit: 1, // Asumimos que solo quieres una imagen con ese nombre
                                                        depth: 0, // No necesitamos poblar relaciones de la imagen en este caso
                                                    });

                                                    // Si se encontró un documento, retorna su ID
                                                    if (result.docs.length > 0) {
                                                        return result.docs[0]!.id;
                                                    }

                                                } catch (error) {
                                                    // Maneja cualquier error durante la consulta
                                                    console.error('Error fetching default image:', error);
                                                }

                                                // Si no se encuentra la imagen o hay un error, retorna null o undefined
                                                // para que el campo quede vacío por defecto.
                                                return null;
                                            },
                                            admin: {
                                                readOnly: true, // Hace que el campo sea de solo lectura
                                            },
                                        },
                                        {
                                            name: 'difficulty',
                                            type: 'select',
                                            defaultValue: 'easy',
                                            label: 'Dificultad',
                                            options: [
                                                {
                                                    label: 'Easy',
                                                    value: 'easy',
                                                },
                                                {
                                                    label: 'Medium',
                                                    value: 'medium',
                                                },
                                                {
                                                    label: 'Hard',
                                                    value: 'hard',
                                                },
                                            ],
                                            required: true,
                                        },
                                    ]
                                }

                            ]
                        },

                    ],
                    label: 'Thumbnail'
                }

            ]
        },
        {
            name: 'categorias',
            label: 'Categorías',
            type: 'relationship',
            relationTo: 'tourCategory',
            hasMany: true,
            admin: {
                position: 'sidebar',
                description: 'Categorías a las que pertenece este tour.'
            },
        },
        {
            name: 'destinos',
            label: 'Destinos',
            type: 'relationship',
            relationTo: 'destinations',
            admin: {
                position: 'sidebar',
                description: 'Destinos a los que pertenece este tour.'
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
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidateTour],
        beforeChange: [populatePublishedAt],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 350 // We set this interval for optimal live preview
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}