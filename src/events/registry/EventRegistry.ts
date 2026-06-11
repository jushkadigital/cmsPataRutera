export interface EventRegistryEntry {
  eventType: string
  eventVersion: number
  category: 'integration' | 'notification' | 'inbound' | 'capacity'
  aggregateType: string
  producer: string
  description: string
  exchange: string
  routingKeyPattern: string
}

export class EventRegistry {
  private entries = new Map<string, EventRegistryEntry>()

  register(entry: EventRegistryEntry): void {
    const key = this.buildKey(entry.eventType, entry.eventVersion)
    this.entries.set(key, entry)
  }

  get(eventType: string, version?: number): EventRegistryEntry | undefined {
    if (version !== undefined) {
      return this.entries.get(this.buildKey(eventType, version))
    }

    const matching = Array.from(this.entries.values()).filter(
      (e) => e.eventType === eventType,
    )
    if (matching.length === 0) return undefined

    return matching.sort((a, b) => b.eventVersion - a.eventVersion)[0]
  }

  getAll(): EventRegistryEntry[] {
    return Array.from(this.entries.values())
  }

  getByCategory(category: 'integration' | 'notification'): EventRegistryEntry[] {
    return Array.from(this.entries.values()).filter((e) => e.category === category)
  }

  getByAggregate(aggregateType: string): EventRegistryEntry[] {
    return Array.from(this.entries.values()).filter((e) => e.aggregateType === aggregateType)
  }

  private buildKey(eventType: string, version: number): string {
    return `${eventType}@v${version}`
  }
}
