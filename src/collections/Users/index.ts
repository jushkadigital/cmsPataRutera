import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'
import { admin, editor, user } from './access'
import { protectRoles } from './hooks/protectRoles'
import { syncToWebhook, capturePassword } from './hooks/syncToWebhook'
import { syncToMedusa } from './hooks/medusaWebhook'


export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: editor,
    read: user,
    update: user,
    delete: admin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'email',
  },
  auth: {
    useAPIKey: true,
  },
  hooks: {
    beforeChange: [],
    afterChange: [],
  },
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      defaultValue: 'user',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      hooks: {
        beforeChange: [protectRoles]
      }
    },
    {
      name: 'name',
      type: 'text',
    },

  ],
  timestamps: true,
}
