import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "block_title_tag";
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "block_title_size";
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "block_title_text_color";
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "block_title_underline_color";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "block_title_tag";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "block_title_size";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "block_title_text_color";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "block_title_underline_color";
  DROP TYPE "public"."enum_tours_blocks_svticket_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_svticket_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_svticket_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_svticket_block_title_size";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_blocks_svticket_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_svticket_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_svticket_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_svticket_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  ALTER TABLE "tours_blocks_svticket" ADD COLUMN "block_title_tag" "enum_tours_blocks_svticket_block_title_tag" DEFAULT 'h2';
  ALTER TABLE "tours_blocks_svticket" ADD COLUMN "block_title_size" "enum_tours_blocks_svticket_block_title_size" DEFAULT 'medium';
  ALTER TABLE "tours_blocks_svticket" ADD COLUMN "block_title_text_color" varchar DEFAULT '#2970B7';
  ALTER TABLE "tours_blocks_svticket" ADD COLUMN "block_title_underline_color" varchar DEFAULT '#EFBA06';
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN "block_title_tag" "enum__tours_v_blocks_svticket_block_title_tag" DEFAULT 'h2';
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN "block_title_size" "enum__tours_v_blocks_svticket_block_title_size" DEFAULT 'medium';
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN "block_title_text_color" varchar DEFAULT '#2970B7';
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN "block_title_underline_color" varchar DEFAULT '#EFBA06';`)
}
