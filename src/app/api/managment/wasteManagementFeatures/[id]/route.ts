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
      UPDATE wastemanagementfeatures
      SET
        title = $1,
        description = $2
      WHERE id = $3
      RETURNING *`,
      [title, description, parseInt(id)]
    );

    if (result.rows.length === 0) {
      return new Response("Waste feature not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error updating waste feature:", error);
    return new Response("Error updating waste feature", { status: 500 });
  } finally {
    client.release();
  }
}
