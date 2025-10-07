import type { CollectionConfig } from 'payload'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { revalidateDestination, revalidateDelete } from './hooks/revalidateDestination'
export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name', // Use the destination name as the title in admin UI
    defaultColumns: ['name', 'country', 'region', 'updatedAt'],
    description: 'Gestionar destinos de viaje.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone, // Assuming destinations can be public or require login like tours
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
      index: true, // Index for faster querying if needed
    },
    {
      name: 'imageDestination',
      label: 'Imagen del Destino',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'backgroundDestination',
      label: 'Fondo',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'carouselItemDestination',
      label: 'Carousel',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
        ],
      }),
    }
  ],
  hooks: {
    afterChange: [revalidateDestination],
    afterDelete: [revalidateDelete],

  }
}

export default Destinations;
