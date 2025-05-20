require('dotenv').config({path: '.env.local'});
const postgres = require('postgres');

async function checkMigrations() {
  const sql = postgres(process.env.POSTGRES_URL, { ssl: { rejectUnauthorized: false } });
  try {
    // Check if the migration table exists in the drizzle schema
    const migrationsTable = await sql`
      SELECT * FROM drizzle.__drizzle_migrations 
      ORDER BY id`;
    
    console.log('Applied migrations:');
    migrationsTable.forEach(m => {
      console.log(`- ID: ${m.id}, Hash: ${m.hash}, Applied at: ${m.created_at}`);
    });
    
    // Let's check which schemas actually exist
    const schemas = await sql`
      SELECT schema_name FROM information_schema.schemata`;
    console.log('\nAvailable schemas:', schemas.map(s => s.schema_name));
    
    // Check in all schemas for User and Chat tables
    for (const schema of schemas) {
      const schemaName = schema.schema_name;
      const tables = await sql`
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = ${schemaName}`;
      
      if (tables.length > 0) {
        console.log(`\nTables in schema '${schemaName}':`);
        tables.forEach(t => console.log(`- ${t.table_name}`));
      }
    }
  } catch (error) {
    console.error('Error checking migrations:', error);
  } finally {
    await sql.end();
  }
}

checkMigrations();
