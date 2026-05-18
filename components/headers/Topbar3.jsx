"use client";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslations } from "next-intl";

export default function Topbar3() {
  const t = useTranslations("topbar");
  return (
    <div className="tf-topbar bg-dark">
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
                {t("welcome")}
              </p>
            </SwiperSlide>
            {/* item 2 */}
            <SwiperSlide className="swiper-slide">
              <p className="text-caption-3 fw-medium text-white text-line-clamp-1">
                {t("delivery")}
              </p>
            </SwiperSlide>
            {/* item 3 */}
            <SwiperSlide className="swiper-slide">
              <p className="text-caption-3 fw-medium text-white text-line-clamp-1">
                {t("shipping_speed")}
              </p>
            </SwiperSlide>
            {/* item 4 */}
            <SwiperSlide className="swiper-slide">
              <p className="text-caption-3 fw-medium text-white text-line-clamp-1">
                {t("refund_policy")}
              </p>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
