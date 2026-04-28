"use client";
import { sliderData } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="tf-slideshow">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper sw-slide-show slider_effect_fade"
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop
        autoplay={{
          delay: 3000,
        }}
        pagination={{
          clickable: true,
          el: ".spd8",
        }}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider_wrap">
              <div className="sld-image">
                <Image
                  src={slide.image}
                  alt=""
                  className="lazyload"
                  width={2880}
                  height={1284}
                />
              </div>
              <div className="sld-content">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="content-sld">
                        <p className="title-sld lt-sp-t2 font-2 fade-item fade-item-1">
                          <span className="fst-italic">
                            {slide.titleItalic}
                          </span>
                          <br className="d-none d-sm-block" />
                          {slide.titleRest}
                        </p>
                        <p className="sub-title-sld fade-item fade-item-2">
                          {slide.subtitle}
                        </p>
                        <div className="fade-item fade-item-3">
                          <Link
                            href={`/shop-collection-list`}
                            className="tf-btn btn-fill-white animate-btn animate-dark fw-medium"
                          >
                            Shop Collection
                            <i className="icon-arrow-right fs-24" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="sw-dot-default style-white tf-sw-pagination type-sld spd8" />
      </Swiper>
    </div>
  );
}
