import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/lib/models/Category";

export async function GET() {
  await connectDB();
  const cats = await Category.find().sort({ name_he: 1 }).lean();
  return NextResponse.json(cats.map(c => ({ ...c, id: c._id.toString() })));
}
