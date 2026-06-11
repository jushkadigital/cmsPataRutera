import type { CollectionBeforeChangeHook } from 'payload'
import type { Paquete } from '@/payload-types'

/**
 * Captures whether the paquete is currently published BEFORE changes are applied.
 * Uses `draft: false` to fetch the published version, bypassing the draft that
 * previousDoc would return. Stores result in req.context for emitPaqueteChange
 * to read in afterChange.
 *
 * This works around Payload CMS Issue #4405 where previousDoc._status is
 * unreliable with drafts+autosave enabled.
 */
export const capturePublishedState: CollectionBeforeChangeHook<Paquete> = async ({
  data,
  originalDoc,
  req,
}) => {
  if (!originalDoc?.id) {
    req.context = { ...req.context, wasPreviouslyPublished: false }
    return data
  }

  try {
    const existing = await req.payload.findByID({
      collection: 'paquetes',
      id: originalDoc.id,
      draft: false,
      depth: 0,
      overrideAccess: true,
    })

    req.context = {
      ...req.context,
      wasPreviouslyPublished: existing?._status === 'published',
    }
  } catch {
    req.context = { ...req.context, wasPreviouslyPublished: false }
  }

  return data
}
