import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "description" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_description" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_description";`)
}
