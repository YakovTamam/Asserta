"use client";

import { products1 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
export default function Products1() {
  return (
    <section className="flat-spacing-3 bg-main-2 overflow-hidden">
      <div className="container-layout-right-4">
        <div className="slide_wrap">
          <div className="title-left">
            <h2 className="title text-white font-2 fw-normal text-end">
              <span className="fst-italic">Fresh Finds</span>, Just In
            </h2>
          </div>
          <div className="wrap">
            <Swiper
              className="swiper tf-swiper"
              spaceBetween={10}
              slidesPerView={3.39}
              breakpoints={{
                0: { slidesPerView: 1.4 },
                575: {
                  slidesPerView: 2.2,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1200: {
                  slidesPerView: 3.513,
                },
              }}
            >
              {products1.map((product) => (
                <SwiperSlide className="swiper-slide" key={product.id}>
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
                        className="name-product h5 text-white fw-normal link text-line-clamp-2"
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
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
