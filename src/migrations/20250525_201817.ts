import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_text_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_text_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_text_content_description_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_grid_images_type_grid" AS ENUM('masonry', 'overlapping', 'list', 'mosaic', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_row_block_columns_column_width" AS ENUM('25', '33.333333', '50', '66.666667', '75', '100');
  CREATE TYPE "public"."enum__pages_v_blocks_text_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_text_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_text_content_description_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_images_type_grid" AS ENUM('masonry', 'overlapping', 'list', 'mosaic', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_row_block_columns_column_width" AS ENUM('25', '33.333333', '50', '66.666667', '75', '100');
  CREATE TABLE IF NOT EXISTS "pages_blocks_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_text_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_text_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum_pages_blocks_text_content_description_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_images_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type_grid" "enum_pages_blocks_grid_images_type_grid" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_text_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_text_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum__pages_v_blocks_text_content_description_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_images_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type_grid" "enum__pages_v_blocks_grid_images_type_grid" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_estadisticas_estadisticas_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_estadisticas_estadisticas_image" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_estadisticas_estadisticas_image" CASCADE;
  DROP TABLE "_pages_v_blocks_estadisticas_estadisticas_image" CASCADE;
  ALTER TABLE "pages_blocks_estadisticas" ALTER COLUMN "estadisticas_text_description" SET DATA TYPE jsonb;
  ALTER TABLE "_pages_v_blocks_estadisticas" ALTER COLUMN "estadisticas_text_description" SET DATA TYPE jsonb;
  ALTER TABLE "pages_blocks_row_block_columns" ADD COLUMN "column_width" "enum_pages_blocks_row_block_columns_column_width" DEFAULT '50';
  ALTER TABLE "_pages_v_blocks_row_block_columns" ADD COLUMN "column_width" "enum__pages_v_blocks_row_block_columns_column_width" DEFAULT '50';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_text_content" ADD CONSTRAINT "pages_blocks_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_images_image" ADD CONSTRAINT "pages_blocks_grid_images_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_images_image" ADD CONSTRAINT "pages_blocks_grid_images_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid_images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_images" ADD CONSTRAINT "pages_blocks_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_text_content" ADD CONSTRAINT "_pages_v_blocks_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_images_image" ADD CONSTRAINT "_pages_v_blocks_grid_images_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_images_image" ADD CONSTRAINT "_pages_v_blocks_grid_images_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grid_images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_images" ADD CONSTRAINT "_pages_v_blocks_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_content_order_idx" ON "pages_blocks_text_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_content_parent_id_idx" ON "pages_blocks_text_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_content_path_idx" ON "pages_blocks_text_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_image_order_idx" ON "pages_blocks_grid_images_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_image_parent_id_idx" ON "pages_blocks_grid_images_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_image_image_idx" ON "pages_blocks_grid_images_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_order_idx" ON "pages_blocks_grid_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_parent_id_idx" ON "pages_blocks_grid_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_path_idx" ON "pages_blocks_grid_images" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_content_order_idx" ON "_pages_v_blocks_text_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_content_parent_id_idx" ON "_pages_v_blocks_text_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_content_path_idx" ON "_pages_v_blocks_text_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_image_order_idx" ON "_pages_v_blocks_grid_images_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_image_parent_id_idx" ON "_pages_v_blocks_grid_images_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_image_image_idx" ON "_pages_v_blocks_grid_images_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_order_idx" ON "_pages_v_blocks_grid_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_parent_id_idx" ON "_pages_v_blocks_grid_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_path_idx" ON "_pages_v_blocks_grid_images" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_estadisticas_estadisticas_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_estadisticas_estadisticas_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_text_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_grid_images_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_grid_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_text_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_grid_images_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_grid_images" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_text_content" CASCADE;
  DROP TABLE "pages_blocks_grid_images_image" CASCADE;
  DROP TABLE "pages_blocks_grid_images" CASCADE;
  DROP TABLE "_pages_v_blocks_text_content" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_images_image" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_images" CASCADE;
  ALTER TABLE "pages_blocks_estadisticas" ALTER COLUMN "estadisticas_text_description" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_estadisticas" ALTER COLUMN "estadisticas_text_description" SET DATA TYPE varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_estadisticas_estadisticas_image" ADD CONSTRAINT "pages_blocks_estadisticas_estadisticas_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_estadisticas_estadisticas_image" ADD CONSTRAINT "pages_blocks_estadisticas_estadisticas_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_estadisticas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_estadisticas_estadisticas_image" ADD CONSTRAINT "_pages_v_blocks_estadisticas_estadisticas_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_estadisticas_estadisticas_image" ADD CONSTRAINT "_pages_v_blocks_estadisticas_estadisticas_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_estadisticas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_estadisticas_estadisticas_image_order_idx" ON "pages_blocks_estadisticas_estadisticas_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_estadisticas_estadisticas_image_parent_id_idx" ON "pages_blocks_estadisticas_estadisticas_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_estadisticas_estadisticas_image_image_idx" ON "pages_blocks_estadisticas_estadisticas_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_estadisticas_estadisticas_image_order_idx" ON "_pages_v_blocks_estadisticas_estadisticas_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_estadisticas_estadisticas_image_parent_id_idx" ON "_pages_v_blocks_estadisticas_estadisticas_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_estadisticas_estadisticas_image_image_idx" ON "_pages_v_blocks_estadisticas_estadisticas_image" USING btree ("image_id");
  ALTER TABLE "pages_blocks_row_block_columns" DROP COLUMN IF EXISTS "column_width";
  ALTER TABLE "_pages_v_blocks_row_block_columns" DROP COLUMN IF EXISTS "column_width";
  DROP TYPE "public"."enum_pages_blocks_text_content_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_text_content_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_text_content_description_alignment";
  DROP TYPE "public"."enum_pages_blocks_grid_images_type_grid";
  DROP TYPE "public"."enum_pages_blocks_row_block_columns_column_width";
  DROP TYPE "public"."enum__pages_v_blocks_text_content_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_text_content_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_text_content_description_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_grid_images_type_grid";
  DROP TYPE "public"."enum__pages_v_blocks_row_block_columns_column_width";`)
}
