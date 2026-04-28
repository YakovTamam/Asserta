import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar3 from "@/components/headers/Topbar3";
import Banner from "@/components/homes/home-6/Banner";

import Collections from "@/components/homes/home-6/Collections";
import Collections2 from "@/components/homes/home-6/Collections2";
import Features from "@/components/homes/home-6/Features";
import Hero from "@/components/homes/home-6/Hero";
import Lookbook from "@/components/homes/home-6/Lookbook";
import Products1 from "@/components/homes/home-6/Products1";
import Products2 from "@/components/homes/home-6/Products2";
import Testimonials from "@/components/homes/home-6/Testimonials";
import TextSlider from "@/components/homes/home-6/TextSlider";
import React from "react";

export const metadata = {
  title: "Home 06 || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="bg-surface-2">
        <Topbar3 />
        <Header1 parentClass="tf-header" />
        <Hero />
        <Features />
        <Products1 />
        <Collections />
        <TextSlider />
        <Banner />
        <Products2 />
        <Collections2 />
        <Lookbook />
        <Testimonials />
        <Footer3 />
      </div>
    </>
  );
}
