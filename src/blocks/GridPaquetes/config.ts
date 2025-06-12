import type { Block, Field } from 'payload'
import titleGroup from '@/fields/title' // Import the title group field
import { applyConditionalDefaults } from '@/utilities/frontEnd'

export const GridPaquetes: Block = { // Renamed constant
    slug: 'gridPaquetes', // Updated slug
    interfaceName: 'GridPaquetesBlock', // Updated interface name
    labels: {
        singular: 'Grid de Paquetes',
        plural: 'Grids de Paquetes',
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
            name: 'destination',
            type: 'relationship',
            label: 'Destino',
            relationTo: 'destinations',
            hasMany: true,
            admin: {
                description: 'Si se selecciona un destino, solo se mostrarán los paquetes de ese destino.',
            },
        }
    ]
}
