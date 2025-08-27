import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_blocks_txt_icon_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_txt_icon_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tours_blocks_txt_icon_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum__tours_v_blocks_txt_icon_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_txt_icon_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_txt_icon_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum_tou_p_blocks_txt_icon_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tou_p_blocks_txt_icon_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_tou_p_blocks_txt_icon_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum__tou_p_v_blocks_txt_icon_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tou_p_v_blocks_txt_icon_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tou_p_v_blocks_txt_icon_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum_pac_p_blocks_txt_icon_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pac_p_blocks_txt_icon_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum_pac_p_blocks_txt_icon_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TYPE "public"."enum__pac_p_v_blocks_txt_icon_content_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pac_p_v_blocks_txt_icon_content_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pac_p_v_blocks_txt_icon_content_description_alignment" AS ENUM('left', 'center', 'right', 'justify');
  CREATE TABLE IF NOT EXISTS "tours_blocks_txt_icon_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_image_id" integer,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_txt_icon_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_txt_icon_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum_tours_blocks_txt_icon_content_description_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_txt_icon_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_image_id" integer,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_txt_icon_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_txt_icon_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum__tours_v_blocks_txt_icon_content_description_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tou_p_blocks_txt_icon_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_image_id" integer,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tou_p_blocks_txt_icon_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tou_p_blocks_txt_icon_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum_tou_p_blocks_txt_icon_content_description_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tou_p_v_blocks_txt_icon_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_image_id" integer,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tou_p_v_blocks_txt_icon_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tou_p_v_blocks_txt_icon_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum__tou_p_v_blocks_txt_icon_content_description_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pac_p_blocks_txt_icon_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_image_id" integer,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pac_p_blocks_txt_icon_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pac_p_blocks_txt_icon_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum_pac_p_blocks_txt_icon_content_description_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pac_p_v_blocks_txt_icon_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_image_id" integer,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pac_p_v_blocks_txt_icon_content_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pac_p_v_blocks_txt_icon_content_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"description" jsonb,
  	"description_alignment" "enum__pac_p_v_blocks_txt_icon_content_description_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_txt_icon_content" ADD CONSTRAINT "tours_blocks_txt_icon_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_txt_icon_content" ADD CONSTRAINT "tours_blocks_txt_icon_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_txt_icon_content" ADD CONSTRAINT "_tours_v_blocks_txt_icon_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_txt_icon_content" ADD CONSTRAINT "_tours_v_blocks_txt_icon_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tou_p_blocks_txt_icon_content" ADD CONSTRAINT "tou_p_blocks_txt_icon_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tou_p_blocks_txt_icon_content" ADD CONSTRAINT "tou_p_blocks_txt_icon_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tou_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tou_p_v_blocks_txt_icon_content" ADD CONSTRAINT "_tou_p_v_blocks_txt_icon_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tou_p_v_blocks_txt_icon_content" ADD CONSTRAINT "_tou_p_v_blocks_txt_icon_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tou_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pac_p_blocks_txt_icon_content" ADD CONSTRAINT "pac_p_blocks_txt_icon_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pac_p_blocks_txt_icon_content" ADD CONSTRAINT "pac_p_blocks_txt_icon_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pac_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pac_p_v_blocks_txt_icon_content" ADD CONSTRAINT "_pac_p_v_blocks_txt_icon_content_icon_image_id_media_id_fk" FOREIGN KEY ("icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pac_p_v_blocks_txt_icon_content" ADD CONSTRAINT "_pac_p_v_blocks_txt_icon_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pac_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_blocks_txt_icon_content_order_idx" ON "tours_blocks_txt_icon_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_txt_icon_content_parent_id_idx" ON "tours_blocks_txt_icon_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_txt_icon_content_path_idx" ON "tours_blocks_txt_icon_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_txt_icon_content_icon_image_idx" ON "tours_blocks_txt_icon_content" USING btree ("icon_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_txt_icon_content_order_idx" ON "_tours_v_blocks_txt_icon_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_txt_icon_content_parent_id_idx" ON "_tours_v_blocks_txt_icon_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_txt_icon_content_path_idx" ON "_tours_v_blocks_txt_icon_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_txt_icon_content_icon_image_idx" ON "_tours_v_blocks_txt_icon_content" USING btree ("icon_image_id");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_txt_icon_content_order_idx" ON "tou_p_blocks_txt_icon_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_txt_icon_content_parent_id_idx" ON "tou_p_blocks_txt_icon_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_txt_icon_content_path_idx" ON "tou_p_blocks_txt_icon_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_txt_icon_content_icon_image_idx" ON "tou_p_blocks_txt_icon_content" USING btree ("icon_image_id");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_txt_icon_content_order_idx" ON "_tou_p_v_blocks_txt_icon_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_txt_icon_content_parent_id_idx" ON "_tou_p_v_blocks_txt_icon_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_txt_icon_content_path_idx" ON "_tou_p_v_blocks_txt_icon_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_txt_icon_content_icon_image_idx" ON "_tou_p_v_blocks_txt_icon_content" USING btree ("icon_image_id");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_txt_icon_content_order_idx" ON "pac_p_blocks_txt_icon_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_txt_icon_content_parent_id_idx" ON "pac_p_blocks_txt_icon_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_txt_icon_content_path_idx" ON "pac_p_blocks_txt_icon_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_txt_icon_content_icon_image_idx" ON "pac_p_blocks_txt_icon_content" USING btree ("icon_image_id");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_txt_icon_content_order_idx" ON "_pac_p_v_blocks_txt_icon_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_txt_icon_content_parent_id_idx" ON "_pac_p_v_blocks_txt_icon_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_txt_icon_content_path_idx" ON "_pac_p_v_blocks_txt_icon_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_txt_icon_content_icon_image_idx" ON "_pac_p_v_blocks_txt_icon_content" USING btree ("icon_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tours_blocks_txt_icon_content" CASCADE;
  DROP TABLE "_tours_v_blocks_txt_icon_content" CASCADE;
  DROP TABLE "tou_p_blocks_txt_icon_content" CASCADE;
  DROP TABLE "_tou_p_v_blocks_txt_icon_content" CASCADE;
  DROP TABLE "pac_p_blocks_txt_icon_content" CASCADE;
  DROP TABLE "_pac_p_v_blocks_txt_icon_content" CASCADE;
  DROP TYPE "public"."enum_tours_blocks_txt_icon_content_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_txt_icon_content_block_title_size";
  DROP TYPE "public"."enum_tours_blocks_txt_icon_content_description_alignment";
  DROP TYPE "public"."enum__tours_v_blocks_txt_icon_content_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_txt_icon_content_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_txt_icon_content_description_alignment";
  DROP TYPE "public"."enum_tou_p_blocks_txt_icon_content_block_title_tag";
  DROP TYPE "public"."enum_tou_p_blocks_txt_icon_content_block_title_size";
  DROP TYPE "public"."enum_tou_p_blocks_txt_icon_content_description_alignment";
  DROP TYPE "public"."enum__tou_p_v_blocks_txt_icon_content_block_title_tag";
  DROP TYPE "public"."enum__tou_p_v_blocks_txt_icon_content_block_title_size";
  DROP TYPE "public"."enum__tou_p_v_blocks_txt_icon_content_description_alignment";
  DROP TYPE "public"."enum_pac_p_blocks_txt_icon_content_block_title_tag";
  DROP TYPE "public"."enum_pac_p_blocks_txt_icon_content_block_title_size";
  DROP TYPE "public"."enum_pac_p_blocks_txt_icon_content_description_alignment";
  DROP TYPE "public"."enum__pac_p_v_blocks_txt_icon_content_block_title_tag";
  DROP TYPE "public"."enum__pac_p_v_blocks_txt_icon_content_block_title_size";
  DROP TYPE "public"."enum__pac_p_v_blocks_txt_icon_content_description_alignment";`)
}
