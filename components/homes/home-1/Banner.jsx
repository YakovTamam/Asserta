import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Banner() {
  return (
    <div className="flat-spacing-3">
      <div className="container">
        <div className="banner_V05 wow fadeInUp">
          <div className="shape-image">
            <div className="image">
              <Image
                src="/images/banner/banner-8.jpg"
                alt="Banner"
                className="lazyload"
                width={1000}
                height={1000}
              />
            </div>
            <span className="line-circle" />
            <Image
              className="img-ic-star"
              alt=""
              width={64}
              height={63}
              src="/icon/dou-star.svg"
            />
          </div>
          <div className="bn-content">
            <h2 className="title font-2 fw-normal">
              Find Your <span className="fst-italic">Nearest</span>
              <br className="d-none d-xl-block" />
              Jewelry Store
            </h2>
            <p className="sub-title">
              Discover the closest location to explore our exclusive collections{" "}
              <br className="d-none d-xl-block" />
              and personalized service.
            </p>
            <Link
              href={`/shop-collection-list`}
              className="tf-btn type-large text-uppercase"
            >
              Shop Collection
              <i className="icon-arrow-right-2 fs-24" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
