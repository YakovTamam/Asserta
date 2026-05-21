import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MediaFile from "@/lib/models/MediaFile";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const { url, type, name, size } = await request.json();
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });
  await connectDB();
  await MediaFile.create({ url, type: type || "image", name: name || url.split("/").pop(), size: size ?? null });
  return NextResponse.json({ ok: true });
}
