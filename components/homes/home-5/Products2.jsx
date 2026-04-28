"use client";
import { products10 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
import { Navigation, Pagination } from "swiper/modules";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
export default function Products2() {
  return (
    <section className="flat-spacing-12">
      <div className="container">
        <div className="sect-top align-items-end wow fadeInUp">
          <h2 className="s-title font-2 text-capitalize">
            <span className="fst-italic">Flash</span> Sale
          </h2>
          <div className="countdown-V05">
            <div className="js-countdown cd-custom">
              <CountdownTimer style={2} />
            </div>
          </div>
        </div>
        <div className="tf-btn-swiper-item wow fadeInUp">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 1 },
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
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: ".spd27",
            }}
            navigation={{
              prevEl: ".snbp27",
              nextEl: ".snbn27",
            }}
          >
            {products10.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div
                  className={`card_product--V01 type-space-35 ${
                    product.outOfStock ? "out-of-stock" : ""
                  }`}
                >
                  <div className="card_product-wrapper">
                    <Link
                      href={`/${
                        product.outOfStock
                          ? "product-notify-avaiable"
                          : "product-default"
                      }/${product.id}`}
                      className="product-img"
                    >
                      <Image
                        src={product.imgSrc}
                        alt="Image Product"
                        className="lazyload img-product"
                        width={714}
                        height={900}
                      />
                      <Image
                        src={product.hoverImgSrc}
                        alt="Image Product"
                        className="lazyload img-hover"
                        width={714}
                        height={900}
                      />
                    </Link>

                    {!product.outOfStock && (
                      <ul className="list-product-btn">
                        <li className="wishlist">
                          <AddtoWishlist product={product} />
                        </li>
                        <li>
                          <AddtoCart product={product} />
                        </li>
                        <li>
                          <QuickView product={product} />
                        </li>
                        <li className="compare">
                          <AddtoCompare product={product} />
                        </li>
                      </ul>
                    )}

                    {product.badge && (
                      <div className="badge-box">
                        <span className={`badge-item ${product.badgeType}`}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {product.outOfStock && (
                      <a
                        href="#unavailable"
                        data-bs-toggle="modal"
                        className="variant-box stock bg-main link text-white"
                      >
                        <p className="text-center d-none d-md-block">
                          Notify Me When Available
                        </p>
                        <p className="text-center d-md-none">Notify Me</p>
                      </a>
                    )}
                  </div>

                  <div className="card_product-info">
                    <ul className="rate-wrap">
                      {[...Array(5)].map((_, i) => (
                        <li key={i}>
                          <i className="icon-star" />
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${
                        product.outOfStock
                          ? "product-notify-avaiable"
                          : "product-default"
                      }/${product.id}`}
                      className="name-product h5 fw-normal link text-line-clamp-2"
                    >
                      {product.title}
                    </Link>
                    <div className="price-wrap">
                      <span
                        className={`price-new h5 ${product.textColor || ""}`}
                      >
                        $
                        {product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      {product.oldPrice && (
                        <span className="price-old fw-normal">
                          $
                          {product.oldPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="sw-dot-default tf-sw-pagination spd27" />
          </Swiper>
          <div className="nav-swiper style-2 nav-prev-swiper d-none d-xxl-flex snbp27">
            <i className="icon-arrow-left" />
          </div>
          <div className="nav-swiper style-2 nav-next-swiper d-none d-xxl-flex snbn27">
            <i className="icon-arrow-right" />
          </div>
        </div>
      </div>
    </section>
  );
}
