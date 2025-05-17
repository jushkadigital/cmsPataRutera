import type { Access } from 'payload/types'

export const isAuthenticated: Access = ({ req: { user } }) => {
  // Return true if user exists (is logged in)
  return Boolean(user)
} 