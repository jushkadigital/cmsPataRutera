import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pac_p_blocks_grid_paquetes_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum_pac_p_blocks_grid_paquetes_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TYPE "public"."enum__pac_p_v_blocks_grid_paquetes_block_title_tag" AS ENUM('h1', 'h2', 'h3', 'h4', 'h5', 'h6');
  CREATE TYPE "public"."enum__pac_p_v_blocks_grid_paquetes_block_title_size" AS ENUM('small', 'medium', 'large', 'xlarge');
  CREATE TABLE IF NOT EXISTS "pac_p_blocks_grid_paquetes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum_pac_p_blocks_grid_paquetes_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum_pac_p_blocks_grid_paquetes_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pac_p_v_blocks_grid_paquetes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"override_defaults" boolean DEFAULT false,
  	"block_title_title_text" varchar,
  	"block_title_tag" "enum__pac_p_v_blocks_grid_paquetes_block_title_tag" DEFAULT 'h2',
  	"block_title_size" "enum__pac_p_v_blocks_grid_paquetes_block_title_size" DEFAULT 'medium',
  	"block_title_text_color" varchar DEFAULT '#2970B7',
  	"block_title_underline_color" varchar DEFAULT '#EFBA06',
  	"grid_columns" numeric DEFAULT 6,
  	"grid_style" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pac_p_rels" ADD COLUMN "destinations_id" integer;
  ALTER TABLE "_pac_p_v_rels" ADD COLUMN "destinations_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pac_p_blocks_grid_paquetes" ADD CONSTRAINT "pac_p_blocks_grid_paquetes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pac_p"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pac_p_v_blocks_grid_paquetes" ADD CONSTRAINT "_pac_p_v_blocks_grid_paquetes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pac_p_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_grid_paquetes_order_idx" ON "pac_p_blocks_grid_paquetes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_grid_paquetes_parent_id_idx" ON "pac_p_blocks_grid_paquetes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_grid_paquetes_path_idx" ON "pac_p_blocks_grid_paquetes" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_grid_paquetes_order_idx" ON "_pac_p_v_blocks_grid_paquetes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_grid_paquetes_parent_id_idx" ON "_pac_p_v_blocks_grid_paquetes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_grid_paquetes_path_idx" ON "_pac_p_v_blocks_grid_paquetes" USING btree ("_path");
  DO $$ BEGIN
   ALTER TABLE "pac_p_rels" ADD CONSTRAINT "pac_p_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pac_p_v_rels" ADD CONSTRAINT "_pac_p_v_rels_destinations_fk" FOREIGN KEY ("destinations_id") REFERENCES "public"."destinations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pac_p_rels_destinations_id_idx" ON "pac_p_rels" USING btree ("destinations_id");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_rels_destinations_id_idx" ON "_pac_p_v_rels" USING btree ("destinations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pac_p_blocks_grid_paquetes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pac_p_v_blocks_grid_paquetes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pac_p_blocks_grid_paquetes" CASCADE;
  DROP TABLE "_pac_p_v_blocks_grid_paquetes" CASCADE;
  ALTER TABLE "pac_p_rels" DROP CONSTRAINT "pac_p_rels_destinations_fk";
  
  ALTER TABLE "_pac_p_v_rels" DROP CONSTRAINT "_pac_p_v_rels_destinations_fk";
  
  DROP INDEX IF EXISTS "pac_p_rels_destinations_id_idx";
  DROP INDEX IF EXISTS "_pac_p_v_rels_destinations_id_idx";
  ALTER TABLE "pac_p_rels" DROP COLUMN IF EXISTS "destinations_id";
  ALTER TABLE "_pac_p_v_rels" DROP COLUMN IF EXISTS "destinations_id";
  DROP TYPE "public"."enum_pac_p_blocks_grid_paquetes_block_title_tag";
  DROP TYPE "public"."enum_pac_p_blocks_grid_paquetes_block_title_size";
  DROP TYPE "public"."enum__pac_p_v_blocks_grid_paquetes_block_title_tag";
  DROP TYPE "public"."enum__pac_p_v_blocks_grid_paquetes_block_title_size";`)
}
