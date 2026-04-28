"use client";
import { testimonials } from "@/data/testimonials";
import Image from "next/image";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CartTestimonials() {
  return (
    <div className="tes-slider tf-btn-swiper-item">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper"
        data-space-lg={30}
        data-space-md={20}
        data-space={15}
        spaceBetween={15}
        breakpoints={{
          768: {
            spaceBetween: 20,
          },
          1200: { spaceBetween: 30 },
        }}
        modules={[Navigation]}
        navigation={{
          prevEl: ".snbp40",
          nextEl: ".snbn40",
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="box_testimonial--V04">
              <div className="tes-top">
                <i className="icon icon-quote-3 text-primary" />
                <ul className="rate-wrap">
                  {[...Array(5)].map((_, i) => (
                    <li key={i}>
                      <i className="icon-star" />
                    </li>
                  ))}
                </ul>
              </div>
              <p className="tes-text">{item.text}</p>
              <div className="tes-author">
                <div className="author-avt">
                  <Image alt="" src={item.avatar} width={100} height={100} />
                </div>
                <span className="author-name fw-medium">{item.author}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="group-btn-slider">
          <i className="tf-sw-nav icon-arrow-left nav-prev-swiper snbp40" />
          <i className="tf-sw-nav icon-arrow-right nav-next-swiper snbn40" />
        </div>
      </Swiper>
    </div>
  );
}
