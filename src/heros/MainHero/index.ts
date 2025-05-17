import type { BlocksField, GroupField } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Banner } from '@/blocks/Banner/config'
import { CarouselHeroPage } from '@/blocks/CarouselHeroPage/config'

export const heroPage: BlocksField = {
  name: 'heroPageBlocks',
  type: 'blocks',
  blocks: [
    Banner,
    CarouselHeroPage
  ],
  maxRows: 1,
  admin: {
    initCollapsed: true,
  },
  label: 'Hero',
}
