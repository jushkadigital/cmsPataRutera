import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.data && !req.data.publishedAt) {
      const now = new Date()
      return {
        ...data,
        publishedAt: now,
      }
    }
  }

  return data
}


export const createdBy: CollectionBeforeChangeHook = ({ req, operation, data }) => {
  if (operation === 'create') {
    if (req.user) {
      data.createdBy = req.user.id;
      return data;
    }
  }
  console.log(data.createdBy)
}
