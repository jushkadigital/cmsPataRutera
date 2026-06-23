import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add thumbnail_id column to tours__blocks_dataTour (if not exists)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "tours__blocks_dataTour" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  // Add thumbnail_id column to _tours__v__blocks_dataTour (versions table, if exists)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_tours__v__blocks_dataTour" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  // Add thumbnail_id column to paquetes__blocks_dataTour (if not exists)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "paquetes__blocks_dataTour" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  // Add thumbnail_id column to _paquetes__v__blocks_dataTour (versions table, if exists)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_paquetes__v__blocks_dataTour" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  // Also handle the snake_case naming convention (migration-created tables)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "tours_blocks_data_tour" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_tours_v_blocks_data_tour" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "paquetes_blocks_data_tour" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_paquetes_v_blocks_data_tour" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  // Add foreign key constraints (camelCase/v2 naming)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "tours__blocks_dataTour" ADD CONSTRAINT "tours__blocks_dataTour_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_tours__v__blocks_dataTour" ADD CONSTRAINT "_tours__v__blocks_dataTour_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "paquetes__blocks_dataTour" ADD CONSTRAINT "paquetes__blocks_dataTour_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_paquetes__v__blocks_dataTour" ADD CONSTRAINT "_paquetes__v__blocks_dataTour_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  // Add foreign key constraints (snake_case naming)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "tours_blocks_data_tour" ADD CONSTRAINT "tours_blocks_data_tour_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_tours_v_blocks_data_tour" ADD CONSTRAINT "_tours_v_blocks_data_tour_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "paquetes_blocks_data_tour" ADD CONSTRAINT "paquetes_blocks_data_tour_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_paquetes_v_blocks_data_tour" ADD CONSTRAINT "_paquetes_v_blocks_data_tour_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  // Create indexes (camelCase/v2 naming)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE INDEX IF NOT EXISTS "tours__blocks_dataTour_thumbnail_idx" ON "tours__blocks_dataTour" USING btree ("thumbnail_id");
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE INDEX IF NOT EXISTS "_tours__v__blocks_dataTour_thumbnail_idx" ON "_tours__v__blocks_dataTour" USING btree ("thumbnail_id");
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE INDEX IF NOT EXISTS "paquetes__blocks_dataTour_thumbnail_idx" ON "paquetes__blocks_dataTour" USING btree ("thumbnail_id");
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE INDEX IF NOT EXISTS "_paquetes__v__blocks_dataTour_thumbnail_idx" ON "_paquetes__v__blocks_dataTour" USING btree ("thumbnail_id");
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  // Create indexes (snake_case naming)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE INDEX IF NOT EXISTS "tours_blocks_data_tour_thumbnail_idx" ON "tours_blocks_data_tour" USING btree ("thumbnail_id");
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE INDEX IF NOT EXISTS "_tours_v_blocks_data_tour_thumbnail_idx" ON "_tours_v_blocks_data_tour" USING btree ("thumbnail_id");
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE INDEX IF NOT EXISTS "paquetes_blocks_data_tour_thumbnail_idx" ON "paquetes_blocks_data_tour" USING btree ("thumbnail_id");
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE INDEX IF NOT EXISTS "_paquetes_v_blocks_data_tour_thumbnail_idx" ON "_paquetes_v_blocks_data_tour" USING btree ("thumbnail_id");
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop indexes (camelCase/v2 naming)
  await db.execute(sql`
    DROP INDEX IF EXISTS "tours__blocks_dataTour_thumbnail_idx";
    DROP INDEX IF EXISTS "_tours__v__blocks_dataTour_thumbnail_idx";
    DROP INDEX IF EXISTS "paquetes__blocks_dataTour_thumbnail_idx";
    DROP INDEX IF EXISTS "_paquetes__v__blocks_dataTour_thumbnail_idx";
  `)

  // Drop indexes (snake_case naming)
  await db.execute(sql`
    DROP INDEX IF EXISTS "tours_blocks_data_tour_thumbnail_idx";
    DROP INDEX IF EXISTS "_tours_v_blocks_data_tour_thumbnail_idx";
    DROP INDEX IF EXISTS "paquetes_blocks_data_tour_thumbnail_idx";
    DROP INDEX IF EXISTS "_paquetes_v_blocks_data_tour_thumbnail_idx";
  `)

  // Drop foreign key constraints (camelCase/v2 naming)
  await db.execute(sql`
    ALTER TABLE "tours__blocks_dataTour" DROP CONSTRAINT IF EXISTS "tours__blocks_dataTour_thumbnail_id_media_id_fk";
    ALTER TABLE "_tours__v__blocks_dataTour" DROP CONSTRAINT IF EXISTS "_tours__v__blocks_dataTour_thumbnail_id_media_id_fk";
    ALTER TABLE "paquetes__blocks_dataTour" DROP CONSTRAINT IF EXISTS "paquetes__blocks_dataTour_thumbnail_id_media_id_fk";
    ALTER TABLE "_paquetes__v__blocks_dataTour" DROP CONSTRAINT IF EXISTS "_paquetes__v__blocks_dataTour_thumbnail_id_media_id_fk";
  `)

  // Drop foreign key constraints (snake_case naming)
  await db.execute(sql`
    ALTER TABLE "tours_blocks_data_tour" DROP CONSTRAINT IF EXISTS "tours_blocks_data_tour_thumbnail_id_media_id_fk";
    ALTER TABLE "_tours_v_blocks_data_tour" DROP CONSTRAINT IF EXISTS "_tours_v_blocks_data_tour_thumbnail_id_media_id_fk";
    ALTER TABLE "paquetes_blocks_data_tour" DROP CONSTRAINT IF EXISTS "paquetes_blocks_data_tour_thumbnail_id_media_id_fk";
    ALTER TABLE "_paquetes_v_blocks_data_tour" DROP CONSTRAINT IF EXISTS "_paquetes_v_blocks_data_tour_thumbnail_id_media_id_fk";
  `)

  // Drop columns (camelCase/v2 naming) 
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "tours__blocks_dataTour" DROP COLUMN IF EXISTS "thumbnail_id";
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_tours__v__blocks_dataTour" DROP COLUMN IF EXISTS "thumbnail_id";
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "paquetes__blocks_dataTour" DROP COLUMN IF EXISTS "thumbnail_id";
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_paquetes__v__blocks_dataTour" DROP COLUMN IF EXISTS "thumbnail_id";
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  // Drop columns (snake_case naming)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "tours_blocks_data_tour" DROP COLUMN IF EXISTS "thumbnail_id";
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_tours_v_blocks_data_tour" DROP COLUMN IF EXISTS "thumbnail_id";
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "paquetes_blocks_data_tour" DROP COLUMN IF EXISTS "thumbnail_id";
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_paquetes_v_blocks_data_tour" DROP COLUMN IF EXISTS "thumbnail_id";
    EXCEPTION WHEN undefined_table THEN null;
    END $$;
  `)
}
