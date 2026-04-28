"use client";
import { products4 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoQuickAdd from "@/components/common/AddtoQuickAdd";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
import DiscountMarquee from "@/components/common/DiscountMarquee";
import { Navigation, Pagination } from "swiper/modules";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
export default function Products1() {
  return (
    <section className="flat-spacing-6 bg-dark-brown">
      <div className="container">
        <div className="sect-top center text-center wow fadeInUp">
          <h2 className="s-title font-2 text-white">
            SHOP OUR BEST <span className="fst-italic">SELLERS</span>
          </h2>
          <p className="s-sub-title text-white">
            Discover the pieces our customers adore – from timeless everyday
            jewelry to bold statement designs that shine. These are the
            <br className="d-none d-xl-block" />
            tried-and-true favorites you’ll want in your collection."
          </p>
        </div>
        <div className="tf-btn-swiper-item wow fadeInUp">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
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
              el: ".spd9",
            }}
            navigation={{
              prevEl: ".snbp9",
              nextEl: ".snbn9",
            }}
          >
            {products4.map((product) => (
              <SwiperSlide className={`swiper-slide`} key={product.id}>
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
                          <AddtoQuickAdd product={product} />
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

                    {product.variantType === "text" && (
                      <div className="variant-box">
                        <p className="size-box text-center text-caption">
                          {product.variantText}
                        </p>
                      </div>
                    )}

                    {product.variantType === "countdown" && (
                      <div className="variant-box count-down">
                        <div className="countdown-V02">
                          <div className="js-countdown">
                            <CountdownTimer style={5} />
                          </div>
                        </div>
                      </div>
                    )}

                    {product.variantType === "marquee" && (
                      <div className="variant-box bg-primary">
                        <div
                          className="infiniteslide_wrap"
                          style={{ overflow: "hidden" }}
                        >
                          <DiscountMarquee />
                        </div>
                      </div>
                    )}

                    {product.variantType === "notify" && product.outOfStock && (
                      <a
                        href="#unavailable"
                        data-bs-toggle="modal"
                        className="variant-box stock bg-main link text-white"
                      >
                        <p className="text-center d-none d-md-block">
                          {product.variantText}
                        </p>
                        <p className="text-center d-md-none">Notify Me</p>
                      </a>
                    )}
                  </div>

                  <div className="card_product-info">
                    <Link
                      href={`/${
                        product.outOfStock
                          ? "product-notify-avaiable"
                          : "product-default"
                      }/${product.id}`}
                      className={`name-product h5 fw-normal text-white link text-line-clamp-2`}
                    >
                      {product.title}
                    </Link>
                    <div className="price-wrap style-white">
                      <span className={`price-new h5 ${product.textColor}`}>
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

            <div className="sw-dot-default tf-sw-pagination style-white d-xl-none spd9" />
          </Swiper>
          <div className="nav-swiper nav-prev-swiper d-none d-xl-flex snbp9">
            <i className="icon-arrow-left" />
          </div>
          <div className="nav-swiper nav-next-swiper d-none d-xl-flex snbn9">
            <i className="icon-arrow-right" />
          </div>
        </div>
      </div>
    </section>
  );
}
