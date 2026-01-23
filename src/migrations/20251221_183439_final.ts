import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_svticket" ADD COLUMN IF NOT EXISTS "quantity" numeric;
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN IF NOT EXISTS "quantity" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "quantity";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "quantity";`)
}
