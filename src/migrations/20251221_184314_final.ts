import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_svfood" ADD COLUMN IF NOT EXISTS "quantity" numeric;
  ALTER TABLE "_tours_v_blocks_svfood" ADD COLUMN IF NOT EXISTS "quantity" numeric;
  ALTER TABLE "tours_blocks_svfood" DROP COLUMN IF EXISTS "price";
  ALTER TABLE "tours_blocks_svfood" DROP COLUMN IF EXISTS "time";
  ALTER TABLE "tours_blocks_svfood" DROP COLUMN IF EXISTS "food_type";
  ALTER TABLE "_tours_v_blocks_svfood" DROP COLUMN IF EXISTS "price";
  ALTER TABLE "_tours_v_blocks_svfood" DROP COLUMN IF EXISTS "time";
  ALTER TABLE "_tours_v_blocks_svfood" DROP COLUMN IF EXISTS "food_type";
  DROP TYPE "public"."enum_tours_blocks_svfood_food_type";
  DROP TYPE "public"."enum__tours_v_blocks_svfood_food_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_blocks_svfood_food_type" AS ENUM('desayuno', 'cena', 'buffet');
  CREATE TYPE "public"."enum__tours_v_blocks_svfood_food_type" AS ENUM('desayuno', 'cena', 'buffet');
  ALTER TABLE "tours_blocks_svfood" ADD COLUMN "price" numeric;
  ALTER TABLE "tours_blocks_svfood" ADD COLUMN "time" numeric;
  ALTER TABLE "tours_blocks_svfood" ADD COLUMN "food_type" "enum_tours_blocks_svfood_food_type";
  ALTER TABLE "_tours_v_blocks_svfood" ADD COLUMN "price" numeric;
  ALTER TABLE "_tours_v_blocks_svfood" ADD COLUMN "time" numeric;
  ALTER TABLE "_tours_v_blocks_svfood" ADD COLUMN "food_type" "enum__tours_v_blocks_svfood_food_type";
  ALTER TABLE "tours_blocks_svfood" DROP COLUMN IF EXISTS "quantity";
  ALTER TABLE "_tours_v_blocks_svfood" DROP COLUMN IF EXISTS "quantity";`)
}
