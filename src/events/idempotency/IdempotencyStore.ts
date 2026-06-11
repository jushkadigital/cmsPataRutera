export type ClaimResult = 'claimed' | 'completed' | 'locked'

export interface IdempotencyRecord {
  consumerGroup: string
  eventId: string
  status: 'processing' | 'completed' | 'failed'
}

export interface IdempotencyStore {
  claim(consumerGroup: string, eventId: string, staleTimeoutMs?: number): Promise<ClaimResult>
  markCompleted(consumerGroup: string, eventId: string): Promise<void>
  markFailed(consumerGroup: string, eventId: string): Promise<void>
  cleanup(olderThanDays?: number): Promise<number>
}
