import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_you_tube_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_you_tube_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_you_tube_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_you_tube_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_ofertas_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_ofertas_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_ofertas_type_grid" AS ENUM('masonry', 'overlapping', 'list', 'mosaic', 'grid');
  CREATE TYPE "public"."enum_tours_blocks_carousel_destination_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_carousel_destination_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_tik_tok_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_tik_tok_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_beneficios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_beneficios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_grid_images_type_grid" AS ENUM('masonry', 'overlapping', 'list', 'mosaic', 'grid');
  CREATE TYPE "public"."enum_tours_blocks_row_block_columns_column_width" AS ENUM('25', '33.333333', '50', '66.666667', '75', '100');
  CREATE TYPE "public"."enum__tours_v_blocks_ofertas_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_ofertas_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_ofertas_type_grid" AS ENUM('masonry', 'overlapping', 'list', 'mosaic', 'grid');
  CREATE TYPE "public"."enum__tours_v_blocks_carousel_destination_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_carousel_destination_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_tik_tok_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_tik_tok_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_beneficios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_beneficios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_grid_images_type_grid" AS ENUM('masonry', 'overlapping', 'list', 'mosaic', 'grid');
  CREATE TYPE "public"."enum__tours_v_blocks_row_block_columns_column_width" AS ENUM('25', '33.333333', '50', '66.666667', '75', '100');
  CREATE TABLE IF NOT EXISTS "pages_blocks_you_tube_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_you_tube_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_you_tube_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_you_tube_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_you_tube_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_you_tube_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_you_tube_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_you_tube_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_ofertas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum_tours_blocks_ofertas_title_tag" DEFAULT 'h2',
  	"title_size" "enum_tours_blocks_ofertas_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"type_grid" "enum_tours_blocks_ofertas_type_grid" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_carousel_destination" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum_tours_blocks_carousel_destination_title_tag" DEFAULT 'h2',
  	"title_size" "enum_tours_blocks_carousel_destination_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_tik_tok_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_tik_tok_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_tik_tok_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_tik_tok_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_beneficios_beneficios" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"beneficio_text" varchar,
  	"beneficio_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_beneficios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_beneficios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_beneficios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"color_item" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_estadisticas_estadisticas_text_estadisticas_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numbers" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_estadisticas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"estadisticas_text_title" varchar,
  	"estadisticas_text_description" jsonb,
  	"estadisticas_text_color_box" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_grid_images_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type_grid" "enum_tours_blocks_grid_images_type_grid" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_row_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_width" "enum_tours_blocks_row_block_columns_column_width" DEFAULT '50'
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_row_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_ofertas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum__tours_v_blocks_ofertas_title_tag" DEFAULT 'h2',
  	"title_size" "enum__tours_v_blocks_ofertas_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"type_grid" "enum__tours_v_blocks_ofertas_type_grid" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_carousel_destination" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum__tours_v_blocks_carousel_destination_title_tag" DEFAULT 'h2',
  	"title_size" "enum__tours_v_blocks_carousel_destination_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_tik_tok_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_tik_tok_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_tik_tok_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_tik_tok_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_beneficios_beneficios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"beneficio_text" varchar,
  	"beneficio_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_beneficios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_beneficios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_beneficios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"color_item" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_estadisticas_estadisticas_text_estadisticas_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"numbers" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_estadisticas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"estadisticas_text_title" varchar,
  	"estadisticas_text_description" jsonb,
  	"estadisticas_text_color_box" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_grid_images_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type_grid" "enum__tours_v_blocks_grid_images_type_grid" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_row_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_width" "enum__tours_v_blocks_row_block_columns_column_width" DEFAULT '50',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_row_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_you_tube_links_video_links" ADD CONSTRAINT "pages_blocks_you_tube_links_video_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_you_tube_links_video_links" ADD CONSTRAINT "pages_blocks_you_tube_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_you_tube_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_you_tube_links" ADD CONSTRAINT "pages_blocks_you_tube_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_you_tube_links_video_links" ADD CONSTRAINT "_pages_v_blocks_you_tube_links_video_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_you_tube_links_video_links" ADD CONSTRAINT "_pages_v_blocks_you_tube_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_you_tube_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_you_tube_links" ADD CONSTRAINT "_pages_v_blocks_you_tube_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_media_block" ADD CONSTRAINT "tours_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_media_block" ADD CONSTRAINT "tours_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_ofertas" ADD CONSTRAINT "tours_blocks_ofertas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_carousel_destination" ADD CONSTRAINT "tours_blocks_carousel_destination_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_tik_tok_links_video_links" ADD CONSTRAINT "tours_blocks_tik_tok_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_tik_tok_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_tik_tok_links" ADD CONSTRAINT "tours_blocks_tik_tok_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_beneficios_beneficios" ADD CONSTRAINT "tours_blocks_beneficios_beneficios_beneficio_image_id_media_id_fk" FOREIGN KEY ("beneficio_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_beneficios_beneficios" ADD CONSTRAINT "tours_blocks_beneficios_beneficios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_beneficios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_beneficios" ADD CONSTRAINT "tours_blocks_beneficios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_estadisticas_estadisticas_text_estadisticas_box" ADD CONSTRAINT "tours_blocks_estadisticas_estadisticas_text_estadisticas_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_estadisticas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_estadisticas" ADD CONSTRAINT "tours_blocks_estadisticas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_grid_images_image" ADD CONSTRAINT "tours_blocks_grid_images_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_grid_images_image" ADD CONSTRAINT "tours_blocks_grid_images_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_grid_images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_grid_images" ADD CONSTRAINT "tours_blocks_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_row_block_columns" ADD CONSTRAINT "tours_blocks_row_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_row_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_row_block" ADD CONSTRAINT "tours_blocks_row_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_media_block" ADD CONSTRAINT "_tours_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_media_block" ADD CONSTRAINT "_tours_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_ofertas" ADD CONSTRAINT "_tours_v_blocks_ofertas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_carousel_destination" ADD CONSTRAINT "_tours_v_blocks_carousel_destination_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_tik_tok_links_video_links" ADD CONSTRAINT "_tours_v_blocks_tik_tok_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_tik_tok_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_tik_tok_links" ADD CONSTRAINT "_tours_v_blocks_tik_tok_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_beneficios_beneficios" ADD CONSTRAINT "_tours_v_blocks_beneficios_beneficios_beneficio_image_id_media_id_fk" FOREIGN KEY ("beneficio_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_beneficios_beneficios" ADD CONSTRAINT "_tours_v_blocks_beneficios_beneficios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_beneficios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_beneficios" ADD CONSTRAINT "_tours_v_blocks_beneficios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_estadisticas_estadisticas_text_estadisticas_box" ADD CONSTRAINT "_tours_v_blocks_estadisticas_estadisticas_text_estadisticas_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_estadisticas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_estadisticas" ADD CONSTRAINT "_tours_v_blocks_estadisticas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_grid_images_image" ADD CONSTRAINT "_tours_v_blocks_grid_images_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_grid_images_image" ADD CONSTRAINT "_tours_v_blocks_grid_images_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_grid_images"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_grid_images" ADD CONSTRAINT "_tours_v_blocks_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_row_block_columns" ADD CONSTRAINT "_tours_v_blocks_row_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_row_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_row_block" ADD CONSTRAINT "_tours_v_blocks_row_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_you_tube_links_video_links_order_idx" ON "pages_blocks_you_tube_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_you_tube_links_video_links_parent_id_idx" ON "pages_blocks_you_tube_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_you_tube_links_video_links_image_idx" ON "pages_blocks_you_tube_links_video_links" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_you_tube_links_order_idx" ON "pages_blocks_you_tube_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_you_tube_links_parent_id_idx" ON "pages_blocks_you_tube_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_you_tube_links_path_idx" ON "pages_blocks_you_tube_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_you_tube_links_video_links_order_idx" ON "_pages_v_blocks_you_tube_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_you_tube_links_video_links_parent_id_idx" ON "_pages_v_blocks_you_tube_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_you_tube_links_video_links_image_idx" ON "_pages_v_blocks_you_tube_links_video_links" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_you_tube_links_order_idx" ON "_pages_v_blocks_you_tube_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_you_tube_links_parent_id_idx" ON "_pages_v_blocks_you_tube_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_you_tube_links_path_idx" ON "_pages_v_blocks_you_tube_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_media_block_order_idx" ON "tours_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_media_block_parent_id_idx" ON "tours_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_media_block_path_idx" ON "tours_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_media_block_media_idx" ON "tours_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_ofertas_order_idx" ON "tours_blocks_ofertas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_ofertas_parent_id_idx" ON "tours_blocks_ofertas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_ofertas_path_idx" ON "tours_blocks_ofertas" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_carousel_destination_order_idx" ON "tours_blocks_carousel_destination" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_carousel_destination_parent_id_idx" ON "tours_blocks_carousel_destination" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_carousel_destination_path_idx" ON "tours_blocks_carousel_destination" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tik_tok_links_video_links_order_idx" ON "tours_blocks_tik_tok_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tik_tok_links_video_links_parent_id_idx" ON "tours_blocks_tik_tok_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tik_tok_links_order_idx" ON "tours_blocks_tik_tok_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tik_tok_links_parent_id_idx" ON "tours_blocks_tik_tok_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tik_tok_links_path_idx" ON "tours_blocks_tik_tok_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_beneficios_beneficios_order_idx" ON "tours_blocks_beneficios_beneficios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_beneficios_beneficios_parent_id_idx" ON "tours_blocks_beneficios_beneficios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_beneficios_beneficios_beneficio_image_idx" ON "tours_blocks_beneficios_beneficios" USING btree ("beneficio_image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_beneficios_order_idx" ON "tours_blocks_beneficios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_beneficios_parent_id_idx" ON "tours_blocks_beneficios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_beneficios_path_idx" ON "tours_blocks_beneficios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_estadisticas_estadisticas_text_estadisticas_box_order_idx" ON "tours_blocks_estadisticas_estadisticas_text_estadisticas_box" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_estadisticas_estadisticas_text_estadisticas_box_parent_id_idx" ON "tours_blocks_estadisticas_estadisticas_text_estadisticas_box" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_estadisticas_order_idx" ON "tours_blocks_estadisticas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_estadisticas_parent_id_idx" ON "tours_blocks_estadisticas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_estadisticas_path_idx" ON "tours_blocks_estadisticas" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_images_image_order_idx" ON "tours_blocks_grid_images_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_images_image_parent_id_idx" ON "tours_blocks_grid_images_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_images_image_image_idx" ON "tours_blocks_grid_images_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_images_order_idx" ON "tours_blocks_grid_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_images_parent_id_idx" ON "tours_blocks_grid_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_images_path_idx" ON "tours_blocks_grid_images" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_row_block_columns_order_idx" ON "tours_blocks_row_block_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_row_block_columns_parent_id_idx" ON "tours_blocks_row_block_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_row_block_order_idx" ON "tours_blocks_row_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_row_block_parent_id_idx" ON "tours_blocks_row_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_row_block_path_idx" ON "tours_blocks_row_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_media_block_order_idx" ON "_tours_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_media_block_parent_id_idx" ON "_tours_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_media_block_path_idx" ON "_tours_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_media_block_media_idx" ON "_tours_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_ofertas_order_idx" ON "_tours_v_blocks_ofertas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_ofertas_parent_id_idx" ON "_tours_v_blocks_ofertas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_ofertas_path_idx" ON "_tours_v_blocks_ofertas" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_carousel_destination_order_idx" ON "_tours_v_blocks_carousel_destination" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_carousel_destination_parent_id_idx" ON "_tours_v_blocks_carousel_destination" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_carousel_destination_path_idx" ON "_tours_v_blocks_carousel_destination" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tik_tok_links_video_links_order_idx" ON "_tours_v_blocks_tik_tok_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tik_tok_links_video_links_parent_id_idx" ON "_tours_v_blocks_tik_tok_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tik_tok_links_order_idx" ON "_tours_v_blocks_tik_tok_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tik_tok_links_parent_id_idx" ON "_tours_v_blocks_tik_tok_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tik_tok_links_path_idx" ON "_tours_v_blocks_tik_tok_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_beneficios_beneficios_order_idx" ON "_tours_v_blocks_beneficios_beneficios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_beneficios_beneficios_parent_id_idx" ON "_tours_v_blocks_beneficios_beneficios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_beneficios_beneficios_beneficio_image_idx" ON "_tours_v_blocks_beneficios_beneficios" USING btree ("beneficio_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_beneficios_order_idx" ON "_tours_v_blocks_beneficios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_beneficios_parent_id_idx" ON "_tours_v_blocks_beneficios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_beneficios_path_idx" ON "_tours_v_blocks_beneficios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_estadisticas_estadisticas_text_estadisticas_box_order_idx" ON "_tours_v_blocks_estadisticas_estadisticas_text_estadisticas_box" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_estadisticas_estadisticas_text_estadisticas_box_parent_id_idx" ON "_tours_v_blocks_estadisticas_estadisticas_text_estadisticas_box" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_estadisticas_order_idx" ON "_tours_v_blocks_estadisticas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_estadisticas_parent_id_idx" ON "_tours_v_blocks_estadisticas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_estadisticas_path_idx" ON "_tours_v_blocks_estadisticas" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_images_image_order_idx" ON "_tours_v_blocks_grid_images_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_images_image_parent_id_idx" ON "_tours_v_blocks_grid_images_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_images_image_image_idx" ON "_tours_v_blocks_grid_images_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_images_order_idx" ON "_tours_v_blocks_grid_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_images_parent_id_idx" ON "_tours_v_blocks_grid_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_images_path_idx" ON "_tours_v_blocks_grid_images" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_row_block_columns_order_idx" ON "_tours_v_blocks_row_block_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_row_block_columns_parent_id_idx" ON "_tours_v_blocks_row_block_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_row_block_order_idx" ON "_tours_v_blocks_row_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_row_block_parent_id_idx" ON "_tours_v_blocks_row_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_row_block_path_idx" ON "_tours_v_blocks_row_block" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_you_tube_links_video_links" CASCADE;
  DROP TABLE "pages_blocks_you_tube_links" CASCADE;
  DROP TABLE "_pages_v_blocks_you_tube_links_video_links" CASCADE;
  DROP TABLE "_pages_v_blocks_you_tube_links" CASCADE;
  DROP TABLE "tours_blocks_media_block" CASCADE;
  DROP TABLE "tours_blocks_ofertas" CASCADE;
  DROP TABLE "tours_blocks_carousel_destination" CASCADE;
  DROP TABLE "tours_blocks_tik_tok_links_video_links" CASCADE;
  DROP TABLE "tours_blocks_tik_tok_links" CASCADE;
  DROP TABLE "tours_blocks_beneficios_beneficios" CASCADE;
  DROP TABLE "tours_blocks_beneficios" CASCADE;
  DROP TABLE "tours_blocks_estadisticas_estadisticas_text_estadisticas_box" CASCADE;
  DROP TABLE "tours_blocks_estadisticas" CASCADE;
  DROP TABLE "tours_blocks_grid_images_image" CASCADE;
  DROP TABLE "tours_blocks_grid_images" CASCADE;
  DROP TABLE "tours_blocks_row_block_columns" CASCADE;
  DROP TABLE "tours_blocks_row_block" CASCADE;
  DROP TABLE "_tours_v_blocks_media_block" CASCADE;
  DROP TABLE "_tours_v_blocks_ofertas" CASCADE;
  DROP TABLE "_tours_v_blocks_carousel_destination" CASCADE;
  DROP TABLE "_tours_v_blocks_tik_tok_links_video_links" CASCADE;
  DROP TABLE "_tours_v_blocks_tik_tok_links" CASCADE;
  DROP TABLE "_tours_v_blocks_beneficios_beneficios" CASCADE;
  DROP TABLE "_tours_v_blocks_beneficios" CASCADE;
  DROP TABLE "_tours_v_blocks_estadisticas_estadisticas_text_estadisticas_box" CASCADE;
  DROP TABLE "_tours_v_blocks_estadisticas" CASCADE;
  DROP TABLE "_tours_v_blocks_grid_images_image" CASCADE;
  DROP TABLE "_tours_v_blocks_grid_images" CASCADE;
  DROP TABLE "_tours_v_blocks_row_block_columns" CASCADE;
  DROP TABLE "_tours_v_blocks_row_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_you_tube_links_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_you_tube_links_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_you_tube_links_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_you_tube_links_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_ofertas_title_tag";
  DROP TYPE "public"."enum_tours_blocks_ofertas_title_size";
  DROP TYPE "public"."enum_tours_blocks_ofertas_type_grid";
  DROP TYPE "public"."enum_tours_blocks_carousel_destination_title_tag";
  DROP TYPE "public"."enum_tours_blocks_carousel_destination_title_size";
  DROP TYPE "public"."enum_tours_blocks_tik_tok_links_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_tik_tok_links_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_beneficios_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_beneficios_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_grid_images_type_grid";
  DROP TYPE "public"."enum_tours_blocks_row_block_columns_column_width";
  DROP TYPE "public"."enum__tours_v_blocks_ofertas_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_ofertas_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_ofertas_type_grid";
  DROP TYPE "public"."enum__tours_v_blocks_carousel_destination_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_carousel_destination_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_tik_tok_links_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_tik_tok_links_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_beneficios_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_beneficios_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_grid_images_type_grid";
  DROP TYPE "public"."enum__tours_v_blocks_row_block_columns_column_width";`)
}
