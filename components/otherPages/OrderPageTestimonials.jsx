"use client";

import { testimonialsV05 } from "@/data/testimonials";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function OrderPageTestimonials() {
  return (
    <Swiper
      dir="ltr"
      modules={[Pagination]}
      pagination={{
        clickable: true,
        el: ".spd41",
      }}
      className="swiper tf-swiper"
    >
      {testimonialsV05.map((item, index) => (
        <SwiperSlide className="swiper-slide" key={index}>
          <div className="box_testimonial--V05">
            <span className="icon">
              <i className="icon-quote-4" />
            </span>
            <h5 className="tes-title">{item.title}</h5>
            <h6 className="tes-text">{item.text}</h6>
            <p className="tes-author">{item.author}</p>
          </div>
        </SwiperSlide>
      ))}
      <div className="sw-dot-default type-small tf-sw-pagination type-space-3 spd41" />
    </Swiper>
  );
}
