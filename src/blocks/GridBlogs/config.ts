import type { Block, Field } from 'payload'
import titleGroup from '@/fields/title' // Import the title group field
import { applyConditionalDefaults } from '@/utilities/frontEnd'

export const GridBlogs: Block = { // Renamed constant
    slug: 'gridBlogs', // Updated slug
    interfaceName: 'GridBlogsBlock', // Updated interface name
    labels: {
        singular: 'Grid de Blogs',
        plural: 'Grids de Blogs',
    },
    fields: [
        {
            name: 'overrideDefaults',
            type: 'checkbox',
            label: 'FRONTEND',
            defaultValue: false,
            admin: {
                description: 'Si está marcado, los campos de este bloque se mostrarán con logica del frontend.',
            },

        },
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
            name: 'generalStyle',
            type: 'select',
            label: 'Estilo general',
            defaultValue: 'grid',
            options: [
                {
                    label: 'Masonry',
                    value: 'masonry'
                },
                {
                    label: 'Grid',
                    value: 'grid'
                }
            ]
        },
        {
            name: 'gridStyle',
            type: 'checkbox',
            label: 'Estilo de Grid',
            defaultValue: true,
            admin: {
                description: 'True grid, false list',
                condition: (_, siblingData) => siblingData.generalStyle === 'grid',
            },

        },
        {
            name: 'populateBy',
            type: 'select',
            defaultValue: 'collection',
            options: [
                {
                    label: 'Collection',
                    value: 'collection',
                },
                {
                    label: 'Individual Selection',
                    value: 'selection',
                },
            ],
        },
        {
            name: 'categories',
            type: 'relationship',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
            },
            hasMany: true,
            label: 'Categories To Show',
            relationTo: 'blogCategories',
        },
        applyConditionalDefaults({
            name: 'limit',
            type: 'number',
            admin: {
                condition: (_: any, siblingData: any) => siblingData.populateBy === 'collection',
                step: 1,
            },
            defaultValue: 3,
            label: 'Limit',
        }) as Field,
        {
            name: 'selectedDocs',
            type: 'relationship',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'selection',
            },
            hasMany: true,
            label: 'Selection',
            relationTo: ['posts'],
        },

    ]
}
