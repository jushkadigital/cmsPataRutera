import { titleGroup } from '@/fields/title';
import { Block } from 'payload';


export const ReconocimientosBlock: Block = {
    slug: 'reconocimientos',
    interfaceName: 'ReconocimientosBlockType',
    labels: {
        singular: 'Reconocimientos Block',
        plural: 'Reconocimientos Blocks',
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

    ]

}