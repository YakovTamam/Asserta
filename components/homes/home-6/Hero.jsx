"use client";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const slideImages = [
  { image: "/images/slider/slider-10.jpg", imageWidth: 2790, imageHeight: 1226, buttonClass: "tf-btn type-large style-white-2" },
  { image: "/images/slider/slider-12.jpg", imageWidth: 2790, imageHeight: 1226, buttonClass: "tf-btn type-large", titleClass: "text-main" },
  { image: "/images/slider/slider-11.jpg", imageWidth: 2790, imageHeight: 1226, buttonClass: "tf-btn type-large style-white-2" },
];

const slideTitles = ["slide1", "slide2", "slide3"];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <div className="tf-slideshow">
      <div className="container-full-2">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper sw-slide-show slider_effect_fade"
          loop
          autoplay={{ delay: 3000 }}
          modules={[Autoplay, EffectFade, Pagination]}
          pagination={{ clickable: true, el: ".spd33" }}
        >
          {slideImages.map((slide, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="slider_wrap">
                <div className="sld-image">
                  <Image src={slide.image} alt="" className="lazyload" width={slide.imageWidth} height={slide.imageHeight} />
                </div>
                <div className="sld-content">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="content-sld" style={{ textAlign: "start" }}>
                          <p className={`title-sld-2 font-2 fade-item fade-item-1 ${slide.titleClass || ""}`}>
                            <span className="fst-italic">{t(`${slideTitles[index]}_title`)}</span>
                            <br />
                            {t(`${slideTitles[index]}_title2`)}
                          </p>
                          <div className="fade-item fade-item-2">
                            <Link href="/shop-collection-list" className={slide.buttonClass}>
                              {t("cta")}
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
          <div className="sw-dot-default style-white tf-sw-pagination spd33" />
        </Swiper>
      </div>
    </div>
  );
}
