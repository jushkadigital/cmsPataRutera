import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours" ADD COLUMN IF NOT EXISTS "time" numeric;
  ALTER TABLE "_tours_v" ADD COLUMN IF NOT EXISTS "version_time" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours" DROP COLUMN IF EXISTS "time";
  ALTER TABLE "_tours_v" DROP COLUMN IF EXISTS "version_time";`)
}
