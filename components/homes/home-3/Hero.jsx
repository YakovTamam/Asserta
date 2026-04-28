"use client";
import { secondSliderData } from "@/data/heroSlides";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
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
            slidesPerView: 2,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd13",
        }}
      >
        {secondSliderData.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider_wrap">
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
                  <div className="content-sld text-center wow fadeInUp">
                    <p className="title-sld-2 font-2 fade-item fade-item-1">
                      <span className="fst-italic">{slide.titleItalic}</span>{" "}
                      {slide.titleRest}
                    </p>
                    <div className="fade-item fade-item-2">
                      <Link
                        href={`/shop-collection-list`}
                        className="tf-btn btn-fill-white-2"
                      >
                        {slide.buttonText}
                        <i className="icon-arrow-right fs-24" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default style-white tf-sw-pagination spd13" />
      </Swiper>
    </div>
  );
}
