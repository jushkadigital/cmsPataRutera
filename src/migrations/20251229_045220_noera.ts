import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tours_blocks_svticket" CASCADE;
  DROP TABLE "tours_blocks_svfood" CASCADE;
  DROP TABLE "tours_bussiness_comb" CASCADE;
  DROP TABLE "_tours_v_blocks_svticket" CASCADE;
  DROP TABLE "_tours_v_blocks_svfood" CASCADE;
  DROP TABLE "_tours_v_version_bussiness_comb" CASCADE;
  ALTER TABLE "tours" DROP COLUMN IF EXISTS "bussiness_nombre_del_proyecto";
  ALTER TABLE "tours" DROP COLUMN IF EXISTS "bussiness_external_status";
  ALTER TABLE "tours" DROP COLUMN IF EXISTS "time";
  ALTER TABLE "tours" DROP COLUMN IF EXISTS "domain_tour_id";
  ALTER TABLE "_tours_v" DROP COLUMN IF EXISTS "version_bussiness_nombre_del_proyecto";
  ALTER TABLE "_tours_v" DROP COLUMN IF EXISTS "version_bussiness_external_status";
  ALTER TABLE "_tours_v" DROP COLUMN IF EXISTS "version_time";
  ALTER TABLE "_tours_v" DROP COLUMN IF EXISTS "version_domain_tour_id";
  DROP TYPE "public"."enum_tours_bussiness_external_status";
  DROP TYPE "public"."enum__tours_v_version_bussiness_external_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_bussiness_external_status" AS ENUM('DRAFT', 'PUBLISHED', 'DISCONTINUED');
  CREATE TYPE "public"."enum__tours_v_version_bussiness_external_status" AS ENUM('DRAFT', 'PUBLISHED', 'DISCONTINUED');
  CREATE TABLE IF NOT EXISTS "tours_blocks_svticket" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"quantity" numeric,
  	"price" numeric,
  	"time" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_svfood" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"quantity" numeric,
  	"price" numeric,
  	"time" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_bussiness_comb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"items_sel" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_svticket" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"quantity" numeric,
  	"price" numeric,
  	"time" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_svfood" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"quantity" numeric,
  	"price" numeric,
  	"time" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_version_bussiness_comb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"items_sel" jsonb,
  	"_uuid" varchar
  );
  
  ALTER TABLE "tours" ADD COLUMN "bussiness_nombre_del_proyecto" varchar;
  ALTER TABLE "tours" ADD COLUMN "bussiness_external_status" "enum_tours_bussiness_external_status";
  ALTER TABLE "tours" ADD COLUMN "time" numeric;
  ALTER TABLE "tours" ADD COLUMN "domain_tour_id" varchar;
  ALTER TABLE "_tours_v" ADD COLUMN "version_bussiness_nombre_del_proyecto" varchar;
  ALTER TABLE "_tours_v" ADD COLUMN "version_bussiness_external_status" "enum__tours_v_version_bussiness_external_status";
  ALTER TABLE "_tours_v" ADD COLUMN "version_time" numeric;
  ALTER TABLE "_tours_v" ADD COLUMN "version_domain_tour_id" varchar;
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_svticket" ADD CONSTRAINT "tours_blocks_svticket_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_svfood" ADD CONSTRAINT "tours_blocks_svfood_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_bussiness_comb" ADD CONSTRAINT "tours_bussiness_comb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_svticket" ADD CONSTRAINT "_tours_v_blocks_svticket_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_svfood" ADD CONSTRAINT "_tours_v_blocks_svfood_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_version_bussiness_comb" ADD CONSTRAINT "_tours_v_version_bussiness_comb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_blocks_svticket_order_idx" ON "tours_blocks_svticket" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_svticket_parent_id_idx" ON "tours_blocks_svticket" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_svticket_path_idx" ON "tours_blocks_svticket" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_svfood_order_idx" ON "tours_blocks_svfood" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_svfood_parent_id_idx" ON "tours_blocks_svfood" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_svfood_path_idx" ON "tours_blocks_svfood" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_bussiness_comb_order_idx" ON "tours_bussiness_comb" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_bussiness_comb_parent_id_idx" ON "tours_bussiness_comb" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svticket_order_idx" ON "_tours_v_blocks_svticket" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svticket_parent_id_idx" ON "_tours_v_blocks_svticket" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svticket_path_idx" ON "_tours_v_blocks_svticket" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svfood_order_idx" ON "_tours_v_blocks_svfood" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svfood_parent_id_idx" ON "_tours_v_blocks_svfood" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_svfood_path_idx" ON "_tours_v_blocks_svfood" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_bussiness_comb_order_idx" ON "_tours_v_version_bussiness_comb" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_bussiness_comb_parent_id_idx" ON "_tours_v_version_bussiness_comb" USING btree ("_parent_id");`)
}
