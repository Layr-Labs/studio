import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

config({
  path: '.env.local',
});

const runReset = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined');
  }

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log('⚠️ Dropping all tables...');

  try {
    // Drop all tables in public schema
    await db.execute(sql`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
          EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;
      END $$;
    `);
    console.log('✅ Tables dropped from public schema');

    // Also reset the drizzle migrations table
    await db.execute(sql`
      TRUNCATE TABLE drizzle.__drizzle_migrations;
    `);
    console.log('✅ Drizzle migrations table truncated');

    // Check tables before running migrations
    const tablesBeforeMigration = await connection`
      SELECT tablename FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'`;
    console.log('Tables before migration:', tablesBeforeMigration.map(t => t.tablename));
    
    console.log('⏳ Running migrations...');

    const start = Date.now();
    await migrate(db, { migrationsFolder: './lib/db/migrations' });
    const end = Date.now();

    console.log('✅ Migrations completed in', end - start, 'ms');
    
    // Check tables after running migrations
    const tablesAfterMigration = await connection`
      SELECT tablename FROM pg_catalog.pg_tables 
      WHERE schemaname = 'public'`;
    console.log('Tables after migration:', tablesAfterMigration.map(t => t.tablename));
  } catch (error) {
    console.error('Error during reset process:', error);
    throw error;
  } finally {
    await connection.end();
  }
  
  process.exit(0);
};

runReset().catch((err) => {
  console.error('❌ Reset failed');
  console.error(err);
  process.exit(1);
});
