import { titleGroup } from '@/fields/title';
import { Block } from 'payload';


export const SociosBlock: Block = {
    slug: 'socios',
    interfaceName: 'SociosBlockType',
    labels: {
        singular: 'Socios Block',
        plural: 'Socios Blocks',
    },
    fields: [
        {
            type: 'collapsible',
            label: 'Título',
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    ...titleGroup, // Add the main title group for the block
                    name: 'blockTitle', // Ensure a unique name for the title within this block
                    label: 'Título del Bloque', // Customize label if needed
                },
            ]
        },
        {
            type: 'array',
            name: 'socios',
            label: 'Socios',
            fields: [
                {
                    name: 'image',
                    label: 'Image',
                    type: 'upload', // Assuming an 'media' or similar collection exists
                    relationTo: 'media', // Adjust if your media collection slug is different
                    required: true
                }
            ]
        }
    ]

}