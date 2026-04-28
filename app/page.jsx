import Footer1 from "@/components/footers/Footer1";
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
import NewsLetter from "@/components/modals/NewsLetter";

export const metadata = {
  title: "Asserta - תכשיטים",
  description: "Asserta - תכשיטים מעוצבים",
};

export default function Home() {
  return (
    <>
      <div className="bg-surface">
        <div id="wrapper">
          <Topbar3 />
          <Header1 parentClass="tf-header" />
          <Hero />
          <TextSlider />
          <Collections />
          <Products1 />
          <Banner />
          <Collections2 />
          <Lookbook />
          <Products2 />
          <Features />
          <Testimonials />
          <Footer1 />
          <NewsLetter />
        </div>
      </div>
    </>
  );
}
