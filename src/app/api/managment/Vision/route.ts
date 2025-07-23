import { connectToDatabase } from "../../../../../lib/db";

export async function GET() {
  const client = await connectToDatabase();
  try {
    const result = await client.query("SELECT * FROM vision ORDER BY id ASC");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching visions:", error);
    return new Response("Error fetching visions", { status: 500 });
  } finally {
    client.release();
  }
}
