import type { Block } from 'payload'
// import titleGroup from '@/fields/title' // No longer needed
import { defaultLexical } from '@/fields/defaultLexical'
import titleGroup from '@/fields/title';
import { getPayload } from 'payload'
import config from '@payload-config'
import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical';

export const DescrPrice: Block = {
    slug: 'descrPrice',
    interfaceName: 'DescrPriceBlock', // Optional: For generated TypeScript types
    labels: {
        singular: 'Descripción y Precio',
        plural: 'Descripciones y Precios',
    },
    // imageURL: 'url/to/preview/image.jpg', // Optional: Add a preview image URL
    // imageAltText: 'Description and Price Block Layout', // Optional: Alt text for the image
    fields: [
        {
            type: 'collapsible',
            label: 'Título',
            fields: [
                {
                    ...titleGroup, // Add the main title group for the block
                    name: 'blockTitle', // Ensure a unique name for the title within this block
                    label: 'Título del Bloque', // Customize label if needed
                },
            ]
        },
        {
            type: 'row', // Use a row to arrange the two main columns
            fields: [
                // --- Left Column (2/3 width) ---
                {
                    name: 'leftColumn',
                    type: 'group',
                    label: false, // Hide the group label itself
                    admin: {
                        width: '66%', // Set width for the left column group
                    },
                    fields: [
                        {
                            name: 'tourTitle',
                            label: 'Título del Tour',
                            type: 'text',
                            required: true, // Adjust required status if needed
                        },
                        {
                            name: 'tourDescription',
                            label: 'Descripción del Tour',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ defaultFeatures }) => [
                                    ...defaultFeatures,
                                ],
                            }), // Use the default lexical editor config
                            required: true,
                        },
                    ],
                },
                // --- Right Column (1/3 width) ---
                {
                    name: 'rightColumn',
                    type: 'group',
                    label: 'Formulario de Pago', // Hide the group label itself
                    admin: {
                        width: '33%', // Set width for the right column group
                    },
                    fields: [
                        {
                            name: 'priceTitle',
                            label: 'Título Precio',
                            type: 'text',
                            required: false, // Adjust required status if needed
                        },
                        {
                            name: 'prevText',
                            label: 'Texto previo',
                            type: 'text',
                            required: false,
                            defaultValue: 'Precio desde'
                        },
                        {
                            type: 'number',
                            name: 'price',
                            label: 'Precio',
                            admin: {
                                readOnly: true
                            }
                        },
                        {
                            name: 'nextText',
                            label: 'Texto siguiente',
                            type: 'text',
                            required: true,
                            defaultValue: 'por persona'
                        },
                        {
                            type: 'group',
                            name: 'paymentForm',
                            label: 'Datos de pago',
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            type: 'upload',
                                            name: 'iconDate',
                                            label: 'Icono fecha',
                                            relationTo: 'media',
                                            defaultValue: async ({ user, locale, req }) => {
                                                try {
                                                    // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo

                                                    const result = await req.payload.find({
                                                        collection: 'media',
                                                        where: {
                                                            filename: {
                                                                like: '%iconDate%'
                                                            }
                                                        },
                                                        limit: 1
                                                    });

                                                    // Si se encontró un documento, retorna su ID
                                                    //console.log(result)
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
                                        },
                                        {
                                            type: 'text',
                                            name: 'InputPlaceHolderDate',
                                            label: 'Input placeholder fecha',
                                            defaultValue: 'Fecha'
                                        }
                                    ]
                                },
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            type: 'upload',
                                            name: 'iconPassengers',
                                            label: 'Icono Pasajeros',
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
                                                                like: '%iconPassengers%'
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
                                            }
                                        },
                                        {
                                            type: 'text',
                                            name: 'InputPlaceHolderPassengers',
                                            label: 'Input placeholder Pasajeros',
                                            defaultValue: 'Pasajeros'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                },
            ],
        },

    ],
}

export default DescrPrice;
