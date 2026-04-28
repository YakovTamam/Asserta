"use client";
import { collectionItems } from "@/data/collections";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
export default function Collections() {
  return (
    <section className="flat-spacing-4 pt-0">
      <div className="container">
        <h3 className="s-title">shop our collections</h3>
      </div>
      <div className="slider-layout-right">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          breakpoints={{
            0: { slidesPerView: 1.5 },
            575: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4.5,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
        >
          {collectionItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Link href={`/shop-collection-list`} className="wg-cls hover-img">
                <div className="image img-style">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="ls-is-cached lazyloaded"
                    width={714}
                    height={900}
                  />
                </div>
                <p className={`name link text-lg ${item.titleClass || ""}`}>
                  {item.title}{" "}
                  <span className="count text-body">{item.count}</span>
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
