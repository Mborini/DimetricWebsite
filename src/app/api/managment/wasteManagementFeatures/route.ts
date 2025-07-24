import { connectToDatabase } from "../../../../../lib/db";

// GET: Fetch all solutions
export async function GET() {
  const client = await connectToDatabase();
  try {
    const result = await client.query(`
  SELECT f.id, f.title, f.description, s.title as section_title
  FROM wastemanagementfeatures f
  JOIN section_titles s ON f.section_id = s.id
  WHERE s.section_key = 'waste_management'
  ORDER BY f.id ASC
`);
console.log("Fetched waste management features:", result.rows);
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching waste management features:", error);
    return new Response("Error fetching waste management features", {
      status: 500,
    });
  } finally {
    client.release();
  }
}
