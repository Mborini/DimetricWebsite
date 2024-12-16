import { Pool } from 'pg';

// Setup PostgreSQL connection using Supabase credentials
const pool = new Pool({
  user: process.env.DB_USER,     // Supabase user
  host: process.env.DB_HOST,     // Supabase host
  database: process.env.DB_NAME, // Supabase database name
  password: process.env.DB_PASS, // Supabase password
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432, // Parse DB_PORT as a number
});

export async function connectToDatabase() {
  try {
    const client = await pool.connect();
    console.log('Connected to database');
    return client;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    throw new Error('Database connection failed');
  }
}
