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
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import DescrPrice from '@/blocks/DescrPrice/config'
import GuiaTour from '@/blocks/GuiaTour/config'
import { heroPaquete } from '@/heros/PaqueteHero'
import { slugField } from '@/fields/slug'
import { GridTours } from '@/blocks/GridTours/config'
import { createdBy, populatePublishedAt } from '@/hooks/populatePublishedAt'
import { PostRelationTourBlock } from '@/blocks/PostRelationTour/config'
import { YouTubeLinksBlock } from '@/blocks/YouTubeLinksBlock/config'
import { SociosBlock } from '@/blocks/Socios/config'
import { ReconocimientosBlock } from '@/blocks/Reconocimientos/config'
import { anyone } from '@/access/anyone'
import { revalidateDelete, revalidatePaquete } from './hooks/revalidatePaquete'
import { PaqueteHerocar } from '@/blocks/PaqueteHerocar/config'
import { TextContentBlock } from '@/blocks/TextContentBlock/config'
import { GridBlogs } from '@/blocks/GridBlogs/config'
import { FormBitrixBlock } from '@/blocks/FormBitrix/config'
import { RevistaBlock } from '@/blocks/RevistaBlock/config'
import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from '@payloadcms/plugin-seo/fields'
import { PopulatePrice } from './hooks/populatePrice'

// Import the custom feature






export const Paquetes: CollectionConfig = {
    slug: 'paquetes',
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
                    collection: 'paquetes',
                    req,
                })

                return path
            },
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: typeof data?.slug === 'string' ? data.slug : '',
                collection: 'paquetes',
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
                        heroPaquete
                    ],
                    label: 'Hero'
                },
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            blocks: [DescrPrice, GuiaTour, GridTours, GridBlogs, PostRelationTourBlock, YouTubeLinksBlock, TextContentBlock, SociosBlock, ReconocimientosBlock, FormBitrixBlock, RevistaBlock],
                            required: true,
                        },
                    ],
                    label: 'Content'
                }
                ,
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
                                            admin: {
                                                readOnly: true
                                            }
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
                                                    const result = await req.payload.find({
                                                        collection: 'media',
                                                        where: {
                                                            filename: {
                                                                like: '%iconMaxPassengers%'
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

                                                    const result = await req.payload.find({
                                                        collection: 'media',
                                                        where: {
                                                            filename: {
                                                                like: '%iconDifficulty%',
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
            type: 'number',
            name: 'priceGeneral',
            required: true,
            admin: {
                position: 'sidebar',
                description: 'Precio General'
            },
        },
        {
            name: 'destinos',
            label: 'Destinos',
            type: 'relationship',
            relationTo: 'destinations',
            hasMany: true,
            admin: {
                position: 'sidebar',
                description: 'Destinos a los que pertenece este tour.'
            },
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
        ...slugField(),
    ],
    hooks: {
        afterChange: [revalidatePaquete],
        beforeChange: [populatePublishedAt, createdBy, PopulatePrice],
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
}