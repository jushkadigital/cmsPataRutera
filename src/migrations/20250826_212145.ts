import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "tours_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "tours_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_tours_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "_tours_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "_tours_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "paquetes_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "paquetes_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "paquetes_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "tou_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "tou_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "tou_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_tou_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "_tou_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "_tou_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "pac_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "pac_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "pac_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_pac_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "_pac_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "_pac_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "blog_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "blog_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "blog_p_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_text" varchar;
  ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_icon_image_id" integer;
  ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD COLUMN "section_f_a_q_content_section" jsonb;
  DO $$ BEGIN
   ALTER TABLE "tours_blocks_guia_tour" ADD CONSTRAINT "tours_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tours_v_blocks_guia_tour" ADD CONSTRAINT "_tours_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "paquetes_blocks_guia_tour" ADD CONSTRAINT "paquetes_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_paquetes_v_blocks_guia_tour" ADD CONSTRAINT "_paquetes_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tou_p_blocks_guia_tour" ADD CONSTRAINT "tou_p_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_tou_p_v_blocks_guia_tour" ADD CONSTRAINT "_tou_p_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pac_p_blocks_guia_tour" ADD CONSTRAINT "pac_p_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pac_p_v_blocks_guia_tour" ADD CONSTRAINT "_pac_p_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_p_blocks_guia_tour" ADD CONSTRAINT "blog_p_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_p_v_blocks_guia_tour" ADD CONSTRAINT "_blog_p_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk" FOREIGN KEY ("section_f_a_q_icon_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tours_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "tours_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_tours_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "_tours_v_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "paquetes_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "paquetes_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "_paquetes_v_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "tou_p_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "tou_p_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_tou_p_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "_tou_p_v_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "pac_p_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "pac_p_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_pac_p_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "_pac_p_v_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "blog_p_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "blog_p_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_p_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx" ON "_blog_p_v_blocks_guia_tour" USING btree ("section_f_a_q_icon_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours_blocks_guia_tour" DROP CONSTRAINT "tours_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "_tours_v_blocks_guia_tour" DROP CONSTRAINT "_tours_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "paquetes_blocks_guia_tour" DROP CONSTRAINT "paquetes_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "_paquetes_v_blocks_guia_tour" DROP CONSTRAINT "_paquetes_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "tou_p_blocks_guia_tour" DROP CONSTRAINT "tou_p_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "_tou_p_v_blocks_guia_tour" DROP CONSTRAINT "_tou_p_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "pac_p_blocks_guia_tour" DROP CONSTRAINT "pac_p_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "_pac_p_v_blocks_guia_tour" DROP CONSTRAINT "_pac_p_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "blog_p_blocks_guia_tour" DROP CONSTRAINT "blog_p_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  ALTER TABLE "_blog_p_v_blocks_guia_tour" DROP CONSTRAINT "_blog_p_v_blocks_guia_tour_section_f_a_q_icon_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "tours_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "_tours_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "paquetes_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "_paquetes_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "tou_p_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "_tou_p_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "pac_p_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "_pac_p_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "blog_p_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  DROP INDEX IF EXISTS "_blog_p_v_blocks_guia_tour_section_f_a_q_section_f_a_q_icon_image_idx";
  ALTER TABLE "tours_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "tours_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "tours_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_tours_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "_tours_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "_tours_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "paquetes_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "paquetes_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "paquetes_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_paquetes_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "_paquetes_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "_paquetes_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "tou_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "tou_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "tou_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_tou_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "_tou_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "_tou_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "pac_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "pac_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "pac_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_pac_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "_pac_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "_pac_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "blog_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "blog_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "blog_p_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";
  ALTER TABLE "_blog_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_text";
  ALTER TABLE "_blog_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_icon_image_id";
  ALTER TABLE "_blog_p_v_blocks_guia_tour" DROP COLUMN IF EXISTS "section_f_a_q_content_section";`)
}
