"use client";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
const heroSlider = [
  {
    image: "/images/hero1.png",
    cta: "׳׳’׳™׳׳•׳™ ׳”׳§׳•׳׳§׳¦׳™׳”",
    title: "׳”׳׳×׳ ׳” ׳”׳׳•׳©׳׳׳×",
    subtitle: "׳׳©׳׳•׳— ׳׳”׳™׳¨ ׳¢׳“ ׳”׳‘׳™׳×",
    imageWidth: 2790,
    imageHeight: 1226,
    buttonClass: "tf-btn type-large style-white-2",
  },
  {
    image: "/images/hero2.png",
    imageWidth: 2790,
    imageHeight: 1226,
    title: "׳”׳¨׳’׳¢׳™׳ ׳©׳׳›׳",
    subtitle: "׳”׳ ׳™׳¦׳•׳¥ ׳©׳׳ ׳•",
    cta: "׳׳”׳¦׳¦׳” ׳‘׳¢׳™׳¦׳•׳‘׳™׳",
    buttonClass: "tf-btn type-large style-white-3",
    titleClass: "text-main",
  },
  {
    image: "/images/hero3.png",
    imageWidth: 2790,
    imageHeight: 1226,
    title: "׳”׳׳×׳ ׳” ׳”׳׳•׳©׳׳׳×",
    subtitle: "׳׳©׳׳•׳— ׳׳”׳™׳¨ ׳¢׳“ ׳”׳‘׳™׳×",
    cta: "׳׳‘׳—׳™׳¨׳× ׳׳×׳ ׳”",
    buttonClass: "tf-btn type-large style-white-2",
  },
];

const slideTitles = ["slide1", "slide2", "slide3"];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <div className="tf-slideshow">
      <div className="container-full-2">
        <Swiper
          className="swiper tf-swiper sw-slide-show slider_effect_fade"
          loop
          autoplay={{ delay: 13000 }}
          modules={[Autoplay, EffectFade, Pagination]}
          pagination={{ clickable: true, el: ".spd33" }}
        >
          {heroSlider.map((slide, index) => (
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
                    <div className="row">
                      <div className="col-12">
                        <div
                          className="content-sld"
                          style={{ textAlign: "start" }}
                        >
                          <p
                            className={`title-sld-2 font-2 fade-item fade-item-1 ${slide.titleClass || ""}`}
                          >
                            <span className="fst-italic">{slide.title}</span>
                            <br />
                            {slide.subtitle}
                          </p>
                          <div className="fade-item fade-item-2">
                            <Link
                              href="/shop-collection-list"
                              className={slide.buttonClass}
                            >
                              {slide.cta}
                              <i className="icon-arrow-left fs-24" />
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
          <div className="sw-dot-default style-white tf-sw-pagination spd33" />
        </Swiper>
      </div>
    </div>
  );
}
