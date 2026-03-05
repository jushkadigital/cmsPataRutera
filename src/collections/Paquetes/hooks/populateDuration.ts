
import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, FieldHook } from 'payload'
import type { Tour } from '@/payload-types'


export const PopulateMaxPassengers: CollectionBeforeChangeHook<Tour> = async ({ data }) => {
  // Devuelve los datos tal como vinieron para evitar errores.
  if (!data.durationGeneral || !data.layout) {
    return data
  }

  // Si el código llega aquí, es SEGURO que data.priceGeneral tiene un valor.

  const duration = data.durationGeneral

  // Modificamos el layout usando el precio que ya tenemos.
  data.layout.forEach(block => {
    if (block.blockType === 'dataTour') {
      block.duration.valueDia = duration
    }
  })
  // También poblamos el precio a nivel raíz

  return data
}
