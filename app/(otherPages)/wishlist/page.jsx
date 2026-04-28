import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Wishlist from "@/components/otherPages/Wishlist";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "Wishlist || Vemus - Jewelry Ecommerce React Nextjs Template",
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
                <li>
                  <p>Account</p>
                </li>
              </ul>
              <h1 className="heading fw-normal text-uppercase">my wishlist</h1>
            </div>
          </div>
        </div>
      </section>

      <Wishlist />
      <Footer1 />
    </>
  );
}
