import type { CollectionConfig } from 'payload'
import type { Block, RichTextField, Access, User } from 'payload'
import {
  lexicalEditor,
  BlocksFeature,
  ParagraphFeature,
  HeadingFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { authenticated } from '@/access/authenticated'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import DescrPrice from '@/blocks/DescrPrice/config'
import GuiaTour from '@/blocks/GuiaTour/config'

// Helper function for access control (can be shared or redefined)
const authenticatedUser: Access = ({ req: { user } }: { req: { user: User | null } }) => {
  return Boolean(user)
}

// Define Blocks
const TextBlock: Block = {
  slug: 'textBlock',
  labels: {
    singular: 'Text Block',
    plural: 'Text Blocks',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          ParagraphFeature(),
          HeadingFeature(),
        ],
      }),
    },
  ],
}

const ImageBlock: Block = {
  slug: 'imageBlock',
  labels: {
    singular: 'Image Block',
    plural: 'Image Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}

export const Tours: CollectionConfig = {
  slug: 'tours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
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
          collection: 'tours',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'tours',
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
          fields: [],
          label: 'Hero'
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [DescrPrice, GuiaTour],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },

          ],
          label: 'Content'
        }

      ]
    },
  ],
} 