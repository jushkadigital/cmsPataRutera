import type { Config } from 'payload'

export const mediaPlugin = () => (incomingConfig: Config): Config => {
  return {
    ...incomingConfig,
    // We'll add media-specific configurations here later
  }
} 