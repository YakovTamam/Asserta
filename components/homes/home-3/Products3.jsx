"use client";
import { products7 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
import { Navigation, Pagination } from "swiper/modules";
export default function Products3() {
  return (
    <section className="flat-spacing-3 tf-pag-swiper">
      <div className="container">
        <div className="sect-top center text-center wow fadeInUp">
          <h2 className="s-title font-2 text-capitalize">
            <span className="fst-italic">Trendy</span> Collection
          </h2>
          <p className="s-sub-title">
            Discover the pieces our customers adore – from timeless everyday
            jewelry to bold statement designs that shine. These are the
            <br className="d-none d-xl-block" />
            tried-and-true favorites you’ll want in your collection."
          </p>
        </div>
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="box_image--V01 style-3 hover-img4">
              <div className="image img-style4">
                <Image
                  src="/images/collections/slide-1.jpg"
                  alt=""
                  className="lazyloaded"
                  width={714}
                  height={1086}
                />
              </div>
              <div className="content">
                <h5 className="box-text fw-medium">
                  <span>Flash Sale</span>
                  <span className="br-line bg-main w-22 d-block" />
                  <span>30% OFF</span>
                </h5>
                <div className="box-btn">
                  <Link
                    href={`/shop-default`}
                    className="tf-btn-line text-caption-2 fw-normal"
                  >
                    SHOP NOW
                    <i className="icon-arrow-top-right-2 fs-10" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="tf-btn-swiper-item pst-2">
              <Swiper
                dir="ltr"
                className="swiper tf-swiper"
                breakpoints={{
                  0: { slidesPerView: 2 },
                  575: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                spaceBetween={20}
                modules={[Navigation, Pagination]}
                pagination={{
                  clickable: true,
                  el: ".spd17",
                }}
                navigation={{
                  prevEl: ".snbp17",
                  nextEl: ".snbn17",
                }}
              >
                {products7.map((product) => (
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
              </Swiper>
              <div className="nav-swiper style-2 nav-prev-swiper d-none d-lg-flex snbp17">
                <i className="icon-arrow-left" />
              </div>
              <div className="nav-swiper style-2 nav-next-swiper d-none d-lg-flex snbn17">
                <i className="icon-arrow-right" />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="sw-dot-default tf-sw-pagination spd17" />
          </div>
        </div>
      </div>
    </section>
  );
}
