"use client";
import { featureItems } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="flat-spacing-13 bg-earth-brown">
      <div className="container-7">
        <Swiper
          className="tf-swiper swiper"
          spaceBetween={15}
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
              spaceBetween: 80,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd24",
          }}
        >
          {featureItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="box_icon--V01 style_2 wow fadeInLeft"
                {...(item.delay && { "data-wow-delay": item.delay })}
              >
                <span className="icon">
                  <i className={item.iconClass} />
                </span>
                <div className="content">
                  <h4 className="title text-white">{item.title}</h4>
                  <p className="text text-white">{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default style-white tf-sw-pagination spd24" />
        </Swiper>
      </div>
    </div>
  );
}
