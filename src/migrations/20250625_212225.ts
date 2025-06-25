import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "meta_canonical_url" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_canonical_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_canonical_url";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_canonical_url";`)
}
