import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_blocks_map_block_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_tours_blocks_map_block_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__tours_v_blocks_map_block_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__tours_v_blocks_map_block_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TABLE IF NOT EXISTS "tours_blocks_map_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_tours_blocks_map_block_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_tours_blocks_map_block_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"image_content_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_map_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__tours_v_blocks_map_block_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__tours_v_blocks_map_block_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"image_content_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_map_block" ADD CONSTRAINT "tours_blocks_map_block_image_content_image_id_media_id_fk" FOREIGN KEY ("image_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_map_block" ADD CONSTRAINT "tours_blocks_map_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_map_block" ADD CONSTRAINT "_tours_v_blocks_map_block_image_content_image_id_media_id_fk" FOREIGN KEY ("image_content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_map_block" ADD CONSTRAINT "_tours_v_blocks_map_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_blocks_map_block_order_idx" ON "tours_blocks_map_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_map_block_parent_id_idx" ON "tours_blocks_map_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_map_block_path_idx" ON "tours_blocks_map_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "tours_blocks_map_block_image_content_image_content_image_idx" ON "tours_blocks_map_block" USING btree ("image_content_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_map_block_order_idx" ON "_tours_v_blocks_map_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_map_block_parent_id_idx" ON "_tours_v_blocks_map_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_map_block_path_idx" ON "_tours_v_blocks_map_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_map_block_image_content_image_content_image_idx" ON "_tours_v_blocks_map_block" USING btree ("image_content_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tours_blocks_map_block" CASCADE;
  DROP TABLE "_tours_v_blocks_map_block" CASCADE;
  DROP TYPE "public"."enum_tours_blocks_map_block_block_title_tag";
  DROP TYPE "public"."enum_tours_blocks_map_block_block_title_size";
  DROP TYPE "public"."enum__tours_v_blocks_map_block_block_title_tag";
  DROP TYPE "public"."enum__tours_v_blocks_map_block_block_title_size";`)
}
