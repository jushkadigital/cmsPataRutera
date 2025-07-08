import type { User } from '@/payload-types'
import type { Access } from 'payload'

export const checkRole = (allRoles: User['roles'] = [], user: User): boolean => {

  if (user) {
    if (
      allRoles?.some((role) => {
        return user?.roles?.some((individualRole) => {
          return individualRole === role
        })
      })
    ) {
      return true
    }
  }
  return false

}

export const admin: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  }

  return false
}

export const anyone: Access = () => true

export const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }
  }

  return false
}

export const user: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }

    return {
      id: { equals: user.id }
    }
  }

  return false
}

