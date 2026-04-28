"use client";
import { collectionItems } from "@/data/categories";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Categories() {
  return (
    <div className="flat-spacing-5">
      <div className="container-6">
        <Swiper
          className="swiper tf-swiper"
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".sw-dot-default",
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
        >
          {collectionItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="box_collection--V01 style_2 hover-img">
                <Link href={`/shop-default`} className="image img-style">
                  <Image
                    src={item.src}
                    alt={item.label}
                    className="lazyload"
                    width={800}
                    height={800}
                  />
                </Link>
                <Link href={`/shop-default`} className="name-cls link">
                  <span className="h5 fw-normal text-uppercase">
                    {item.label}
                  </span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default d-flex d-xl-none tf-sw-pagination" />
        </Swiper>
      </div>
    </div>
  );
}
