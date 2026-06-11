import type { Payload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import type { ClaimResult, IdempotencyStore } from './IdempotencyStore'

const DEFAULT_STALE_TIMEOUT_MS = 5 * 60 * 1000

export class PostgresIdempotencyStore implements IdempotencyStore {
  private readonly payload: Payload

  constructor({ payload }: { payload: Payload }) {
    this.payload = payload
  }

  async claim(consumerGroup: string, eventId: string, staleTimeoutMs = DEFAULT_STALE_TIMEOUT_MS): Promise<ClaimResult> {
    const staleInterval = `${Math.floor(staleTimeoutMs / 1000)} seconds`

    const result = await this.payload.db.execute({
      db: this.payload.db.drizzle,
      sql: sql`
        INSERT INTO processed_events (consumer_group, event_id, status, locked_at)
        VALUES (${consumerGroup}, ${eventId}, 'processing', NOW())
        ON CONFLICT (consumer_group, event_id) DO UPDATE
        SET status = 'processing', locked_at = NOW(), completed_at = NULL
        WHERE processed_events.status != 'completed'
          AND (processed_events.status = 'failed'
               OR processed_events.locked_at < NOW() - INTERVAL ${sql.raw(`'${staleInterval}'`)})
        RETURNING event_id, status
      `,
    })

    const rows = result.rows as Array<{ event_id: string; status: string }>
    if (rows.length === 0) {
      const existing = await this.payload.db.execute({
        db: this.payload.db.drizzle,
        sql: sql`
          SELECT status FROM processed_events
          WHERE consumer_group = ${consumerGroup} AND event_id = ${eventId}
        `,
      })
      const existingRows = existing.rows as Array<{ status: string }>
      const status = existingRows[0]?.status
      if (status === 'completed') return 'completed'
      return 'locked'
    }

    return 'claimed'
  }

  async markCompleted(consumerGroup: string, eventId: string): Promise<void> {
    await this.payload.db.execute({
      db: this.payload.db.drizzle,
      sql: sql`
        UPDATE processed_events
        SET status = 'completed', completed_at = NOW()
        WHERE consumer_group = ${consumerGroup} AND event_id = ${eventId}
      `,
    })
  }

  async markFailed(consumerGroup: string, eventId: string): Promise<void> {
    await this.payload.db.execute({
      db: this.payload.db.drizzle,
      sql: sql`
        UPDATE processed_events
        SET status = 'failed', completed_at = NOW()
        WHERE consumer_group = ${consumerGroup} AND event_id = ${eventId}
      `,
    })
  }

  async cleanup(olderThanDays = 30): Promise<number> {
    const result = await this.payload.db.execute({
      db: this.payload.db.drizzle,
      sql: sql`
        DELETE FROM processed_events
        WHERE completed_at < NOW() - INTERVAL '${sql.raw(String(olderThanDays))} days'
          AND status IN ('completed', 'failed')
      `,
    })

    return result.rowCount ?? 0
  }
}
