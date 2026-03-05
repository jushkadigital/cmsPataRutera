import type { Block } from 'payload'
// import titleGroup from '@/fields/title' // No longer needed
import { defaultLexical } from '@/fields/defaultLexical'
import titleGroup from '@/fields/title';
import { getPayload } from 'payload'
import config from '@payload-config'
import { lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical';
import { CustomListServerFeature } from '@/lexical/CustomList/customListFeature.server';

export const DescrPrice: Block = {
  slug: 'descrPrice',
  interfaceName: 'DescrPriceBlock', // Optional: For generated TypeScript types
  labels: {
    singular: 'Descripción y Precio',
    plural: 'Descripciones y Precios',
  },
  // imageURL: 'url/to/preview/image.jpg', // Optional: Add a preview image URL
  // imageAltText: 'Description and Price Block Layout', // Optional: Alt text for the image
  fields: [
    {
      type: 'collapsible',
      label: 'Título',
      fields: [
        {
          ...titleGroup, // Add the main title group for the block
          name: 'blockTitle', // Ensure a unique name for the title within this block
          label: 'Título del Bloque', // Customize label if needed
        },
      ]
    },
    {
      type: 'row', // Use a row to arrange the two main columns
      fields: [
        // --- Left Column (2/3 width) ---
        {
          name: 'leftColumn',
          type: 'group',
          label: false, // Hide the group label itself
          admin: {
            width: '66%', // Set width for the left column group
          },
          fields: [
            {
              name: 'tourTitle',
              label: 'Título del Tour',
              type: 'text',
              required: true, // Adjust required status if needed
            },
            {
              name: 'tourDescription',
              label: 'Descripción del Tour',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  const noUnorderedListFeature = defaultFeatures.filter(ele => ele.key !== 'unorderedList')
                  return ([
                    ...noUnorderedListFeature,
                    CustomListServerFeature()
                  ])
                },
              }), // Use the default lexical editor config
              required: true,
            },
          ],
        },
        // --- Right Column (1/3 width) ---
        {
          name: 'rightColumn',
          type: 'group',
          label: 'Formulario de Pago', // Hide the group label itself
          admin: {
            width: '33%', // Set width for the right column group
          },
          fields: [

            {
              type: 'number',
              name: 'price',
              label: 'Precio',
              admin: {
                readOnly: true
              }
            },
            {
              type: 'ui',
              name: 'paymentForm',
              label: 'Datos de pago',
              admin: {
              }

            }
          ],
        },
      ],
    },

  ],
}

export default DescrPrice;
