import type { CollectionBeforeChangeHook } from 'payload'
import type { Paquete } from '@/payload-types'

export const PopulateGeneralFields: CollectionBeforeChangeHook<Paquete> = async ({ data }) => {
  if (!data.layout) return data

  for (const block of data.layout) {
    if (block.blockType === 'dataTour') {
      if (block.duration?.valueDia != null) {
        data.durationGeneral = block.duration.valueDia
      }
      break
    }
  }

  return data
}
