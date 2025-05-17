import { titleGroup } from '@/fields/title';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Block } from 'payload';


export const PostRelationTourBlock: Block = {
    slug: 'postRelationTour',
    interfaceName: 'PostRelationTourBlockType',
    labels: {
        singular: 'Posts Relation Tour Block',
        plural: 'Posts Relation Tour Blocks',
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
                {
                    type: 'richText',
                    name: 'parrafo',
                    label: 'Párrafo',
                    required: true,
                    editor: lexicalEditor({
                        features: ({ defaultFeatures }) => [
                            ...defaultFeatures,
                            //CustomListServerFeature(),
                        ],
                    }),

                },
                {
                    name: 'postRelationTour',
                    label: 'Posts Relation Tour',
                    type: 'relationship',
                    relationTo: 'posts',
                    hasMany: true,
                    maxRows: 6
                }
            ]
        }
    ],
}; 