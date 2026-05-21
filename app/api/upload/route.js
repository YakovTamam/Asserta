import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const isVideo = file.type?.startsWith("video/");

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "asserta/media", resource_type: isVideo ? "video" : "image" },
          (err, res) => err ? reject(err) : resolve(res)
        )
        .end(buffer);
    });

    return NextResponse.json({
      url:       result.secure_url,
      public_id: result.public_id,
      type:      isVideo ? "video" : "image",
      bytes:     result.bytes,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
