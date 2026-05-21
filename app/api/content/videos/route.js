import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import VideoSection from "@/lib/models/VideoSection";

export async function GET() {
  await connectDB();
  const sections = await VideoSection.find({ is_active: true }).sort({ position: 1 }).lean();
  return NextResponse.json(sections.map(s => ({ ...s, id: s._id.toString() })));
}
