import type { CollectionBeforeChangeHook, GlobalBeforeChangeHook } from 'payload'

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


export const populatePublishedAtGlobal: GlobalBeforeChangeHook = ({ data, req }) => {
  if (req.data && !req.data.publishedAt) {
    const now = new Date()
    return {
      ...data,
      publishedAt: now,
    }
  }

  return data
}


export const createdByGlobal: GlobalBeforeChangeHook = ({ req, data }) => {
  if (req.user) {
    data.createdBy = req.user.id;
    return data;
  }
  console.log(data.createdBy)
}
