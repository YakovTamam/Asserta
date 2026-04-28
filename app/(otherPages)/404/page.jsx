import Header1 from "@/components/headers/Header1";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";
import Link from "next/link";
import Image from "next/image";
export const metadata = {
  title: "Page Not Found || Vemus - Jewelry Ecommerce React Nextjs Template",
  description: "Vemus - Jewelry Ecommerce React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Topbar1 />
      <Header1 parentClass="tf-header line-bt-2" />
      <div className="wg-404 tf-grid-layout sm-col-2 gap-0 vh-100">
        <div className="image">
          <Image
            src="/images/section/404.jpg"
            alt={404}
            className="lazyload"
            width={1920}
            height={1868}
          />
        </div>
        <div className="content">
          <h1 className="heading">
            <span className="text-primary">Opps! </span>Page not found!
          </h1>
          <p className="sub-head">
            The page you are looking is not available or has been removed. Try
            going to HomePage by using the button below.
          </p>
          <Link href={`/`} className="tf-btn btn-fill fw-medium animate-btn">
            RETURN TO HOMEPAGE
          </Link>
        </div>
      </div>
    </>
  );
}
