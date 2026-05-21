import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Setting from "@/lib/models/Setting";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const keys = searchParams.get("keys")?.split(",") || [];
  const query = keys.length ? { key: { $in: keys } } : {};
  const settings = await Setting.find(query).lean();
  const map = Object.fromEntries(settings.map(s => [s.key, s.value]));
  return NextResponse.json(map);
}

export async function POST(req) {
  await connectDB();
  const updates = await req.json(); // { key: value, ... }
  for (const [key, value] of Object.entries(updates)) {
    await Setting.findOneAndUpdate({ key }, { value }, { upsert: true });
  }
  return NextResponse.json({ ok: true });
}
