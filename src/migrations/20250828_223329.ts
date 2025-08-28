import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "tours_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "tours_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tours_v_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "paquetes_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tou_p_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "tou_p_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "_tou_p_v_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_tou_p_v_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pac_p_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "pac_p_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "_pac_p_v_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pac_p_v_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "blog_p_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_info_viaje_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_f_a_q_array_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "tours_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "tours_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "_tours_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "_tours_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tours_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "paquetes_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "paquetes_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."paquetes_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "_paquetes_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "_paquetes_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_paquetes_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tou_p_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "tou_p_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tou_p_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tou_p_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "tou_p_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tou_p_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tou_p_v_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "_tou_p_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tou_p_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tou_p_v_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "_tou_p_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tou_p_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pac_p_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "pac_p_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pac_p_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pac_p_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "pac_p_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pac_p_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pac_p_v_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "_pac_p_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pac_p_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pac_p_v_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "_pac_p_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pac_p_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "blog_p_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "blog_p_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_p_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_guia_tour_section_info_viaje_array_data" ADD CONSTRAINT "_blog_p_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_guia_tour_section_f_a_q_array_data" ADD CONSTRAINT "_blog_p_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_p_v_blocks_guia_tour"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "tours_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "tours_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "tours_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "tours_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "_tours_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "_tours_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "_tours_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "_tours_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "paquetes_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "paquetes_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "paquetes_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "paquetes_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "_paquetes_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "_paquetes_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "_paquetes_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "_paquetes_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "tou_p_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "tou_p_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "tou_p_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "tou_p_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "_tou_p_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "_tou_p_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "_tou_p_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "_tou_p_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "pac_p_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "pac_p_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "pac_p_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "pac_p_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "_pac_p_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "_pac_p_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "_pac_p_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "_pac_p_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "blog_p_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "blog_p_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "blog_p_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "blog_p_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_info_viaje_array_data_order_idx" ON "_blog_p_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_info_viaje_array_data_parent_id_idx" ON "_blog_p_v_blocks_guia_tour_section_info_viaje_array_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_f_a_q_array_data_order_idx" ON "_blog_p_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_f_a_q_array_data_parent_id_idx" ON "_blog_p_v_blocks_guia_tour_section_f_a_q_array_data" USING btree ("_parent_id");
  ALTER TABLE "tours_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "tours_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_tours_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "_tours_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "paquetes_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "paquetes_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_paquetes_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "_paquetes_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "tou_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "tou_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_tou_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "_tou_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "pac_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "pac_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_pac_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "_pac_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "blog_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "blog_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_blog_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_info_viaje_content_section";
  ALTER TABLE "_blog_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "tours_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "tours_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "_tours_v_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "_tours_v_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "paquetes_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "paquetes_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "_paquetes_v_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "_paquetes_v_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "tou_p_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "tou_p_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "_tou_p_v_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "_tou_p_v_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "pac_p_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "pac_p_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "_pac_p_v_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "_pac_p_v_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "blog_p_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "blog_p_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  DROP TABLE "_blog_p_v_blocks_guia_tour_section_info_viaje_array_data" CASCADE;
  DROP TABLE "_blog_p_v_blocks_guia_tour_section_f_a_q_array_data" CASCADE;
  ALTER TABLE "tours_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "tours_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_tours_v_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "_tours_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "paquetes_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "paquetes_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "tou_p_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "tou_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_tou_p_v_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "_tou_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "pac_p_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "pac_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_pac_p_v_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "_pac_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "blog_p_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "blog_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD COLUMN "section_info_viaje_content_section" jsonb;
  ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;`)
}
