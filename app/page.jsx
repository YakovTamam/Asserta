import Header1 from "@/components/headers/Header1";
import Hero from "@/components/homes/home-6/Hero";
import Stories from "@/components/homes/home-6/Stories";
import VideoScrollSection from "@/components/homes/home-6/VideoScrollSection";
import FeaturedProducts from "@/components/homes/home-6/FeaturedProducts";
import WhyUs from "@/components/homes/home-6/WhyUs";
import FAQ from "@/components/homes/home-6/FAQ";
import RecentlyViewed from "@/components/homes/home-6/RecentlyViewed";
import Footer1 from "@/components/footers/Footer1";

export const metadata = {
  title: "Asserta — תכשיטים מעוצבים",
  description: "קולקציית תכשיטים יוקרתיים מעוצבים בעבודת יד",
};

export default function Home() {
  return (
    <>
      <Header1 />
      <Hero />
      <Stories isSticky={true} />
      <VideoScrollSection position={1} />
      <FeaturedProducts />
      <VideoScrollSection position={2} />
      <WhyUs />
      <FAQ />
      <RecentlyViewed />
      <Footer1 />
    </>
  );
}
