import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours" ALTER COLUMN "price_general" SET DEFAULT 0;
  ALTER TABLE "_tours_v" ALTER COLUMN "version_price_general" SET DEFAULT 0;
  ALTER TABLE "paquetes" ALTER COLUMN "price_general" SET DEFAULT 0;
  ALTER TABLE "_paquetes_v" ALTER COLUMN "version_price_general" SET DEFAULT 0;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours" ALTER COLUMN "price_general" DROP DEFAULT;
  ALTER TABLE "_tours_v" ALTER COLUMN "version_price_general" DROP DEFAULT;
  ALTER TABLE "paquetes" ALTER COLUMN "price_general" DROP DEFAULT;
  ALTER TABLE "_paquetes_v" ALTER COLUMN "version_price_general" DROP DEFAULT;`)
}
