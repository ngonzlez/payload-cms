import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sites" ADD COLUMN "phone" varchar;
  ALTER TABLE "sites" ADD COLUMN "email" varchar;
  ALTER TABLE "sites" ADD COLUMN "instagram" varchar;
  ALTER TABLE "sites" ADD COLUMN "facebook" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "sites" DROP COLUMN "phone";
  ALTER TABLE "sites" DROP COLUMN "email";
  ALTER TABLE "sites" DROP COLUMN "instagram";
  ALTER TABLE "sites" DROP COLUMN "facebook";`)
}
