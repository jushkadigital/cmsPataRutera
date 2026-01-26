// app/api/auth/[...nextauth]/route.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAuthjsInstance } from 'payload-authjs'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

// ESTA FUNCIÓN ES LA CLAVE: Retrasa la conexión hasta que la app ya esté corriendo
async function getHandlers() {
  const payload = await getPayload({ config })
  return getAuthjsInstance(payload)
}

export const GET = async (req: NextRequest) => {
  const { handlers } = await getHandlers()
  return handlers.GET(req)
}

export const POST = async (req: NextRequest) => {
  const { handlers } = await getHandlers()
  return handlers.POST(req)
}
