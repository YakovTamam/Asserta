import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Contact from "@/components/otherPages/Contact";
import React from "react";
import Link from "next/link";
export const metadata = {
  title: "Contact Us || Vemus - Jewelry Ecommerce React Nextjs Template",
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
                <li>Contact Us</li>
              </ul>
              <h1 className="heading fw-normal text-uppercase">contact us</h1>
            </div>
            <div className="box-text">
              <p className="text-main-4">
                We’re here to assist you with any inquiries, whether it's about
                our jewelry collections, custom
                <br className="d-none d-xxl-block" />
                designs, or store locations. Reach out to us via phone, email,
                or visit one of our stores—we’d
                <br className="d-none d-xxl-block" />
                love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
      <Footer3 />
    </>
  );
}
