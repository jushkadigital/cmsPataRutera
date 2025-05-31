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
    // No other fields are needed here, as the data comes from the collection itself.
  ],
}

export default OfertasBlock;
