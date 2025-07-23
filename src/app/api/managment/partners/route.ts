import { connectToDatabase } from "../../../../../lib/db";

// GET: Fetch all solutions
export async function GET() {
  const client = await connectToDatabase();
  try {
    const result = await client.query("SELECT * FROM partners ORDER BY id ASC");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return new Response("Error fetching partners", { status: 500 });
  } finally {
    client.release();
  }
}

// POST: Create a new partner
export async function POST(request: Request) {
  const client = await connectToDatabase();
  const { name, image_url } = await request.json();

  try {
    const result = await client.query(
      "INSERT INTO partners (name, image_url) VALUES ($1, $2) RETURNING *",
      [name, image_url]
    );
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating partner:", error);
    return new Response("Error creating partner", { status: 500 });
  } finally {
    client.release();
  }
} 
