import type { FieldHook } from 'payload'
import type { User } from '@/payload-types'

export const protectRoles: FieldHook<{ id: string } & User> = ({ data, req }) => {
  const isAdmin = req.user?.roles?.includes('admin')
  console.log(req.user?.roles)
  console.log("ENTREE")



  const userRoles = new Set(data?.roles || [])
  console.log(userRoles)
  userRoles.add('user')
  console.log(userRoles)
  return [...userRoles]
}