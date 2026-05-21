import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/lib/models/Setting";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const settings = await Setting.find().lean();
    const map = Object.fromEntries(settings.map(({ key, value }) => [key, value]));
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({});
  }
}
