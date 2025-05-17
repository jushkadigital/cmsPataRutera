import { Block } from 'payload';
import { titleGroup } from '@/fields/title'; // Assuming titleGroup is in this path
import { lexicalEditor } from '@payloadcms/richtext-lexical';



export const TextContentBlock: Block = {
  slug: 'textContent',
  interfaceName: 'TextContentBlockType',
  labels: {
    singular: 'Text Content',
    plural: 'Text Content Blocks',
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
      ],
      defaultValue: 'left',
      admin: {
        description: 'Controls the text alignment of the description content.',
      },
    },
  ],
}; 