import { connectToDatabase } from "../../../../lib/db";

// Handle GET requests
export async function GET() {
  const client = await connectToDatabase();
  try {
    const result = await client.query("SELECT * FROM projects where is_latest = true ORDER BY id ASC");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response("Error fetching projects", { status: 500 });
  } finally {
    client.release();
  }
}
