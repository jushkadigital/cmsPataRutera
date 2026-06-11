import type {
  CollectionBeforeOperationHook,
  CollectionConfig,
  ImageUploadFormatOptions,
} from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

const uploadDataFields = [
  'filename',
  'filesize',
  'height',
  'mimeType',
  'url',
  'width',
] as const

const webpExtension = '.webp'
const webpMimeType = 'image/webp'
const binaryMimeTypes = new Set(['application/octet-stream', 'binary/octet-stream'])
const supportedImageMimeTypes = new Set([
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/tiff',
  webpMimeType,
])
const imageMimeTypesByExtension: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  [webpExtension]: webpMimeType,
}
const webpFormatOptions: ImageUploadFormatOptions = {
  format: 'webp',
  options: { quality: 80 },
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const getString = (value: unknown): string | null => {
  return typeof value === 'string' ? value : null
}

const getS3UploadURL = (filename: string): string | null => {
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION

  if (!bucket || !region) {
    return null
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${filename}`
}

const isLocalUploadURL = (value: string): boolean => {
  return value.startsWith('/') || value.startsWith(`${process.env.PAYLOAD_DOMAIN_URL || ''}/media/`)
}

const hasExplicitUploadEdits = (value: unknown): boolean => {
  return isRecord(value) && ('crop' in value || 'focalPoint' in value)
}

const isWebPFileData = (data: Record<string, unknown>): boolean => {
  const filename = getString(data.filename)?.toLowerCase() || ''
  const mimeType = getString(data.mimeType)?.toLowerCase() || ''
  const url = getString(data.url)?.toLowerCase() || ''

  if (!url || isLocalUploadURL(url)) {
    return false
  }

  return filename.endsWith(webpExtension) || mimeType === webpMimeType || url.endsWith(webpExtension)
}

const hasWebPImageSizes = (data: Record<string, unknown>): boolean => {
  if (!isRecord(data.sizes)) {
    return false
  }

  const imageSizes = Object.values(data.sizes).filter(isRecord)

  return imageSizes.length > 0 && imageSizes.every(isWebPFileData)
}

const getExtension = (value: string): string => {
  const pathname = value.split('?')[0]?.toLowerCase() || ''
  const extensionStart = pathname.lastIndexOf('.')

  return extensionStart === -1 ? '' : pathname.slice(extensionStart)
}

const getImageMimeTypeFromUploadData = (data: Record<string, unknown>): string | null => {
  const mimeType = getString(data.mimeType)?.toLowerCase() || ''

  if (supportedImageMimeTypes.has(mimeType) && !binaryMimeTypes.has(mimeType)) {
    return mimeType
  }

  const filename = getString(data.filename) || getString(data.url) || ''
  const inferredMimeType = imageMimeTypesByExtension[getExtension(filename)]

  return inferredMimeType || null
}

const getOriginalUploadData = async (
  args: Record<string, unknown>,
  req: Parameters<CollectionBeforeOperationHook>[0]['req'],
): Promise<Record<string, unknown> | null> => {
  const id = args.id

  if (typeof id !== 'number' && typeof id !== 'string') {
    return null
  }

  const doc = await req.payload.findByID({
    collection: 'media',
    depth: 0,
    id,
    overrideAccess: true,
    req,
  })

  return isRecord(doc) ? doc : null
}

const getExistingUploadFile = async (data: Record<string, unknown>, req: Parameters<CollectionBeforeOperationHook>[0]['req']) => {
  const filename = getString(data.filename)
  const mimeType = getImageMimeTypeFromUploadData(data)
  const storedURL = getString(data.url)
  const url = storedURL && !isLocalUploadURL(storedURL) ? storedURL : filename ? getS3UploadURL(filename) : null

  if (!url || !filename || !mimeType) {
    return
  }

  const response = await fetch(url, {
    headers: req.headers.get('cookie') ? { cookie: req.headers.get('cookie') || '' } : undefined,
  })

  if (!response.ok) {
    return
  }

  const buffer = Buffer.from(await response.arrayBuffer())

  req.file = {
    data: buffer,
    mimetype: mimeType,
    name: filename,
    size: Number(response.headers.get('content-length')) || buffer.length,
  }
}

const getMediaAdminThumbnail = (doc: unknown): string | null => {
  if (!isRecord(doc)) {
    return null
  }

  if (isRecord(doc.sizes) && isRecord(doc.sizes.thumbnail)) {
    return getString(doc.sizes.thumbnail.url) || getString(doc.url)
  }

  return getString(doc.url)
}

export const skipUploadProcessingForMetadataOnlyUpdate: CollectionBeforeOperationHook = async ({
  args,
  operation,
  req,
}) => {
  if (
    operation !== 'update' ||
    req.file ||
    hasExplicitUploadEdits(req.query?.uploadEdits) ||
    !isRecord(args) ||
    !isRecord(args.data)
  ) {
    return args
  }

  const uploadData = getString(args.data.filename)
    ? args.data
    : await getOriginalUploadData(args, req)

  if (!uploadData) {
    return args
  }

  if (!hasWebPImageSizes(uploadData)) {
    await getExistingUploadFile(uploadData, req)

    return args
  }

  const data = { ...args.data }

  for (const field of uploadDataFields) {
    delete data[field]
  }

  data.sizes = uploadData.sizes

  args.data = data

  return args
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeOperation: [skipUploadProcessingForMetadataOnlyUpdate],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    //staticDir: path.resolve(dirname, '../../public/media'),
    disableLocalStorage: true,
    formatOptions: webpFormatOptions,
    adminThumbnail: ({ doc }) => getMediaAdminThumbnail(doc),
    focalPoint: true,
    imageSizes: [
      {
        formatOptions: webpFormatOptions,
        name: 'thumbnail',
        width: 300,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'small',
        width: 600,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'medium',
        width: 900,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'large',
        width: 1400,
      },
      {
        formatOptions: webpFormatOptions,
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        formatOptions: webpFormatOptions,
      },
    ],
  },
}
