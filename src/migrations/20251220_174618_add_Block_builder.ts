import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN CREATE TYPE "public"."enum_tours_blocks_svfood_food_type" AS ENUM('desayuno', 'cena', 'buffet'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__tours_v_blocks_svfood_food_type" AS ENUM('desayuno', 'cena', 'buffet'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  CREATE TABLE IF NOT EXISTS "tours_blocks_svfood" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"price" numeric,
  	"time" numeric,
  	"food_type" "enum_tours_blocks_svfood_food_type",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_svfood" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"price" numeric,
  	"time" numeric,
  	"food_type" "enum__tours_v_blocks_svfood_food_type",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE IF EXISTS "tours_bussiness_field_definitions" CASCADE;
  DROP TABLE IF EXISTS "_tours_v_version_bussiness_field_definitions" CASCADE;
  ALTER TABLE "tours_blocks_svticket" ADD COLUMN IF NOT EXISTS "price" numeric;
  ALTER TABLE "tours_blocks_svticket" ADD COLUMN IF NOT EXISTS "time" numeric;
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN IF NOT EXISTS "price" numeric;
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN IF NOT EXISTS "time" numeric;
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_svfood" ADD CONSTRAINT "tours_blocks_svfood_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_svfood" ADD CONSTRAINT "_tours_v_blocks_svfood_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_blocks_svfood_order_idx" ON "tours_blocks_svfood" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_svfood_parent_id_idx" ON "tours_blocks_svfood" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_svfood_path_idx" ON "tours_blocks_svfood" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svfood_order_idx" ON "_tours_v_blocks_svfood" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svfood_parent_id_idx" ON "_tours_v_blocks_svfood" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svfood_path_idx" ON "_tours_v_blocks_svfood" USING btree ("_path");
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "url";
  DROP TYPE "public"."enum_tours_bussiness_field_definitions_tipo_de_campo";
  DROP TYPE "public"."enum__tours_v_version_bussiness_field_definitions_tipo_de_campo";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_bussiness_field_definitions_tipo_de_campo" AS ENUM('banner', 'text', 'video');
  CREATE TYPE "public"."enum__tours_v_version_bussiness_field_definitions_tipo_de_campo" AS ENUM('banner', 'text', 'video');
  CREATE TABLE IF NOT EXISTS "tours_bussiness_field_definitions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tipo_de_campo" "enum_tours_bussiness_field_definitions_tipo_de_campo",
  	"texto" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_version_bussiness_field_definitions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tipo_de_campo" "enum__tours_v_version_bussiness_field_definitions_tipo_de_campo",
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  DROP TABLE "tours_blocks_svfood" CASCADE;
  DROP TABLE "_tours_v_blocks_svfood" CASCADE;
  ALTER TABLE "tours_blocks_svticket" ADD COLUMN "url" varchar;
  ALTER TABLE "_tours_v_blocks_svticket" ADD COLUMN "url" varchar;
  DO $$ BEGIN
   ALTER TABLE "tours_bussiness_field_definitions" ADD CONSTRAINT "tours_bussiness_field_definitions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_version_bussiness_field_definitions" ADD CONSTRAINT "_tours_v_version_bussiness_field_definitions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_bussiness_field_definitions_order_idx" ON "tours_bussiness_field_definitions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_bussiness_field_definitions_parent_id_idx" ON "tours_bussiness_field_definitions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_bussiness_field_definitions_order_idx" ON "_tours_v_version_bussiness_field_definitions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_bussiness_field_definitions_parent_id_idx" ON "_tours_v_version_bussiness_field_definitions" USING btree ("_parent_id");
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "price";
  ALTER TABLE "tours_blocks_svticket" DROP COLUMN IF EXISTS "time";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "price";
  ALTER TABLE "_tours_v_blocks_svticket" DROP COLUMN IF EXISTS "time";
  DROP TYPE "public"."enum_tours_blocks_svfood_food_type";
  DROP TYPE "public"."enum__tours_v_blocks_svfood_food_type";`)
}
