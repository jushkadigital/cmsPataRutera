import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Step 1: Drop all foreign key constraints that reference users.id
  await db.execute(sql`
    ALTER TABLE IF EXISTS "users_roles" DROP CONSTRAINT IF EXISTS "users_roles_parent_id_fk";
    ALTER TABLE IF EXISTS "pages" DROP CONSTRAINT IF EXISTS "pages_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "_pages_v" DROP CONSTRAINT IF EXISTS "_pages_v_version_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "tours" DROP CONSTRAINT IF EXISTS "tours_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "_tours_v" DROP CONSTRAINT IF EXISTS "_tours_v_version_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "posts" DROP CONSTRAINT IF EXISTS "posts_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "_posts_v" DROP CONSTRAINT IF EXISTS "_posts_v_version_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "paquetes" DROP CONSTRAINT IF EXISTS "paquetes_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "_paquetes_v" DROP CONSTRAINT IF EXISTS "_paquetes_v_version_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_users_fk";
    ALTER TABLE IF EXISTS "payload_preferences_rels" DROP CONSTRAINT IF EXISTS "payload_preferences_rels_users_fk";
    ALTER TABLE IF EXISTS "tou_p" DROP CONSTRAINT IF EXISTS "tou_p_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "_tou_p_v" DROP CONSTRAINT IF EXISTS "_tou_p_v_version_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "pac_p" DROP CONSTRAINT IF EXISTS "pac_p_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "_pac_p_v" DROP CONSTRAINT IF EXISTS "_pac_p_v_version_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "blog_p" DROP CONSTRAINT IF EXISTS "blog_p_created_by_id_users_id_fk";
    ALTER TABLE IF EXISTS "_blog_p_v" DROP CONSTRAINT IF EXISTS "_blog_p_v_version_created_by_id_users_id_fk";
  `);

  // Step 2: Add new id column, migrate data, then swap
  await db.execute(sql`
    -- Add temporary varchar id column
    ALTER TABLE "users" ADD COLUMN "new_id" varchar;

    -- Populate new_id with string version of existing id
    UPDATE "users" SET "new_id" = "id"::text;

    -- Drop the old primary key constraint with CASCADE
    ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_pkey" CASCADE;

    -- Drop the old id column
    ALTER TABLE "users" DROP COLUMN "id";

    -- Rename new_id to id
    ALTER TABLE "users" RENAME COLUMN "new_id" TO "id";

    -- Add primary key constraint
    ALTER TABLE "users" ADD PRIMARY KEY ("id");
  `);

  // Step 3: Update foreign key columns to varchar and cast existing data
  await db.execute(sql`
    -- users_roles
    ALTER TABLE "users_roles" ALTER COLUMN "parent_id" TYPE varchar USING "parent_id"::text;

    -- pages
    ALTER TABLE "pages" ALTER COLUMN "created_by_id" TYPE varchar USING "created_by_id"::text;
    ALTER TABLE "_pages_v" ALTER COLUMN "version_created_by_id" TYPE varchar USING "version_created_by_id"::text;

    -- tours
    ALTER TABLE "tours" ALTER COLUMN "created_by_id" TYPE varchar USING "created_by_id"::text;
    ALTER TABLE "_tours_v" ALTER COLUMN "version_created_by_id" TYPE varchar USING "version_created_by_id"::text;

    -- posts
    ALTER TABLE "posts" ALTER COLUMN "created_by_id" TYPE varchar USING "created_by_id"::text;
    ALTER TABLE "_posts_v" ALTER COLUMN "version_created_by_id" TYPE varchar USING "version_created_by_id"::text;

    -- paquetes
    ALTER TABLE "paquetes" ALTER COLUMN "created_by_id" TYPE varchar USING "created_by_id"::text;
    ALTER TABLE "_paquetes_v" ALTER COLUMN "version_created_by_id" TYPE varchar USING "version_created_by_id"::text;

    -- payload tables
    ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "users_id" TYPE varchar USING "users_id"::text;
    ALTER TABLE "payload_preferences_rels" ALTER COLUMN "users_id" TYPE varchar USING "users_id"::text;

    -- global tables
    ALTER TABLE "tou_p" ALTER COLUMN "created_by_id" TYPE varchar USING "created_by_id"::text;
    ALTER TABLE "_tou_p_v" ALTER COLUMN "version_created_by_id" TYPE varchar USING "version_created_by_id"::text;
    ALTER TABLE "pac_p" ALTER COLUMN "created_by_id" TYPE varchar USING "created_by_id"::text;
    ALTER TABLE "_pac_p_v" ALTER COLUMN "version_created_by_id" TYPE varchar USING "version_created_by_id"::text;
    ALTER TABLE "blog_p" ALTER COLUMN "created_by_id" TYPE varchar USING "created_by_id"::text;
    ALTER TABLE "_blog_p_v" ALTER COLUMN "version_created_by_id" TYPE varchar USING "version_created_by_id"::text;
  `);

  // Step 4: Recreate foreign key constraints
  await db.execute(sql`
    ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    ALTER TABLE "pages" ADD CONSTRAINT "pages_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "tours" ADD CONSTRAINT "tours_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "_tours_v" ADD CONSTRAINT "_tours_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "posts" ADD CONSTRAINT "posts_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "paquetes" ADD CONSTRAINT "paquetes_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "_paquetes_v" ADD CONSTRAINT "_paquetes_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    ALTER TABLE "tou_p" ADD CONSTRAINT "tou_p_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "_tou_p_v" ADD CONSTRAINT "_tou_p_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "pac_p" ADD CONSTRAINT "pac_p_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "_pac_p_v" ADD CONSTRAINT "_pac_p_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "blog_p" ADD CONSTRAINT "blog_p_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    ALTER TABLE "_blog_p_v" ADD CONSTRAINT "_blog_p_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
  `);

  // Step 5: Add new columns to users table for authjs
  await db.execute(sql`
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_verified" timestamp(3) with time zone;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "image" varchar;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "enable_a_p_i_key" boolean;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "api_key" varchar;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "api_key_index" varchar;
  `);

  // Step 6: Create users_accounts table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "users_accounts" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "provider" varchar NOT NULL,
      "provider_account_id" varchar NOT NULL,
      "type" varchar NOT NULL
    );

    ALTER TABLE "users_accounts" ADD CONSTRAINT "users_accounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

    CREATE INDEX IF NOT EXISTS "users_accounts_order_idx" ON "users_accounts" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "users_accounts_parent_id_idx" ON "users_accounts" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "users_accounts_provider_account_id_idx" ON "users_accounts" USING btree ("provider_account_id");
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop users_accounts table
  await db.execute(sql`
    DROP TABLE IF EXISTS "users_accounts" CASCADE;
  `);

  // Remove authjs columns from users
  await db.execute(sql`
    ALTER TABLE "users" DROP COLUMN IF EXISTS "email_verified";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "image";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "enable_a_p_i_key";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "api_key";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "api_key_index";
  `);

  // Note: Reverting varchar IDs back to integer is complex and may cause data loss.
  // This down migration only removes the authjs-specific changes.
  // If you need to fully revert, restore from a backup.
}
