import type { Block, Field } from 'payload'
import titleGroup from '@/fields/title' // Import the title group field
import { defaultLexical } from '@/fields/defaultLexical';

import { getPayload } from 'payload'
import config from '@payload-config'
import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical';
import { CustomListServerFeature } from '@/lexical/customListFeature.server';
// Define the structure for each feature item within the array
const sectionItemFields1: Field[] = [

]

// Rename the block
export const GuiaTour: Block = { // Renamed constant
    slug: 'guiaTour', // Updated slug
    interfaceName: 'GuiaTourBlock', // Updated interface name
    labels: {
        singular: 'Guía Rutera',
        plural: 'Guías Ruteras',
    },
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
            type: 'collapsible',
            label: 'Itinerario',
            fields: [
                {
                    name: 'sectionItinerario',
                    label: 'Seccion Itinerario',
                    type: 'group',
                    fields: [
                        {
                            type: 'collapsible',
                            label: 'Icono',
                            fields: [
                                {
                                    name: 'iconText',
                                    label: 'Texto',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'iconImage',
                                    label: 'Imagen Icono',
                                    type: 'upload',
                                    relationTo: 'media', // Assuming your media collection slug is 'media'
                                    /* defaultValue: async ({ user, locale, req }) => {
                                        try {
                                            // Realiza una consulta a la colección 'media' para encontrar la imagen por su nombre de archivo
                                            // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo

                                            const payload = await getPayload({ config })
                                            const result = await payload.find({
                                                collection: 'media',
                                                where: {
                                                    filename: {
                                                        like: '%iconItinerario%',
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
                                    }, */
                                    required: true,
                                    admin: {
                                        description: 'Sube una imagen pequeña de icono.',
                                    },
                                },
                            ]
                        },

                        {
                            name: 'contentSection',
                            label: 'Sección de Contenido',
                            type: 'richText',
                            editor:
                                lexicalEditor({
                                    features: ({ defaultFeatures }) => [
                                        ...defaultFeatures,
                                        CustomListServerFeature(),
                                    ],
                                }),
                            required: true,
                        },
                    ], // Use the defined structure for each item
                    admin: {
                        description: 'Añade exactamente cuatro secciones, cada uno con texto e icono.',
                        // Consider adding 'components.RowLabel' for better admin UI if needed
                    },
                },]
        },
        {
            type: 'collapsible',
            label: 'Incluye/No Incluye',
            fields: [
                {
                    name: 'sectionIncluyeNoIncluye',
                    label: 'Seccion Incluye/No Incluye',
                    type: 'group',
                    fields: [
                        {
                            type: 'collapsible',
                            label: 'Icono',
                            fields: [
                                {
                                    name: 'iconText',
                                    label: 'Texto',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'iconImage',
                                    label: 'Imagen Icono',
                                    type: 'upload',
                                    relationTo: 'media', // Assuming your media collection slug is 'media'
                                    /* defaultValue: async ({ user, locale, req }) => {
                                        try {
                                            // Realiza una consulta a la colección 'media' para encontrar la imagen por su nombre de archivo
                                            // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo

                                            const payload = await getPayload({ config })
                                            const result = await payload.find({
                                                collection: 'media',
                                                where: {
                                                    filename: {
                                                        like: '%iconIncluyeNoIncluye%',
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
                                    }, */
                                    required: true,
                                    admin: {
                                        description: 'Sube una imagen pequeña de icono.',
                                    },
                                },
                            ]
                        },

                        {
                            name: 'contentSection',
                            label: 'Sección de Contenido',
                            type: 'richText',
                            editor:
                                lexicalEditor({
                                    features: ({ defaultFeatures }) => [
                                        ...defaultFeatures,
                                        CustomListServerFeature(),
                                    ],
                                }),
                            required: true,
                        },
                    ], // Use the defined structure for each item
                    admin: {
                        description: 'Añade exactamente cuatro secciones, cada uno con texto e icono.',
                        // Consider adding 'components.RowLabel' for better admin UI if needed
                    },
                },]
        },
        {
            type: 'collapsible',
            label: 'Precios',
            fields: [
                {
                    name: 'sectionPrecios',
                    label: 'Seccion Precios',
                    type: 'group',
                    fields: [
                        {
                            type: 'collapsible',
                            label: 'Icono',
                            fields: [
                                {
                                    name: 'iconText',
                                    label: 'Texto',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'iconImage',
                                    label: 'Imagen Icono',
                                    type: 'upload',
                                    relationTo: 'media', // Assuming your media collection slug is 'media'
                                    /* defaultValue: async ({ user, locale, req }) => {
                                        try {
                                            // Realiza una consulta a la colección 'media' para encontrar la imagen por su nombre de archivo
                                            // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo

                                            const payload = await getPayload({ config })
                                            const result = await payload.find({
                                                collection: 'media',
                                                where: {
                                                    filename: {
                                                        like: '%iconPrecios%',
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
                                    }, */
                                    required: true,
                                    admin: {
                                        description: 'Sube una imagen pequeña de icono.',
                                    },
                                },
                            ]
                        },

                        {
                            name: 'contentSection',
                            label: 'Sección de Contenido',
                            type: 'richText',
                            editor:
                                lexicalEditor({
                                    features: ({ defaultFeatures }) => [
                                        ...defaultFeatures,
                                        CustomListServerFeature(),
                                    ],
                                }),
                            required: true,
                        },
                    ], // Use the defined structure for each item
                    admin: {
                        description: 'Añade exactamente cuatro secciones, cada uno con texto e icono.',
                        // Consider adding 'components.RowLabel' for better admin UI if needed
                    },
                },]
        },
        {
            type: 'collapsible',
            label: 'Información del Viaje',
            fields: [
                {
                    name: 'sectionInfoViaje',
                    label: 'Seccion Información del Viaje',
                    type: 'group',
                    fields: [
                        {
                            type: 'collapsible',
                            label: 'Icono',
                            fields: [
                                {
                                    name: 'iconText',
                                    label: 'Texto',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'iconImage',
                                    label: 'Imagen Icono',
                                    type: 'upload',
                                    relationTo: 'media', // Assuming your media collection slug is 'media'
                                    /* defaultValue: async ({ user, locale, req }) => {
                                        try {
                                            // Realiza una consulta a la colección 'media' para encontrar la imagen por su nombre de archivo
                                            // Reemplaza 'nombre-de-tu-imagen-por-defecto.jpg' con el nombre real del archivo

                                            const payload = await getPayload({ config })
                                            const result = await payload.find({
                                                collection: 'media',
                                                where: {
                                                    filename: {
                                                        like: '%iconInfo%',
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
                                    }, */
                                    required: true,
                                    admin: {
                                        description: 'Sube una imagen pequeña de icono.',
                                    },
                                },
                            ]
                        },

                        {
                            name: 'contentSection',
                            label: 'Sección de Contenido',
                            type: 'richText',
                            editor:
                                lexicalEditor({
                                    features: ({ defaultFeatures }) => [
                                        ...defaultFeatures,
                                        CustomListServerFeature(),
                                    ],
                                }),
                            required: true,
                        },
                    ], // Use the defined structure for each item
                    admin: {
                        description: 'Añade exactamente cuatro secciones, cada uno con texto e icono.',
                        // Consider adding 'components.RowLabel' for better admin UI if needed
                    },
                },]
        }
    ],
}

export default GuiaTour; 