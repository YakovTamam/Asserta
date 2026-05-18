import { supabaseAdmin } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const category = searchParams.get("category");

  let query = supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (featured === "true") query = query.eq("featured", true);

  const [{ data: products, error }, { data: allCategories }] = await Promise.all([
    query,
    supabaseAdmin.from("categories").select("id, name_he, name_en, slug"),
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const catMap = {};
  (allCategories || []).forEach((c) => { catMap[c.id] = c; });

  let normalized = (products || []).map((p) => {
    const catIds = p.category_ids?.length
      ? p.category_ids
      : p.category_id ? [p.category_id] : [];
    const cats = catIds.map((id) => catMap[id]).filter(Boolean);

    return {
      id:           p.id,
      title:        p.title_he || p.title_en || "",
      title_he:     p.title_he,
      title_en:     p.title_en,
      slug:         p.slug,
      imgSrc:       p.images?.[0] || "/images/products/product-1.jpg",
      hoverImgSrc:  p.images?.[1] || p.images?.[0] || "/images/products/product-1.jpg",
      images:       p.images || [],
      price:        Number(p.price),
      oldPrice:     p.old_price ? Number(p.old_price) : null,
      badge:        p.badge || null,
      outOfStock:   !p.in_stock,
      featured:     p.featured,
      categoryIds:  catIds,
      categories:   cats,
      category:     cats[0]?.slug || "",
      categoryName: cats[0]?.name_he || "",
      description:  p.description_he || p.description_en || "",
      specs:        Array.isArray(p.specs) ? p.specs : [],
    };
  });

  if (category && category !== "all") {
    normalized = normalized.filter((p) =>
      p.categories.some((c) => c.slug === category)
    );
  }

  return NextResponse.json(normalized);
}
