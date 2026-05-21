import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const catSlug  = searchParams.get("category");

  const query = {};
  if (featured === "true") query.featured = true;
  if (catSlug) {
    const cat = await Category.findOne({ slug: catSlug }).lean();
    if (cat) query.category_ids = cat._id;
  }

  const products = await Product.find(query)
    .populate("category_ids", "name_he name_en slug")
    .sort({ createdAt: -1 })
    .lean();

  const normalized = products.map(p => ({
    id:           p._id.toString(),
    title:        p.title_he,
    title_he:     p.title_he,
    title_en:     p.title_en,
    slug:         p.slug,
    imgSrc:       p.images?.[0] || "",
    hoverImgSrc:  p.images?.[1] || p.images?.[0] || "",
    images:       p.images || [],
    price:        p.price,
    oldPrice:     p.old_price,
    badge:        p.badge,
    outOfStock:   !p.in_stock,
    featured:     p.featured,
    categoryIds:  (p.category_ids || []).map(c => c._id?.toString?.() || c.toString()),
    categories:   (p.category_ids || []).map(c => typeof c === "object" ? { id: c._id?.toString(), name_he: c.name_he, name_en: c.name_en, slug: c.slug } : {}),
    category:     p.category_ids?.[0]?.slug || "",
    categoryName: p.category_ids?.[0]?.name_he || "",
    description:  p.description_he,
    specs:        p.specs || [],
  }));

  return NextResponse.json(normalized);
}
