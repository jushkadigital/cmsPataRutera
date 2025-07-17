
import type { BlocksField, GroupField } from 'payload'

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { PaqueteHerocar } from '@/blocks/PaqueteHerocar/config'

export const heroPaquete: BlocksField = {
    name: 'heroPaquete',
    type: 'blocks',
    maxRows: 1,
    blocks: [
        PaqueteHerocar
    ],
}
