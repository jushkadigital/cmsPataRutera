import type { CollectionConfig } from 'payload'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone';
import { getPayload, RequiredDataFromCollectionSlug } from 'payload';
import config from '@payload-config';

export const Ofertas: CollectionConfig = {
    slug: 'ofertas',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'tourRelacionado', 'descuentoPorcentaje', 'updatedAt'],
        description: 'Ofertas especiales de Tours',
        // No preview needed for offers currently, can be added later if required
    },
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    fields: [
        {
            name: 'title',
            label: 'Título',
            type: 'text',
            required: true,
        },
        {
            name: 'type',
            label: 'Tipo',
            type: 'text',
            required: true,
        },
        {
            name: 'descuentoPorcentaje',
            label: 'Descuento en %',
            type: 'number',
            min: 0,
            max: 100,
            required: true,
            admin: {
                description: 'Ingrese el descuento en % (e.g., 10 para 10%).',
                step: 0.5, // Allow for float increments
            },
            // Add validation if needed (e.g., min: 0, max: 100)
        },
        {
            name: 'persona',
            label: 'Texto persona',
            type: 'text',
            defaultValue: 'por persona',
            required: true,
        },
        {
            name: 'imagen',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'price',
            type: 'number',
            admin: {
                readOnly: true, // Opcional, para evitar edición manual
            },
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                readOnly: true, // Opcional, para evitar edición manual
            },
        },
        {
            name: 'tourRelacionado',
            label: 'Related Tour',
            type: 'relationship',
            relationTo: 'tours', // Link to the Tours collection
            required: true,
            hasMany: false, // An offer relates to one tour
            admin: {
                position: 'sidebar', // Place relationship in the sidebar for better layout
            },
        },
    ],
    hooks: {
        beforeChange: [
            async ({ data, req }) => {

                const tourID = typeof data.tourRelacionado === 'string' ? data.tourRelacionado : data.tourRelacionado;
                const tourDoc = await req.payload.findByID({
                    collection: 'tours',
                    id: tourID,
                });


                if (tourDoc?.price) {

                    data.price = tourDoc!.price
                }

                if (tourDoc?.slug) {
                    data.slug = tourDoc!.slug
                }

                return data;
            },
        ]
    }
}

export default Ofertas;
