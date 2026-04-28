"use client";
import { products14 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import AddtoWishlist from "../common/AddtoWishlist";
import AddtoCart from "../common/AddtoCart";
import QuickView from "../common/QuickView";
import AddtoCompare from "../common/AddtoCompare";
import { Navigation, Pagination } from "swiper/modules";
export default function RelatedProducts() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="sect-top wow fadeInUp">
          <h3 className="s-title">YOU MAY ALSO LIKE</h3>
          <div className="group-btn-slider">
            <div className="nav-prev-swiper tf-sw-nav snbp42">
              <i className="icon-arrow-left" />
            </div>
            <div className="nav-next-swiper tf-sw-nav snbn42">
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
            el: ".spd42",
          }}
          navigation={{
            prevEl: ".snbp42",
            nextEl: ".snbn42",
          }}
        >
          {products14.map((product, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="card_product--V01">
                <div className="card_product-wrapper">
                  <Link
                    href={`/product-default/${product.id}`}
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
                </div>
                <div className="card_product-info">
                  <Link
                    href={`/product-default/${product.id}`}
                    className="name-product h5 fw-normal link text-line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  <div className="price-wrap">
                    <span className="price-new h5">
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

          <div className="sw-dot-default tf-sw-pagination d-xl-none spd42" />
        </Swiper>
      </div>
    </section>
  );
}
