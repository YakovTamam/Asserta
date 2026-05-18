import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar3 from "@/components/headers/Topbar3";
import Details1 from "@/components/product-details/Details1";
import RelatedProducts from "@/components/product-details/RelatedProducts";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("products")
    .select("title_he, title_en")
    .eq("id", id)
    .single();
  return {
    title: data ? `${data.title_he || data.title_en} | Asserta` : "מוצר | Asserta",
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("products")
    .select("*, categories(name_he, slug)")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const product = {
    id: data.id,
    title: data.title_he || data.title_en || "",
    slug: data.slug,
    imgSrc: data.images?.[0] || "/images/products/product-1.jpg",
    hoverImgSrc: data.images?.[1] || data.images?.[0] || "/images/products/product-1.jpg",
    images: data.images || [],
    price: Number(data.price),
    oldPrice: data.old_price ? Number(data.old_price) : null,
    badge: data.badge || null,
    outOfStock: !data.in_stock,
    featured: data.featured,
    category: data.categories?.slug || "",
    description: data.description_he || data.description_en || "",
  };

  return (
    <div className="bg-surface">
      <div id="wrapper">
        <Topbar3 />
        <Header1 parentClass="tf-header" />

        <div className="flat-spacing-16 pb-0">
          <div className="container">
            <div className="page-title border-0">
              <div className="breadcrumbs">
                <ul className="bread-wrap mb-0">
                  <li>
                    <Link href="/" className="text-main-4 link">בית</Link>
                  </li>
                  <li className="br-line w-12 bg-main" />
                  <li>
                    <Link href="/shop-collection-list" className="text-main-4 link">חנות</Link>
                  </li>
                  <li className="br-line w-12 bg-main" />
                  <li><p>{product.title}</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Details1 product={product} />
        <RelatedProducts />
        <Footer1 />
      </div>
    </div>
  );
}
