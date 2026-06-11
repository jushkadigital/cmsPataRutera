import type { CollectionBeforeChangeHook } from 'payload'
import type { Paquete } from '@/payload-types'

export const PopulatePrice: CollectionBeforeChangeHook<Paquete> = async ({ data }) => {
  if (data.priceGeneral == null || !data.layout) {
    return data
  }

  const priceToApply = data.priceGeneral

  data.layout.forEach(block => {
    if (block.blockType === 'descrPrice') {
      if (!block.rightColumn) {
        block.rightColumn = {} as any
      }
      block.rightColumn!.price = priceToApply
    }
  })

  data.price = priceToApply

  return data
}
