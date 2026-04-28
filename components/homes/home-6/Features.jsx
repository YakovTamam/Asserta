"use client";
import { boxFeatures } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="themesFlat">
      <div className="container">
        <div className="line-bt py-20">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              575: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 48,
              },
            }}
            spaceBetween={15}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd31",
            }}
          >
            {boxFeatures.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div
                  className="box_icon--V02 style_2 border-0 wow fadeInLeft"
                  {...(item.delay && { "data-wow-delay": item.delay })}
                >
                  <span className="icon">
                    <i className={item.iconClass} />
                  </span>
                  <div className="content">
                    <h5 className="title">{item.title}</h5>
                    <p className="text">{item.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default tf-sw-pagination spd31" />
          </Swiper>
        </div>
      </div>
    </div>
  );
}
