import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import About from "@/components/homes/home-5/About";
import Banner from "@/components/homes/home-5/Banner";
import Categories from "@/components/homes/home-5/Categories";
import Features from "@/components/homes/home-5/Features";
import Hero from "@/components/homes/home-5/Hero";
import Products1 from "@/components/homes/home-5/Products1";
import Products2 from "@/components/homes/home-5/Products2";
import Testimonials from "@/components/homes/home-5/Testimonials";
import TextSlider from "@/components/homes/home-5/TextSlider";
import React from "react";

export const metadata = {
  title: "Home 05 || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header1 />
      <Hero />
      <Features />
      <About />
      <Products1 />
      <Banner />
      <Categories />
      <TextSlider />
      <Products2 />
      <Testimonials />
      <Footer3 />
    </>
  );
}
