import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FaqItem from "@/lib/models/FaqItem";

export async function GET() {
  await connectDB();
  const items = await FaqItem.find().sort({ position: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const item = await FaqItem.create(body);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req) {
  await connectDB();
  const { id, ...update } = await req.json();
  const item = await FaqItem.findByIdAndUpdate(id, update, { new: true }).lean();
  return NextResponse.json(item);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await FaqItem.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
