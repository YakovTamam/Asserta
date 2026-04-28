import Features from "@/components/common/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Products4 from "@/components/shop/Products4";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "Shop || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar bg-dark-olive" />
      <Header1 parentClass="tf-header" />
      <section className="flat-spacing-2 pb-0">
        <div className="container">
          <div className="page-title border-0">
            <div className="breadcrumbs">
              <ul className="bread-wrap">
                <li>
                  <Link href={`/`} className="text-main-4 link-secondary">
                    Home
                  </Link>
                </li>
                <li className="br-line w-12 bg-main" />
                <li>
                  <p>Shop</p>
                </li>
              </ul>
              <h1 className="heading fw-normal text-uppercase">
                necklaces
                <span className="number-count"> 250 </span>
              </h1>
            </div>
            <div className="box-text">
              <p className="text-main-4">
                Discover our rings collection to find the latest addition to
                your jewellery box. From crown, heart and flower rings
                <br className="d-none d-xxl-block" />
                adorned with clear crystals to simple beaded and wishbone
                styles, our rings for women collection has it all. Refine
                <br className="d-none d-xxl-block" />
                your style with a &nbsp;sterling silver, &nbsp;14k gold-plated,
                14k rose gold-plated or 14k gold ring.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Products4 />
      <Features
        parentClass="flat-spacing-8 bg-main"
        iconColorClass="text-primary"
      />
      <Footer1 />
    </>
  );
}
