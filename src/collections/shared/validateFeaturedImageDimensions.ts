import type { Media } from '@/payload-types'
import type { PayloadRequest, UploadFieldSingleValidation } from 'payload'

export const featuredImageMinimumWidth = 1920
export const featuredImageMinimumHeight = 630
export const featuredImageRequiredSizes = ['large', 'xlarge', 'og'] as const

type FeaturedImageRequiredSize = (typeof featuredImageRequiredSizes)[number]
type FeaturedImageSize = NonNullable<Media['sizes']>[FeaturedImageRequiredSize]
type MediaLike = Pick<Media, 'sizes'>
type SizeRequirement = {
  minHeight?: number
  minWidth: number
}

const featuredImageSizeRequirements: Record<FeaturedImageRequiredSize, SizeRequirement> = {
  large: {
    minWidth: 1400,
  },
  xlarge: {
    minWidth: 1920,
  },
  og: {
    minWidth: 1200,
    minHeight: 630,
  },
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const getMediaID = (value: unknown): number | string | null => {
  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }

  if (!isRecord(value)) {
    return null
  }

  const id = value.id

  return typeof id === 'number' || typeof id === 'string' ? id : null
}

const hasRequiredSize = (
  sizeName: FeaturedImageRequiredSize,
  size: FeaturedImageSize | undefined,
): boolean => {
  const requirement = featuredImageSizeRequirements[sizeName]

  if (typeof size?.width !== 'number' || size.width < requirement.minWidth) {
    return false
  }

  if (typeof requirement.minHeight === 'number') {
    return typeof size.height === 'number' && size.height >= requirement.minHeight
  }

  return true
}

const getInvalidSizes = (media: MediaLike): FeaturedImageRequiredSize[] => {
  return featuredImageRequiredSizes.filter((sizeName) => {
    return !hasRequiredSize(sizeName, media.sizes?.[sizeName])
  })
}

const formatSizeRequirement = (sizeName: FeaturedImageRequiredSize): string => {
  const requirement = featuredImageSizeRequirements[sizeName]

  if (typeof requirement.minHeight === 'number') {
    return `${sizeName} ${requirement.minWidth}x${requirement.minHeight}px`
  }

  return `${sizeName} ${requirement.minWidth}px de ancho`
}

const getFeaturedImageValidationMessageForMedia = (media: MediaLike): string | null => {
  const invalidSizes = getInvalidSizes(media)

  if (invalidSizes.length === 0) {
    return null
  }

  return `La imagen destacada debe tener como mínimo ${featuredImageMinimumWidth}px de ancho y ${featuredImageMinimumHeight}px de alto para generar: ${featuredImageRequiredSizes.map(formatSizeRequirement).join(', ')}. Tamaños inválidos: ${invalidSizes.join(', ')}.`
}

const hasMediaSizes = (value: unknown): value is MediaLike => {
  return isRecord(value) && 'sizes' in value
}

export const getFeaturedImageValidationMessage = async (
  value: unknown,
): Promise<string | null> => {
  const mediaID = getMediaID(value)

  if (!mediaID) {
    return 'La imagen destacada es obligatoria.'
  }

  if (hasMediaSizes(value)) {
    return getFeaturedImageValidationMessageForMedia(value)
  }

  return null
}

export const getFeaturedImageValidationMessageForPersistedValue = async (
  value: unknown,
  req: Pick<PayloadRequest, 'payload'>,
): Promise<string | null> => {
  const validationMessage = await getFeaturedImageValidationMessage(value)

  if (validationMessage !== null) {
    return validationMessage
  }

  const mediaID = getMediaID(value)

  if (!mediaID) {
    return 'La imagen destacada es obligatoria.'
  }

  const media = await req.payload.findByID({
    collection: 'media',
    depth: 0,
    id: mediaID,
    overrideAccess: true,
    req,
  })

  return getFeaturedImageValidationMessageForMedia(media)
}

export const validateFeaturedImageDimensions: UploadFieldSingleValidation = async (
  value,
  _options,
) => {
  const validationMessage = await getFeaturedImageValidationMessage(value)

  return validationMessage ?? true
}
