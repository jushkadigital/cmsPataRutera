
import type { BlocksField, GroupField } from 'payload'

import { TourHerocarBlock } from '@/blocks/TourHerocar/config'
import { Banner } from '@/blocks/Banner/config'

export const heroPost: BlocksField = {
    name: 'heroPost',
    type: 'blocks',
    blocks: [
        Banner
    ],
    maxRows: 1,
    label: 'Hero',
}
