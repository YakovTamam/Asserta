import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Collections2() {
  return (
    <section>
      <div className="container">
        <h2 className="s-title text-center text-capitalize wow fadeInUp">
          Just For You
        </h2>
      </div>
      <div className="tf-grid-layout md-col-2 xl-col-3 gap-0">
        <div className="gallery-V01 wow fadeInUp">
          <Link href={`/shop-default`} className="image">
            <Image
              src="/images/gallery/gallery-1.jpg"
              alt=""
              className="lazyload"
              width={1280}
              height={1028}
            />
          </Link>
          <div className="content">
            <div className="wrap-name">
              <Link
                href={`/shop-default`}
                className="h4 fw-normal link text-line-clamp-1"
              >
                Golden Glow Essentials
              </Link>
              <p className="text-main-8">
                Discover jewelry that defines every moment.
              </p>
            </div>
            <div className="text-nowrap">
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
        <div className="gallery-V01 wow fadeInUp">
          <Link href={`/shop-default`} className="image">
            <Image
              src="/images/gallery/gallery-2.jpg"
              alt=""
              className="lazyload"
              width={1280}
              height={1028}
            />
          </Link>
          <div className="content">
            <div className="wrap-name">
              <Link
                href={`/shop-default`}
                className="h4 fw-normal link text-line-clamp-1"
              >
                Timeless Beauty Collection
              </Link>
              <p className="text-main-8">
                Adorn yourself with elegance that lasts a lifetime.
              </p>
            </div>
            <div className="text-nowrap">
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
        <div className="gallery-V01 wow fadeInUp">
          <Link href={`/shop-default`} className="image">
            <Image
              src="/images/gallery/gallery-3.jpg"
              alt=""
              className="lazyload"
              width={1280}
              height={1028}
            />
          </Link>
          <div className="content">
            <div className="wrap-name">
              <Link
                href={`/shop-default`}
                className="h4 fw-normal link text-line-clamp-1"
              >
                Radiant Spark Jewelry
              </Link>
              <p className="text-main-8">
                Jewelry that mirrors your inner brilliance.
              </p>
            </div>
            <div className="text-nowrap">
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
        <div className="gallery-V01 wow fadeInUp">
          <Link href={`/shop-default`} className="image">
            <Image
              src="/images/gallery/gallery-4.jpg"
              alt=""
              className="lazyload"
              width={1280}
              height={1028}
            />
          </Link>
          <div className="content">
            <div className="wrap-name">
              <Link
                href={`/shop-default`}
                className="h4 fw-normal link text-line-clamp-1"
              >
                Luxe Grace Designs
              </Link>
              <p className="text-main-8">
                Celebrate life’s sparkle with every piece you wear.
              </p>
            </div>
            <div className="text-nowrap">
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
        <div className="gallery-V01 wow fadeInUp">
          <Link href={`/shop-default`} className="image">
            <Image
              src="/images/gallery/gallery-5.jpg"
              alt=""
              className="lazyload"
              width={1280}
              height={1028}
            />
          </Link>
          <div className="content">
            <div className="wrap-name">
              <Link
                href={`/shop-default`}
                className="h4 fw-normal link text-line-clamp-1"
              >
                Shine Within You
              </Link>
              <p className="text-main-8">
                Designs that embrace beauty, forever.
              </p>
            </div>
            <div className="text-nowrap">
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
        <div className="gallery-V01 wow fadeInUp">
          <Link href={`/shop-default`} className="image">
            <Image
              src="/images/gallery/gallery-6.jpg"
              alt=""
              className="lazyload"
              width={1280}
              height={1028}
            />
          </Link>
          <div className="content">
            <div className="wrap-name">
              <Link
                href={`/shop-default`}
                className="h4 fw-normal link text-line-clamp-1"
              >
                Elegant Moments Only
              </Link>
              <p className="text-main-8">Let every gem tell your story.</p>
            </div>
            <div className="text-nowrap">
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
    </section>
  );
}
