import titleGroup from '@/fields/title';
import type { Block } from 'payload'

export const OfertasBlock: Block = {
  slug: 'ofertas',
  interfaceName: 'OfertasBlock',
  labels: {
    singular: 'Oferta',
    plural: 'Ofertas',
  },
  fields: [
    titleGroup,
    {
      name: 'typeGrid',
      type: 'select',
      defaultValue: 'grid',
      label: 'Type Grid',
      options: [
        {
          label: 'Masonry',
          value: 'masonry',
        },
        {
          label: 'Overlapping',
          value: 'overlapping',
        },
        {
          label: 'List',
          value: 'list',
        }
        , {
          label: 'Mosaic',
          value: 'mosaic',
        },
        {
          label: 'Grid',
          value: 'grid',
        }
      ],
      required: true,
    },
    // No other fields are needed here, as the data comes from the collection itself.
  ],
}

export default OfertasBlock;
