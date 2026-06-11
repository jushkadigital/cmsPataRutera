import type { CollectionBeforeChangeHook, FieldHook } from 'payload'
import type { Tour } from '@/payload-types'


export const PopulateDuration: CollectionBeforeChangeHook<Tour> = async ({ data }) => {
  if (!data.layout) {
    return data
  }

  const duration = data.durationGeneral ?? 1

  data.layout.forEach(block => {
    if (block.blockType === 'dataTour') {
      block.duration.valueDia = duration
    }
  })

  return data
}
