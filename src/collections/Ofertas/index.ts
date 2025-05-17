import type { CollectionConfig } from 'payload'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone';

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
            name: 'descripcion',
            label: 'Descripción',
            type: 'textarea',
            required: false,
        },
        {
            name: 'descuentoPorcentaje',
            label: 'Descuento en %',
            type: 'number',
            required: true,
            admin: {
                description: 'Ingrese el descuento en % (e.g., 10 para 10%).',
                step: 0.5, // Allow for float increments
            },
            // Add validation if needed (e.g., min: 0, max: 100)
        },
        {
            name: 'imagen',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
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
}

export default Ofertas;
