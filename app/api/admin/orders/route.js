import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function GET() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(orders);
}

export async function PUT(req) {
  await connectDB();
  const { id, status } = await req.json();
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).lean();
  return NextResponse.json(order);
}
