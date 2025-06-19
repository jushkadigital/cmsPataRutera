import { titleGroup } from '@/fields/title';
import { Block } from 'payload';


export const RevistaBlock: Block = {
    slug: 'revistaBlock',
    labels: {
        singular: 'Revista Block',
        plural: 'Revista Blocks',
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
            name: 'revistasLinks',
            label: 'Revistas Links',
            type: 'array',
            minRows: 0,
            labels: {
                singular: 'Revista Link',
                plural: 'Revista Links',
            },
            admin: {
            },
            fields: [
                {
                    name: 'url',
                    label: 'Revista URL',
                    type: 'text',
                    required: true,
                    admin: {
                    },
                },
            ],
        },
    ],
}; 