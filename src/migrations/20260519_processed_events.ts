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
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS processed_events`)
}
