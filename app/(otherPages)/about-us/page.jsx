import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Cta from "@/components/common/Cta";
import Link from "next/link";
import Collections from "@/components/otherPages/about/Collections";
import Established from "@/components/otherPages/about/Established";
import Features from "@/components/otherPages/about/Features";
import Intro from "@/components/otherPages/about/Intro";
import Testimonials from "@/components/otherPages/about/Testimonials";
import React from "react";

export const metadata = {
  title: "About Us || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header1 parentClass="tf-header" />
      <section className="flat-spacing-2 pb-0">
        <div className="container">
          <div className="page-title">
            <div className="breadcrumbs">
              <ul className="bread-wrap">
                <li>
                  <Link href={`/`} className="text-main-4 link-secondary">
                    Home
                  </Link>
                </li>
                <li className="br-line w-12 bg-main" />
                <li>About Us</li>
              </ul>
              <h1 className="heading fw-normal text-uppercase">
                welcome to vemus
              </h1>
            </div>
            <div className="box-text">
              <p className="text-main-4">
                At Vemus, we believe jewelry is more than an accessory—it’s a
                reflection of your story. With a
                <br className="d-none d-xxl-block" />
                passion for craftsmanship and a commitment to quality, we create
                timeless pieces that celebrate
                <br className="d-none d-xxl-block" />
                life’s moments, big and small. From delicate everyday essentials
                to statement designs, each
                <br className="d-none d-xxl-block" />
                creation is crafted to inspire and shine for generations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Intro />
      <Established />
      <Features />
      <Collections />
      <Testimonials />
      <Cta />
      <Footer3 />
    </>
  );
}
