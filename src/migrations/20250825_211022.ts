import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tours_blocks_info_tour_array_data" CASCADE;
  DROP TABLE "tours_blocks_info_tour" CASCADE;
  DROP TABLE "_tours_v_blocks_info_tour_array_data" CASCADE;
  DROP TABLE "_tours_v_blocks_info_tour" CASCADE;
  DROP TYPE "public"."enum_tours_blocks_info_tour_title_tag";
  DROP TYPE "public"."enum_tours_blocks_info_tour_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_info_tour_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_info_tour_title_size";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_blocks_info_tour_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_info_tour_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_info_tour_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_info_tour_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TABLE IF NOT EXISTS "tours_blocks_info_tour_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_info_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum_tours_blocks_info_tour_title_tag" DEFAULT 'h2',
  	"title_size" "enum_tours_blocks_info_tour_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_info_tour_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_info_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum__tours_v_blocks_info_tour_title_tag" DEFAULT 'h2',
  	"title_size" "enum__tours_v_blocks_info_tour_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_info_tour_array_data" ADD CONSTRAINT "tours_blocks_info_tour_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_info_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_info_tour" ADD CONSTRAINT "tours_blocks_info_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_info_tour_array_data" ADD CONSTRAINT "_tours_v_blocks_info_tour_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_info_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_info_tour" ADD CONSTRAINT "_tours_v_blocks_info_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_blocks_info_tour_array_data_order_idx" ON "tours_blocks_info_tour_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_info_tour_array_data_parent_id_idx" ON "tours_blocks_info_tour_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_info_tour_order_idx" ON "tours_blocks_info_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_info_tour_parent_id_idx" ON "tours_blocks_info_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_info_tour_path_idx" ON "tours_blocks_info_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_info_tour_array_data_order_idx" ON "_tours_v_blocks_info_tour_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_info_tour_array_data_parent_id_idx" ON "_tours_v_blocks_info_tour_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_info_tour_order_idx" ON "_tours_v_blocks_info_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_info_tour_parent_id_idx" ON "_tours_v_blocks_info_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_info_tour_path_idx" ON "_tours_v_blocks_info_tour" USING btree ("_path");`)
}
