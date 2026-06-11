import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "ofertas" ALTER COLUMN "tour_relacionado_id" DROP NOT NULL`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Before re-adding NOT NULL, must handle any existing NULL rows
  await db.execute(sql`UPDATE "ofertas" SET "tour_relacionado_id" = 0 WHERE "tour_relacionado_id" IS NULL`)
  await db.execute(sql`ALTER TABLE "ofertas" ALTER COLUMN "tour_relacionado_id" SET NOT NULL`)
}
