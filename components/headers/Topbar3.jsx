"use client";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Topbar3() {
  return (
    <div className="tf-topbar bg-dark-olive">
      <div className="container">
        <div className="topbar-inner">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            speed={1000}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
            }}
            loop
            spaceBetween={10}
            direction="vertical"
          >
            <SwiperSlide className="swiper-slide">
              <p className="text-caption-3 fw-medium text-white text-line-clamp-1">
                FREE STANDARD DELIVERY FOR ALL ORDERS OVER $200
              </p>
            </SwiperSlide>
            {/* item 2 */}
            <SwiperSlide className="swiper-slide">
              <p className="text-caption-3 fw-medium text-white text-line-clamp-1">
                FREE STANDARD DELIVERY FOR ALL ORDERS OVER $200
              </p>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
