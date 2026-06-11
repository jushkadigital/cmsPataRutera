export async function register() {
  if (typeof window !== 'undefined') return

  if (process.env.NEXT_RUNTIME === 'nodejs' || !process.env.NEXT_RUNTIME) {
    // OTel MUST be first — before any other module loads
    const { setupOTelSDK } = await import('@/events/tracing/sdk')
    setupOTelSDK()

    // App bootstrap (DI container + subscribers) runs after OTel
    const { setupApp } = await import('@/app-bootstrap')
    await setupApp()
  }
}
