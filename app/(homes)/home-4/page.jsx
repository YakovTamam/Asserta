import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header4 from "@/components/headers/Header4";
import Topbar2 from "@/components/headers/Topbar2";
import TopbarBottom2 from "@/components/headers/TopbarBottom2";
import Banner from "@/components/homes/home-4/Banner";
import Banner2 from "@/components/homes/home-4/Banner2";
import Collections from "@/components/homes/home-4/Collections";
import Collections2 from "@/components/homes/home-4/Collections2";
import Cta from "@/components/common/Cta";
import Hero from "@/components/homes/home-4/Hero";
import Products1 from "@/components/homes/home-4/Products1";
import Products2 from "@/components/homes/home-4/Products2";
import Testimonials from "@/components/homes/home-4/Testimonials";
import TextSlider from "@/components/common/TextSlider3";
import React from "react";

export const metadata = {
  title: "Home 04 || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="tf-topbar p-0 style-2">
        <Topbar2 />
        <TopbarBottom2 />
      </div>
      <Header4 />
      <Hero />
      <Collections />
      <Products1 />
      <Banner />
      <Banner2 />
      <TextSlider />
      <Products2 />
      <Testimonials />
      <Collections2 />
      <Cta />
      <Features
        parentClass="flat-spacing-8 bg-light-peach"
        styleWhite={false}
      />
      <Footer1 />
    </>
  );
}
