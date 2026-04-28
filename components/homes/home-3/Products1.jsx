"use client";
import { products6 } from "@/data/products";
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
    <section className="flat-spacing bg-light-peach-2">
      <div className="container">
        <div className="sect-top wow fadeInUp">
          <h2 className="s-title font-2 text-capitalize">
            <span className="fst-italic">Fresh Finds,</span> just In
          </h2>
          <div className="group-btn-slider ">
            <div className="nav-prev-swiper tf-sw-nav snbp15 ">
              <i className="icon-arrow-left" />
            </div>
            <div className="nav-next-swiper tf-sw-nav snbn15 ">
              <i className="icon-arrow-right" />
            </div>
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={15}
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
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd15",
          }}
          navigation={{
            prevEl: ".snbp15",
            nextEl: ".snbn15",
          }}
        >
          {products6.map((product) => (
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
                        <DiscountMarquee parentClass="marquee-sale type-2 infiniteSlide infiniteSlider" />
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
                    className="name-product h5 fw-normal link text-line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  <div className="price-wrap">
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

          <div className="sw-dot-default tf-sw-pagination d-xl-none spd15" />
        </Swiper>
      </div>
    </section>
  );
}
