import { getContainer } from './container'
import { registerSubscribers } from './subscribers'

export async function setupApp(): Promise<void> {
  try {
    const container = await getContainer()
    registerSubscribers(container)
  } catch (error) {
    console.error('Error in app bootstrap:', error)
  }
}
