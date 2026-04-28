"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import Image from "next/image";
import Link from "next/link";
export default function Testimonials() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const thumbsData = [
    {
      imgMain: "/images/testimonial/tes-4.jpg",
      imgProduct: "/images/products/product-53.jpg",
      name: "Crystal Birthstone Eternity Circle Charm",
      price: "$2,499.00",
    },
    {
      imgMain: "/images/testimonial/tes-5.jpg",
      imgProduct: "/images/products/product-52.jpg",
      name: "Twisted Gold Statement Pearl Ring",
      price: "$3,199.00",
    },
  ];

  const testimonials = [
    {
      title: "RECOMMEND!",
      text: "“The quality of the clothes exceeded my expectations. Every piece feels premium, and the designs are so trendy. I'm obsessed with my new wardrobe additions!”",
      avatar: "/images/avatar/avt-1.jpg",
      author: "patrick john",
    },
    {
      title: "LOVE IT!",
      text: "“I was blown away by the quality of these clothes. Every item feels luxurious and the styles are incredibly modern. I can’t get enough of my new fashion finds!”",
      avatar: "/images/avatar/avt-2.jpg",
      author: "Emily Tran",
    },
  ];

  return (
    <section className="flat-spacing-3">
      <div className="tf-sw-thumbs tes_thumb-V02 wow fadeInUp">
        <div className="container">
          <div className="row">
            {/* Thumbnail slider */}
            <div className="col-xl-5 col-md-6">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={1}
                watchSlidesProgress
                className="swiper sw-thumb mb-md-0"
                modules={[Thumbs]}
              >
                {thumbsData.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="card_product--V03 style_2 hover-img">
                      <div className="card_product-wrapper img-style">
                        <Image
                          src={item.imgMain}
                          alt=""
                          width={1230}
                          height={1366}
                        />
                      </div>
                      <div className="card_product-info">
                        <div className="infor">
                          <Link href={`/shop-default`} className="img-prd">
                            <Image
                              src={item.imgProduct}
                              alt=""
                              width={714}
                              height={900}
                            />
                          </Link>
                          <div className="info-product">
                            <a
                              href="/"
                              className="name h5 fw-normal link text-line-clamp-2"
                            >
                              {item.name}
                            </a>
                            <div className="price-wrap">
                              <span className="price-new h5">{item.price}</span>
                            </div>
                          </div>
                        </div>
                        <a href="#" className="tf-btn btn-def text-main link">
                          <i className="icon_2 icon-arrow-right-2" />
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Main testimonial slider */}
            <div className="col-xl-7 col-md-6 align-items-center d-flex">
              <Swiper
                modules={[Thumbs, Pagination]}
                pagination={{
                  clickable: true,
                  el: ".stpb",
                }}
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={10}
                slidesPerView={1}
                className="swiper sw-main-thumb"
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="box_testimonial--V03">
                      <div className="icon">
                        <svg
                          width={63}
                          height={64}
                          viewBox="0 0 63 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M46.9854 39.4871H62.5V10.4199H33.9026V39.7565L51.7302 54.9673V51.0175L46.5347 40.2037L46.1905 39.4871H46.9854Z"
                            stroke="#1C1C1C"
                          />
                          <path
                            d="M11.168 39.4873H23.6611V16.0918H0.648682V39.7566L14.9243 51.9358V48.9588L10.7173 40.2039L10.373 39.4873H11.168Z"
                            stroke="#1C1C1C"
                          />
                        </svg>
                      </div>
                      <h2 className="title">{item.title}</h2>
                      <p className="text h4">{item.text}</p>
                      <span className="br-line" />
                      <div className="tes-author">
                        <div className="avatar">
                          <Image
                            alt=""
                            src={item.avatar}
                            width={100}
                            height={100}
                          />
                        </div>
                        <a href="#" className="fw-medium text-uppercase link">
                          {item.author}
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="sw-dot-default sw-pg-thumb stpb"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
