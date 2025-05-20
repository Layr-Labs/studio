require('dotenv').config({path: '.env.local'});
const postgres = require('postgres');

async function listTables() {
  const sql = postgres(process.env.POSTGRES_URL, { ssl: { rejectUnauthorized: false } });
  try {
    const tables = await sql`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
    console.log('Existing tables:', tables.map(t => t.tablename));
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await sql.end();
  }
}

listTables();
