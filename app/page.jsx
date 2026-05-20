import Header1 from "@/components/headers/Header1";
import Hero from "@/components/homes/home-6/Hero";
import Stories from "@/components/homes/home-6/Stories";
import Collections from "@/components/homes/home-6/Collections";
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
      <Collections />
      <Footer1 />
    </>
  );
}
