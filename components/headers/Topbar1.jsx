"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
export default function Topbar1({ parentClass = "tf-topbar bg-olive-brown" }) {
  return (
    <div className={parentClass}>
      <div className="container">
        <div className="topbar-inner">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            loop
            data-delay={3000}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
            }}
            spaceBetween={10}
          >
            {/* item 1 */}
            <SwiperSlide className="swiper-slide">
              <div className="has-btn">
                <p className="text-caption-3 fw-medium text-white">
                  FREE STANDARD DELIVERY FOR ALL ORDERS OVER $200
                </p>
                <span className="br-line" />
                <Link
                  href={`/shop-default`}
                  className="tf-btn-line style-white-2 text-uppercase lh-19"
                >
                  Shop Now
                  <i className="icon-arrow-top-right-2 fs-10" />
                </Link>
              </div>
            </SwiperSlide>
            {/* item 2 */}
            <SwiperSlide className="swiper-slide">
              <div className="has-btn">
                <p className="text-caption-3 fw-medium text-white">
                  COMPLIMENTARY SHIPPING ON ORDERS ABOVE $200
                </p>
                <span className="br-line" />
                <Link
                  href={`/shop-default`}
                  className="tf-btn-line style-white-2 text-uppercase lh-19"
                >
                  Shop Now
                  <i className="icon-arrow-top-right-2 fs-10" />
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
