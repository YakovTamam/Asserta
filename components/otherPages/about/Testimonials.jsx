"use client";
import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Testimonials() {
  const [swiperThumb, setSwiperThumb] = useState(null);
  const thumbImages = [
    {
      src: "/images/testimonial/tes-3.jpg",
      width: 1564,
      height: 642,
    },
    {
      src: "/images/testimonial/tes-6.jpg",
      width: 782,
      height: 321,
    },
  ];

  const testimonials = [
    {
      text: `“I bought a diamond bracelet for my wife’s birthday, and she absolutely loves it. The quality and sparkle are exceptional. Thank you, Vemus, for making this moment special!”`,
      name: "John Smith",
      duty: "Fashion Blogger",
    },
    {
      text: `“I got a diamond bracelet for my wife’s birthday, and she was over the moon! The brilliance are truly outstanding. Huge thanks to Vemus for helping me make her day unforgettable!”`,
      name: "Mas Shin",
      duty: "Design Blogger",
    },
  ];

  return (
    <div className="flat-spacing-5 bg-linear">
      <div className="container">
        <div className="tf-sw-thumbs tes_thumb">
          {/* Thumbnail Slider */}
          <Swiper
            modules={[Thumbs]}
            onSwiper={setSwiperThumb}
            className="swiper sw-thumb sw-tes-thumb"
          >
            {thumbImages.map((image, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="image">
                  <Image
                    src={image.src}
                    alt=""
                    className="lazyload"
                    width={image.width}
                    height={image.height}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Testimonial Content Slider */}
          <Swiper
            modules={[Thumbs, Navigation]}
            thumbs={{ swiper: swiperThumb }}
            className="swiper sw-main-thumb sw-tes"
            navigation={{
              prevEl: ".snbp44",
              nextEl: ".snbn44",
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <h3 className="tes-text">{item.text}</h3>
                <div className="tes-author">
                  <h5 className="name">{item.name}</h5>
                  <p className="duty">{item.duty}</p>
                </div>
              </SwiperSlide>
            ))}

            <div className="sw-group-pagination">
              <div className="pagination-tes prev-thumb snbp44">
                <i className="icon-arrow-left" />
              </div>
              <div className="pagination-tes next-thumb snbn44">
                <i className="icon-arrow-right" />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
