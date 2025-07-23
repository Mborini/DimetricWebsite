import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const client = await connectToDatabase();

    const result = await client.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    const user = result.rows[0];
    client.release();

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
