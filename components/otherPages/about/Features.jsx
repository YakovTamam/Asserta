import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Features() {
  return (
    <>
      {/* Core Value */}
      <section className="s-core-values">
        <div className="container">
          <div className="values-grid tf-grid-layout md-col-2 xl-col-3">
            <div className="core-values-image">
              <Image
                src="/images/section/core-value.jpg"
                alt="Core Value"
                className="lazyload"
                width={1012}
                height={1208}
              />
            </div>
            <div className="value-box hightlight">
              <h4 className="value-title">TIMELESS CRAFTSMANSHIP</h4>
              <span className="br-line" />
              <p className="value-description">
                Every piece is meticulously crafted with precision, blending
                traditional artistry with modern innovation to ensure lasting
                beauty.
              </p>
            </div>
            <div className="value-box">
              <h4 className="value-title">EXCEPTIONAL QUALITY</h4>
              <span className="br-line" />
              <p className="value-description">
                We source only the finest materials, from radiant gemstones to
                premium metals, ensuring each creation meets the highest
                standards.
              </p>
            </div>
            <div className="value-box">
              <h4 className="value-title">MEANINGFUL DESIGNS</h4>
              <span className="br-line" />
              <p className="value-description">
                Our jewelry is more than just an accessory—it’s a symbol of
                love, milestones, and personal expression, designed to tell your
                story.
              </p>
            </div>
            <div className="value-box hightlight">
              <h4 className="value-title">CUSTOMER COMMITMENT</h4>
              <span className="br-line" />
              <p className="value-description">
                Your satisfaction is at the heart of everything we do, offering
                personalized service and lifelong support for every Vemus piece.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* /Core Value */}
      {/* Fearture */}
      <section className="flat-spacing-3 feature-intro">
        <div className="container">
          <div className="row flex-wrap-reverse">
            <div className="col-xxl-5 offset-xxl-1 col-md-6 d-flex align-items-center">
              <div className="text-content">
                <h2 className="feature-title">
                  CARING JEWELLERY IS STILL OUR PASSION
                </h2>
                <p className="feature-subtitle">
                  We never want to waste a scrap of precious metal. Our pieces
                  are handcrafted from recycled 18ct gold vermeil and gold
                  plating, and recycled sterling silver. Our Vemus collection
                  elevates our iconic designs in recycled 14ct solid gold and
                  diamonds.
                </p>
                <Link
                  href={`/shop-default`}
                  className="cta-btn tf-btn type-large"
                >
                  shop all jewellry
                  <i className="icon-arrow-right-2 fs-24"> </i>
                </Link>
              </div>
            </div>
            <div className="col-xxl-5 col-md-6">
              <div className="visual-content mb-xl-0">
                <Image
                  src="/images/section/feature-visual.jpg"
                  alt=""
                  className="lazyload img-visual"
                  width={1000}
                  height={1000}
                />
                <div className="brand-box">
                  <Image
                    src="/images/section/item-2.png"
                    alt=""
                    className="lazyload"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
            </div>
            <div className="offset-xl-1 col-xl-10">
              <div className="" />
            </div>
          </div>
        </div>
      </section>
      {/* /Fearture */}
    </>
  );
}
