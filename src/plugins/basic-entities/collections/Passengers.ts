import type { CollectionConfig } from 'payload'
import type { Access, User } from 'payload'

// Helper function for access control (optional but good practice)
const authenticatedUser: Access = ({ req: { user } }: { req: { user: User | null } }) => {
  // Return true if user is logged in, false if not
  return Boolean(user)
}

export const Passengers: CollectionConfig = {
  slug: 'passengers',
  admin: {
    useAsTitle: 'fullName',
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/passengers/${data?.slug ?? data.id}`,
    },
  },
  access: {
    read: authenticatedUser,
    create: authenticatedUser,
    update: authenticatedUser,
    delete: authenticatedUser,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      index: true,
      unique: true,
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      unique: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        }
      }
    },
    // Add other passenger-specific fields here later
  ],
} 