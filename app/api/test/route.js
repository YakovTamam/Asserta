import { supabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  const { data, error } = await supabaseAdmin.from("categories").select("id").limit(1);

  if (error) {
    return Response.json({ connected: false, error: error.message }, { status: 500 });
  }

  return Response.json({ connected: true });
}
