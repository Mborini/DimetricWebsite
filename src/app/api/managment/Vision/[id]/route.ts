import { connectToDatabase } from "../../../../../../lib/db";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 
  const client = await connectToDatabase();

  const {
    title,
    
    description,
   
  } = await req.json();

  try {
    const result = await client.query(
      `
      UPDATE vision
      SET
          description = $1
      WHERE id = $2
      RETURNING *`,
      [
        description,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return new Response("Vision not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error updating vision:", error);
    return new Response("Error updating vision", { status: 500 });
  } finally {
    client.release();
  }
}

