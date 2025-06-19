import type { Block, Field } from 'payload'
import titleGroup from '@/fields/title' // Import the title group field
import { applyConditionalDefaults } from '@/utilities/frontEnd'

export const GridTours: Block = { // Renamed constant
    slug: 'gridTours', // Updated slug
    interfaceName: 'GridToursBlock', // Updated interface name
    labels: {
        singular: 'Grid de Tours',
        plural: 'Grids de Tours',
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
        }
        ,
        applyConditionalDefaults({
            type: 'number',
            name: 'gridColumns',
            label: 'Número de Items',
            defaultValue: 6,
            admin: {
                step: 1
            }
        }) as Field,
        {
            name: 'gridStyle',
            type: 'checkbox',
            label: 'Estilo de Grid',
            defaultValue: true,
            admin: {
                description: 'True grid, false list',
            },

        },
        {
            name: 'category',
            type: 'relationship',
            label: 'Categoría',
            relationTo: 'tourCategory',
            hasMany: true,
            admin: {
                description: 'Si se selecciona una categoría, solo se mostrarán las tours de esa categoría.',
            },
        },
        applyConditionalDefaults({
            name: 'destination',
            type: 'relationship',
            label: 'Destino',
            relationTo: 'destinations',
            admin: {
                description: 'Si se selecciona un destino, solo se mostrarán las tours de ese destino.',
            },
        }) as Field
    ]
}
