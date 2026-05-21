import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";
export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const cats = await Category.find().sort({ name_he: 1 }).lean();
  return NextResponse.json(cats);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  try {
    const cat = await Category.create(body);
    return NextResponse.json(cat, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await connectDB();
  const { id, ...update } = await req.json();
  try {
    const cat = await Category.findByIdAndUpdate(id, update, { new: true }).lean();
    return NextResponse.json(cat);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
