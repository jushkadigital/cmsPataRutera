import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN CREATE TYPE "public"."enum_tours_bussiness_external_status" AS ENUM('DRAFT', 'PUBLISHED', 'DISCONTINUED'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  DO $$ BEGIN CREATE TYPE "public"."enum__tours_v_version_bussiness_external_status" AS ENUM('DRAFT', 'PUBLISHED', 'DISCONTINUED'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  ALTER TABLE "tours" ADD COLUMN IF NOT EXISTS "bussiness_external_status" "enum_tours_bussiness_external_status";
  ALTER TABLE "_tours_v" ADD COLUMN IF NOT EXISTS "version_bussiness_external_status" "enum__tours_v_version_bussiness_external_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "tours" DROP COLUMN IF EXISTS "bussiness_external_status";
  ALTER TABLE "_tours_v" DROP COLUMN IF EXISTS "version_bussiness_external_status";
  DROP TYPE "public"."enum_tours_bussiness_external_status";
  DROP TYPE "public"."enum__tours_v_version_bussiness_external_status";`)
}
