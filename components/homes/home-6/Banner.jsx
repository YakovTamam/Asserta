import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Banner() {
  return (
    <div className="flat-spacing-3 pt-0 pb-sm-5">
      <div className="container-full-2">
        <div className="banner_V06">
          <div className="bn-image mb-md-0">
            <Image
              src="/images/banner/banner-9.jpg"
              alt=""
              className="lazyload"
              width={3720}
              height={1322}
            />
          </div>
          <div className="bn-content">
            <div className="container">
              <div className="col-md-5 offset-md-7">
                <div className="wrap wow fadeInUp">
                  <h6 className="caption fw-normal">SUMMER SALE</h6>
                  <p className="title text-hero-2 font-2">
                    Radiate Elegance, <br className="d-none d-xl-block" />
                    <span className="fst-italic">Wear Confidence</span>
                  </p>
                  <p className="sub-title">
                    Discover exquisitely crafted jewelry designed to complement
                    your style. From timeless classics to modern statement
                    pieces, find the perfect sparkle for every occasion.
                  </p>
                  <Link
                    href={`/shop-collection-list`}
                    className="tf-btn btn-fill animate-btn type-large text-uppercase"
                  >
                    Shop Collection
                    <i className="icon-arrow-right-2 fs-24" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
