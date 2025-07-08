import type { CollectionAfterChangeHook, FieldHook } from 'payload'

import type { Paquete, Tour } from '@/payload-types'

export const PopulatePrice: CollectionAfterChangeHook<Paquete> = async ({ doc }) => {
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