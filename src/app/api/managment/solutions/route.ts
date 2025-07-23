import { connectToDatabase } from "../../../../../lib/db";

// GET: Fetch all solutions
export async function GET() {
  const client = await connectToDatabase();
  try {
    const result = await client.query("SELECT * FROM solutions ORDER BY id ASC");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return new Response("Error fetching solutions", { status: 500 });
  } finally {
    client.release();
  }
}

// POST: Create a new project
export async function POST(request: Request) {
  const client = await connectToDatabase();
  const body = await request.json();
  const {
    title,
   
    description,
    
  } = body;

  try {
    const result = await client.query(
      `
      INSERT INTO solutions
      (title, description)
      VALUES ($1, $2)
      RETURNING *`,
      [
        title,
        
        description,
       
      ]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating solution:", error);
    return new Response("Error creating solution", { status: 500 });
  } finally {
    client.release();
  }
}
