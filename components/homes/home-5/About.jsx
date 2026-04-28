import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function About() {
  return (
    <div className="flat-spacing-12 pb-0">
      <div className="container">
        <div className="banner_V05 style-2">
          <div className="shape-image wow fadeInUp">
            <div className="image">
              <Image
                src="/images/banner/banner-12.jpg"
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
              src="/icon/dou-star.svg"
              width={64}
              height={63}
            />
          </div>
          <div className="bn-content wow fadeInUp">
            <h6 className="text-uppercase">About Vemus</h6>
            <h2 className="title font-2 fw-normal">
              Crafting <span className="fst-italic">Timeless</span> Elegance
            </h2>
            <p className="sub-title text-main-4">
              At Vemus, we believe every piece tells a story. Founded on passion
              and precision, our curated collections blend traditional
              craftsmanship with modern design. We create jewelry that not only
              complements your style but also celebrates the moments that
              matter. Discover our journey of beauty, innovation, and unwavering
              quality.
            </p>
            <Link href={`/about-us`} className="tf-btn type-large">
              our story
              <i className="icon-arrow-right-2 fs-24" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container border-bt-13 flat-spacing pt-0" />
    </div>
  );
}
