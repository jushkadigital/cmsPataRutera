import type { CollectionAfterChangeHook, FieldHook } from 'payload'

import type { Tour } from '@/payload-types'

export const PopulatePrice: CollectionAfterChangeHook<Tour> = async ({ doc }) => {
    if (!doc.layout) {
        return doc
    }
    if (doc.layout.length > 0) {
        doc.layout.map(block => {
            if (block.blockType == 'descrPrice') {
                block.rightColumn.price = doc.priceGeneral
            }
        })
    }

    doc.price = doc.priceGeneral

    return doc
}