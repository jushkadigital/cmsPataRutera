import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_svticket" ADD COLUMN IF NOT EXISTS "title_title_text" varchar;
  ALTER TABLE "tours_blocks_svfood" ADD COLUMN IF NOT EXISTS "title_title_text" varchar;
  ALTER TABLE "tours_bussiness_comb" ADD COLUMN IF NOT EXISTS "title_title_text" varchar;
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN IF NOT EXISTS "title_title_text" varchar;
  ALTER TABLE "_tours_v_blocks_svfood" ADD COLUMN IF NOT EXISTS "title_title_text" varchar;
  ALTER TABLE "_tours_v_version_bussiness_comb" ADD COLUMN IF NOT EXISTS "title_title_text" varchar;
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "block_title_title_text";
  ALTER TABLE "tours_blocks_svfood" DROP COLUMN IF EXISTS "block_title_title_text";
  ALTER TABLE "tours_bussiness_comb" DROP COLUMN IF EXISTS "nombre";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "block_title_title_text";
  ALTER TABLE "_tours_v_blocks_svfood" DROP COLUMN IF EXISTS "block_title_title_text";
  ALTER TABLE "_tours_v_version_bussiness_comb" DROP COLUMN IF EXISTS "nombre";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_svticket" ADD COLUMN "block_title_title_text" varchar;
  ALTER TABLE "tours_blocks_svfood" ADD COLUMN "block_title_title_text" varchar;
  ALTER TABLE "tours_bussiness_comb" ADD COLUMN "nombre" varchar;
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN "block_title_title_text" varchar;
  ALTER TABLE "_tours_v_blocks_svfood" ADD COLUMN "block_title_title_text" varchar;
  ALTER TABLE "_tours_v_version_bussiness_comb" ADD COLUMN "nombre" varchar;
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "title_title_text";
  ALTER TABLE "tours_blocks_svfood" DROP COLUMN IF EXISTS "title_title_text";
  ALTER TABLE "tours_bussiness_comb" DROP COLUMN IF EXISTS "title_title_text";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "title_title_text";
  ALTER TABLE "_tours_v_blocks_svfood" DROP COLUMN IF EXISTS "title_title_text";
  ALTER TABLE "_tours_v_version_bussiness_comb" DROP COLUMN IF EXISTS "title_title_text";`)
}
