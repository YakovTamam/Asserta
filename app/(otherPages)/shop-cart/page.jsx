import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import RelatedProducts from "@/components/otherPages/RelatedProducts";
import ShopCart from "@/components/otherPages/ShopCart";
import React from "react";

export const metadata = {
  title: "Shop Cart || Vemus - Jewelry Ecommerce React Nextjs Template",
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
                  <Link href={`/`} className="text-main-4 link">
                    Home
                  </Link>
                </li>
                <li className="br-line w-12 bg-main" />
                <li>Cart</li>
              </ul>
              <h1 className="heading fw-normal">shopping cart</h1>
            </div>
            <div className="box-delivery">
              <h6 className="text fw-normal text-uppercase">
                Spend <span className="fw-medium">$100</span> more to get
                <span className="fw-medium">Free Shipping</span>
              </h6>
              <div className="progress-cart tf-progress-ship">
                <div
                  className="value"
                  style={{ width: "0%" }}
                  data-progress={66}
                >
                  <i className="icon icon-delivery" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ShopCart />
      <RelatedProducts />
      <Footer1 />
    </>
  );
}
