import { supabaseAdmin } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.title_he || p.title_en || "",
    title_he: p.title_he,
    title_en: p.title_en,
    slug: p.slug,
    imgSrc: p.images?.[0] || "/images/products/product-1.jpg",
    hoverImgSrc: p.images?.[1] || p.images?.[0] || "/images/products/product-1.jpg",
    images: p.images || [],
    price: Number(p.price),
    oldPrice: p.old_price ? Number(p.old_price) : null,
    badge: p.badge || null,
    outOfStock: !p.in_stock,
    featured: p.featured,
    category: p.categories?.slug || "",
    categoryName: p.categories?.name_he || "",
    description: p.description_he || p.description_en || "",
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const category = searchParams.get("category");

  let query = supabaseAdmin
    .from("products")
    .select("*, categories(name_he, slug)")
    .order("created_at", { ascending: false });

  if (featured === "true") query = query.eq("featured", true);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let products = (data || []).map(normalizeProduct);

  if (category && category !== "all") {
    products = products.filter((p) => p.category === category);
  }

  return NextResponse.json(products);
}
