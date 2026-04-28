import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Banner() {
  return (
    <div className="banner_V02 hover-img">
      <div className="bn-image img-style">
        <Image
          src="/images/banner/banner-13.jpg"
          alt=""
          className="lazyload"
          width={1920}
          height={1436}
        />
      </div>
      <div className="bn-content bg-linear-dark-brown text-white">
        <h6 className="caption text-uppercase text-white mb-0 wow fadeInUp">
          discount code: vemus20off
        </h6>
        <h2 className="title font-2 fw-normal text-white wow fadeInUp">
          <span className="fst-italic">Unveil</span> Your Sparkle
        </h2>
        <p className="sub-title mb_xxl-60 text-white wow fadeInUp">
          Discover our handcrafted jewelry collection designed to elevate your
          style. Enjoy <br className="d-none d-xxl-block" />
          exclusive deals and limited-time offers—your moment to shine is now!
        </p>
        <Link
          href={`/shop-collection-list`}
          className="tf-btn style-white-2 type-large wow fadeInUp"
        >
          Shop Now
          <i className="icon icon-arrow-right-2" />
        </Link>
      </div>
    </div>
  );
}
