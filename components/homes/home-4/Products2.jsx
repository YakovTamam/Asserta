"use client";
import { videoProducts } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { useContextElement } from "@/context/Context";
export default function Products2() {
  const { setQuickViewItem } = useContextElement();
  return (
    <section className="flat-spacing pb-0">
      <div className="container">
        <h2 className="s-title text-center text-trans-none">Shop the Look</h2>
        <Swiper
          className="swiper tf-swiper"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd21",
          }}
        >
          {videoProducts.map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <div className="cls_videoV01">
                <video
                  className="hover-video"
                  width={486}
                  height={814}
                  muted
                  playsInline
                  loop
                  autoPlay
                >
                  <source src={product.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className="cls-content">
                  <div className="box-product">
                    <div className="img-product">
                      <Image
                        alt={product.imgSrc}
                        src={product.imgSrc}
                        width={714}
                        height={900}
                      />
                    </div>
                    <div className="info-product">
                      <Link
                        href={`/product-default/${product.id}`}
                        className="name h5 fw-normal link text-white text-line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      <div className="price-wrap style-white">
                        <span className="price-new h5">
                          $
                          {product.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <span className="price-old fw-normal">
                          $
                          {product.oldPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#quickView"
                    onClick={() => setQuickViewItem(product)}
                    data-bs-toggle="modal"
                    className="tf-btn-icon style-circle style-small hover-tooltip"
                  >
                    <i className="icon icon-view" />
                    <span className="tooltip">Quick view</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="sw-dot-default tf-sw-pagination spd21" />
        </Swiper>
      </div>
    </section>
  );
}
