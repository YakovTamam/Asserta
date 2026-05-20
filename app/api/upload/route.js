import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const originalName = file.name || "file";
  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const isVideo    = file.type?.startsWith("video/");
  const fileType   = isVideo ? "video" : "image";
  const uploadOpts = {
    folder:        "asserta/media",
    resource_type: isVideo ? "video" : "image",
  };

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(uploadOpts, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  /* Log to media_files (best-effort — never fail the upload if this errors) */
  try {
    const supabase = getSupabaseAdmin();
    await supabase.from("media_files").insert({
      url:  result.secure_url,
      type: fileType,
      name: originalName,
      size: result.bytes ?? null,
    });
  } catch {}

  return NextResponse.json({ url: result.secure_url });
}

