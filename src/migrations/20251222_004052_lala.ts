import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours" ADD COLUMN IF NOT EXISTS "domain_tour_id" varchar;
  ALTER TABLE "_tours_v" ADD COLUMN IF NOT EXISTS "version_domain_tour_id" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours" DROP COLUMN IF EXISTS "domain_tour_id";
  ALTER TABLE "_tours_v" DROP COLUMN IF EXISTS "version_domain_tour_id";`)
}
