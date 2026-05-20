import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("why_us_items")
    .select("*")
    .eq("is_active", true)
    .order("position");
  if (error) return Response.json([], { status: 200 });
  return Response.json(data || []);
}
