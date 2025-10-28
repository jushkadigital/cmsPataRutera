import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, FieldHook } from 'payload'

import type { Tour } from '@/payload-types'

export const PopulatePrice: CollectionBeforeChangeHook<Tour> = async ({ data }) => {
  // Devuelve los datos tal como vinieron para evitar errores.
  if (!data.heroTour || !data.layout) {
    return data
  }

  // Si el código llega aquí, es SEGURO que data.priceGeneral tiene un valor.

  const imageToApply = data.heroTour[0]?.ImageContent.image

  // Modificamos el layout usando el precio que ya tenemos.
  /*data.layout.forEach(block => {
      if (block.blockType === 'mapBlock') {
          block.
      }
  })*/

  // También poblamos el precio a nivel raíz

  return data
}
