"use client";
import { useContextElement } from "@/context/Context";
import { products1 } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PairProducts() {
  const { setQuickViewItem } = useContextElement();
  return (
    <div className="tf-product-piw">
      <h4 className="title fw-normal text-uppercase">Pair It With</h4>
      <Swiper
        className="swiper tf-swiper"
        modules={[Pagination]}
        pagination={{ clickable: true, el: ".ppd" }}
      >
        {products1.slice(0, 3).map((product, i) => (
          <SwiperSlide key={i} className="swiper-slide">
            <div className="card_product_row--V01 hover-img">
              <div className="card_product-wrapper">
                <Link
                  href={`/product-default/${product.id}`}
                  className="product-img img-style"
                >
                  <Image alt="" src={product.imgSrc} width={714} height={900} />
                </Link>
                <div className="product-info">
                  <Link
                    href={`/product-default/${product.id}`}
                    className="prd-name h5 fw-normal link text-line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  <div className="price-wrap">
                    <span className="price-new h5">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="price-old fw-normal">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <a
                href="#quickView"
                data-bs-toggle="modal"
                onClick={() => setQuickViewItem(product)}
                className="tf-btn-icon style-circle hover-tooltip"
              >
                <i className="icon icon-view" />
                <span className="tooltip">Quick View</span>
              </a>
            </div>
          </SwiperSlide>
        ))}

        <div className="sw-dot-default tf-sw-pagination mt_20 ppd" />
      </Swiper>
    </div>
  );
}
