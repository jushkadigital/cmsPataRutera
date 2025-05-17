import { titleGroup } from '@/fields/title';
import { Block } from 'payload';


export const BeneficiosBlock: Block = {
    slug: 'beneficios',
    interfaceName: 'BeneficiosBlockType',
    labels: {
        singular: 'Beneficios',
        plural: 'Beneficios Blocks',
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
            name: 'colorItem',
            label: 'Color del Item',
            type: 'text',
            required: true,
            defaultValue: '#EFBA06'
        },
        {
            name: 'beneficios',
            label: 'Beneficios',
            type: 'array',
            fields: [
                {
                    name: 'beneficioText',
                    label: 'Texto del Beneficio',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'beneficioImage',
                    label: 'Imagen del Beneficio',
                    type: 'upload',
                    relationTo: 'media',
                }
            ]
        }
    ],
}; 