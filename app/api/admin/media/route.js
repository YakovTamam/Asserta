import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const [imgRes, vidRes] = await Promise.all([
      cloudinary.api.resources({ type: "upload", prefix: "asserta/", resource_type: "image", max_results: 500 }),
      cloudinary.api.resources({ type: "upload", prefix: "asserta/", resource_type: "video", max_results: 500 }),
    ]);

    const all = [
      ...(imgRes.resources || []).map(r => ({
        id:   r.public_id,
        url:  r.secure_url,
        type: "image",
        name: r.public_id.split("/").pop() + "." + r.format,
        size: r.bytes,
        created_at: r.created_at,
      })),
      ...(vidRes.resources || []).map(r => ({
        id:   r.public_id,
        url:  r.secure_url,
        type: "video",
        name: r.public_id.split("/").pop() + "." + r.format,
        size: r.bytes,
        created_at: r.created_at,
      })),
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return NextResponse.json(all);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();
    const publicId = body.id;
    if (!publicId) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Try image first, then video
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    } catch {
      await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
