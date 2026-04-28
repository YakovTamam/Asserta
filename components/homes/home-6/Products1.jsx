"use client";
import { products11 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
import DiscountMarquee from "@/components/common/DiscountMarquee";
import { Navigation, Pagination } from "swiper/modules";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
export default function Products1() {
  return (
    <section className="flat-spacing-9 px-xxl_15 pb-0">
      <div className="container">
        <div className="sect-top wow fadeInUp">
          <h2 className="s-title font-2 text-capitalize">
            Best <span className="fst-italic">Sellers</span>
          </h2>
          <div className="group-btn-slider type-2 ">
            <div className="nav-prev-swiper tf-sw-nav snbp35">
              <i className="icon-arrow-left" />
            </div>
            <div className="nav-next-swiper tf-sw-nav snbn35">
              <i className="icon-arrow-right" />
            </div>
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd35",
          }}
          navigation={{
            prevEl: ".snbp35",
            nextEl: ".snbn35",
          }}
        >
          {products11.map((item) => (
            <SwiperSlide className="swiper-slide" key={item.id}>
              <div
                className={`card_product--V01 type-space-35 ${
                  item.outOfStock ? "out-of-stock" : ""
                }`}
              >
                <div className="card_product-wrapper">
                  <Link
                    href={`/${
                      item.outOfStock
                        ? "product-notify-avaiable"
                        : "product-default"
                    }/${item.id}`}
                    className="product-img"
                  >
                    <Image
                      src={item.imgSrc}
                      alt="Image Product"
                      className="lazyload img-product"
                      width={714}
                      height={900}
                    />
                    <Image
                      src={item.hoverImgSrc}
                      alt="Image Product"
                      className="lazyload img-hover"
                      width={714}
                      height={900}
                    />
                  </Link>

                  {!item.outOfStock && (
                    <ul className="list-product-btn">
                      <li className="wishlist">
                        <AddtoWishlist product={item} />
                      </li>
                      <li>
                        <AddtoCart product={item} />
                      </li>
                      <li>
                        <QuickView product={item} />
                      </li>
                      <li className="compare">
                        <AddtoCompare product={item} />
                      </li>
                    </ul>
                  )}

                  {item.badge && (
                    <div className="badge-box">
                      <span className={`badge-item ${item.badgeType}`}>
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {item.variantType === "text" && (
                    <div className="variant-box">
                      <p className="size-box text-center text-caption">
                        {item.variantText}
                      </p>
                    </div>
                  )}

                  {item.variantType === "countdown" && (
                    <div className="variant-box count-down">
                      <div className="countdown-V02">
                        <div className="js-countdown">
                          <CountdownTimer style={5} />
                        </div>
                      </div>
                    </div>
                  )}

                  {item.variantType === "marquee" && (
                    <div className="variant-box bg-primary-2">
                      <DiscountMarquee parentClass="marquee-sale infiniteSlide infiniteSlider" />
                    </div>
                  )}

                  {item.variantType === "notify" && (
                    <a
                      href="#unavailable"
                      data-bs-toggle="modal"
                      className="variant-box stock bg-main link text-white"
                    >
                      <p className="text-center d-none d-md-block">
                        {item.variantText}
                      </p>
                      <p className="text-center d-md-none">Notify Me</p>
                    </a>
                  )}
                </div>

                <div className="card_product-info">
                  <Link
                    href={`/${
                      item.outOfStock
                        ? "product-notify-avaiable"
                        : "product-default"
                    }/${item.id}`}
                    className="name-product h5 fw-normal link text-line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <div className="price-wrap">
                    <span className={`price-new h5 ${item.textColor || ""}`}>
                      ${item.price.toFixed(2)}
                    </span>
                    {item.oldPrice && (
                      <span className="price-old fw-normal">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination type-space-2 spd35" />
        </Swiper>
      </div>
    </section>
  );
}
