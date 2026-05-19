import { supabaseAdmin } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data } = await supabaseAdmin.from("settings").select("key, value");
  const map = Object.fromEntries((data || []).map(({ key, value }) => [key, value]));
  return NextResponse.json(map);
}
