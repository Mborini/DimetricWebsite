import { connectToDatabase } from "../../../../../../lib/db";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 
  const client = await connectToDatabase();

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
  } = await req.json();

  try {
    const result = await client.query(
      `
      UPDATE projects
      SET title = $1,
          client = $2,
          description = $3,
          location = $4,
          start_date = $5,
          end_date = $6,
          value_usd = $7,
          partner = $8,
          imagename = $9
      WHERE id = $10
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
        id,
      ]
    );

    if (result.rows.length === 0) {
      return new Response("Project not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return new Response("Error updating project", { status: 500 });
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
    const result = await client.query("DELETE FROM projects WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return new Response("Project not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new Response("Error deleting project", { status: 500 });
  } finally {
    client.release();
  }
}
