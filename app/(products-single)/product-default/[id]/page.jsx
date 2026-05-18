import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar3 from "@/components/headers/Topbar3";
import Details1 from "@/components/product-details/Details1";
import RelatedProducts from "@/components/product-details/RelatedProducts";
import Link from "next/link";
import { allProducts } from "@/data/products";

export const metadata = {
  title: "מוצר | Asserta",
  description: "Asserta - תכשיטים מעוצבים",
};

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id == id) || allProducts[0];

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
