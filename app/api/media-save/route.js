import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function POST(request) {
  const { url, type, name, size } = await request.json();
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("media_files").insert({
    url,
    type: type || "image",
    name: name || url.split("/").pop(),
    size: size ?? null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
