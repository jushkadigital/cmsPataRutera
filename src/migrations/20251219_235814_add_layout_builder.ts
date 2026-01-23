import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN CREATE TYPE "public"."enum_tours_bussiness_field_definitions_tipo_de_campo" AS ENUM('banner', 'text', 'video'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__tours_v_version_bussiness_field_definitions_tipo_de_campo" AS ENUM('banner', 'text', 'video'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  CREATE TABLE IF NOT EXISTS "tours_bussiness_field_definitions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tipo_de_campo" "enum_tours_bussiness_field_definitions_tipo_de_campo",
  	"texto" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_bussiness_comb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar,
  	"items_sel" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_version_bussiness_field_definitions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"tipo_de_campo" "enum__tours_v_version_bussiness_field_definitions_tipo_de_campo",
  	"texto" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_version_bussiness_comb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar,
  	"items_sel" jsonb,
  	"_uuid" varchar
  );
  
  ALTER TABLE "tours" ADD COLUMN IF NOT EXISTS "bussiness_nombre_del_proyecto" varchar;
  ALTER TABLE "_tours_v" ADD COLUMN IF NOT EXISTS "version_bussiness_nombre_del_proyecto" varchar;
  DO $$ BEGIN
   ALTER TABLE "tours_bussiness_field_definitions" ADD CONSTRAINT "tours_bussiness_field_definitions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_bussiness_comb" ADD CONSTRAINT "tours_bussiness_comb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_version_bussiness_field_definitions" ADD CONSTRAINT "_tours_v_version_bussiness_field_definitions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_version_bussiness_comb" ADD CONSTRAINT "_tours_v_version_bussiness_comb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_bussiness_field_definitions_order_idx" ON "tours_bussiness_field_definitions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_bussiness_field_definitions_parent_id_idx" ON "tours_bussiness_field_definitions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_bussiness_comb_order_idx" ON "tours_bussiness_comb" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_bussiness_comb_parent_id_idx" ON "tours_bussiness_comb" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_bussiness_field_definitions_order_idx" ON "_tours_v_version_bussiness_field_definitions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_bussiness_field_definitions_parent_id_idx" ON "_tours_v_version_bussiness_field_definitions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_bussiness_comb_order_idx" ON "_tours_v_version_bussiness_comb" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_bussiness_comb_parent_id_idx" ON "_tours_v_version_bussiness_comb" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tours_bussiness_field_definitions" CASCADE;
  DROP TABLE "tours_bussiness_comb" CASCADE;
  DROP TABLE "_tours_v_version_bussiness_field_definitions" CASCADE;
  DROP TABLE "_tours_v_version_bussiness_comb" CASCADE;
  ALTER TABLE "tours" DROP COLUMN IF EXISTS "bussiness_nombre_del_proyecto";
  ALTER TABLE "_tours_v" DROP COLUMN IF EXISTS "version_bussiness_nombre_del_proyecto";
  DROP TYPE "public"."enum_tours_bussiness_field_definitions_tipo_de_campo";
  DROP TYPE "public"."enum__tours_v_version_bussiness_field_definitions_tipo_de_campo";`)
}
