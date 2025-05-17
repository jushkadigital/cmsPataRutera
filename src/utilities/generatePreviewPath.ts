import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  tours: '/tours',
  paquetes: '/paquetes',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug === 'home' ? '' : slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  req.payload.logger.info(encodedParams.toString())
  const url = `${process.env.NEXTJS_FRONTEND_URL}/next/preview?${encodedParams.toString()}`

  return url
}
