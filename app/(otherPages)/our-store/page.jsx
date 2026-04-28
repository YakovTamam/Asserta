import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Store from "@/components/otherPages/Store";
import React from "react";
import Link from "next/link";
export const metadata = {
  title: "Our Stores || Vemus - Jewelry Ecommerce React Nextjs Template",
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
                <li>Our Stores</li>
              </ul>
              <h1 className="heading fw-normal text-uppercase">our stores</h1>
            </div>
            <div className="box-text">
              <p className="text-main-4">
                Discover our exquisite jewelry collections in person at a store
                near you. Visit us to experience
                <br className="d-none d-xxl-block" />
                timeless craftsmanship, premium designs, and personalized
                service. Use our store locator to
                <br className="d-none d-xxl-block" />
                find the closest location and step into a world of elegance.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Store />
      <Footer3 />
    </>
  );
}
