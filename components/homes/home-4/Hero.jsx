import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="tf-slideshow">
      <div className="slider_wrap type-2">
        <div className="sld-image">
          <Image
            src="/images/slider/slider-6.jpg"
            alt=""
            className="lazyload"
            width={2880}
            height={1404}
          />
        </div>
        <div className="sld-content-2">
          <div className="container">
            <div className="content-sld text-center">
              <h6 className="text-white text-uppercase">Trending</h6>
              <p className="title-sld-3 font-2">
                Unveil Your <br className="d-none d-md-block" />
                <span className="fst-italic">Signature</span> Look
              </p>
            </div>
            <div className="row">
              <div className="col-sm-6 col-12 offset-sm-6">
                <div className="content-sld-2">
                  <p className="sub-title-sld-2">
                    Explore our stunning collection of handcrafted jewelry that
                    blends <br className="d-none d-lg-block" />
                    timeless elegance with modern style. Each piece is designed
                    to <br className="d-none d-lg-block" />
                    empower your individuality—make your statement today!
                  </p>
                  <div className="btn-group">
                    <Link
                      href={`/shop-default`}
                      className="tf-btn type-large style-white-2"
                    >
                      Shop Now
                      <i className="icon-arrow-right fs-24" />
                    </Link>
                    <Link
                      href={`/shop-collection-list`}
                      className="text-white link text-uppercase"
                    >
                      explore more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sld-img-item d-none d-xxl-block">
          <Image
            src="/images/slider/img-item.jpg"
            alt="Image"
            className="lazyload"
            width={648}
            height={666}
          />
        </div>
      </div>
    </section>
  );
}
