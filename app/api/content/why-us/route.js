import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import WhyUsItem from "@/lib/models/WhyUsItem";
export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const items = await WhyUsItem.find().sort({ position: 1 }).lean();
  return NextResponse.json(items);
}
