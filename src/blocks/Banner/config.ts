import { applyConditionalDefaults } from '@/utilities/frontEnd'
import type { Block, Field } from 'payload'

export const Banner: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
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

    applyConditionalDefaults({
      name: 'title',
      label: 'Title',
      type: 'text',
    }) as Field,
    applyConditionalDefaults(
      {
        name: 'image',
        label: 'Image',
        type: 'upload', // Assuming an 'media' or similar collection exists
        relationTo: 'media', // Adjust if your media collection slug is different
      }) as Field,
  ],
} 