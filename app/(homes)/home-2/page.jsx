import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import Topbar2 from "@/components/headers/Topbar2";
import Banner from "@/components/homes/home-2/Banner";
import Blogs from "@/components/homes/home-2/Blogs";
import Categories from "@/components/homes/home-2/Categories";
import Collections from "@/components/homes/home-2/Collections";
import Cta from "@/components/homes/home-2/Cta";
import Features from "@/components/homes/home-2/Features";
import Hero from "@/components/homes/home-2/Hero";
import Products1 from "@/components/homes/home-2/Products1";
import Products2 from "@/components/homes/home-2/Products2";
import Testimonials from "@/components/homes/home-2/Testimonials";
import BeforeLeave from "@/components/modals/BeforeLeave";
import React from "react";

export const metadata = {
  title: "Home 02 || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Topbar2 />
      <Header2 />
      <Hero />
      <Categories />
      <Products1 />
      <Collections />
      <Products2 />
      <Banner />
      <Features />
      <Testimonials />
      <Blogs />
      <Cta />
      <Footer2 />
      <BeforeLeave />
    </>
  );
}
