import type { Config } from 'payload'

// Access control functions
const isAdmin = ({ req }: { req: any }): boolean => {
  return Boolean(req.user?.roles?.includes('admin'))
}

const isAuthenticated = ({ req }: { req: any }): boolean => {
  return Boolean(req.user)
}

const isOwnProfile = ({ req, id }: { req: any; id: string }): boolean => {
  if (!req.user) return false
  if (req.user.roles?.includes('admin')) return true
  
  return req.user.id === id
}

export const usersPlugin = () => (incomingConfig: Config): Config => {
  return {
    ...incomingConfig,
    // We'll add more configuration here in the future
  }
}

// Export access control helpers
export { isAdmin, isAuthenticated, isOwnProfile } 