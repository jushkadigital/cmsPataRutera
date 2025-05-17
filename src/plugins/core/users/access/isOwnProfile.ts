import type { Access } from 'payload/types'

export const isOwnProfile: Access = ({ req: { user }, id }) => {
  // Users can edit their own profile
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  
  return user.id === id
} 