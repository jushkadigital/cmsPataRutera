export async function register() {
  if (typeof window !== 'undefined') {
    return // Skip on client side
  }

  // Only run on Node.js runtime (server side)
  if (process.env.NEXT_RUNTIME === 'nodejs' || !process.env.NEXT_RUNTIME) {
    console.log('Registering Next.js Node instrumentation...')
    const { getContainer } = await import('./container');
    const { registerSubscribers } = await import('./subscribers')
    try {
      // 1. Obtenemos el contenedor (esto inicializa Payload y conecta la BD)
      const container = await getContainer();

      // 2. Resolvemos el servicio de RabbitMQ

      // 3. ARRANCAMOS el consumidor explícitamente
      // Esto es mejor que hacerlo dentro de 'buildContainer' porque tienes control
      // de cuándo empieza a escuchar.


      // 2. Registramos los suscriptores y arrancamos RabbitMQ
      // Al pasarle el contenedor, registerSubscribers puede resolver 'rabbitMQEventBus'
      // y 'payload' limpiamente.
      registerSubscribers(container)
      console.log('✅ Servicios iniciados correctamente vía Instrumentation');

    } catch (error) {
      console.error('❌ Error fatal en instrumentation:', error);
    }
    //  await import('@/instrumentation-node')
    console.log('Next.js Node instrumentation registered.')
  }
}
