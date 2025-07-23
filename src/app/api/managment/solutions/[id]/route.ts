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
      UPDATE solutions
      SET title = $1,
          description = $2
      WHERE id = $3
      RETURNING *`,
      [
        title,
        
        description,
        
        id,
      ]
    );

    if (result.rows.length === 0) {
      return new Response("Solution not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error updating solution:", error);
    return new Response("Error updating solution", { status: 500 });
  } finally {
    client.release();
  }
}

// DELETE: Delete project
export async function DELETE(
  req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const client = await connectToDatabase();
  try {
    const result = await client.query("DELETE FROM solutions WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return new Response("Solution not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error deleting solution:", error);
    return new Response("Error deleting project", { status: 500 });
  } finally {
    client.release();
  }
}
