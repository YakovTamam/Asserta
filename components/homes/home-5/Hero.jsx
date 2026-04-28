"use client";
import { thirdSliderData } from "@/data/heroSlides";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "swiper/modules";
export default function Hero() {
  return (
    <div className="tf-slideshow">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_fade-md"
        breakpoints={{
          0: { slidesPerView: 1 },
          575: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd25",
        }}
      >
        {thirdSliderData.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider_wrap style-2">
              <span className="sld-overlay fade-item fade-box" />
              <div className="sld-image">
                <Image
                  src={slide.image}
                  alt=""
                  className="lazyload"
                  width={slide.imageWidth}
                  height={slide.imageHeight}
                />
              </div>
              <div className="sld-content">
                <div className="container">
                  <div className="content-sld text-center">
                    <p className="text-white text-uppercase fade-item fade-item-1">
                      {slide.label}
                    </p>
                    <h2 className="title-sld-4 font-2 fade-item fade-item-2">
                      {slide.titleBeforeItalic}
                      <span className="fst-italic fw-normal">
                        {slide.titleItalic}
                      </span>
                    </h2>
                    <div className="fade-item fade-item-3">
                      <Link
                        href={`/shop-default`}
                        className="tf-btn type-large style-white-2"
                      >
                        Shop Now
                        <i className="icon-arrow-right fs-24" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default style-white tf-sw-pagination spd25" />
      </Swiper>
    </div>
  );
}
