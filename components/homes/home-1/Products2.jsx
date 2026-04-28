"use client";

import { products2 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function Products2() {
  return (
    <section>
      <div className="banner_V07">
        <div className="bn-image-text">
          <div className="image">
            <Image
              src="/images/banner/banner-10.jpg"
              alt=""
              className="lazyload"
              width={1920}
              height={1564}
            />
          </div>
          <div className="content wow fadeInUp">
            <h6 className="caption fw-normal">NEW IN</h6>
            <p className="title text-hero-2 font-2">
              Radiate Elegance, <br />
              <span className="fst-italic">Wear Confidence</span>
            </p>
            <Link
              href={`/shop-collection-list`}
              className="tf-btn btn-fill-2 type-large animate-btn text-uppercase"
            >
              Shop Collection
              <i className="icon-arrow-right-2 fs-24" />
            </Link>
          </div>
        </div>
        <div className="wrap">
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd1",
            }}
            className="tf-swiper swiper wow fadeInUp"
          >
            {products2.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div className="card_product--V03">
                  <div className="card_product-wrapper">
                    <Image
                      src={product.imgSrc}
                      alt=""
                      className="lazyload"
                      width={806}
                      height={1036}
                    />
                  </div>
                  <div className="card_product-info">
                    <div className="infor">
                      <div className="info-product">
                        <Link
                          href={`/product-default/${product.id}`}
                          className="name h5 fw-normal link text-line-clamp-2"
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
                        </div>
                      </div>
                    </div>
                    <div className="btn-action">
                      <a
                        href="#quickView"
                        data-bs-toggle="modal"
                        className="tf-btn-icon style-circle hover-tooltip"
                      >
                        <i className="icon icon-view" />
                        <span className="tooltip">Quick View</span>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default style-white tf-sw-pagination d-lg-none spd1" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
