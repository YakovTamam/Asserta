"use client";
import { products5 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
import { Navigation, Pagination } from "swiper/modules";
export default function Products2() {
  return (
    <section className="flat-spacing-6 pt-0">
      <div className="container">
        <div className="sect-top center text-center wow fadeInUp">
          <h2 className="s-title font-2">
            <span className="fst-italic">Trendy</span> COLLECTION
          </h2>
          <p className="s-sub-title">
            Discover the pieces our customers love most – from everyday
            essentials to statement styles that stand out. These are the
            <br className="d-none d-xl-block" />
            tried-and-true picks you’ll want in your wardrobe."
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
              el: ".spd10",
            }}
            navigation={{
              prevEl: ".snbp10",
              nextEl: ".snbn10",
            }}
          >
            {products5.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div className="card_product--V01 type-space-35">
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

                    {product.badge && (
                      <div className="badge-box">
                        <span className={`badge-item ${product.badgeType}`}>
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card_product-info">
                    <Link
                      href={`/product-default/${product.id}`}
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
            <div className="sw-dot-default tf-sw-pagination d-xl-none spd10" />
          </Swiper>
          <div className="nav-swiper style-2 nav-prev-swiper d-xl-flex d-none snbp10">
            <i className="icon-arrow-left" />
          </div>
          <div className="nav-swiper style-2 nav-next-swiper d-xl-flex d-none snbn10">
            <i className="icon-arrow-right" />
          </div>
        </div>
      </div>
    </section>
  );
}
