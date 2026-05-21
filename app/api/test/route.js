import { connectDB } from "@/lib/mongodb";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ connected: true, db: "mongodb" });
  } catch (e) {
    return Response.json({ connected: false, error: e.message }, { status: 500 });
  }
}
