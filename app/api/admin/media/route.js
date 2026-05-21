import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MediaFile from "@/lib/models/MediaFile";

export async function GET() {
  await connectDB();
  const files = await MediaFile.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(files);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await MediaFile.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
