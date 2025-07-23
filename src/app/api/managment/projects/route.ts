import { connectToDatabase } from "../../../../../lib/db";

// GET: Fetch all projects
export async function GET() {
  const client = await connectToDatabase();
  try {
    const result = await client.query("SELECT * FROM projects ORDER BY id ASC");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response("Error fetching projects", { status: 500 });
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
    client: clientName,
    description,
    location,
    start_date,
    end_date,
    value_usd,
    partner,
    imagename,
  } = body;

  try {
    const result = await client.query(
      `
      INSERT INTO projects 
      (title, client, description, location, start_date, end_date, value_usd, partner, imagename)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        title,
        clientName,
        description,
        location,
        start_date,
        end_date,
        value_usd,
        partner,
        imagename,
      ]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return new Response("Error creating project", { status: 500 });
  } finally {
    client.release();
  }
}
