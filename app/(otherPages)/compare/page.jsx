import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Compare from "@/components/otherPages/Compare";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "Compare || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar bg-dark-olive" />
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
                <li>Compare</li>
              </ul>
              <h1 className="heading fw-normal text-uppercase">Compare</h1>
            </div>
            <div className="box-text">
              <p className="text-main-4">
                Find the perfect piece by comparing our exquisite jewelry
                collections. Easily view details,
                <br className="d-none d-xxl-block" />
                materials, and features side by side to make the best choice for
                your style and needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Compare />
      <Footer1 />
    </>
  );
}
