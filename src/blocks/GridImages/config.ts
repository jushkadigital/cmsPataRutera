import titleGroup from "@/fields/title";
import type { Block } from "payload";

export const GridImages: Block = {
    slug: 'gridImages',
    interfaceName: 'gridImagesBlockType',
    labels: {
        singular: 'Grid Image',
        plural: 'Grid Images',
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
            name: 'typeGrid',
            type: 'select',
            defaultValue: 'grid',
            label: 'Type Grid',
            options: [
                {
                    label: 'Masonry',
                    value: 'masonry',
                },
                {
                    label: 'Overlapping',
                    value: 'overlapping',
                },
                {
                    label: 'List',
                    value: 'list',
                }
                , {
                    label: 'Mosaic',
                    value: 'mosaic',
                },
                {
                    label: 'Grid',
                    value: 'grid',
                }
            ],
            required: true,
        },
        {
            type: 'array',
            name: 'Image',
            label: 'Image',
            fields: [
                {
                    type: 'upload',
                    name: 'image',
                    label: 'Image',
                    relationTo: 'media',
                    required: true
                }
            ]
        },
    ]
}