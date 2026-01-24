import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "paquetes" ADD COLUMN "medusa_id" varchar;
  ALTER TABLE "_paquetes_v" ADD COLUMN "version_medusa_id" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "paquetes" DROP COLUMN IF EXISTS "medusa_id";
  ALTER TABLE "_paquetes_v" DROP COLUMN IF EXISTS "version_medusa_id";`)
}
