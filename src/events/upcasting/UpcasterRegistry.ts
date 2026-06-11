import type { EventEnvelope } from '@/events/envelope'

export interface EventUpcaster {
  eventType: string
  fromVersion: number
  toVersion: number
  upcast(envelope: EventEnvelope): EventEnvelope
}

export class UpcasterRegistry {
  private upcasters = new Map<string, EventUpcaster[]>()

  register(upcaster: EventUpcaster): void {
    const key = this.buildKey(upcaster.eventType, upcaster.fromVersion)
    const existing = this.upcasters.get(key) ?? []
    existing.push(upcaster)
    this.upcasters.set(key, existing)
  }

  upcast(envelope: EventEnvelope): EventEnvelope {
    const currentVersion = envelope.metadata.eventVersion
    let currentEnvelope = envelope

    for (let version = currentVersion; ; version++) {
      const key = this.buildKey(currentEnvelope.metadata.eventType, version)
      const chain = this.upcasters.get(key)

      if (!chain || chain.length === 0) {
        break
      }

      for (const upcaster of chain) {
        currentEnvelope = upcaster.upcast(currentEnvelope)
      }
    }

    return currentEnvelope
  }

  private buildKey(eventType: string, fromVersion: number): string {
    return `${eventType}@v${fromVersion}`
  }
}
