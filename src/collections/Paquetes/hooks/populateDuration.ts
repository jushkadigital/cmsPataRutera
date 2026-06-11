import type { CollectionBeforeChangeHook } from 'payload'
import type { Paquete } from '@/payload-types'


export const PopulateDuration: CollectionBeforeChangeHook<Paquete> = async ({ data }) => {
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
