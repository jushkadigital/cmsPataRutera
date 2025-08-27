import { Block } from 'payload';
import { titleGroup } from '@/fields/title'; // Assuming titleGroup is in this path
import { lexicalEditor } from '@payloadcms/richtext-lexical';


export const TextIconContentBlock: Block = {
    slug: 'txtIconContent',
    interfaceName: 'TxtIconContentBlockType',
    labels: {
        singular: 'Text Icon Content',
        plural: 'Text Icon Content Blocks',
    },
    fields: [
        {
            type: 'collapsible',
            label: 'Title',
            admin: {
                initCollapsed: true,
            },
            fields: [
                {
                    name: 'iconImage',
                    label: 'Imagen Icono',
                    type: 'upload',
                    relationTo: 'media', // Assuming your media collection slug is 'media'
                    required: true,
                    admin: {
                        description: 'Sube una imagen pequeña de icono.',
                    },
                },
                {
                    ...titleGroup,
                    name: 'blockTitle',
                    label: 'Block Title',
                },
            ],
        },
        {
            name: 'description',
            label: 'Description',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    //CustomListServerFeature(),
                ],
            }),
            required: true,
        },
        {
            name: 'descriptionAlignment',
            label: 'Description Text Alignment',
            type: 'select',
            options: [
                {
                    label: 'Left',
                    value: 'left',
                },
                {
                    label: 'Center',
                    value: 'center',
                },
                {
                    label: 'Right',
                    value: 'right',
                },
                {
                    label: 'Justify',
                    value: 'justify'
                }
            ],
            defaultValue: 'left',
            admin: {
                description: 'Controls the text alignment of the description content.',
            },
        },
    ],
}; 