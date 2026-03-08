import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from './src/database/schema';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function runMigrations() {
  console.log('Starting migration...');
  try {
    const client = await pool.connect();
    console.log('Connected. Running migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations complete!');
    client.release();
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    pool.end();
  }
}

runMigrations();
