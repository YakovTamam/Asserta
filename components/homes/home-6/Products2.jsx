"use client";
import { products12 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
import { Pagination } from "swiper/modules";
export default function Products2() {
  return (
    <section>
      <div className="container-full-3 pe-0">
        <div className="sect-top">
          <h2 className="s-title font-2 text-capitalize wow fadeInUp">
            <span className="fst-italic">Fresh Finds,</span> just In
          </h2>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1.5 },
            575: {
              slidesPerView: 1.7,
            },
            768: {
              slidesPerView: 2.7,
            },
            1200: {
              slidesPerView: 3.68,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd36",
          }}
        >
          {products12.map((product, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="card_product--V01 type-space-30">
                <div className="card_product-wrapper aspect-ratio-1">
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
                    <span
                      className={`price-new ${
                        product.oldPrice ? "text-secondary" : ""
                      } h5`}
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
          <div className="sw-dot-default tf-sw-pagination d-xl-none spd36" />
        </Swiper>
      </div>
    </section>
  );
}
