import type { Plugin, Config } from 'payload'
import { Passengers } from './collections/Passengers'
import { Tours } from './collections/Tours'

export const basicEntitiesPlugin = (): Plugin => (config: Config) => {
  return {
    ...config,
    collections: [
      ...(config.collections || []),
      //Passengers,
      Tours,
    ],
  }
}

// Optionally export collections directly if needed elsewhere
export { Passengers, Tours }
