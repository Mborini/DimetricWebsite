import { connectToDatabase } from "../../../../../../lib/db";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const client = await connectToDatabase();

  const { name, image_url } = await req.json();

  try {
    const result = await client.query(
      `
      UPDATE partners
      SET name = $1, image_url = $2
      WHERE id = $3
      RETURNING *`,
      [name, image_url, id]
    );

    if (result.rows.length === 0) {
      return new Response("Partner not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error updating partner:", error);
    return new Response("Error updating partner", { status: 500 });
  } finally {
    client.release();
  }
}
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const client = await connectToDatabase();

  try {
    const result = await client.query(
      "DELETE FROM partners WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return new Response("Partner not found", { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error deleting partner:", error);
    return new Response("Error deleting partner", { status: 500 });
  } finally {
    client.release();
  }
}