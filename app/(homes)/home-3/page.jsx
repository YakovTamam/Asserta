import Features from "@/components/common/Features";
import TextSlider2 from "@/components/common/TextSlider2";
import Footer1 from "@/components/footers/Footer1";
import Header3 from "@/components/headers/Header3";
import Topbar2 from "@/components/headers/Topbar2";
import TopbarBottom from "@/components/headers/TopbarBottom";
import Banner from "@/components/homes/home-3/Banner";
import Banner2 from "@/components/homes/home-3/Banner2";
import Blogs from "@/components/homes/home-3/Blogs";

import Collections from "@/components/homes/home-3/Collections";
import Hero from "@/components/homes/home-3/Hero";
import Products1 from "@/components/homes/home-3/Products1";
import Products2 from "@/components/homes/home-3/Products2";
import Products3 from "@/components/homes/home-3/Products3";
import Testimonials from "@/components/homes/home-3/Testimonials";
import TextBanner from "@/components/homes/home-3/TextBanner";
import ProductsModal from "@/components/modals/ProductsModal";
import React from "react";

export const metadata = {
  title: "Home 03 || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="tf-topbar p-0 style-2">
        <Topbar2 />
        <TopbarBottom />
      </div>
      <Header3 />
      <Hero />
      <TextBanner />
      <Collections />
      <Products1 />
      <TextSlider2 />
      <Banner />
      <Products2 />
      <Banner2 />
      <Products3 />
      <Testimonials />
      <Blogs />
      <Features
        styleWhite={false}
        parentClass="flat-spacing-8 bg-light-peach"
      />
      <Footer1 />
      <ProductsModal />
    </>
  );
}
