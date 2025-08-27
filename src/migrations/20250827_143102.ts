import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_txt_icon_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pages_blocks_txt_icon_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pages_blocks_txt_icon_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum__pages_v_blocks_txt_icon_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pages_v_blocks_txt_icon_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pages_v_blocks_txt_icon_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TABLE IF NOT EXISTS "pages_blocks_txt_icon_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_image_id" integer,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pages_blocks_txt_icon_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pages_blocks_txt_icon_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum_pages_blocks_txt_icon_content_description_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_txt_icon_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_image_id" integer,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pages_v_blocks_txt_icon_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pages_v_blocks_txt_icon_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum__pages_v_blocks_txt_icon_content_description_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_txt_icon_content" ADD CONSTRAINT "pages_blocks_txt_icon_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_txt_icon_content" ADD CONSTRAINT "pages_blocks_txt_icon_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_txt_icon_content" ADD CONSTRAINT "_pages_v_blocks_txt_icon_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_txt_icon_content" ADD CONSTRAINT "_pages_v_blocks_txt_icon_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_txt_icon_content_order_idx" ON "pages_blocks_txt_icon_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_txt_icon_content_parent_id_idx" ON "pages_blocks_txt_icon_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_txt_icon_content_path_idx" ON "pages_blocks_txt_icon_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_txt_icon_content_icon_image_idx" ON "pages_blocks_txt_icon_content" USING btree ("icon_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_txt_icon_content_order_idx" ON "_pages_v_blocks_txt_icon_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_txt_icon_content_parent_id_idx" ON "_pages_v_blocks_txt_icon_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_txt_icon_content_path_idx" ON "_pages_v_blocks_txt_icon_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_txt_icon_content_icon_image_idx" ON "_pages_v_blocks_txt_icon_content" USING btree ("icon_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_txt_icon_content" CASCADE;
  DROP TABLE "_pages_v_blocks_txt_icon_content" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_txt_icon_content_block_title_tag";
  DROP TYPE "public"."enum_pages_blocks_txt_icon_content_block_title_size";
  DROP TYPE "public"."enum_pages_blocks_txt_icon_content_description_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_txt_icon_content_block_title_tag";
  DROP TYPE "public"."enum__pages_v_blocks_txt_icon_content_block_title_size";
  DROP TYPE "public"."enum__pages_v_blocks_txt_icon_content_description_alignment";`)
}
