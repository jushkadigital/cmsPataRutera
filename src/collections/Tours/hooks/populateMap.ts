import type { CollectionBeforeChangeHook, FieldHook } from 'payload'

import type { Tour } from '@/payload-types'

export const PopulateMap: CollectionBeforeChangeHook<Tour> = async ({ data }) => {
  // Devuelve los datos tal como vinieron para evitar errores.
  if (!data.heroTour || !data.layout) {
    return data
  }


  const imageToApply = data.heroTour[0]?.ImageContent.image

  // Modificamos el layout usando el precio que ya tenemos.
  data.layout.forEach(block => {
    if (block.blockType === 'mapBlock') {
      if (imageToApply) {
        block.ImageContent.image = imageToApply
      }
    }
  })

  return data
}
