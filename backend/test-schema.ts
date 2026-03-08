import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './src/database/schema';
import { sql } from 'drizzle-orm';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function testSchema() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to Supabase Database!');
    
    // Check if the 'users' table exists as a basic test
    const res = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'users'
      );
    `);
    
    console.log('Does the users table exist?', res.rows[0].exists);
    client.release();
  } catch (err) {
    console.error('Failed schema test:', err);
  } finally {
    pool.end();
  }
}

testSchema();
