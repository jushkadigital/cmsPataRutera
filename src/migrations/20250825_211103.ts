import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_blocks_adicional_tour_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_adicional_tour_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_data_tour_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TYPE "public"."enum__tours_v_blocks_adicional_tour_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_adicional_tour_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_data_tour_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TYPE "public"."enum_paquetes_blocks_adicional_tour_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_paquetes_blocks_adicional_tour_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_paquetes_blocks_data_tour_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TYPE "public"."enum__paquetes_v_blocks_adicional_tour_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__paquetes_v_blocks_adicional_tour_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__paquetes_v_blocks_data_tour_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TABLE IF NOT EXISTS "tours_blocks_adicional_tour_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_adicional_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum_tours_blocks_adicional_tour_title_tag" DEFAULT 'h2',
  	"title_size" "enum_tours_blocks_adicional_tour_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_data_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration_title" varchar,
  	"duration_value_dia" numeric,
  	"duration_value_noche" numeric,
  	"group_size_title" varchar,
  	"group_size_value" numeric,
  	"difficulty" "enum_tours_blocks_data_tour_difficulty" DEFAULT 'easy',
  	"altitud_title" varchar,
  	"altitud_value" numeric,
  	"idioma_title" varchar,
  	"idioma_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_adicional_tour_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_adicional_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum__tours_v_blocks_adicional_tour_title_tag" DEFAULT 'h2',
  	"title_size" "enum__tours_v_blocks_adicional_tour_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_data_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"duration_title" varchar,
  	"duration_value_dia" numeric,
  	"duration_value_noche" numeric,
  	"group_size_title" varchar,
  	"group_size_value" numeric,
  	"difficulty" "enum__tours_v_blocks_data_tour_difficulty" DEFAULT 'easy',
  	"altitud_title" varchar,
  	"altitud_value" numeric,
  	"idioma_title" varchar,
  	"idioma_value" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_adicional_tour_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_adicional_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum_paquetes_blocks_adicional_tour_title_tag" DEFAULT 'h2',
  	"title_size" "enum_paquetes_blocks_adicional_tour_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_data_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration_title" varchar,
  	"duration_value_dia" numeric,
  	"duration_value_noche" numeric,
  	"group_size_title" varchar,
  	"group_size_value" numeric,
  	"difficulty" "enum_paquetes_blocks_data_tour_difficulty" DEFAULT 'easy',
  	"altitud_title" varchar,
  	"altitud_value" numeric,
  	"idioma_title" varchar,
  	"idioma_value" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_adicional_tour_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_adicional_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum__paquetes_v_blocks_adicional_tour_title_tag" DEFAULT 'h2',
  	"title_size" "enum__paquetes_v_blocks_adicional_tour_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_data_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"duration_title" varchar,
  	"duration_value_dia" numeric,
  	"duration_value_noche" numeric,
  	"group_size_title" varchar,
  	"group_size_value" numeric,
  	"difficulty" "enum__paquetes_v_blocks_data_tour_difficulty" DEFAULT 'easy',
  	"altitud_title" varchar,
  	"altitud_value" numeric,
  	"idioma_title" varchar,
  	"idioma_value" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_adicional_tour_array_data" ADD CONSTRAINT "tours_blocks_adicional_tour_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_adicional_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_adicional_tour" ADD CONSTRAINT "tours_blocks_adicional_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_data_tour" ADD CONSTRAINT "tours_blocks_data_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_adicional_tour_array_data" ADD CONSTRAINT "_tours_v_blocks_adicional_tour_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_adicional_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_adicional_tour" ADD CONSTRAINT "_tours_v_blocks_adicional_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_data_tour" ADD CONSTRAINT "_tours_v_blocks_data_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_adicional_tour_array_data" ADD CONSTRAINT "paquetes_blocks_adicional_tour_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes_blocks_adicional_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_adicional_tour" ADD CONSTRAINT "paquetes_blocks_adicional_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_data_tour" ADD CONSTRAINT "paquetes_blocks_data_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_adicional_tour_array_data" ADD CONSTRAINT "_paquetes_v_blocks_adicional_tour_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v_blocks_adicional_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_adicional_tour" ADD CONSTRAINT "_paquetes_v_blocks_adicional_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_data_tour" ADD CONSTRAINT "_paquetes_v_blocks_data_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_blocks_adicional_tour_array_data_order_idx" ON "tours_blocks_adicional_tour_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_adicional_tour_array_data_parent_id_idx" ON "tours_blocks_adicional_tour_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_adicional_tour_order_idx" ON "tours_blocks_adicional_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_adicional_tour_parent_id_idx" ON "tours_blocks_adicional_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_adicional_tour_path_idx" ON "tours_blocks_adicional_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_data_tour_order_idx" ON "tours_blocks_data_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_data_tour_parent_id_idx" ON "tours_blocks_data_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_data_tour_path_idx" ON "tours_blocks_data_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_adicional_tour_array_data_order_idx" ON "_tours_v_blocks_adicional_tour_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_adicional_tour_array_data_parent_id_idx" ON "_tours_v_blocks_adicional_tour_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_adicional_tour_order_idx" ON "_tours_v_blocks_adicional_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_adicional_tour_parent_id_idx" ON "_tours_v_blocks_adicional_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_adicional_tour_path_idx" ON "_tours_v_blocks_adicional_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_data_tour_order_idx" ON "_tours_v_blocks_data_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_data_tour_parent_id_idx" ON "_tours_v_blocks_data_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_data_tour_path_idx" ON "_tours_v_blocks_data_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_adicional_tour_array_data_order_idx" ON "paquetes_blocks_adicional_tour_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_adicional_tour_array_data_parent_id_idx" ON "paquetes_blocks_adicional_tour_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_adicional_tour_order_idx" ON "paquetes_blocks_adicional_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_adicional_tour_parent_id_idx" ON "paquetes_blocks_adicional_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_adicional_tour_path_idx" ON "paquetes_blocks_adicional_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_data_tour_order_idx" ON "paquetes_blocks_data_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_data_tour_parent_id_idx" ON "paquetes_blocks_data_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_data_tour_path_idx" ON "paquetes_blocks_data_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_adicional_tour_array_data_order_idx" ON "_paquetes_v_blocks_adicional_tour_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_adicional_tour_array_data_parent_id_idx" ON "_paquetes_v_blocks_adicional_tour_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_adicional_tour_order_idx" ON "_paquetes_v_blocks_adicional_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_adicional_tour_parent_id_idx" ON "_paquetes_v_blocks_adicional_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_adicional_tour_path_idx" ON "_paquetes_v_blocks_adicional_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_data_tour_order_idx" ON "_paquetes_v_blocks_data_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_data_tour_parent_id_idx" ON "_paquetes_v_blocks_data_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_data_tour_path_idx" ON "_paquetes_v_blocks_data_tour" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tours_blocks_adicional_tour_array_data" CASCADE;
  DROP TABLE "tours_blocks_adicional_tour" CASCADE;
  DROP TABLE "tours_blocks_data_tour" CASCADE;
  DROP TABLE "_tours_v_blocks_adicional_tour_array_data" CASCADE;
  DROP TABLE "_tours_v_blocks_adicional_tour" CASCADE;
  DROP TABLE "_tours_v_blocks_data_tour" CASCADE;
  DROP TABLE "paquetes_blocks_adicional_tour_array_data" CASCADE;
  DROP TABLE "paquetes_blocks_adicional_tour" CASCADE;
  DROP TABLE "paquetes_blocks_data_tour" CASCADE;
  DROP TABLE "_paquetes_v_blocks_adicional_tour_array_data" CASCADE;
  DROP TABLE "_paquetes_v_blocks_adicional_tour" CASCADE;
  DROP TABLE "_paquetes_v_blocks_data_tour" CASCADE;
  DROP TYPE "public"."enum_tours_blocks_adicional_tour_title_tag";
  DROP TYPE "public"."enum_tours_blocks_adicional_tour_title_size";
  DROP TYPE "public"."enum_tours_blocks_data_tour_difficulty";
  DROP TYPE "public"."enum__tours_v_blocks_adicional_tour_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_adicional_tour_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_data_tour_difficulty";
  DROP TYPE "public"."enum_paquetes_blocks_adicional_tour_title_tag";
  DROP TYPE "public"."enum_paquetes_blocks_adicional_tour_title_size";
  DROP TYPE "public"."enum_paquetes_blocks_data_tour_difficulty";
  DROP TYPE "public"."enum__paquetes_v_blocks_adicional_tour_title_tag";
  DROP TYPE "public"."enum__paquetes_v_blocks_adicional_tour_title_size";
  DROP TYPE "public"."enum__paquetes_v_blocks_data_tour_difficulty";`)
}
