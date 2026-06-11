import type { CollectionBeforeChangeHook } from 'payload'
import type { Tour } from '@/payload-types'

export const PopulateGeneralFields: CollectionBeforeChangeHook<Tour> = async ({ data }) => {
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
