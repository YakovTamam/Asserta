import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Banner2() {
  return (
    <div className="flat-spacing-12">
      <div className="flat-spacing-5 pt-0">
        <div className="container">
          <div className="banner_V03 hover-img4">
            <div className="bn-image img-style4">
              <Image
                src="/images/banner/banner-5.jpg"
                alt=""
                className="lazyload"
                width={1488}
                height={1416}
              />
            </div>
            <div className="bn-content wow fadeInUp">
              <h1 className="fw-normal">
                <Link href={`/shop-default`} className="title">
                  The Modern <br className="d-none d-xl-block" />
                  Bride Collection
                </Link>
              </h1>
              <p className="sub-title text-main-8">
                Redefining bridal elegance with contemporary designs that
                radiate <br className="d-none d-xl-block" />
                sophistication. Celebrate your big day with jewelry as unique as
                your <br className="d-none d-xl-block" />
                love story.
              </p>
              <Link
                href={`/shop-default`}
                className="tf-btn btn-def-2 type-large px-0"
              >
                Shop Now
                <i className="icon icon-arrow-right-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="banner_V03 hover-img4 flex-wrap-reverse">
          <div className="bn-content wow fadeInUp">
            <h1 className="fw-normal">
              <Link href={`/shop-default`} className="title">
                The Art of <br className="d-none d-xl-block" />
                Stack Collection
              </Link>
            </h1>
            <p className="sub-title text-main-8">
              Express your individuality with stackable rings, bracelets, and
              necklaces.
              <br className="d-none d-xl-block" />
              Mix, match, and layer to create a style that's entirely your own.
            </p>
            <Link
              href={`/shop-default`}
              className="tf-btn btn-def-2 type-large px-0"
            >
              Shop Now
              <i className="icon icon-arrow-right-3" />
            </Link>
          </div>
          <div className="bn-image img-style4">
            <Image
              src="/images/banner/banner-6.jpg"
              alt=""
              className="lazyload"
              width={1488}
              height={1416}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
