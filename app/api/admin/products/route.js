import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  try {
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await connectDB();
  const { id, ...update } = await req.json();
  try {
    const product = await Product.findByIdAndUpdate(id, update, { new: true }).lean();
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
