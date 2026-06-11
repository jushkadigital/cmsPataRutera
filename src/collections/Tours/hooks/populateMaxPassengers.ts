import type { CollectionBeforeChangeHook } from 'payload'
import type { Tour } from '@/payload-types'

export const PopulateMaxPassengers: CollectionBeforeChangeHook<Tour> = async ({ data }) => {
  if (!data.layout) return data

  const maxPassengers = data.maxPassengersGeneral ?? 1
  const featuredImage = data.featuredImage

  data.layout.forEach(block => {
    if (block.blockType === 'dataTour') {
      block.groupSize.value = maxPassengers
      if (featuredImage != null) {
        block.thumbnail = featuredImage
      }
    }
  })

  data.maxPassengers = maxPassengers

  return data
}
