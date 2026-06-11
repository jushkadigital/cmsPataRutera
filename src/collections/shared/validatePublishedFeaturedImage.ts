import { ValidationError, type CollectionBeforeValidateHook } from 'payload'

import { getFeaturedImageValidationMessageForPersistedValue } from './validateFeaturedImageDimensions'

type FeaturedImageContainer = {
  _status?: unknown
  featuredImage?: unknown
}

const isPublished = (value: unknown): boolean => value === 'published'

export const validatePublishedFeaturedImage: CollectionBeforeValidateHook = async ({
  collection,
  data,
  originalDoc,
  req,
}) => {
  const nextData = data as FeaturedImageContainer | undefined
  const previousData = originalDoc as FeaturedImageContainer | undefined
  const willBePublished = isPublished(nextData?._status) || isPublished(previousData?._status)

  if (!willBePublished) {
    return data
  }

  const featuredImageValue = nextData?.featuredImage ?? previousData?.featuredImage
  const validationMessage = await getFeaturedImageValidationMessageForPersistedValue(featuredImageValue, req)

  if (!validationMessage) {
    return data
  }

  throw new ValidationError(
    {
      collection: collection.slug,
      errors: [
        {
          message: validationMessage,
          path: 'featuredImage',
        },
      ],
      req,
    },
    req.t,
  )
}
