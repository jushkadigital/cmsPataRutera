import type { BlocksField, GroupField } from 'payload'

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { TourHerocarBlock } from '@/blocks/TourHerocar/config'

export const heroTour: BlocksField = {
    name: 'heroTour',
    type: 'blocks',
    maxRows: 1,
    blocks: [
        TourHerocarBlock
    ],
}
