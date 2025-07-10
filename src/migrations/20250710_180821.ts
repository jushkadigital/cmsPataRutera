import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "redes_negocio_network" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redes_negocio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "redes_negocio_network" ADD CONSTRAINT "redes_negocio_network_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."redes_negocio"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "redes_negocio_network_order_idx" ON "redes_negocio_network" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "redes_negocio_network_parent_id_idx" ON "redes_negocio_network" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "redes_negocio_network" CASCADE;
  DROP TABLE "redes_negocio" CASCADE;`)
}
