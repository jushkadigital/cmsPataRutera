import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_svticket" ADD COLUMN IF NOT EXISTS "price" numeric;
  ALTER TABLE "tours_blocks_svticket" ADD COLUMN IF NOT EXISTS "time" numeric;
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN IF NOT EXISTS "price" numeric;
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN IF NOT EXISTS "time" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "price";
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "time";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "price";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "time";`)
}
