"use client";
import { collections2 } from "@/data/collections";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function Collections() {
  return (
    <div className="flat-spacing-12 pb-0">
      <div className="container-full-2">
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
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={10}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd29",
          }}
        >
          {collections2.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link
                href={`/shop-collection-list`}
                className="wg-cls hover-img wow fadeInUp"
                {...(item.delay ? { "data-wow-delay": item.delay } : {})}
              >
                <div className="image img-style">
                  <Image
                    src={item.image}
                    alt=""
                    className="lazyload"
                    width={915}
                    height={1250}
                  />
                </div>
                <h3 className="name link">
                  {item.title}{" "}
                  <span className="count text-caption">
                    {String(item.count).padStart(2, "0")}
                  </span>
                </h3>
              </Link>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd29" />
        </Swiper>
      </div>
    </div>
  );
}
