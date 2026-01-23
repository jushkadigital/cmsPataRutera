// src/components/AuthGuard.tsx
'use client'

import { useEffect } from 'react'

export const AuthGuard: React.FC = () => {

  useEffect(() => {
    // Verificamos si el backend nos mandó el error de refresh
    // @ts-ignore
    if (session?.error === 'RefreshAccessTokenError') {
      console.warn('La sesión de Keycloak ha expirado. Cerrando sesión local...')

      // Forzamos el cierre de sesión y redirigimos al login
    }
  }, [])

  // Este componente es invisible, no renderiza nada en la UI
  return null
}
