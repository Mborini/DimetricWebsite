import { connectToDatabase } from "../../../../../lib/db";

// GET: Fetch all solutions
export async function GET() {
  const client = await connectToDatabase();
  try {
    const result = await client.query("SELECT * FROM welcome ORDER BY id ASC");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching welcome messages:", error);
    return new Response("Error fetching welcome messages", { status: 500 });
  } finally {
    client.release();
  }
}
