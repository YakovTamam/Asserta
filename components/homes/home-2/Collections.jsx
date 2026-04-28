import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Collections() {
  return (
    <div className="flat-spacing-3">
      <div className="container">
        <p className="s-title-2 font-2 text-center text-lg-end letter-space-0 wow fadeInLeft">
          <span>Inspired</span> STYLE <br />
          FOR EVERY <span>Seasons</span>
        </p>
        <div className="cls-wrap">
          <Link
            href={`/shop-collection-list`}
            className="box_collection--V02 hover-img wow fadeInUp"
          >
            <div className="image img-style">
              <Image
                src="/images/collections/season-1.jpg"
                alt=""
                className="lazyload"
                width={456}
                height={196}
              />
            </div>
            <div className="tf-btn btn-line has-icon link">
              <p className="name-cls fw-normal">GIFT UNDER $200</p>
              <i className="ic-2 icon-arrow-top-right" />
            </div>
          </Link>
          <Link
            href={`/shop-collection-list`}
            className="box_collection--V02 hover-img wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="image img-style">
              <Image
                src="/images/collections/season-2.jpg"
                alt=""
                className="lazyload"
                width={456}
                height={196}
              />
            </div>
            <div className="tf-btn btn-line has-icon link">
              <p className="name-cls fw-normal">NEW IN</p>
              <i className="ic-2 icon-arrow-top-right" />
            </div>
          </Link>
          <Link
            href={`/shop-collection-list`}
            className="box_collection--V02 hover-img wow fadeInUp"
          >
            <div className="image img-style">
              <Image
                src="/images/collections/season-3.jpg"
                alt=""
                className="lazyload"
                width={456}
                height={196}
              />
            </div>
            <div className="tf-btn btn-line has-icon link">
              <p className="name-cls fw-normal">PERSONALISED</p>
              <i className="ic-2 icon-arrow-top-right" />
            </div>
          </Link>
          <Link
            href={`/shop-collection-list`}
            className="box_collection--V02 hover-img wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="image img-style">
              <Image
                src="/images/collections/season-4.jpg"
                alt=""
                className="lazyload"
                width={456}
                height={196}
              />
            </div>
            <div className="tf-btn btn-line has-icon link">
              <p className="name-cls fw-normal">BEST SELLERS</p>
              <i className="ic-2 icon-arrow-top-right" />
            </div>
          </Link>
          <Link
            href={`/shop-collection-list`}
            className="box_collection--V02 hover-img wow fadeInUp"
          >
            <div className="image img-style">
              <Image
                src="/images/collections/season-5.jpg"
                alt=""
                className="lazyload"
                width={456}
                height={196}
              />
            </div>
            <div className="tf-btn btn-line has-icon link">
              <p className="name-cls fw-normal">JUST FOR YOU</p>
              <i className="ic-2 icon-arrow-top-right" />
            </div>
          </Link>
          <Link
            href={`/shop-collection-list`}
            className="box_collection--V02 hover-img wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="image img-style">
              <Image
                src="/images/collections/season-6.jpg"
                alt=""
                className="lazyload"
                width={456}
                height={196}
              />
            </div>
            <div className="tf-btn btn-line has-icon link">
              <p className="name-cls fw-normal">WEDDING</p>
              <i className="ic-2 icon-arrow-top-right" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
