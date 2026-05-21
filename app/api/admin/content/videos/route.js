import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import VideoSection from "@/lib/models/VideoSection";

export async function GET() {
  await connectDB();
  const sections = await VideoSection.find().sort({ position: 1 }).lean();
  return NextResponse.json(sections);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  try {
    const section = await VideoSection.create(body);
    return NextResponse.json(section, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await connectDB();
  const { id, ...update } = await req.json();
  const section = await VideoSection.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(section);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await VideoSection.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
