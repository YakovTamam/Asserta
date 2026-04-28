"use client";
import { iconItems } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features({
  parentClass = "flat-spacing-8 bg-dark-tan",
  styleWhite = true,
  iconColorClass = "",
}) {
  return (
    <div className={parentClass}>
      <div className="container">
        <Swiper
          className="tf-swiper swiper sw-iconbox"
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
            el: ".spdf1",
          }}
        >
          {iconItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`box_icon--V01 ${styleWhite ? "style-white" : ""} `}
              >
                <span className={`icon ${iconColorClass}`}>
                  <i className={item.iconClass} />
                </span>
                <div className="content">
                  <h4 className="title">{item.title}</h4>
                  <p className="text">{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div
            className={`sw-dot-default ${
              styleWhite ? "style-white" : ""
            }  tf-sw-pagination spdf1`}
          />
        </Swiper>
      </div>
    </div>
  );
}
