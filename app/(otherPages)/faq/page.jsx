import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Faqs from "@/components/otherPages/Faqs";
import React from "react";
import Link from "next/link";
export const metadata = {
  title: "Faq || Vemus - Jewelry Ecommerce React Nextjs Template",
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
                <li>FAQs</li>
              </ul>
              <h1 className="heading fw-normal text-uppercase">
                frequently asked <br className="d-none d-xl-block" />
                questions
              </h1>
            </div>
            <div className="box-text">
              <p className="text-main-4">
                Got questions? We’ve got answers! Browse our FAQs to find
                information on orders, shipping,
                <br className="d-none d-xxl-block" />
                returns, jewelry care, and more. If you need further assistance,
                feel free to contact our team.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Faqs />
      <Footer3 />
    </>
  );
}
