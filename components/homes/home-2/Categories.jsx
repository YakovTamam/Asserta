"use client";
import { categories } from "@/data/categories";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function Categories() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="sect-top center text-center wow fadeInUp">
          <h2 className="s-title font-2">
            <span className="fst-italic">Our</span> Categories
          </h2>
          <p className="s-sub-title">
            Explore our collection of sophisticated, modern designs that make a
            statement without saying a word.
            <br className="d-none d-xl-block" />
            Find your signature look today.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper max-width_1 wow fadeInUp"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 64,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd4",
          }}
        >
          {categories.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link
                href={`/shop-collection-list`}
                className="box_collection--V01 style_2 hover-img"
              >
                <div className="image img-style">
                  <Image
                    src={item.image}
                    alt={item.label}
                    className="ls-is-cached lazyloaded"
                    width={item.width}
                    height={item.height}
                  />
                </div>
                <h5 className="name-cls link fw-normal">{item.label}</h5>
              </Link>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd4" />
        </Swiper>
      </div>
    </section>
  );
}
