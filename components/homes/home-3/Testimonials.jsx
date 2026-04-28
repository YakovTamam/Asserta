"use client";
import { testimonials } from "@/data/testimonials";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
export default function Testimonials() {
  return (
    <section className="flat-spacing bg-dark-brown">
      <div className="container">
        <div className="sect-top wow fadeInUp">
          <h2 className="s-title font-2 text-center text-white text-capitalize">
            Customer <span className="fst-italic">Reviews</span>
          </h2>
          <div className="group-btn-slider style-white ">
            <div className="nav-prev-swiper tf-sw-nav snbp18">
              <i className="icon-arrow-left" />
            </div>
            <div className="nav-next-swiper tf-sw-nav snbn18">
              <i className="icon-arrow-right" />
            </div>
          </div>
        </div>
        <Swiper
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd18",
          }}
          navigation={{
            prevEl: ".snbp18",
            nextEl: ".snbn18",
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="box_testimonial--V01 hover-img">
                <a href="#" className="box_testimonial-image img-style">
                  <Image
                    src={item.image}
                    alt=""
                    className="lazyload"
                    width={562}
                    height={678}
                  />
                </a>
                <div className="box_testimonial-content">
                  <ul className="rate-wrap">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <i
                          className={`icon-star ${
                            i < item.rating ? "text-star" : ""
                          }`}
                        />
                      </li>
                    ))}
                  </ul>
                  <h4 className="title">{item.title}</h4>
                  <p className="text">{item.text}</p>
                  <span className="br-line" />
                  <div className="tes-bottom">
                    <div className="author-avatar">
                      <Image
                        src={item.avatar}
                        alt=""
                        className="lazyload"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="author-info">
                      <div className="wrap-name">
                        <p className="name">{item.name}</p>
                        <p className="verify">
                          {/* Verified badge SVG */}
                          <svg
                            width={11}
                            height={11}
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g>
                              <path
                                d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z"
                                fill="#48B02C"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.30268 8.96231L10.2357 4.02924C10.306 3.95923 10.4011 3.91992 10.5003 3.91992C10.5995 3.91992 10.6946 3.95923 10.7649 4.02924L11.2444 4.50877C11.3144 4.57902 11.3537 4.67416 11.3537 4.77334C11.3537 4.87251 11.3144 4.96765 11.2444 5.0379L6.30583 9.97097C6.23582 10.0393 6.14186 10.0776 6.04402 10.0776C5.94618 10.0776 5.85222 10.0393 5.78221 9.97097L5.30268 9.49145C5.23267 9.42119 5.19336 9.32606 5.19336 9.22688C5.19336 9.1277 5.23267 9.03256 5.30268 8.96231Z"
                                fill="white"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.76447 5.95293L6.7684 8.96238C6.83841 9.03263 6.87772 9.12776 6.87772 9.22694C6.87772 9.32612 6.83841 9.42126 6.7684 9.49151L6.29439 9.96553C6.22413 10.0355 6.129 10.0748 6.02982 10.0748C5.93064 10.0748 5.8355 10.0355 5.76525 9.96553L2.7558 6.96159C2.68579 6.89134 2.64648 6.7962 2.64648 6.69702C2.64648 6.59784 2.68579 6.50271 2.7558 6.43246L3.23533 5.95844C3.30558 5.88843 3.40072 5.84912 3.4999 5.84912C3.59908 5.84912 3.69421 5.88292 3.76447 5.95293Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                          Verified
                        </p>
                      </div>
                      <div className="wrap-item">
                        <p className="text text-caption">Item purchased:</p>
                        <Link href={`/shop-default`} className="tf-btn-line">
                          {item.purchasedItem}
                          <i className="icon icon-arrow-top-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default style-white tf-sw-pagination spd18" />
        </Swiper>
      </div>
    </section>
  );
}
