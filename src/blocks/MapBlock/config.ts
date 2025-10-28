import { titleGroup } from '@/fields/title';
import { Block } from 'payload';


export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlockType',
  labels: {
    singular: 'Maps',
    plural: 'Maps Blocks',
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
      type: 'group',
      name: 'ImageContent',
      label: 'Single Image Column',
      fields: [
        {
          name: 'image',
          label: 'Image Dimensiones 4:3',
          type: 'upload',
          relationTo: 'media', // Assuming you have a 'media' collection
          required: true,
          admin: {
            readOnly: true
          }

        },
      ]
    },
  ],
}; 
