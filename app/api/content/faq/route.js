import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FaqItem from "@/lib/models/FaqItem";
export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const items = await FaqItem.find().sort({ position: 1 }).lean();
  return NextResponse.json(items);
}
