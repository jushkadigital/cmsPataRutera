import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor', 'user');
  CREATE TYPE "public"."enum_pages_blocks_grid_tours_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_grid_tours_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_post_relation_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_post_relation_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_ofertas_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_ofertas_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_carousel_destination_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_carousel_destination_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_tik_tok_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_tik_tok_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_beneficios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_beneficios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_text_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_text_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_text_content_description_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_grid_images_type_grid" AS ENUM('masonry', 'overlapping', 'list', 'mosaic', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_row_block_columns_column_width" AS ENUM('25', '33.333333', '50', '66.666667', '75', '100');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_tours_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_tours_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_post_relation_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_post_relation_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_ofertas_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_ofertas_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_destination_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_carousel_destination_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_tik_tok_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_tik_tok_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_beneficios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_beneficios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_text_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_text_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_text_content_description_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_images_type_grid" AS ENUM('masonry', 'overlapping', 'list', 'mosaic', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_row_block_columns_column_width" AS ENUM('25', '33.333333', '50', '66.666667', '75', '100');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_tours_blocks_descr_price_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_descr_price_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_guia_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_guia_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_grid_tours_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_grid_tours_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_post_relation_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_post_relation_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_you_tube_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_you_tube_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TYPE "public"."enum_tours_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__tours_v_blocks_descr_price_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_descr_price_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_guia_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_guia_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_grid_tours_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_grid_tours_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_post_relation_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_post_relation_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_you_tube_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_you_tube_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_version_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TYPE "public"."enum__tours_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_posts_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_posts_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_posts_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__posts_v_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__posts_v_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__posts_v_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_paquetes_blocks_descr_price_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_paquetes_blocks_descr_price_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_paquetes_blocks_guia_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_paquetes_blocks_guia_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_paquetes_blocks_grid_tours_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_paquetes_blocks_grid_tours_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_paquetes_blocks_post_relation_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_paquetes_blocks_post_relation_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_paquetes_blocks_you_tube_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_paquetes_blocks_you_tube_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_paquetes_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_paquetes_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_paquetes_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_paquetes_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_paquetes_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TYPE "public"."enum_paquetes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__paquetes_v_blocks_descr_price_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__paquetes_v_blocks_descr_price_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__paquetes_v_blocks_guia_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__paquetes_v_blocks_guia_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__paquetes_v_blocks_grid_tours_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__paquetes_v_blocks_grid_tours_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__paquetes_v_blocks_post_relation_tour_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__paquetes_v_blocks_post_relation_tour_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__paquetes_v_blocks_you_tube_links_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__paquetes_v_blocks_you_tube_links_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__paquetes_v_blocks_socios_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__paquetes_v_blocks_socios_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__paquetes_v_blocks_reconocimientos_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__paquetes_v_blocks_reconocimientos_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__paquetes_v_version_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TYPE "public"."enum__paquetes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TABLE IF NOT EXISTS "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"title" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_carousel_hero_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_grid_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_grid_tours_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_grid_tours_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"destination_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_post_relation_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_post_relation_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_post_relation_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"parrafo" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_socios_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_reconocimientos_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_ofertas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum_pages_blocks_ofertas_title_tag" DEFAULT 'h2',
  	"title_size" "enum_pages_blocks_ofertas_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_carousel_destination" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum_pages_blocks_carousel_destination_title_tag" DEFAULT 'h2',
  	"title_size" "enum_pages_blocks_carousel_destination_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tik_tok_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_tik_tok_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_tik_tok_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_tik_tok_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_beneficios_beneficios" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"beneficio_text" varchar,
  	"beneficio_image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_beneficios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_beneficios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_beneficios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"color_item" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_estadisticas_estadisticas_text_estadisticas_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"numbers" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_estadisticas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"estadisticas_text_title" varchar,
  	"estadisticas_text_description" jsonb,
  	"estadisticas_text_color_box" varchar,
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_row_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"column_width" "enum_pages_blocks_row_block_columns_column_width" DEFAULT '50'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_row_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tour_category_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_banner" (
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel_hero_page" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_grid_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_grid_tours_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_grid_tours_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"destination_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_post_relation_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_post_relation_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_post_relation_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"parrafo" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_socios_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_reconocimientos_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_ofertas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum__pages_v_blocks_ofertas_title_tag" DEFAULT 'h2',
  	"title_size" "enum__pages_v_blocks_ofertas_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_carousel_destination" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_title_text" varchar,
  	"title_tag" "enum__pages_v_blocks_carousel_destination_title_tag" DEFAULT 'h2',
  	"title_size" "enum__pages_v_blocks_carousel_destination_title_size" DEFAULT 'medium',
  	"title_text_color" varchar DEFAULT '#2970B7',
  	"title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tik_tok_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_tik_tok_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_tik_tok_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_tik_tok_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_beneficios_beneficios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"beneficio_text" varchar,
  	"beneficio_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_beneficios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_beneficios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_beneficios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"color_item" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_estadisticas_estadisticas_text_estadisticas_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"numbers" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_estadisticas" (
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
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_row_block_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_width" "enum__pages_v_blocks_row_block_columns_column_width" DEFAULT '50',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_row_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tour_category_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_tour_herocar_car_content_car_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_tour_herocar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_content_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_descr_price" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_descr_price_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_descr_price_block_title_size" DEFAULT 'medium',
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
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_guia_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_guia_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_guia_tour_block_title_size" DEFAULT 'medium',
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
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_grid_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_grid_tours_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_grid_tours_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"destination_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_post_relation_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_post_relation_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_post_relation_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"parrafo" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_you_tube_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_you_tube_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_you_tube_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_you_tube_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_socios_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_reconocimientos_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"mini_description" jsonb,
  	"desde" varchar,
  	"price" numeric,
  	"person_desc" varchar,
  	"icon_max_passengers_id" integer,
  	"max_passengers" numeric,
  	"icon_difficulty_id" integer,
  	"difficulty" "enum_tours_difficulty" DEFAULT 'easy',
  	"destinos_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_tours_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "tours_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tour_category_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_tour_herocar_car_content_car_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_tour_herocar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_content_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_descr_price" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_descr_price_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_descr_price_block_title_size" DEFAULT 'medium',
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
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_guia_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_guia_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_guia_tour_block_title_size" DEFAULT 'medium',
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
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_grid_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_grid_tours_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_grid_tours_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"destination_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_post_relation_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_post_relation_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_post_relation_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"parrafo" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_you_tube_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_you_tube_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_you_tube_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_you_tube_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_socios_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_reconocimientos_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_mini_description" jsonb,
  	"version_desde" varchar,
  	"version_price" numeric,
  	"version_person_desc" varchar,
  	"version_icon_max_passengers_id" integer,
  	"version_max_passengers" numeric,
  	"version_icon_difficulty_id" integer,
  	"version_difficulty" "enum__tours_v_version_difficulty" DEFAULT 'easy',
  	"version_destinos_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__tours_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tour_category_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "ofertas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"descripcion" varchar,
  	"descuento_porcentaje" numeric NOT NULL,
  	"imagen_id" integer NOT NULL,
  	"tour_relacionado_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tour_category" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "destinations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"image_destination_id" integer,
  	"background_destination_id" integer,
  	"carousel_item_destination_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_reconocimientos_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_posts_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_posts_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_socios_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_posts_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_posts_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"description" varchar,
  	"background_image_id" integer,
  	"content" jsonb,
  	"author_id" integer,
  	"published_date" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_reconocimientos_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__posts_v_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__posts_v_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_socios_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__posts_v_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__posts_v_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_description" varchar,
  	"version_background_image_id" integer,
  	"version_content" jsonb,
  	"version_author_id" integer,
  	"version_published_date" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_paquete_herocar_car_content_car_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_paquete_herocar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_content_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_descr_price" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_paquetes_blocks_descr_price_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_paquetes_blocks_descr_price_block_title_size" DEFAULT 'medium',
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
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_guia_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_paquetes_blocks_guia_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_paquetes_blocks_guia_tour_block_title_size" DEFAULT 'medium',
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
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_grid_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_paquetes_blocks_grid_tours_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_paquetes_blocks_grid_tours_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"destination_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_post_relation_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_paquetes_blocks_post_relation_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_paquetes_blocks_post_relation_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"parrafo" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_you_tube_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_you_tube_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_paquetes_blocks_you_tube_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_paquetes_blocks_you_tube_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_socios_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_paquetes_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_paquetes_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_reconocimientos_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_paquetes_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_paquetes_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"mini_description" jsonb,
  	"desde" varchar,
  	"price" numeric,
  	"person_desc" varchar,
  	"icon_max_passengers_id" integer,
  	"max_passengers" numeric,
  	"icon_difficulty_id" integer,
  	"difficulty" "enum_paquetes_difficulty" DEFAULT 'easy',
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_paquetes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tour_category_id" integer,
  	"posts_id" integer,
  	"destinations_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar_car_content_car_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_content_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_descr_price" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__paquetes_v_blocks_descr_price_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__paquetes_v_blocks_descr_price_block_title_size" DEFAULT 'medium',
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
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_guia_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__paquetes_v_blocks_guia_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__paquetes_v_blocks_guia_tour_block_title_size" DEFAULT 'medium',
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
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_grid_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__paquetes_v_blocks_grid_tours_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__paquetes_v_blocks_grid_tours_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"destination_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_post_relation_tour" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__paquetes_v_blocks_post_relation_tour_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__paquetes_v_blocks_post_relation_tour_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"parrafo" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_you_tube_links_video_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_you_tube_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__paquetes_v_blocks_you_tube_links_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__paquetes_v_blocks_you_tube_links_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_socios_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_socios" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__paquetes_v_blocks_socios_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__paquetes_v_blocks_socios_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_reconocimientos_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_reconocimientos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__paquetes_v_blocks_reconocimientos_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__paquetes_v_blocks_reconocimientos_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_mini_description" jsonb,
  	"version_desde" varchar,
  	"version_price" numeric,
  	"version_person_desc" varchar,
  	"version_icon_max_passengers_id" integer,
  	"version_max_passengers" numeric,
  	"version_icon_difficulty_id" integer,
  	"version_difficulty" "enum__paquetes_v_version_difficulty" DEFAULT 'easy',
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__paquetes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tour_category_id" integer,
  	"posts_id" integer,
  	"destinations_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"tours_id" integer,
  	"ofertas_id" integer,
  	"tour_category_id" integer,
  	"destinations_id" integer,
  	"blog_categories_id" integer,
  	"posts_id" integer,
  	"paquetes_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_banner" ADD CONSTRAINT "pages_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_carousel_hero_page" ADD CONSTRAINT "pages_blocks_carousel_hero_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_tours" ADD CONSTRAINT "pages_blocks_grid_tours_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_grid_tours" ADD CONSTRAINT "pages_blocks_grid_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_post_relation_tour" ADD CONSTRAINT "pages_blocks_post_relation_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_socios_socios" ADD CONSTRAINT "pages_blocks_socios_socios_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_socios_socios" ADD CONSTRAINT "pages_blocks_socios_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_socios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_socios" ADD CONSTRAINT "pages_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "pages_blocks_reconocimientos_reconocimientos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "pages_blocks_reconocimientos_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_reconocimientos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_reconocimientos" ADD CONSTRAINT "pages_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_ofertas" ADD CONSTRAINT "pages_blocks_ofertas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_carousel_destination" ADD CONSTRAINT "pages_blocks_carousel_destination_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tik_tok_links_video_links" ADD CONSTRAINT "pages_blocks_tik_tok_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tik_tok_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_tik_tok_links" ADD CONSTRAINT "pages_blocks_tik_tok_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_beneficios_beneficios" ADD CONSTRAINT "pages_blocks_beneficios_beneficios_beneficio_image_id_media_id_fk" FOREIGN KEY ("beneficio_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_beneficios_beneficios" ADD CONSTRAINT "pages_blocks_beneficios_beneficios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_beneficios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_beneficios" ADD CONSTRAINT "pages_blocks_beneficios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_estadisticas_estadisticas_text_estadisticas_box" ADD CONSTRAINT "pages_blocks_estadisticas_estadisticas_text_estadisticas_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_estadisticas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_estadisticas" ADD CONSTRAINT "pages_blocks_estadisticas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "pages_blocks_row_block_columns" ADD CONSTRAINT "pages_blocks_row_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_row_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_row_block" ADD CONSTRAINT "pages_blocks_row_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_banner" ADD CONSTRAINT "_pages_v_blocks_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_carousel_hero_page" ADD CONSTRAINT "_pages_v_blocks_carousel_hero_page_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_tours" ADD CONSTRAINT "_pages_v_blocks_grid_tours_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_grid_tours" ADD CONSTRAINT "_pages_v_blocks_grid_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_post_relation_tour" ADD CONSTRAINT "_pages_v_blocks_post_relation_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_socios_socios" ADD CONSTRAINT "_pages_v_blocks_socios_socios_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_socios_socios" ADD CONSTRAINT "_pages_v_blocks_socios_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_socios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_socios" ADD CONSTRAINT "_pages_v_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "_pages_v_blocks_reconocimientos_reconocimientos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "_pages_v_blocks_reconocimientos_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_reconocimientos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_reconocimientos" ADD CONSTRAINT "_pages_v_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_ofertas" ADD CONSTRAINT "_pages_v_blocks_ofertas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_carousel_destination" ADD CONSTRAINT "_pages_v_blocks_carousel_destination_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tik_tok_links_video_links" ADD CONSTRAINT "_pages_v_blocks_tik_tok_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tik_tok_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_tik_tok_links" ADD CONSTRAINT "_pages_v_blocks_tik_tok_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_beneficios_beneficios" ADD CONSTRAINT "_pages_v_blocks_beneficios_beneficios_beneficio_image_id_media_id_fk" FOREIGN KEY ("beneficio_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_beneficios_beneficios" ADD CONSTRAINT "_pages_v_blocks_beneficios_beneficios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_beneficios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_beneficios" ADD CONSTRAINT "_pages_v_blocks_beneficios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_estadisticas_estadisticas_text_estadisticas_box" ADD CONSTRAINT "_pages_v_blocks_estadisticas_estadisticas_text_estadisticas_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_estadisticas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_estadisticas" ADD CONSTRAINT "_pages_v_blocks_estadisticas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
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
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_row_block_columns" ADD CONSTRAINT "_pages_v_blocks_row_block_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_row_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_row_block" ADD CONSTRAINT "_pages_v_blocks_row_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_tour_herocar_car_content_car_images" ADD CONSTRAINT "tours_blocks_tour_herocar_car_content_car_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_tour_herocar_car_content_car_images" ADD CONSTRAINT "tours_blocks_tour_herocar_car_content_car_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_tour_herocar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_tour_herocar" ADD CONSTRAINT "tours_blocks_tour_herocar_image_content_image_id_media_id_fk" FOREIGN KEY ("image_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_tour_herocar" ADD CONSTRAINT "tours_blocks_tour_herocar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_descr_price" ADD CONSTRAINT "tours_blocks_descr_price_right_column_payment_form_icon_date_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_date_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_descr_price" ADD CONSTRAINT "tours_blocks_descr_price_right_column_payment_form_icon_passengers_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_descr_price" ADD CONSTRAINT "tours_blocks_descr_price_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_guia_tour" ADD CONSTRAINT "tours_blocks_guia_tour_section_itinerario_icon_image_id_media_id_fk" FOREIGN KEY ("section_itinerario_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_guia_tour" ADD CONSTRAINT "tours_blocks_guia_tour_section_incluye_no_incluye_icon_image_id_media_id_fk" FOREIGN KEY ("section_incluye_no_incluye_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_guia_tour" ADD CONSTRAINT "tours_blocks_guia_tour_section_precios_icon_image_id_media_id_fk" FOREIGN KEY ("section_precios_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_guia_tour" ADD CONSTRAINT "tours_blocks_guia_tour_section_info_viaje_icon_image_id_media_id_fk" FOREIGN KEY ("section_info_viaje_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_guia_tour" ADD CONSTRAINT "tours_blocks_guia_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_grid_tours" ADD CONSTRAINT "tours_blocks_grid_tours_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_grid_tours" ADD CONSTRAINT "tours_blocks_grid_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_post_relation_tour" ADD CONSTRAINT "tours_blocks_post_relation_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_you_tube_links_video_links" ADD CONSTRAINT "tours_blocks_you_tube_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_you_tube_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_you_tube_links" ADD CONSTRAINT "tours_blocks_you_tube_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_socios_socios" ADD CONSTRAINT "tours_blocks_socios_socios_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_socios_socios" ADD CONSTRAINT "tours_blocks_socios_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_socios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_socios" ADD CONSTRAINT "tours_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "tours_blocks_reconocimientos_reconocimientos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "tours_blocks_reconocimientos_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_reconocimientos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_reconocimientos" ADD CONSTRAINT "tours_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours" ADD CONSTRAINT "tours_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours" ADD CONSTRAINT "tours_icon_max_passengers_id_media_id_fk" FOREIGN KEY ("icon_max_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours" ADD CONSTRAINT "tours_icon_difficulty_id_media_id_fk" FOREIGN KEY ("icon_difficulty_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours" ADD CONSTRAINT "tours_destinos_id_destinations_id_fk" FOREIGN KEY ("destinos_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_tour_herocar_car_content_car_images" ADD CONSTRAINT "_tours_v_blocks_tour_herocar_car_content_car_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_tour_herocar_car_content_car_images" ADD CONSTRAINT "_tours_v_blocks_tour_herocar_car_content_car_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_tour_herocar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_tour_herocar" ADD CONSTRAINT "_tours_v_blocks_tour_herocar_image_content_image_id_media_id_fk" FOREIGN KEY ("image_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_tour_herocar" ADD CONSTRAINT "_tours_v_blocks_tour_herocar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_descr_price" ADD CONSTRAINT "_tours_v_blocks_descr_price_right_column_payment_form_icon_date_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_date_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_descr_price" ADD CONSTRAINT "_tours_v_blocks_descr_price_right_column_payment_form_icon_passengers_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_descr_price" ADD CONSTRAINT "_tours_v_blocks_descr_price_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_guia_tour" ADD CONSTRAINT "_tours_v_blocks_guia_tour_section_itinerario_icon_image_id_media_id_fk" FOREIGN KEY ("section_itinerario_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_guia_tour" ADD CONSTRAINT "_tours_v_blocks_guia_tour_section_incluye_no_incluye_icon_image_id_media_id_fk" FOREIGN KEY ("section_incluye_no_incluye_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_guia_tour" ADD CONSTRAINT "_tours_v_blocks_guia_tour_section_precios_icon_image_id_media_id_fk" FOREIGN KEY ("section_precios_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_guia_tour" ADD CONSTRAINT "_tours_v_blocks_guia_tour_section_info_viaje_icon_image_id_media_id_fk" FOREIGN KEY ("section_info_viaje_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_guia_tour" ADD CONSTRAINT "_tours_v_blocks_guia_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_grid_tours" ADD CONSTRAINT "_tours_v_blocks_grid_tours_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_grid_tours" ADD CONSTRAINT "_tours_v_blocks_grid_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_post_relation_tour" ADD CONSTRAINT "_tours_v_blocks_post_relation_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_you_tube_links_video_links" ADD CONSTRAINT "_tours_v_blocks_you_tube_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_you_tube_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_you_tube_links" ADD CONSTRAINT "_tours_v_blocks_you_tube_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_socios_socios" ADD CONSTRAINT "_tours_v_blocks_socios_socios_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_socios_socios" ADD CONSTRAINT "_tours_v_blocks_socios_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_socios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_socios" ADD CONSTRAINT "_tours_v_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "_tours_v_blocks_reconocimientos_reconocimientos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "_tours_v_blocks_reconocimientos_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_reconocimientos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_reconocimientos" ADD CONSTRAINT "_tours_v_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v" ADD CONSTRAINT "_tours_v_parent_id_tours_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tours"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v" ADD CONSTRAINT "_tours_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v" ADD CONSTRAINT "_tours_v_version_icon_max_passengers_id_media_id_fk" FOREIGN KEY ("version_icon_max_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v" ADD CONSTRAINT "_tours_v_version_icon_difficulty_id_media_id_fk" FOREIGN KEY ("version_icon_difficulty_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v" ADD CONSTRAINT "_tours_v_version_destinos_id_destinations_id_fk" FOREIGN KEY ("version_destinos_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_rels" ADD CONSTRAINT "_tours_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_rels" ADD CONSTRAINT "_tours_v_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_rels" ADD CONSTRAINT "_tours_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "ofertas" ADD CONSTRAINT "ofertas_imagen_id_media_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "ofertas" ADD CONSTRAINT "ofertas_tour_relacionado_id_tours_id_fk" FOREIGN KEY ("tour_relacionado_id") REFERENCES "public"."tours"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "destinations" ADD CONSTRAINT "destinations_image_destination_id_media_id_fk" FOREIGN KEY ("image_destination_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "destinations" ADD CONSTRAINT "destinations_background_destination_id_media_id_fk" FOREIGN KEY ("background_destination_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "destinations" ADD CONSTRAINT "destinations_carousel_item_destination_id_media_id_fk" FOREIGN KEY ("carousel_item_destination_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_gallery" ADD CONSTRAINT "posts_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_gallery" ADD CONSTRAINT "posts_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "posts_blocks_reconocimientos_reconocimientos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "posts_blocks_reconocimientos_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_reconocimientos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_reconocimientos" ADD CONSTRAINT "posts_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_socios_socios" ADD CONSTRAINT "posts_blocks_socios_socios_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_socios_socios" ADD CONSTRAINT "posts_blocks_socios_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_socios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_blocks_socios" ADD CONSTRAINT "posts_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_gallery" ADD CONSTRAINT "_posts_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_gallery" ADD CONSTRAINT "_posts_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "_posts_v_blocks_reconocimientos_reconocimientos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "_posts_v_blocks_reconocimientos_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_reconocimientos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_reconocimientos" ADD CONSTRAINT "_posts_v_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_socios_socios" ADD CONSTRAINT "_posts_v_blocks_socios_socios_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_socios_socios" ADD CONSTRAINT "_posts_v_blocks_socios_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_socios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_blocks_socios" ADD CONSTRAINT "_posts_v_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_background_image_id_media_id_fk" FOREIGN KEY ("version_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_paquete_herocar_car_content_car_images" ADD CONSTRAINT "paquetes_blocks_paquete_herocar_car_content_car_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_paquete_herocar_car_content_car_images" ADD CONSTRAINT "paquetes_blocks_paquete_herocar_car_content_car_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes_blocks_paquete_herocar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_paquete_herocar" ADD CONSTRAINT "paquetes_blocks_paquete_herocar_image_content_image_id_media_id_fk" FOREIGN KEY ("image_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_paquete_herocar" ADD CONSTRAINT "paquetes_blocks_paquete_herocar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_descr_price" ADD CONSTRAINT "paquetes_blocks_descr_price_right_column_payment_form_icon_date_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_date_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_descr_price" ADD CONSTRAINT "paquetes_blocks_descr_price_right_column_payment_form_icon_passengers_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_descr_price" ADD CONSTRAINT "paquetes_blocks_descr_price_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_guia_tour" ADD CONSTRAINT "paquetes_blocks_guia_tour_section_itinerario_icon_image_id_media_id_fk" FOREIGN KEY ("section_itinerario_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_guia_tour" ADD CONSTRAINT "paquetes_blocks_guia_tour_section_incluye_no_incluye_icon_image_id_media_id_fk" FOREIGN KEY ("section_incluye_no_incluye_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_guia_tour" ADD CONSTRAINT "paquetes_blocks_guia_tour_section_precios_icon_image_id_media_id_fk" FOREIGN KEY ("section_precios_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_guia_tour" ADD CONSTRAINT "paquetes_blocks_guia_tour_section_info_viaje_icon_image_id_media_id_fk" FOREIGN KEY ("section_info_viaje_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_guia_tour" ADD CONSTRAINT "paquetes_blocks_guia_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_grid_tours" ADD CONSTRAINT "paquetes_blocks_grid_tours_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_grid_tours" ADD CONSTRAINT "paquetes_blocks_grid_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_post_relation_tour" ADD CONSTRAINT "paquetes_blocks_post_relation_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_you_tube_links_video_links" ADD CONSTRAINT "paquetes_blocks_you_tube_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes_blocks_you_tube_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_you_tube_links" ADD CONSTRAINT "paquetes_blocks_you_tube_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_socios_socios" ADD CONSTRAINT "paquetes_blocks_socios_socios_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_socios_socios" ADD CONSTRAINT "paquetes_blocks_socios_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes_blocks_socios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_socios" ADD CONSTRAINT "paquetes_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "paquetes_blocks_reconocimientos_reconocimientos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "paquetes_blocks_reconocimientos_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes_blocks_reconocimientos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_reconocimientos" ADD CONSTRAINT "paquetes_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes" ADD CONSTRAINT "paquetes_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes" ADD CONSTRAINT "paquetes_icon_max_passengers_id_media_id_fk" FOREIGN KEY ("icon_max_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes" ADD CONSTRAINT "paquetes_icon_difficulty_id_media_id_fk" FOREIGN KEY ("icon_difficulty_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_rels" ADD CONSTRAINT "paquetes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_rels" ADD CONSTRAINT "paquetes_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_rels" ADD CONSTRAINT "paquetes_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_rels" ADD CONSTRAINT "paquetes_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_paquete_herocar_car_content_car_images" ADD CONSTRAINT "_paquetes_v_blocks_paquete_herocar_car_content_car_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_paquete_herocar_car_content_car_images" ADD CONSTRAINT "_paquetes_v_blocks_paquete_herocar_car_content_car_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v_blocks_paquete_herocar"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_paquete_herocar" ADD CONSTRAINT "_paquetes_v_blocks_paquete_herocar_image_content_image_id_media_id_fk" FOREIGN KEY ("image_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_paquete_herocar" ADD CONSTRAINT "_paquetes_v_blocks_paquete_herocar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_descr_price" ADD CONSTRAINT "_paquetes_v_blocks_descr_price_right_column_payment_form_icon_date_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_date_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_descr_price" ADD CONSTRAINT "_paquetes_v_blocks_descr_price_right_column_payment_form_icon_passengers_id_media_id_fk" FOREIGN KEY ("right_column_payment_form_icon_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_descr_price" ADD CONSTRAINT "_paquetes_v_blocks_descr_price_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD CONSTRAINT "_paquetes_v_blocks_guia_tour_section_itinerario_icon_image_id_media_id_fk" FOREIGN KEY ("section_itinerario_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD CONSTRAINT "_paquetes_v_blocks_guia_tour_section_incluye_no_incluye_icon_image_id_media_id_fk" FOREIGN KEY ("section_incluye_no_incluye_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD CONSTRAINT "_paquetes_v_blocks_guia_tour_section_precios_icon_image_id_media_id_fk" FOREIGN KEY ("section_precios_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD CONSTRAINT "_paquetes_v_blocks_guia_tour_section_info_viaje_icon_image_id_media_id_fk" FOREIGN KEY ("section_info_viaje_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD CONSTRAINT "_paquetes_v_blocks_guia_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_grid_tours" ADD CONSTRAINT "_paquetes_v_blocks_grid_tours_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_grid_tours" ADD CONSTRAINT "_paquetes_v_blocks_grid_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_post_relation_tour" ADD CONSTRAINT "_paquetes_v_blocks_post_relation_tour_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_you_tube_links_video_links" ADD CONSTRAINT "_paquetes_v_blocks_you_tube_links_video_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v_blocks_you_tube_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_you_tube_links" ADD CONSTRAINT "_paquetes_v_blocks_you_tube_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_socios_socios" ADD CONSTRAINT "_paquetes_v_blocks_socios_socios_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_socios_socios" ADD CONSTRAINT "_paquetes_v_blocks_socios_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v_blocks_socios"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_socios" ADD CONSTRAINT "_paquetes_v_blocks_socios_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "_paquetes_v_blocks_reconocimientos_reconocimientos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_reconocimientos_reconocimientos" ADD CONSTRAINT "_paquetes_v_blocks_reconocimientos_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v_blocks_reconocimientos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_reconocimientos" ADD CONSTRAINT "_paquetes_v_blocks_reconocimientos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v" ADD CONSTRAINT "_paquetes_v_parent_id_paquetes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."paquetes"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v" ADD CONSTRAINT "_paquetes_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v" ADD CONSTRAINT "_paquetes_v_version_icon_max_passengers_id_media_id_fk" FOREIGN KEY ("version_icon_max_passengers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v" ADD CONSTRAINT "_paquetes_v_version_icon_difficulty_id_media_id_fk" FOREIGN KEY ("version_icon_difficulty_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_rels" ADD CONSTRAINT "_paquetes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_paquetes_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_rels" ADD CONSTRAINT "_paquetes_v_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_rels" ADD CONSTRAINT "_paquetes_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_rels" ADD CONSTRAINT "_paquetes_v_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ofertas_fk" FOREIGN KEY ("ofertas_id") REFERENCES "public"."ofertas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tour_category_fk" FOREIGN KEY ("tour_category_id") REFERENCES "public"."tour_category"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_paquetes_fk" FOREIGN KEY ("paquetes_id") REFERENCES "public"."paquetes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_order_idx" ON "pages_blocks_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_parent_id_idx" ON "pages_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_path_idx" ON "pages_blocks_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_banner_image_idx" ON "pages_blocks_banner" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_hero_page_order_idx" ON "pages_blocks_carousel_hero_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_hero_page_parent_id_idx" ON "pages_blocks_carousel_hero_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_hero_page_path_idx" ON "pages_blocks_carousel_hero_page" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_tours_order_idx" ON "pages_blocks_grid_tours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_tours_parent_id_idx" ON "pages_blocks_grid_tours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_tours_path_idx" ON "pages_blocks_grid_tours" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_tours_destination_idx" ON "pages_blocks_grid_tours" USING btree ("destination_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_post_relation_tour_order_idx" ON "pages_blocks_post_relation_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_post_relation_tour_parent_id_idx" ON "pages_blocks_post_relation_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_post_relation_tour_path_idx" ON "pages_blocks_post_relation_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_socios_socios_order_idx" ON "pages_blocks_socios_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_socios_socios_parent_id_idx" ON "pages_blocks_socios_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_socios_socios_image_idx" ON "pages_blocks_socios_socios" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_socios_order_idx" ON "pages_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_socios_parent_id_idx" ON "pages_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_socios_path_idx" ON "pages_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_reconocimientos_reconocimientos_order_idx" ON "pages_blocks_reconocimientos_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_reconocimientos_reconocimientos_parent_id_idx" ON "pages_blocks_reconocimientos_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_reconocimientos_reconocimientos_image_idx" ON "pages_blocks_reconocimientos_reconocimientos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_reconocimientos_order_idx" ON "pages_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_reconocimientos_parent_id_idx" ON "pages_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_reconocimientos_path_idx" ON "pages_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ofertas_order_idx" ON "pages_blocks_ofertas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ofertas_parent_id_idx" ON "pages_blocks_ofertas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_ofertas_path_idx" ON "pages_blocks_ofertas" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_destination_order_idx" ON "pages_blocks_carousel_destination" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_destination_parent_id_idx" ON "pages_blocks_carousel_destination" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_carousel_destination_path_idx" ON "pages_blocks_carousel_destination" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tik_tok_links_video_links_order_idx" ON "pages_blocks_tik_tok_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tik_tok_links_video_links_parent_id_idx" ON "pages_blocks_tik_tok_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tik_tok_links_order_idx" ON "pages_blocks_tik_tok_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tik_tok_links_parent_id_idx" ON "pages_blocks_tik_tok_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_tik_tok_links_path_idx" ON "pages_blocks_tik_tok_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_beneficios_beneficios_order_idx" ON "pages_blocks_beneficios_beneficios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_beneficios_beneficios_parent_id_idx" ON "pages_blocks_beneficios_beneficios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_beneficios_beneficios_beneficio_image_idx" ON "pages_blocks_beneficios_beneficios" USING btree ("beneficio_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_beneficios_order_idx" ON "pages_blocks_beneficios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_beneficios_parent_id_idx" ON "pages_blocks_beneficios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_beneficios_path_idx" ON "pages_blocks_beneficios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_estadisticas_estadisticas_text_estadisticas_box_order_idx" ON "pages_blocks_estadisticas_estadisticas_text_estadisticas_box" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_estadisticas_estadisticas_text_estadisticas_box_parent_id_idx" ON "pages_blocks_estadisticas_estadisticas_text_estadisticas_box" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_estadisticas_order_idx" ON "pages_blocks_estadisticas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_estadisticas_parent_id_idx" ON "pages_blocks_estadisticas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_estadisticas_path_idx" ON "pages_blocks_estadisticas" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_content_order_idx" ON "pages_blocks_text_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_content_parent_id_idx" ON "pages_blocks_text_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_text_content_path_idx" ON "pages_blocks_text_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_image_order_idx" ON "pages_blocks_grid_images_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_image_parent_id_idx" ON "pages_blocks_grid_images_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_image_image_idx" ON "pages_blocks_grid_images_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_order_idx" ON "pages_blocks_grid_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_parent_id_idx" ON "pages_blocks_grid_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_grid_images_path_idx" ON "pages_blocks_grid_images" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_row_block_columns_order_idx" ON "pages_blocks_row_block_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_row_block_columns_parent_id_idx" ON "pages_blocks_row_block_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_row_block_order_idx" ON "pages_blocks_row_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_row_block_parent_id_idx" ON "pages_blocks_row_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_row_block_path_idx" ON "pages_blocks_row_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_tour_category_id_idx" ON "pages_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_order_idx" ON "_pages_v_blocks_banner" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_parent_id_idx" ON "_pages_v_blocks_banner" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_path_idx" ON "_pages_v_blocks_banner" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_banner_image_idx" ON "_pages_v_blocks_banner" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_hero_page_order_idx" ON "_pages_v_blocks_carousel_hero_page" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_hero_page_parent_id_idx" ON "_pages_v_blocks_carousel_hero_page" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_hero_page_path_idx" ON "_pages_v_blocks_carousel_hero_page" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_tours_order_idx" ON "_pages_v_blocks_grid_tours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_tours_parent_id_idx" ON "_pages_v_blocks_grid_tours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_tours_path_idx" ON "_pages_v_blocks_grid_tours" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_tours_destination_idx" ON "_pages_v_blocks_grid_tours" USING btree ("destination_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_post_relation_tour_order_idx" ON "_pages_v_blocks_post_relation_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_post_relation_tour_parent_id_idx" ON "_pages_v_blocks_post_relation_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_post_relation_tour_path_idx" ON "_pages_v_blocks_post_relation_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_socios_socios_order_idx" ON "_pages_v_blocks_socios_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_socios_socios_parent_id_idx" ON "_pages_v_blocks_socios_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_socios_socios_image_idx" ON "_pages_v_blocks_socios_socios" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_socios_order_idx" ON "_pages_v_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_socios_parent_id_idx" ON "_pages_v_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_socios_path_idx" ON "_pages_v_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reconocimientos_reconocimientos_order_idx" ON "_pages_v_blocks_reconocimientos_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reconocimientos_reconocimientos_parent_id_idx" ON "_pages_v_blocks_reconocimientos_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reconocimientos_reconocimientos_image_idx" ON "_pages_v_blocks_reconocimientos_reconocimientos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reconocimientos_order_idx" ON "_pages_v_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reconocimientos_parent_id_idx" ON "_pages_v_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_reconocimientos_path_idx" ON "_pages_v_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ofertas_order_idx" ON "_pages_v_blocks_ofertas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ofertas_parent_id_idx" ON "_pages_v_blocks_ofertas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_ofertas_path_idx" ON "_pages_v_blocks_ofertas" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_destination_order_idx" ON "_pages_v_blocks_carousel_destination" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_destination_parent_id_idx" ON "_pages_v_blocks_carousel_destination" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_carousel_destination_path_idx" ON "_pages_v_blocks_carousel_destination" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tik_tok_links_video_links_order_idx" ON "_pages_v_blocks_tik_tok_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tik_tok_links_video_links_parent_id_idx" ON "_pages_v_blocks_tik_tok_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tik_tok_links_order_idx" ON "_pages_v_blocks_tik_tok_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tik_tok_links_parent_id_idx" ON "_pages_v_blocks_tik_tok_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_tik_tok_links_path_idx" ON "_pages_v_blocks_tik_tok_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_beneficios_beneficios_order_idx" ON "_pages_v_blocks_beneficios_beneficios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_beneficios_beneficios_parent_id_idx" ON "_pages_v_blocks_beneficios_beneficios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_beneficios_beneficios_beneficio_image_idx" ON "_pages_v_blocks_beneficios_beneficios" USING btree ("beneficio_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_beneficios_order_idx" ON "_pages_v_blocks_beneficios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_beneficios_parent_id_idx" ON "_pages_v_blocks_beneficios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_beneficios_path_idx" ON "_pages_v_blocks_beneficios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_estadisticas_estadisticas_text_estadisticas_box_order_idx" ON "_pages_v_blocks_estadisticas_estadisticas_text_estadisticas_box" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_estadisticas_estadisticas_text_estadisticas_box_parent_id_idx" ON "_pages_v_blocks_estadisticas_estadisticas_text_estadisticas_box" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_estadisticas_order_idx" ON "_pages_v_blocks_estadisticas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_estadisticas_parent_id_idx" ON "_pages_v_blocks_estadisticas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_estadisticas_path_idx" ON "_pages_v_blocks_estadisticas" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_content_order_idx" ON "_pages_v_blocks_text_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_content_parent_id_idx" ON "_pages_v_blocks_text_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_content_path_idx" ON "_pages_v_blocks_text_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_image_order_idx" ON "_pages_v_blocks_grid_images_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_image_parent_id_idx" ON "_pages_v_blocks_grid_images_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_image_image_idx" ON "_pages_v_blocks_grid_images_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_order_idx" ON "_pages_v_blocks_grid_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_parent_id_idx" ON "_pages_v_blocks_grid_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_grid_images_path_idx" ON "_pages_v_blocks_grid_images" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_row_block_columns_order_idx" ON "_pages_v_blocks_row_block_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_row_block_columns_parent_id_idx" ON "_pages_v_blocks_row_block_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_row_block_order_idx" ON "_pages_v_blocks_row_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_row_block_parent_id_idx" ON "_pages_v_blocks_row_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_row_block_path_idx" ON "_pages_v_blocks_row_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_tour_category_id_idx" ON "_pages_v_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tour_herocar_car_content_car_images_order_idx" ON "tours_blocks_tour_herocar_car_content_car_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tour_herocar_car_content_car_images_parent_id_idx" ON "tours_blocks_tour_herocar_car_content_car_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tour_herocar_car_content_car_images_image_idx" ON "tours_blocks_tour_herocar_car_content_car_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tour_herocar_order_idx" ON "tours_blocks_tour_herocar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tour_herocar_parent_id_idx" ON "tours_blocks_tour_herocar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tour_herocar_path_idx" ON "tours_blocks_tour_herocar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_tour_herocar_image_content_image_content_image_idx" ON "tours_blocks_tour_herocar" USING btree ("image_content_image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_descr_price_order_idx" ON "tours_blocks_descr_price" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_descr_price_parent_id_idx" ON "tours_blocks_descr_price" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_descr_price_path_idx" ON "tours_blocks_descr_price" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_date_idx" ON "tours_blocks_descr_price" USING btree ("right_column_payment_form_icon_date_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_passengers_idx" ON "tours_blocks_descr_price" USING btree ("right_column_payment_form_icon_passengers_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_order_idx" ON "tours_blocks_guia_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_parent_id_idx" ON "tours_blocks_guia_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_path_idx" ON "tours_blocks_guia_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_itinerario_section_itinerario_icon_image_idx" ON "tours_blocks_guia_tour" USING btree ("section_itinerario_icon_image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_incluye_no_incluye_section_incluye_no_incluye_icon_image_idx" ON "tours_blocks_guia_tour" USING btree ("section_incluye_no_incluye_icon_image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_precios_section_precios_icon_image_idx" ON "tours_blocks_guia_tour" USING btree ("section_precios_icon_image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_info_viaje_section_info_viaje_icon_image_idx" ON "tours_blocks_guia_tour" USING btree ("section_info_viaje_icon_image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_tours_order_idx" ON "tours_blocks_grid_tours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_tours_parent_id_idx" ON "tours_blocks_grid_tours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_tours_path_idx" ON "tours_blocks_grid_tours" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_grid_tours_destination_idx" ON "tours_blocks_grid_tours" USING btree ("destination_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_post_relation_tour_order_idx" ON "tours_blocks_post_relation_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_post_relation_tour_parent_id_idx" ON "tours_blocks_post_relation_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_post_relation_tour_path_idx" ON "tours_blocks_post_relation_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_you_tube_links_video_links_order_idx" ON "tours_blocks_you_tube_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_you_tube_links_video_links_parent_id_idx" ON "tours_blocks_you_tube_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_you_tube_links_order_idx" ON "tours_blocks_you_tube_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_you_tube_links_parent_id_idx" ON "tours_blocks_you_tube_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_you_tube_links_path_idx" ON "tours_blocks_you_tube_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_socios_socios_order_idx" ON "tours_blocks_socios_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_socios_socios_parent_id_idx" ON "tours_blocks_socios_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_socios_socios_image_idx" ON "tours_blocks_socios_socios" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_socios_order_idx" ON "tours_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_socios_parent_id_idx" ON "tours_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_socios_path_idx" ON "tours_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_reconocimientos_reconocimientos_order_idx" ON "tours_blocks_reconocimientos_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_reconocimientos_reconocimientos_parent_id_idx" ON "tours_blocks_reconocimientos_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_reconocimientos_reconocimientos_image_idx" ON "tours_blocks_reconocimientos_reconocimientos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_reconocimientos_order_idx" ON "tours_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_reconocimientos_parent_id_idx" ON "tours_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_reconocimientos_path_idx" ON "tours_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_featured_image_idx" ON "tours" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "tours_icon_max_passengers_idx" ON "tours" USING btree ("icon_max_passengers_id");
  CREATE INDEX IF NOT EXISTS "tours_icon_difficulty_idx" ON "tours" USING btree ("icon_difficulty_id");
  CREATE INDEX IF NOT EXISTS "tours_destinos_idx" ON "tours" USING btree ("destinos_id");
  CREATE INDEX IF NOT EXISTS "tours_slug_idx" ON "tours" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tours_updated_at_idx" ON "tours" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tours_created_at_idx" ON "tours" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tours__status_idx" ON "tours" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "tours_rels_order_idx" ON "tours_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "tours_rels_parent_idx" ON "tours_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "tours_rels_path_idx" ON "tours_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "tours_rels_tour_category_id_idx" ON "tours_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "tours_rels_posts_id_idx" ON "tours_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tour_herocar_car_content_car_images_order_idx" ON "_tours_v_blocks_tour_herocar_car_content_car_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tour_herocar_car_content_car_images_parent_id_idx" ON "_tours_v_blocks_tour_herocar_car_content_car_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tour_herocar_car_content_car_images_image_idx" ON "_tours_v_blocks_tour_herocar_car_content_car_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tour_herocar_order_idx" ON "_tours_v_blocks_tour_herocar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tour_herocar_parent_id_idx" ON "_tours_v_blocks_tour_herocar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tour_herocar_path_idx" ON "_tours_v_blocks_tour_herocar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_tour_herocar_image_content_image_content_image_idx" ON "_tours_v_blocks_tour_herocar" USING btree ("image_content_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_descr_price_order_idx" ON "_tours_v_blocks_descr_price" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_descr_price_parent_id_idx" ON "_tours_v_blocks_descr_price" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_descr_price_path_idx" ON "_tours_v_blocks_descr_price" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_date_idx" ON "_tours_v_blocks_descr_price" USING btree ("right_column_payment_form_icon_date_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_passengers_idx" ON "_tours_v_blocks_descr_price" USING btree ("right_column_payment_form_icon_passengers_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_order_idx" ON "_tours_v_blocks_guia_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_parent_id_idx" ON "_tours_v_blocks_guia_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_path_idx" ON "_tours_v_blocks_guia_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_itinerario_section_itinerario_icon_image_idx" ON "_tours_v_blocks_guia_tour" USING btree ("section_itinerario_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_incluye_no_incluye_section_incluye_no_incluye_icon_image_idx" ON "_tours_v_blocks_guia_tour" USING btree ("section_incluye_no_incluye_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_precios_section_precios_icon_image_idx" ON "_tours_v_blocks_guia_tour" USING btree ("section_precios_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_info_viaje_section_info_viaje_icon_image_idx" ON "_tours_v_blocks_guia_tour" USING btree ("section_info_viaje_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_tours_order_idx" ON "_tours_v_blocks_grid_tours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_tours_parent_id_idx" ON "_tours_v_blocks_grid_tours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_tours_path_idx" ON "_tours_v_blocks_grid_tours" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_grid_tours_destination_idx" ON "_tours_v_blocks_grid_tours" USING btree ("destination_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_post_relation_tour_order_idx" ON "_tours_v_blocks_post_relation_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_post_relation_tour_parent_id_idx" ON "_tours_v_blocks_post_relation_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_post_relation_tour_path_idx" ON "_tours_v_blocks_post_relation_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_you_tube_links_video_links_order_idx" ON "_tours_v_blocks_you_tube_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_you_tube_links_video_links_parent_id_idx" ON "_tours_v_blocks_you_tube_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_you_tube_links_order_idx" ON "_tours_v_blocks_you_tube_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_you_tube_links_parent_id_idx" ON "_tours_v_blocks_you_tube_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_you_tube_links_path_idx" ON "_tours_v_blocks_you_tube_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_socios_socios_order_idx" ON "_tours_v_blocks_socios_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_socios_socios_parent_id_idx" ON "_tours_v_blocks_socios_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_socios_socios_image_idx" ON "_tours_v_blocks_socios_socios" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_socios_order_idx" ON "_tours_v_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_socios_parent_id_idx" ON "_tours_v_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_socios_path_idx" ON "_tours_v_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_reconocimientos_reconocimientos_order_idx" ON "_tours_v_blocks_reconocimientos_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_reconocimientos_reconocimientos_parent_id_idx" ON "_tours_v_blocks_reconocimientos_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_reconocimientos_reconocimientos_image_idx" ON "_tours_v_blocks_reconocimientos_reconocimientos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_reconocimientos_order_idx" ON "_tours_v_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_reconocimientos_parent_id_idx" ON "_tours_v_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_reconocimientos_path_idx" ON "_tours_v_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_parent_idx" ON "_tours_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_version_featured_image_idx" ON "_tours_v" USING btree ("version_featured_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_version_icon_max_passengers_idx" ON "_tours_v" USING btree ("version_icon_max_passengers_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_version_icon_difficulty_idx" ON "_tours_v" USING btree ("version_icon_difficulty_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_version_destinos_idx" ON "_tours_v" USING btree ("version_destinos_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_version_slug_idx" ON "_tours_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_version_updated_at_idx" ON "_tours_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_version_created_at_idx" ON "_tours_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_tours_v_version_version__status_idx" ON "_tours_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_tours_v_created_at_idx" ON "_tours_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_tours_v_updated_at_idx" ON "_tours_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_tours_v_latest_idx" ON "_tours_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_tours_v_autosave_idx" ON "_tours_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_tours_v_rels_order_idx" ON "_tours_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_tours_v_rels_parent_idx" ON "_tours_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_rels_path_idx" ON "_tours_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_tours_v_rels_tour_category_id_idx" ON "_tours_v_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_rels_posts_id_idx" ON "_tours_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "ofertas_imagen_idx" ON "ofertas" USING btree ("imagen_id");
  CREATE INDEX IF NOT EXISTS "ofertas_tour_relacionado_idx" ON "ofertas" USING btree ("tour_relacionado_id");
  CREATE INDEX IF NOT EXISTS "ofertas_updated_at_idx" ON "ofertas" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "ofertas_created_at_idx" ON "ofertas" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "tour_category_name_idx" ON "tour_category" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "tour_category_updated_at_idx" ON "tour_category" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tour_category_created_at_idx" ON "tour_category" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "destinations_name_idx" ON "destinations" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "destinations_image_destination_idx" ON "destinations" USING btree ("image_destination_id");
  CREATE INDEX IF NOT EXISTS "destinations_background_destination_idx" ON "destinations" USING btree ("background_destination_id");
  CREATE INDEX IF NOT EXISTS "destinations_carousel_item_destination_idx" ON "destinations" USING btree ("carousel_item_destination_id");
  CREATE INDEX IF NOT EXISTS "destinations_updated_at_idx" ON "destinations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "destinations_created_at_idx" ON "destinations" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_categories_name_idx" ON "blog_categories" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "blog_categories_updated_at_idx" ON "blog_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_categories_created_at_idx" ON "blog_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts_gallery_order_idx" ON "posts_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_gallery_parent_id_idx" ON "posts_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_gallery_image_idx" ON "posts_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_reconocimientos_reconocimientos_order_idx" ON "posts_blocks_reconocimientos_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_reconocimientos_reconocimientos_parent_id_idx" ON "posts_blocks_reconocimientos_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_reconocimientos_reconocimientos_image_idx" ON "posts_blocks_reconocimientos_reconocimientos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_reconocimientos_order_idx" ON "posts_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_reconocimientos_parent_id_idx" ON "posts_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_reconocimientos_path_idx" ON "posts_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_blocks_socios_socios_order_idx" ON "posts_blocks_socios_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_socios_socios_parent_id_idx" ON "posts_blocks_socios_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_socios_socios_image_idx" ON "posts_blocks_socios_socios" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_socios_order_idx" ON "posts_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_blocks_socios_parent_id_idx" ON "posts_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_blocks_socios_path_idx" ON "posts_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "posts_background_image_idx" ON "posts" USING btree ("background_image_id");
  CREATE INDEX IF NOT EXISTS "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_blog_categories_id_idx" ON "posts_rels" USING btree ("blog_categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_gallery_order_idx" ON "_posts_v_version_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_gallery_parent_id_idx" ON "_posts_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_gallery_image_idx" ON "_posts_v_version_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_reconocimientos_reconocimientos_order_idx" ON "_posts_v_blocks_reconocimientos_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_reconocimientos_reconocimientos_parent_id_idx" ON "_posts_v_blocks_reconocimientos_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_reconocimientos_reconocimientos_image_idx" ON "_posts_v_blocks_reconocimientos_reconocimientos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_reconocimientos_order_idx" ON "_posts_v_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_reconocimientos_parent_id_idx" ON "_posts_v_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_reconocimientos_path_idx" ON "_posts_v_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_socios_socios_order_idx" ON "_posts_v_blocks_socios_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_socios_socios_parent_id_idx" ON "_posts_v_blocks_socios_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_socios_socios_image_idx" ON "_posts_v_blocks_socios_socios" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_socios_order_idx" ON "_posts_v_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_socios_parent_id_idx" ON "_posts_v_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_blocks_socios_path_idx" ON "_posts_v_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_background_image_idx" ON "_posts_v" USING btree ("version_background_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_blog_categories_id_idx" ON "_posts_v_rels" USING btree ("blog_categories_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_paquete_herocar_car_content_car_images_order_idx" ON "paquetes_blocks_paquete_herocar_car_content_car_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_paquete_herocar_car_content_car_images_parent_id_idx" ON "paquetes_blocks_paquete_herocar_car_content_car_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_paquete_herocar_car_content_car_images_image_idx" ON "paquetes_blocks_paquete_herocar_car_content_car_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_paquete_herocar_order_idx" ON "paquetes_blocks_paquete_herocar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_paquete_herocar_parent_id_idx" ON "paquetes_blocks_paquete_herocar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_paquete_herocar_path_idx" ON "paquetes_blocks_paquete_herocar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_paquete_herocar_image_content_image_content_image_idx" ON "paquetes_blocks_paquete_herocar" USING btree ("image_content_image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_descr_price_order_idx" ON "paquetes_blocks_descr_price" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_descr_price_parent_id_idx" ON "paquetes_blocks_descr_price" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_descr_price_path_idx" ON "paquetes_blocks_descr_price" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_date_idx" ON "paquetes_blocks_descr_price" USING btree ("right_column_payment_form_icon_date_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_passengers_idx" ON "paquetes_blocks_descr_price" USING btree ("right_column_payment_form_icon_passengers_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_order_idx" ON "paquetes_blocks_guia_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_parent_id_idx" ON "paquetes_blocks_guia_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_path_idx" ON "paquetes_blocks_guia_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_itinerario_section_itinerario_icon_image_idx" ON "paquetes_blocks_guia_tour" USING btree ("section_itinerario_icon_image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_incluye_no_incluye_section_incluye_no_incluye_icon_image_idx" ON "paquetes_blocks_guia_tour" USING btree ("section_incluye_no_incluye_icon_image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_precios_section_precios_icon_image_idx" ON "paquetes_blocks_guia_tour" USING btree ("section_precios_icon_image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_info_viaje_section_info_viaje_icon_image_idx" ON "paquetes_blocks_guia_tour" USING btree ("section_info_viaje_icon_image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_grid_tours_order_idx" ON "paquetes_blocks_grid_tours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_grid_tours_parent_id_idx" ON "paquetes_blocks_grid_tours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_grid_tours_path_idx" ON "paquetes_blocks_grid_tours" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_grid_tours_destination_idx" ON "paquetes_blocks_grid_tours" USING btree ("destination_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_post_relation_tour_order_idx" ON "paquetes_blocks_post_relation_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_post_relation_tour_parent_id_idx" ON "paquetes_blocks_post_relation_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_post_relation_tour_path_idx" ON "paquetes_blocks_post_relation_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_you_tube_links_video_links_order_idx" ON "paquetes_blocks_you_tube_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_you_tube_links_video_links_parent_id_idx" ON "paquetes_blocks_you_tube_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_you_tube_links_order_idx" ON "paquetes_blocks_you_tube_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_you_tube_links_parent_id_idx" ON "paquetes_blocks_you_tube_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_you_tube_links_path_idx" ON "paquetes_blocks_you_tube_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_socios_socios_order_idx" ON "paquetes_blocks_socios_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_socios_socios_parent_id_idx" ON "paquetes_blocks_socios_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_socios_socios_image_idx" ON "paquetes_blocks_socios_socios" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_socios_order_idx" ON "paquetes_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_socios_parent_id_idx" ON "paquetes_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_socios_path_idx" ON "paquetes_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_reconocimientos_reconocimientos_order_idx" ON "paquetes_blocks_reconocimientos_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_reconocimientos_reconocimientos_parent_id_idx" ON "paquetes_blocks_reconocimientos_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_reconocimientos_reconocimientos_image_idx" ON "paquetes_blocks_reconocimientos_reconocimientos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_reconocimientos_order_idx" ON "paquetes_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_reconocimientos_parent_id_idx" ON "paquetes_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_reconocimientos_path_idx" ON "paquetes_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "paquetes_featured_image_idx" ON "paquetes" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_icon_max_passengers_idx" ON "paquetes" USING btree ("icon_max_passengers_id");
  CREATE INDEX IF NOT EXISTS "paquetes_icon_difficulty_idx" ON "paquetes" USING btree ("icon_difficulty_id");
  CREATE INDEX IF NOT EXISTS "paquetes_slug_idx" ON "paquetes" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "paquetes_updated_at_idx" ON "paquetes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "paquetes_created_at_idx" ON "paquetes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "paquetes__status_idx" ON "paquetes" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "paquetes_rels_order_idx" ON "paquetes_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "paquetes_rels_parent_idx" ON "paquetes_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_rels_path_idx" ON "paquetes_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "paquetes_rels_tour_category_id_idx" ON "paquetes_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "paquetes_rels_posts_id_idx" ON "paquetes_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "paquetes_rels_destinations_id_idx" ON "paquetes_rels" USING btree ("destinations_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar_car_content_car_images_order_idx" ON "_paquetes_v_blocks_paquete_herocar_car_content_car_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar_car_content_car_images_parent_id_idx" ON "_paquetes_v_blocks_paquete_herocar_car_content_car_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar_car_content_car_images_image_idx" ON "_paquetes_v_blocks_paquete_herocar_car_content_car_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar_order_idx" ON "_paquetes_v_blocks_paquete_herocar" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar_parent_id_idx" ON "_paquetes_v_blocks_paquete_herocar" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar_path_idx" ON "_paquetes_v_blocks_paquete_herocar" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_paquete_herocar_image_content_image_content_image_idx" ON "_paquetes_v_blocks_paquete_herocar" USING btree ("image_content_image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_descr_price_order_idx" ON "_paquetes_v_blocks_descr_price" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_descr_price_parent_id_idx" ON "_paquetes_v_blocks_descr_price" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_descr_price_path_idx" ON "_paquetes_v_blocks_descr_price" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_date_idx" ON "_paquetes_v_blocks_descr_price" USING btree ("right_column_payment_form_icon_date_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_descr_price_right_column_payment_form_right_column_payment_form_icon_passengers_idx" ON "_paquetes_v_blocks_descr_price" USING btree ("right_column_payment_form_icon_passengers_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_order_idx" ON "_paquetes_v_blocks_guia_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_parent_id_idx" ON "_paquetes_v_blocks_guia_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_path_idx" ON "_paquetes_v_blocks_guia_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_itinerario_section_itinerario_icon_image_idx" ON "_paquetes_v_blocks_guia_tour" USING btree ("section_itinerario_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_incluye_no_incluye_section_incluye_no_incluye_icon_image_idx" ON "_paquetes_v_blocks_guia_tour" USING btree ("section_incluye_no_incluye_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_precios_section_precios_icon_image_idx" ON "_paquetes_v_blocks_guia_tour" USING btree ("section_precios_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_info_viaje_section_info_viaje_icon_image_idx" ON "_paquetes_v_blocks_guia_tour" USING btree ("section_info_viaje_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_grid_tours_order_idx" ON "_paquetes_v_blocks_grid_tours" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_grid_tours_parent_id_idx" ON "_paquetes_v_blocks_grid_tours" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_grid_tours_path_idx" ON "_paquetes_v_blocks_grid_tours" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_grid_tours_destination_idx" ON "_paquetes_v_blocks_grid_tours" USING btree ("destination_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_post_relation_tour_order_idx" ON "_paquetes_v_blocks_post_relation_tour" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_post_relation_tour_parent_id_idx" ON "_paquetes_v_blocks_post_relation_tour" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_post_relation_tour_path_idx" ON "_paquetes_v_blocks_post_relation_tour" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_you_tube_links_video_links_order_idx" ON "_paquetes_v_blocks_you_tube_links_video_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_you_tube_links_video_links_parent_id_idx" ON "_paquetes_v_blocks_you_tube_links_video_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_you_tube_links_order_idx" ON "_paquetes_v_blocks_you_tube_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_you_tube_links_parent_id_idx" ON "_paquetes_v_blocks_you_tube_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_you_tube_links_path_idx" ON "_paquetes_v_blocks_you_tube_links" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_socios_socios_order_idx" ON "_paquetes_v_blocks_socios_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_socios_socios_parent_id_idx" ON "_paquetes_v_blocks_socios_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_socios_socios_image_idx" ON "_paquetes_v_blocks_socios_socios" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_socios_order_idx" ON "_paquetes_v_blocks_socios" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_socios_parent_id_idx" ON "_paquetes_v_blocks_socios" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_socios_path_idx" ON "_paquetes_v_blocks_socios" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_reconocimientos_reconocimientos_order_idx" ON "_paquetes_v_blocks_reconocimientos_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_reconocimientos_reconocimientos_parent_id_idx" ON "_paquetes_v_blocks_reconocimientos_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_reconocimientos_reconocimientos_image_idx" ON "_paquetes_v_blocks_reconocimientos_reconocimientos" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_reconocimientos_order_idx" ON "_paquetes_v_blocks_reconocimientos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_reconocimientos_parent_id_idx" ON "_paquetes_v_blocks_reconocimientos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_reconocimientos_path_idx" ON "_paquetes_v_blocks_reconocimientos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_parent_idx" ON "_paquetes_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_version_version_featured_image_idx" ON "_paquetes_v" USING btree ("version_featured_image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_version_version_icon_max_passengers_idx" ON "_paquetes_v" USING btree ("version_icon_max_passengers_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_version_version_icon_difficulty_idx" ON "_paquetes_v" USING btree ("version_icon_difficulty_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_version_version_slug_idx" ON "_paquetes_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_version_version_updated_at_idx" ON "_paquetes_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_version_version_created_at_idx" ON "_paquetes_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_version_version__status_idx" ON "_paquetes_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_created_at_idx" ON "_paquetes_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_updated_at_idx" ON "_paquetes_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_latest_idx" ON "_paquetes_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_autosave_idx" ON "_paquetes_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_rels_order_idx" ON "_paquetes_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_rels_parent_idx" ON "_paquetes_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_rels_path_idx" ON "_paquetes_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_rels_tour_category_id_idx" ON "_paquetes_v_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_rels_posts_id_idx" ON "_paquetes_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_rels_destinations_id_idx" ON "_paquetes_v_rels" USING btree ("destinations_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tours_id_idx" ON "payload_locked_documents_rels" USING btree ("tours_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_ofertas_id_idx" ON "payload_locked_documents_rels" USING btree ("ofertas_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tour_category_id_idx" ON "payload_locked_documents_rels" USING btree ("tour_category_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_destinations_id_idx" ON "payload_locked_documents_rels" USING btree ("destinations_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_paquetes_id_idx" ON "payload_locked_documents_rels" USING btree ("paquetes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_banner" CASCADE;
  DROP TABLE "pages_blocks_carousel_hero_page" CASCADE;
  DROP TABLE "pages_blocks_grid_tours" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_post_relation_tour" CASCADE;
  DROP TABLE "pages_blocks_socios_socios" CASCADE;
  DROP TABLE "pages_blocks_socios" CASCADE;
  DROP TABLE "pages_blocks_reconocimientos_reconocimientos" CASCADE;
  DROP TABLE "pages_blocks_reconocimientos" CASCADE;
  DROP TABLE "pages_blocks_ofertas" CASCADE;
  DROP TABLE "pages_blocks_carousel_destination" CASCADE;
  DROP TABLE "pages_blocks_tik_tok_links_video_links" CASCADE;
  DROP TABLE "pages_blocks_tik_tok_links" CASCADE;
  DROP TABLE "pages_blocks_beneficios_beneficios" CASCADE;
  DROP TABLE "pages_blocks_beneficios" CASCADE;
  DROP TABLE "pages_blocks_estadisticas_estadisticas_text_estadisticas_box" CASCADE;
  DROP TABLE "pages_blocks_estadisticas" CASCADE;
  DROP TABLE "pages_blocks_text_content" CASCADE;
  DROP TABLE "pages_blocks_grid_images_image" CASCADE;
  DROP TABLE "pages_blocks_grid_images" CASCADE;
  DROP TABLE "pages_blocks_row_block_columns" CASCADE;
  DROP TABLE "pages_blocks_row_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_hero_page" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_tours" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_post_relation_tour" CASCADE;
  DROP TABLE "_pages_v_blocks_socios_socios" CASCADE;
  DROP TABLE "_pages_v_blocks_socios" CASCADE;
  DROP TABLE "_pages_v_blocks_reconocimientos_reconocimientos" CASCADE;
  DROP TABLE "_pages_v_blocks_reconocimientos" CASCADE;
  DROP TABLE "_pages_v_blocks_ofertas" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_destination" CASCADE;
  DROP TABLE "_pages_v_blocks_tik_tok_links_video_links" CASCADE;
  DROP TABLE "_pages_v_blocks_tik_tok_links" CASCADE;
  DROP TABLE "_pages_v_blocks_beneficios_beneficios" CASCADE;
  DROP TABLE "_pages_v_blocks_beneficios" CASCADE;
  DROP TABLE "_pages_v_blocks_estadisticas_estadisticas_text_estadisticas_box" CASCADE;
  DROP TABLE "_pages_v_blocks_estadisticas" CASCADE;
  DROP TABLE "_pages_v_blocks_text_content" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_images_image" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_images" CASCADE;
  DROP TABLE "_pages_v_blocks_row_block_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_row_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "tours_blocks_tour_herocar_car_content_car_images" CASCADE;
  DROP TABLE "tours_blocks_tour_herocar" CASCADE;
  DROP TABLE "tours_blocks_descr_price" CASCADE;
  DROP TABLE "tours_blocks_guia_tour" CASCADE;
  DROP TABLE "tours_blocks_grid_tours" CASCADE;
  DROP TABLE "tours_blocks_post_relation_tour" CASCADE;
  DROP TABLE "tours_blocks_you_tube_links_video_links" CASCADE;
  DROP TABLE "tours_blocks_you_tube_links" CASCADE;
  DROP TABLE "tours_blocks_socios_socios" CASCADE;
  DROP TABLE "tours_blocks_socios" CASCADE;
  DROP TABLE "tours_blocks_reconocimientos_reconocimientos" CASCADE;
  DROP TABLE "tours_blocks_reconocimientos" CASCADE;
  DROP TABLE "tours" CASCADE;
  DROP TABLE "tours_rels" CASCADE;
  DROP TABLE "_tours_v_blocks_tour_herocar_car_content_car_images" CASCADE;
  DROP TABLE "_tours_v_blocks_tour_herocar" CASCADE;
  DROP TABLE "_tours_v_blocks_descr_price" CASCADE;
  DROP TABLE "_tours_v_blocks_guia_tour" CASCADE;
  DROP TABLE "_tours_v_blocks_grid_tours" CASCADE;
  DROP TABLE "_tours_v_blocks_post_relation_tour" CASCADE;
  DROP TABLE "_tours_v_blocks_you_tube_links_video_links" CASCADE;
  DROP TABLE "_tours_v_blocks_you_tube_links" CASCADE;
  DROP TABLE "_tours_v_blocks_socios_socios" CASCADE;
  DROP TABLE "_tours_v_blocks_socios" CASCADE;
  DROP TABLE "_tours_v_blocks_reconocimientos_reconocimientos" CASCADE;
  DROP TABLE "_tours_v_blocks_reconocimientos" CASCADE;
  DROP TABLE "_tours_v" CASCADE;
  DROP TABLE "_tours_v_rels" CASCADE;
  DROP TABLE "ofertas" CASCADE;
  DROP TABLE "tour_category" CASCADE;
  DROP TABLE "destinations" CASCADE;
  DROP TABLE "blog_categories" CASCADE;
  DROP TABLE "posts_gallery" CASCADE;
  DROP TABLE "posts_blocks_reconocimientos_reconocimientos" CASCADE;
  DROP TABLE "posts_blocks_reconocimientos" CASCADE;
  DROP TABLE "posts_blocks_socios_socios" CASCADE;
  DROP TABLE "posts_blocks_socios" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_reconocimientos_reconocimientos" CASCADE;
  DROP TABLE "_posts_v_blocks_reconocimientos" CASCADE;
  DROP TABLE "_posts_v_blocks_socios_socios" CASCADE;
  DROP TABLE "_posts_v_blocks_socios" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "paquetes_blocks_paquete_herocar_car_content_car_images" CASCADE;
  DROP TABLE "paquetes_blocks_paquete_herocar" CASCADE;
  DROP TABLE "paquetes_blocks_descr_price" CASCADE;
  DROP TABLE "paquetes_blocks_guia_tour" CASCADE;
  DROP TABLE "paquetes_blocks_grid_tours" CASCADE;
  DROP TABLE "paquetes_blocks_post_relation_tour" CASCADE;
  DROP TABLE "paquetes_blocks_you_tube_links_video_links" CASCADE;
  DROP TABLE "paquetes_blocks_you_tube_links" CASCADE;
  DROP TABLE "paquetes_blocks_socios_socios" CASCADE;
  DROP TABLE "paquetes_blocks_socios" CASCADE;
  DROP TABLE "paquetes_blocks_reconocimientos_reconocimientos" CASCADE;
  DROP TABLE "paquetes_blocks_reconocimientos" CASCADE;
  DROP TABLE "paquetes" CASCADE;
  DROP TABLE "paquetes_rels" CASCADE;
  DROP TABLE "_paquetes_v_blocks_paquete_herocar_car_content_car_images" CASCADE;
  DROP TABLE "_paquetes_v_blocks_paquete_herocar" CASCADE;
  DROP TABLE "_paquetes_v_blocks_descr_price" CASCADE;
  DROP TABLE "_paquetes_v_blocks_guia_tour" CASCADE;
  DROP TABLE "_paquetes_v_blocks_grid_tours" CASCADE;
  DROP TABLE "_paquetes_v_blocks_post_relation_tour" CASCADE;
  DROP TABLE "_paquetes_v_blocks_you_tube_links_video_links" CASCADE;
  DROP TABLE "_paquetes_v_blocks_you_tube_links" CASCADE;
  DROP TABLE "_paquetes_v_blocks_socios_socios" CASCADE;
  DROP TABLE "_paquetes_v_blocks_socios" CASCADE;
  DROP TABLE "_paquetes_v_blocks_reconocimientos_reconocimientos" CASCADE;
  DROP TABLE "_paquetes_v_blocks_reconocimientos" CASCADE;
  DROP TABLE "_paquetes_v" CASCADE;
  DROP TABLE "_paquetes_v_rels" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_pages_blocks_grid_tours_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_grid_tours_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_post_relation_tour_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_post_relation_tour_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_socios_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_ofertas_title_tag";
  DROP TYPE "public"."enum_pages_blocks_ofertas_title_size";
  DROP TYPE "public"."enum_pages_blocks_carousel_destination_title_tag";
  DROP TYPE "public"."enum_pages_blocks_carousel_destination_title_size";
  DROP TYPE "public"."enum_pages_blocks_tik_tok_links_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_tik_tok_links_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_beneficios_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_beneficios_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_text_content_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_text_content_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_text_content_description_alignment";
  DROP TYPE "public"."enum_pages_blocks_grid_images_type_grid";
  DROP TYPE "public"."enum_pages_blocks_row_block_columns_column_width";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_grid_tours_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_grid_tours_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_post_relation_tour_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_post_relation_tour_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_socios_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_ofertas_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_ofertas_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_destination_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_carousel_destination_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_tik_tok_links_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_tik_tok_links_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_beneficios_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_beneficios_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_text_content_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_text_content_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_text_content_description_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_grid_images_type_grid";
  DROP TYPE "public"."enum__pages_v_blocks_row_block_columns_column_width";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_tours_blocks_descr_price_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_descr_price_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_guia_tour_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_guia_tour_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_grid_tours_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_grid_tours_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_post_relation_tour_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_post_relation_tour_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_you_tube_links_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_you_tube_links_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_socios_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum_tours_difficulty";
  DROP TYPE "public"."enum_tours_status";
  DROP TYPE "public"."enum__tours_v_blocks_descr_price_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_descr_price_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_guia_tour_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_guia_tour_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_grid_tours_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_grid_tours_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_post_relation_tour_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_post_relation_tour_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_you_tube_links_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_you_tube_links_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_socios_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum__tours_v_version_difficulty";
  DROP TYPE "public"."enum__tours_v_version_status";
  DROP TYPE "public"."enum_posts_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum_posts_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum_posts_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum_posts_blocks_socios_block_title_size";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum__posts_v_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum__posts_v_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum__posts_v_blocks_socios_block_title_size";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_paquetes_blocks_descr_price_block_title_tag";
  DROP TYPE "public"."enum_paquetes_blocks_descr_price_block_title_size";
  DROP TYPE "public"."enum_paquetes_blocks_guia_tour_block_title_tag";
  DROP TYPE "public"."enum_paquetes_blocks_guia_tour_block_title_size";
  DROP TYPE "public"."enum_paquetes_blocks_grid_tours_block_title_tag";
  DROP TYPE "public"."enum_paquetes_blocks_grid_tours_block_title_size";
  DROP TYPE "public"."enum_paquetes_blocks_post_relation_tour_block_title_tag";
  DROP TYPE "public"."enum_paquetes_blocks_post_relation_tour_block_title_size";
  DROP TYPE "public"."enum_paquetes_blocks_you_tube_links_block_title_tag";
  DROP TYPE "public"."enum_paquetes_blocks_you_tube_links_block_title_size";
  DROP TYPE "public"."enum_paquetes_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum_paquetes_blocks_socios_block_title_size";
  DROP TYPE "public"."enum_paquetes_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum_paquetes_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum_paquetes_difficulty";
  DROP TYPE "public"."enum_paquetes_status";
  DROP TYPE "public"."enum__paquetes_v_blocks_descr_price_block_title_tag";
  DROP TYPE "public"."enum__paquetes_v_blocks_descr_price_block_title_size";
  DROP TYPE "public"."enum__paquetes_v_blocks_guia_tour_block_title_tag";
  DROP TYPE "public"."enum__paquetes_v_blocks_guia_tour_block_title_size";
  DROP TYPE "public"."enum__paquetes_v_blocks_grid_tours_block_title_tag";
  DROP TYPE "public"."enum__paquetes_v_blocks_grid_tours_block_title_size";
  DROP TYPE "public"."enum__paquetes_v_blocks_post_relation_tour_block_title_tag";
  DROP TYPE "public"."enum__paquetes_v_blocks_post_relation_tour_block_title_size";
  DROP TYPE "public"."enum__paquetes_v_blocks_you_tube_links_block_title_tag";
  DROP TYPE "public"."enum__paquetes_v_blocks_you_tube_links_block_title_size";
  DROP TYPE "public"."enum__paquetes_v_blocks_socios_block_title_tag";
  DROP TYPE "public"."enum__paquetes_v_blocks_socios_block_title_size";
  DROP TYPE "public"."enum__paquetes_v_blocks_reconocimientos_block_title_tag";
  DROP TYPE "public"."enum__paquetes_v_blocks_reconocimientos_block_title_size";
  DROP TYPE "public"."enum__paquetes_v_version_difficulty";
  DROP TYPE "public"."enum__paquetes_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
