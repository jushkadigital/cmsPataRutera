import type { CollectionConfig } from 'payload'


import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { heroPage } from '@/heros/MainHero'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { RowBlock } from '@/blocks/RowBlock/config'
import { GridTours } from '@/blocks/GridTours/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Banner } from '@/blocks/Banner/config'
import { PostRelationTourBlock } from '@/blocks/PostRelationTour/config'
import { SociosBlock } from '@/blocks/Socios/config'
import { ReconocimientosBlock } from '@/blocks/Reconocimientos/config'
import { OfertasBlock } from '@/blocks/Ofertas/config'
import { CarouselDestination } from '@/blocks/CarouselDestination/config'
import { anyone } from '@/access/anyone'
import { TikTokLinksBlock } from '@/blocks/TikTokLinksBlock/config'
import { BeneficiosBlock } from '@/blocks/Beneficios/config'
import { EstadisticasBlock } from '@/blocks/EstadisticasBlock/config'
import { TextContentBlock } from '@/blocks/TextContentBlock/config'
import { GridImages } from '@/blocks/GridImages/config'


export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [heroPage],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [RowBlock, GridTours, MediaBlock, PostRelationTourBlock, SociosBlock, ReconocimientosBlock, OfertasBlock, CarouselDestination, TikTokLinksBlock, BeneficiosBlock, EstadisticasBlock, TextContentBlock, GridImages, OfertasBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        }
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 350, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
