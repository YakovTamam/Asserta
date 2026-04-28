"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
const promoItems = [
  {
    image: "/images/collections/promo-1.jpg",
    width: 333,
    height: 210,
    title: "Timeless Classics",
    description: (
      <>
        Elegant designs that never go out of style, perfect for
        <br className="d-none d-xxl-block" />
        every occasion.
      </>
    ),
  },
  {
    image: "/images/collections/promo-2.jpg",
    width: 333,
    height: 210,
    title: "Modern Luxe",
    description: "Chic and contemporary pieces for the trendsetters of today",
  },
  {
    image: "/images/collections/promo-3.jpg",
    width: 333,
    height: 210,
    title: "Special Moments",
    description: (
      <>
        Exquisite jewelry to celebrate love, commitment, and
        <br className="d-none d-xxl-block" />
        life’s milestones.
      </>
    ),
  },
];

export default function Collections() {
  return (
    <div className="flat-spacing-3 pb-0">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd19",
          }}
        >
          {promoItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="promo-circle hover-img">
                <div className="image img-style">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="lazyload"
                    width={item.width}
                    height={item.height}
                  />
                </div>
                <h3 className="title">
                  <Link
                    href={`/shop-collection-list`}
                    className="text-primary-3"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="sub-title font-4 letter-space-0">
                  {item.description}
                </p>
                <Link
                  href={`/shop-collection-list`}
                  className="tf-btn type-large border-0 fw-medium"
                >
                  Shop Now
                  <i className="icon icon-arrow-top-right-2" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd19" />
        </Swiper>
      </div>
    </div>
  );
}
