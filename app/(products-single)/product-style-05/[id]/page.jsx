import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";

import RecentProducts from "@/components/product-details/RecentProducts";
import RelatedProducts from "@/components/product-details/RelatedProducts";
import React from "react";

import { allProducts } from "@/data/products";
import TextSlider from "@/components/common/TextSlider3";

import Details5 from "@/components/product-details/Details5";
export const metadata = {
  title: "Product Details || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = allProducts.filter((p) => p.id == id)[0] || allProducts[0];
  return (
    <>
      <Topbar1 />
      <Header1 parentClass="tf-header" />

      <Details5 product={product} />

      <TextSlider />
      <RelatedProducts containerFull />
      <RecentProducts containerFull />

      <Footer1 />
    </>
  );
}
