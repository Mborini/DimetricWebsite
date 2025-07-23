// /app/api/projects/[project_id]/route.js
import { connectToDatabase } from "../../../../../lib/db";

// Handle GET requests for a specific project
export async function GET(req, { params }) {
  const { id } = params;  // Access project_id from URL params

  const client = await connectToDatabase();
  try {
    // Query the database for a project with the given id
    const result = await client.query("SELECT * FROM projects WHERE id = $1", [id]);
    
    if (result.rows.length > 0) {
      // Return the project details as JSON
      return new Response(JSON.stringify(result.rows[0]), { status: 200 });
    } else {
      return new Response("Project not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching project:", error);
    return new Response("Error fetching project", { status: 500 });
  } finally {
    client.release();
  }
}
