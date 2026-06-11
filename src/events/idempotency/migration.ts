import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS processed_events (
      consumer_group VARCHAR(100) NOT NULL,
      event_id VARCHAR(64) NOT NULL,
      status VARCHAR(20) DEFAULT 'processing',
      locked_at TIMESTAMPTZ DEFAULT NOW(),
      completed_at TIMESTAMPTZ,
      result JSONB,
      PRIMARY KEY (consumer_group, event_id)
    )
  `)

  await db.execute(sql`
    ALTER TABLE processed_events ADD COLUMN IF NOT EXISTS locked_at TIMESTAMPTZ DEFAULT NOW()
  `)

  await db.execute(sql`
    ALTER TABLE processed_events ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ
  `)

  await db.execute(sql`
    UPDATE processed_events SET locked_at = processed_at WHERE locked_at IS NULL
  `)

  await db.execute(sql`
    ALTER TABLE processed_events DROP COLUMN IF EXISTS processed_at
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS processed_events`)
}
