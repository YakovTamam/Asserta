import AccountSidebar from "@/components/account/AccountSidebar";
import MyAccount from "@/components/account/MyAccount";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "Account || Vemus - Jewelry Ecommerce React Nextjs Template",
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
                  <Link href={`/`} className="text-main-4 link-secondary">
                    Home
                  </Link>
                </li>
                <li className="br-line w-12 bg-main" />
                <li>Account</li>
              </ul>
              <h1 className="heading fw-normal text-uppercase">my account</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="sidebar-account-wrap sidebar-content-wrap sticky-top d-lg-block d-none">
                <ul className="my-account-nav">
                  <AccountSidebar />
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <MyAccount />
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  );
}
