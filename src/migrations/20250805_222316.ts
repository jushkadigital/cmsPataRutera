import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_p_blocks_descr_price_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_descr_price_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_guia_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_guia_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_grid_tours_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_grid_tours_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_grid_blogs_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_grid_blogs_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_grid_blogs_general_style" AS ENUM('masonry', 'grid');
  CREATE TYPE "public"."enum_blog_p_blocks_grid_blogs_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_blog_p_blocks_post_relation_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_post_relation_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_you_tube_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_you_tube_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_text_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_text_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_text_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum_blog_p_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_blocks_revista_block_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_blog_p_blocks_revista_block_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_blog_p_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_p_v_blocks_descr_price_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_descr_price_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_guia_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_guia_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_grid_tours_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_grid_tours_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_grid_blogs_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_grid_blogs_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_grid_blogs_general_style" AS ENUM('masonry', 'grid');
  CREATE TYPE "public"."enum__blog_p_v_blocks_grid_blogs_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__blog_p_v_blocks_post_relation_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_post_relation_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_you_tube_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_you_tube_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_text_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_text_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_text_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum__blog_p_v_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_blocks_revista_block_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__blog_p_v_blocks_revista_block_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__blog_p_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"title" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_carousel_hero_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_descr_price" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_descr_price_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_descr_price_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"left_column_tour_title" varchar,
  	"left_column_tour_description" jsonb,
  	"right_column_price_title" varchar,
  	"right_column_prev_text" varchar DEFAULT 'Precio desde',
  	"right_column_price" numeric,
  	"right_column_next_text" varchar DEFAULT 'por persona',
  	"right_column_payment_form_icon_date_id" integer,
  	"right_column_payment_form_input_place_holder_date" varchar DEFAULT 'Fecha',
  	"right_column_payment_form_icon_passengers_id" integer,
  	"right_column_payment_form_input_place_holder_passengers" varchar DEFAULT 'Pasajeros',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_guia_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_guia_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_guia_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"section_itinerario_icon_text" varchar,
  	"section_itinerario_icon_image_id" integer,
  	"section_itinerario_content_section" jsonb,
  	"section_incluye_no_incluye_icon_text" varchar,
  	"section_incluye_no_incluye_icon_image_id" integer,
  	"section_incluye_no_incluye_content_section" jsonb,
  	"section_precios_icon_text" varchar,
  	"section_precios_icon_image_id" integer,
  	"section_precios_content_section" jsonb,
  	"section_info_viaje_icon_text" varchar,
  	"section_info_viaje_icon_image_id" integer,
  	"section_info_viaje_content_section" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_grid_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_grid_tours_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_grid_tours_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"destination_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_grid_blogs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_grid_blogs_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_grid_blogs_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"general_style" "enum_blog_p_blocks_grid_blogs_general_style" DEFAULT 'grid',
  	"grid_style" boolean DEFAULT true,
  	"populate_by" "enum_blog_p_blocks_grid_blogs_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_post_relation_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_post_relation_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_post_relation_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"parrafo" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_you_tube_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_you_tube_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_you_tube_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_you_tube_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_text_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_text_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum_blog_p_blocks_text_content_description_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_form_bitrix_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tracking_code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_revista_block_revistas_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_revista_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_blog_p_blocks_revista_block_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_blog_p_blocks_revista_block_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"created_by_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"_status" "enum_blog_p_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tour_category_id" integer,
  	"blog_categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"title" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_carousel_hero_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_descr_price" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_descr_price_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_descr_price_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"left_column_tour_title" varchar,
  	"left_column_tour_description" jsonb,
  	"right_column_price_title" varchar,
  	"right_column_prev_text" varchar DEFAULT 'Precio desde',
  	"right_column_price" numeric,
  	"right_column_next_text" varchar DEFAULT 'por persona',
  	"right_column_payment_form_icon_date_id" integer,
  	"right_column_payment_form_input_place_holder_date" varchar DEFAULT 'Fecha',
  	"right_column_payment_form_icon_passengers_id" integer,
  	"right_column_payment_form_input_place_holder_passengers" varchar DEFAULT 'Pasajeros',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_guia_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_guia_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_guia_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"section_itinerario_icon_text" varchar,
  	"section_itinerario_icon_image_id" integer,
  	"section_itinerario_content_section" jsonb,
  	"section_incluye_no_incluye_icon_text" varchar,
  	"section_incluye_no_incluye_icon_image_id" integer,
  	"section_incluye_no_incluye_content_section" jsonb,
  	"section_precios_icon_text" varchar,
  	"section_precios_icon_image_id" integer,
  	"section_precios_content_section" jsonb,
  	"section_info_viaje_icon_text" varchar,
  	"section_info_viaje_icon_image_id" integer,
  	"section_info_viaje_content_section" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_grid_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_grid_tours_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_grid_tours_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"destination_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_grid_blogs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_grid_blogs_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_grid_blogs_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"general_style" "enum__blog_p_v_blocks_grid_blogs_general_style" DEFAULT 'grid',
  	"grid_style" boolean DEFAULT true,
  	"populate_by" "enum__blog_p_v_blocks_grid_blogs_populate_by" DEFAULT 'collection',
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_post_relation_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_post_relation_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_post_relation_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"parrafo" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_you_tube_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_you_tube_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_you_tube_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_you_tube_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_text_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_text_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_text_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum__blog_p_v_blocks_text_content_description_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_form_bitrix_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tracking_code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_revista_block_revistas_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_revista_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__blog_p_v_blocks_revista_block_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__blog_p_v_blocks_revista_block_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_created_by_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_p_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tour_category_id" integer,
  	"blog_categories_id" integer,
  	"posts_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_banner" ADD CONSTRAINT "blog_p_blocks_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_banner" ADD CONSTRAINT "blog_p_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_carousel_hero_page" ADD CONSTRAINT "blog_p_blocks_carousel_hero_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_descr_price" ADD CONSTRAINT "blog_p_blocks_descr_price_right_column_payment_form_icon_date_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_date_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_descr_price" ADD CONSTRAINT "blog_p_blocks_descr_price_right_column_payment_form_icon_passengers_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_descr_price" ADD CONSTRAINT "blog_p_blocks_descr_price_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_guia_tour" ADD CONSTRAINT "blog_p_blocks_guia_tour_section_itinerario_icon_image_id_media_id_fk" FOREIGN KEY ("section_itinerario_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_guia_tour" ADD CONSTRAINT "blog_p_blocks_guia_tour_section_incluye_no_incluye_icon_image_id_media_id_fk" FOREIGN KEY ("section_incluye_no_incluye_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_guia_tour" ADD CONSTRAINT "blog_p_blocks_guia_tour_section_precios_icon_image_id_media_id_fk" FOREIGN KEY ("section_precios_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_guia_tour" ADD CONSTRAINT "blog_p_blocks_guia_tour_section_info_viaje_icon_image_id_media_id_fk" FOREIGN KEY ("section_info_viaje_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_guia_tour" ADD CONSTRAINT "blog_p_blocks_guia_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_grid_tours" ADD CONSTRAINT "blog_p_blocks_grid_tours_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_grid_tours" ADD CONSTRAINT "blog_p_blocks_grid_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_grid_blogs" ADD CONSTRAINT "blog_p_blocks_grid_blogs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_post_relation_tour" ADD CONSTRAINT "blog_p_blocks_post_relation_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_you_tube_links_video_links" ADD CONSTRAINT "blog_p_blocks_you_tube_links_video_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_you_tube_links_video_links" ADD CONSTRAINT "blog_p_blocks_you_tube_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p_blocks_you_tube_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_you_tube_links" ADD CONSTRAINT "blog_p_blocks_you_tube_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_text_content" ADD CONSTRAINT "blog_p_blocks_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_socios" ADD CONSTRAINT "blog_p_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_reconocimientos" ADD CONSTRAINT "blog_p_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_form_bitrix_block" ADD CONSTRAINT "blog_p_blocks_form_bitrix_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_revista_block_revistas_links" ADD CONSTRAINT "blog_p_blocks_revista_block_revistas_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_revista_block_revistas_links" ADD CONSTRAINT "blog_p_blocks_revista_block_revistas_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p_blocks_revista_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_revista_block" ADD CONSTRAINT "blog_p_blocks_revista_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p" ADD CONSTRAINT "blog_p_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p" ADD CONSTRAINT "blog_p_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_rels" ADD CONSTRAINT "blog_p_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_rels" ADD CONSTRAINT "blog_p_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_rels" ADD CONSTRAINT "blog_p_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_rels" ADD CONSTRAINT "blog_p_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_banner" ADD CONSTRAINT "_blog_p_v_blocks_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_banner" ADD CONSTRAINT "_blog_p_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_carousel_hero_page" ADD CONSTRAINT "_blog_p_v_blocks_carousel_hero_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_descr_price" ADD CONSTRAINT "_blog_p_v_blocks_descr_price_right_column_payment_form_icon_date_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_date_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_descr_price" ADD CONSTRAINT "_blog_p_v_blocks_descr_price_right_column_payment_form_icon_passengers_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_descr_price" ADD CONSTRAINT "_blog_p_v_blocks_descr_price_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD CONSTRAINT "_blog_p_v_blocks_guia_tour_section_itinerario_icon_image_id_media_id_fk" FOREIGN KEY ("section_itinerario_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD CONSTRAINT "_blog_p_v_blocks_guia_tour_section_incluye_no_incluye_icon_image_id_media_id_fk" FOREIGN KEY ("section_incluye_no_incluye_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD CONSTRAINT "_blog_p_v_blocks_guia_tour_section_precios_icon_image_id_media_id_fk" FOREIGN KEY ("section_precios_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD CONSTRAINT "_blog_p_v_blocks_guia_tour_section_info_viaje_icon_image_id_media_id_fk" FOREIGN KEY ("section_info_viaje_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD CONSTRAINT "_blog_p_v_blocks_guia_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_grid_tours" ADD CONSTRAINT "_blog_p_v_blocks_grid_tours_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_grid_tours" ADD CONSTRAINT "_blog_p_v_blocks_grid_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_grid_blogs" ADD CONSTRAINT "_blog_p_v_blocks_grid_blogs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_post_relation_tour" ADD CONSTRAINT "_blog_p_v_blocks_post_relation_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_you_tube_links_video_links" ADD CONSTRAINT "_blog_p_v_blocks_you_tube_links_video_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_you_tube_links_video_links" ADD CONSTRAINT "_blog_p_v_blocks_you_tube_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v_blocks_you_tube_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_you_tube_links" ADD CONSTRAINT "_blog_p_v_blocks_you_tube_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_text_content" ADD CONSTRAINT "_blog_p_v_blocks_text_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_socios" ADD CONSTRAINT "_blog_p_v_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_reconocimientos" ADD CONSTRAINT "_blog_p_v_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_form_bitrix_block" ADD CONSTRAINT "_blog_p_v_blocks_form_bitrix_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_revista_block_revistas_links" ADD CONSTRAINT "_blog_p_v_blocks_revista_block_revistas_links_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_revista_block_revistas_links" ADD CONSTRAINT "_blog_p_v_blocks_revista_block_revistas_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v_blocks_revista_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_revista_block" ADD CONSTRAINT "_blog_p_v_blocks_revista_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v" ADD CONSTRAINT "_blog_p_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v" ADD CONSTRAINT "_blog_p_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_rels" ADD CONSTRAINT "_blog_p_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_rels" ADD CONSTRAINT "_blog_p_v_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_rels" ADD CONSTRAINT "_blog_p_v_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_rels" ADD CONSTRAINT "_blog_p_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_banner_order_idx" ON "blog_p_blocks_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_banner_parent_id_idx" ON "blog_p_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_banner_path_idx" ON "blog_p_blocks_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_banner_image_idx" ON "blog_p_blocks_banner" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_carousel_hero_page_order_idx" ON "blog_p_blocks_carousel_hero_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_carousel_hero_page_parent_id_idx" ON "blog_p_blocks_carousel_hero_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_carousel_hero_page_path_idx" ON "blog_p_blocks_carousel_hero_page" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_descr_price_order_idx" ON "blog_p_blocks_descr_price" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_descr_price_parent_id_idx" ON "blog_p_blocks_descr_price" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_descr_price_path_idx" ON "blog_p_blocks_descr_price" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_date_idx" ON "blog_p_blocks_descr_price" USING btree ("right_column_payment_form_icon_date_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_passengers_idx" ON "blog_p_blocks_descr_price" USING btree ("right_column_payment_form_icon_passengers_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_order_idx" ON "blog_p_blocks_guia_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_parent_id_idx" ON "blog_p_blocks_guia_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_path_idx" ON "blog_p_blocks_guia_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_itinerario_section_itinerario_icon_image_idx" ON "blog_p_blocks_guia_tour" USING btree ("section_itinerario_icon_image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_incluye_no_incluye_section_incluye_no_incluye_icon_image_idx" ON "blog_p_blocks_guia_tour" USING btree ("section_incluye_no_incluye_icon_image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_precios_section_precios_icon_image_idx" ON "blog_p_blocks_guia_tour" USING btree ("section_precios_icon_image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_info_viaje_section_info_viaje_icon_image_idx" ON "blog_p_blocks_guia_tour" USING btree ("section_info_viaje_icon_image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_grid_tours_order_idx" ON "blog_p_blocks_grid_tours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_grid_tours_parent_id_idx" ON "blog_p_blocks_grid_tours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_grid_tours_path_idx" ON "blog_p_blocks_grid_tours" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_grid_tours_destination_idx" ON "blog_p_blocks_grid_tours" USING btree ("destination_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_grid_blogs_order_idx" ON "blog_p_blocks_grid_blogs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_grid_blogs_parent_id_idx" ON "blog_p_blocks_grid_blogs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_grid_blogs_path_idx" ON "blog_p_blocks_grid_blogs" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_post_relation_tour_order_idx" ON "blog_p_blocks_post_relation_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_post_relation_tour_parent_id_idx" ON "blog_p_blocks_post_relation_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_post_relation_tour_path_idx" ON "blog_p_blocks_post_relation_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_you_tube_links_video_links_order_idx" ON "blog_p_blocks_you_tube_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_you_tube_links_video_links_parent_id_idx" ON "blog_p_blocks_you_tube_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_you_tube_links_video_links_image_idx" ON "blog_p_blocks_you_tube_links_video_links" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_you_tube_links_order_idx" ON "blog_p_blocks_you_tube_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_you_tube_links_parent_id_idx" ON "blog_p_blocks_you_tube_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_you_tube_links_path_idx" ON "blog_p_blocks_you_tube_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_text_content_order_idx" ON "blog_p_blocks_text_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_text_content_parent_id_idx" ON "blog_p_blocks_text_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_text_content_path_idx" ON "blog_p_blocks_text_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_socios_order_idx" ON "blog_p_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_socios_parent_id_idx" ON "blog_p_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_socios_path_idx" ON "blog_p_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_reconocimientos_order_idx" ON "blog_p_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_reconocimientos_parent_id_idx" ON "blog_p_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_reconocimientos_path_idx" ON "blog_p_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_form_bitrix_block_order_idx" ON "blog_p_blocks_form_bitrix_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_form_bitrix_block_parent_id_idx" ON "blog_p_blocks_form_bitrix_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_form_bitrix_block_path_idx" ON "blog_p_blocks_form_bitrix_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_revista_block_revistas_links_order_idx" ON "blog_p_blocks_revista_block_revistas_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_revista_block_revistas_links_parent_id_idx" ON "blog_p_blocks_revista_block_revistas_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_revista_block_revistas_links_image_idx" ON "blog_p_blocks_revista_block_revistas_links" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_revista_block_order_idx" ON "blog_p_blocks_revista_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_revista_block_parent_id_idx" ON "blog_p_blocks_revista_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_revista_block_path_idx" ON "blog_p_blocks_revista_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_p_meta_meta_image_idx" ON "blog_p" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_created_by_idx" ON "blog_p" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "blog_p__status_idx" ON "blog_p" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "blog_p_rels_order_idx" ON "blog_p_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blog_p_rels_parent_idx" ON "blog_p_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_rels_path_idx" ON "blog_p_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blog_p_rels_tour_category_id_idx" ON "blog_p_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "blog_p_rels_blog_categories_id_idx" ON "blog_p_rels" USING btree ("blog_categories_id");
  CREATE INDEX IF NOT EXISTS "blog_p_rels_posts_id_idx" ON "blog_p_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_banner_order_idx" ON "_blog_p_v_blocks_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_banner_parent_id_idx" ON "_blog_p_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_banner_path_idx" ON "_blog_p_v_blocks_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_banner_image_idx" ON "_blog_p_v_blocks_banner" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_carousel_hero_page_order_idx" ON "_blog_p_v_blocks_carousel_hero_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_carousel_hero_page_parent_id_idx" ON "_blog_p_v_blocks_carousel_hero_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_carousel_hero_page_path_idx" ON "_blog_p_v_blocks_carousel_hero_page" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_descr_price_order_idx" ON "_blog_p_v_blocks_descr_price" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_descr_price_parent_id_idx" ON "_blog_p_v_blocks_descr_price" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_descr_price_path_idx" ON "_blog_p_v_blocks_descr_price" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_date_idx" ON "_blog_p_v_blocks_descr_price" USING btree ("right_column_payment_form_icon_date_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_passengers_idx" ON "_blog_p_v_blocks_descr_price" USING btree ("right_column_payment_form_icon_passengers_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_order_idx" ON "_blog_p_v_blocks_guia_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_parent_id_idx" ON "_blog_p_v_blocks_guia_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_path_idx" ON "_blog_p_v_blocks_guia_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_itinerario_section_itinerario_icon_image_idx" ON "_blog_p_v_blocks_guia_tour" USING btree ("section_itinerario_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_incluye_no_incluye_section_incluye_no_incluye_icon_image_idx" ON "_blog_p_v_blocks_guia_tour" USING btree ("section_incluye_no_incluye_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_precios_section_precios_icon_image_idx" ON "_blog_p_v_blocks_guia_tour" USING btree ("section_precios_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_info_viaje_section_info_viaje_icon_image_idx" ON "_blog_p_v_blocks_guia_tour" USING btree ("section_info_viaje_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_grid_tours_order_idx" ON "_blog_p_v_blocks_grid_tours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_grid_tours_parent_id_idx" ON "_blog_p_v_blocks_grid_tours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_grid_tours_path_idx" ON "_blog_p_v_blocks_grid_tours" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_grid_tours_destination_idx" ON "_blog_p_v_blocks_grid_tours" USING btree ("destination_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_grid_blogs_order_idx" ON "_blog_p_v_blocks_grid_blogs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_grid_blogs_parent_id_idx" ON "_blog_p_v_blocks_grid_blogs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_grid_blogs_path_idx" ON "_blog_p_v_blocks_grid_blogs" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_post_relation_tour_order_idx" ON "_blog_p_v_blocks_post_relation_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_post_relation_tour_parent_id_idx" ON "_blog_p_v_blocks_post_relation_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_post_relation_tour_path_idx" ON "_blog_p_v_blocks_post_relation_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_you_tube_links_video_links_order_idx" ON "_blog_p_v_blocks_you_tube_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_you_tube_links_video_links_parent_id_idx" ON "_blog_p_v_blocks_you_tube_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_you_tube_links_video_links_image_idx" ON "_blog_p_v_blocks_you_tube_links_video_links" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_you_tube_links_order_idx" ON "_blog_p_v_blocks_you_tube_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_you_tube_links_parent_id_idx" ON "_blog_p_v_blocks_you_tube_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_you_tube_links_path_idx" ON "_blog_p_v_blocks_you_tube_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_text_content_order_idx" ON "_blog_p_v_blocks_text_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_text_content_parent_id_idx" ON "_blog_p_v_blocks_text_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_text_content_path_idx" ON "_blog_p_v_blocks_text_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_socios_order_idx" ON "_blog_p_v_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_socios_parent_id_idx" ON "_blog_p_v_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_socios_path_idx" ON "_blog_p_v_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_reconocimientos_order_idx" ON "_blog_p_v_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_reconocimientos_parent_id_idx" ON "_blog_p_v_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_reconocimientos_path_idx" ON "_blog_p_v_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_form_bitrix_block_order_idx" ON "_blog_p_v_blocks_form_bitrix_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_form_bitrix_block_parent_id_idx" ON "_blog_p_v_blocks_form_bitrix_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_form_bitrix_block_path_idx" ON "_blog_p_v_blocks_form_bitrix_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_revista_block_revistas_links_order_idx" ON "_blog_p_v_blocks_revista_block_revistas_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_revista_block_revistas_links_parent_id_idx" ON "_blog_p_v_blocks_revista_block_revistas_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_revista_block_revistas_links_image_idx" ON "_blog_p_v_blocks_revista_block_revistas_links" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_revista_block_order_idx" ON "_blog_p_v_blocks_revista_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_revista_block_parent_id_idx" ON "_blog_p_v_blocks_revista_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_revista_block_path_idx" ON "_blog_p_v_blocks_revista_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_version_meta_version_meta_image_idx" ON "_blog_p_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_version_version_created_by_idx" ON "_blog_p_v" USING btree ("version_created_by_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_version_version__status_idx" ON "_blog_p_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_created_at_idx" ON "_blog_p_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_updated_at_idx" ON "_blog_p_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_latest_idx" ON "_blog_p_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_autosave_idx" ON "_blog_p_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_rels_order_idx" ON "_blog_p_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_rels_parent_idx" ON "_blog_p_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_rels_path_idx" ON "_blog_p_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_rels_tour_category_id_idx" ON "_blog_p_v_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_rels_blog_categories_id_idx" ON "_blog_p_v_rels" USING btree ("blog_categories_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_rels_posts_id_idx" ON "_blog_p_v_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blog_p_blocks_banner" CASCADE;
  DROP TABLE "blog_p_blocks_carousel_hero_page" CASCADE;
  DROP TABLE "blog_p_blocks_descr_price" CASCADE;
  DROP TABLE "blog_p_blocks_guia_tour" CASCADE;
  DROP TABLE "blog_p_blocks_grid_tours" CASCADE;
  DROP TABLE "blog_p_blocks_grid_blogs" CASCADE;
  DROP TABLE "blog_p_blocks_post_relation_tour" CASCADE;
  DROP TABLE "blog_p_blocks_you_tube_links_video_links" CASCADE;
  DROP TABLE "blog_p_blocks_you_tube_links" CASCADE;
  DROP TABLE "blog_p_blocks_text_content" CASCADE;
  DROP TABLE "blog_p_blocks_socios" CASCADE;
  DROP TABLE "blog_p_blocks_reconocimientos" CASCADE;
  DROP TABLE "blog_p_blocks_form_bitrix_block" CASCADE;
  DROP TABLE "blog_p_blocks_revista_block_revistas_links" CASCADE;
  DROP TABLE "blog_p_blocks_revista_block" CASCADE;
  DROP TABLE "blog_p" CASCADE;
  DROP TABLE "blog_p_rels" CASCADE;
  DROP TABLE "_blog_p_v_blocks_banner" CASCADE;
  DROP TABLE "_blog_p_v_blocks_carousel_hero_page" CASCADE;
  DROP TABLE "_blog_p_v_blocks_descr_price" CASCADE;
  DROP TABLE "_blog_p_v_blocks_guia_tour" CASCADE;
  DROP TABLE "_blog_p_v_blocks_grid_tours" CASCADE;
  DROP TABLE "_blog_p_v_blocks_grid_blogs" CASCADE;
  DROP TABLE "_blog_p_v_blocks_post_relation_tour" CASCADE;
  DROP TABLE "_blog_p_v_blocks_you_tube_links_video_links" CASCADE;
  DROP TABLE "_blog_p_v_blocks_you_tube_links" CASCADE;
  DROP TABLE "_blog_p_v_blocks_text_content" CASCADE;
  DROP TABLE "_blog_p_v_blocks_socios" CASCADE;
  DROP TABLE "_blog_p_v_blocks_reconocimientos" CASCADE;
  DROP TABLE "_blog_p_v_blocks_form_bitrix_block" CASCADE;
  DROP TABLE "_blog_p_v_blocks_revista_block_revistas_links" CASCADE;
  DROP TABLE "_blog_p_v_blocks_revista_block" CASCADE;
  DROP TABLE "_blog_p_v" CASCADE;
  DROP TABLE "_blog_p_v_rels" CASCADE;
  DROP TYPE "public"."enum_blog_p_blocks_descr_price_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_descr_price_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_guia_tour_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_guia_tour_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_grid_tours_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_grid_tours_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_grid_blogs_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_grid_blogs_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_grid_blogs_general_style";
  DROP TYPE "public"."enum_blog_p_blocks_grid_blogs_populate_by";
  DROP TYPE "public"."enum_blog_p_blocks_post_relation_tour_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_post_relation_tour_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_you_tube_links_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_you_tube_links_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_text_content_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_text_content_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_text_content_description_alignment";
  DROP TYPE "public"."enum_blog_p_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_socios_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum_blog_p_blocks_revista_block_block_title_tag";
  DROP TYPE "public"."enum_blog_p_blocks_revista_block_block_title_size";
  DROP TYPE "public"."enum_blog_p_status";
  DROP TYPE "public"."enum__blog_p_v_blocks_descr_price_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_descr_price_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_guia_tour_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_guia_tour_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_grid_tours_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_grid_tours_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_grid_blogs_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_grid_blogs_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_grid_blogs_general_style";
  DROP TYPE "public"."enum__blog_p_v_blocks_grid_blogs_populate_by";
  DROP TYPE "public"."enum__blog_p_v_blocks_post_relation_tour_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_post_relation_tour_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_you_tube_links_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_you_tube_links_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_text_content_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_text_content_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_text_content_description_alignment";
  DROP TYPE "public"."enum__blog_p_v_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_socios_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_blocks_revista_block_block_title_tag";
  DROP TYPE "public"."enum__blog_p_v_blocks_revista_block_block_title_size";
  DROP TYPE "public"."enum__blog_p_v_version_status";`)
}
