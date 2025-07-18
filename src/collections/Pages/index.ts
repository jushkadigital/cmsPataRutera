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

import { createdBy, populatePublishedAt } from '../../hooks/populatePublishedAt'
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
import { GridPaquetes } from '@/blocks/GridPaquetes/config'
import { FormBitrixBlock } from '@/blocks/FormBitrix/config'
import { GridBlogs } from '@/blocks/GridBlogs/config'
import { metadata } from '@payloadcms/next/layouts'
import { getServerSideURL } from '@/utilities/getURL'
import { isAdminOrCreatedBy } from './access'


export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: isAdminOrCreatedBy,
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
              blocks: [RowBlock, GridTours, GridBlogs, MediaBlock, PostRelationTourBlock, SociosBlock, ReconocimientosBlock, OfertasBlock, CarouselDestination, TikTokLinksBlock, BeneficiosBlock, EstadisticasBlock, TextContentBlock, GridImages, OfertasBlock, GridPaquetes, FormBitrixBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            })
            ,
            MetaTitleField({
              hasGenerateFn: true
            }),
            MetaImageField({
              relationTo: 'media'
            }),
            MetaDescriptionField({
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description'
            }),

          ]
        }
      ],
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users', // Assumes a 'users' collection slug
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      access: {
      },
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
    beforeChange: [populatePublishedAt, createdBy],
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
