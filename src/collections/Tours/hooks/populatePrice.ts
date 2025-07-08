import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, FieldHook } from 'payload'

import type { Tour } from '@/payload-types'

export const PopulatePrice: CollectionBeforeChangeHook<Tour> = async ({ data }) => {
    // Devuelve los datos tal como vinieron para evitar errores.
    if (!data.priceGeneral || !data.layout) {
        return data
    }

    // Si el código llega aquí, es SEGURO que data.priceGeneral tiene un valor.

    const priceToApply = data.priceGeneral

    // Modificamos el layout usando el precio que ya tenemos.
    data.layout.forEach(block => {
        if (block.blockType === 'descrPrice') {
            if (!block.rightColumn) {
                block.rightColumn = {} as any
            }
            block.rightColumn.price = priceToApply
        }
    })

    // También poblamos el precio a nivel raíz
    data.price = priceToApply

    return data
}