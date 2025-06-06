import { Block } from 'payload';
import { titleGroup } from '@/fields/title'; // Assuming titleGroup is in this path
import { lexicalEditor } from '@payloadcms/richtext-lexical';



export const EstadisticasBlock: Block = {
    slug: 'estadisticas',
    interfaceName: 'EstadisticasBlockType',
    labels: {
        singular: 'Estadisticas',
        plural: 'Estadisticas Blocks',
    },
    fields: [
        {
            type: 'group',
            name: 'estadisticasText',
            label: 'Estadisticas Text',
            fields: [
                {
                    type: 'text',
                    name: 'title',
                    label: 'Title',
                },
                {
                    name: 'description',
                    label: 'Descripción del Tour',
                    type: 'richText',
                    editor: lexicalEditor({
                        features: ({ defaultFeatures }) => [
                            ...defaultFeatures,
                        ],
                    }), // Use the default lexical editor config
                    required: true,
                },
                {
                    type: 'text',
                    name: 'colorBox',
                    label: 'Color Box',
                },
                {
                    type: 'array',
                    name: 'estadisticasBox',
                    label: 'Estadisticas Box',
                    fields: [
                        {
                            type: 'text',
                            name: 'numbers',
                            label: 'Numeros',
                        },
                        {
                            type: 'text',
                            name: 'description',
                            label: 'Description',
                        }
                    ]
                }
            ]
        }

    ]
}