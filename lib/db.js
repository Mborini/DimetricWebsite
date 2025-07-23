import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // استخدم URI كامل من نيون
  ssl: {
    rejectUnauthorized: false, // ضروري لـ Neon
  },
});

export async function connectToDatabase() {
  try {
    const client = await pool.connect();
    console.log('Connected to Neon database');
    return client;
  } catch (err) {
    console.error('Neon DB connection failed:', err.message);
    throw new Error('Database connection failed');
  }
}
