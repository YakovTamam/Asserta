import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Categories() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="sect-top center text-center wow fadeInUp">
          <h2 className="s-title font-2 text-capitalize">
            <span className="fst-italic">Our</span> Categories
          </h2>
          <p className="s-sub-title">
            Explore our collection of sophisticated, modern designs that make a
            statement without saying a word.
            <br className="d-none d-xl-block" />
            Find your signature look today.
          </p>
        </div>
        <div className="tf-grid-layout sm-col-2 xl-col-3 category-grid wow fadeInUp">
          <div className="item_1">
            <Link href={`/shop-default`} className="wg-category hover-img4">
              <div className="image img-style4">
                <Image
                  src="/images/collections/category-1.jpg"
                  alt=""
                  className="lazyload"
                  width={729}
                  height={593}
                />
              </div>
              <h3 className="btn-view link">
                UNDER $100
                <i className="icon icon-arrow-top-right" />
              </h3>
            </Link>
            <Link href={`/shop-default`} className="wg-category hover-img4">
              <div className="image img-style4">
                <Image
                  src="/images/collections/category-2.jpg"
                  alt=""
                  className="lazyload"
                  width={729}
                  height={444}
                />
              </div>
              <h3 className="btn-view link">
                UNDER $92
                <i className="icon icon-arrow-top-right" />
              </h3>
            </Link>
          </div>
          <div className="item_2">
            <Link href={`/shop-default`} className="wg-category hover-img4">
              <div className="image img-style4">
                <Image
                  src="/images/collections/category-3.jpg"
                  alt=""
                  className="lazyload"
                  width={729}
                  height={1082}
                />
              </div>
              <h3 className="btn-view link">
                UNDER $63
                <i className="icon icon-arrow-top-right" />
              </h3>
            </Link>
          </div>
          <div className="item_3">
            <Link href={`/shop-default`} className="wg-category hover-img4">
              <div className="image img-style4">
                <Image
                  src="/images/collections/category-4.jpg"
                  alt=""
                  className="lazyload"
                  width={729}
                  height={444}
                />
              </div>
              <h3 className="btn-view link">
                UNDER $88
                <i className="icon icon-arrow-top-right" />
              </h3>
            </Link>
            <Link href={`/shop-default`} className="wg-category hover-img4">
              <div className="image img-style4">
                <Image
                  src="/images/collections/category-5.jpg"
                  alt=""
                  className="lazyload"
                  width={729}
                  height={593}
                />
              </div>
              <h3 className="btn-view link">
                UNDER $79
                <i className="icon icon-arrow-top-right" />
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
