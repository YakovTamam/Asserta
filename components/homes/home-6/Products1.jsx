"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Products1() {
  const t = useTranslations();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((r) => r.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        // fallback: if no featured products, show all
        if (items.length === 0) {
          return fetch("/api/products")
            .then((r) => r.json())
            .then((all) => setProducts(Array.isArray(all) ? all : []));
        }
        setProducts(items);
      })
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="flat-spacing-9 px-xxl_15 pb-0">
      <div className="container">
        <div className="sect-top wow fadeInUp">
          <h2 className="s-title font-2 text-capitalize">
            {t("home.bestSellers")}
          </h2>
          <div className="group-btn-slider type-2">
            <div className="nav-next-swiper tf-sw-nav snbn35">
              <i className="icon-arrow-right" />
            </div>
            <div className="nav-prev-swiper tf-sw-nav snbp35">
              <i className="icon-arrow-left" />
            </div>
          </div>
        </div>
        <Swiper
          loop={products.length > 4}
          className="swiper tf-swiper wow fadeInUp"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: { slidesPerView: 2 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          spaceBetween={15}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true, el: ".spd35" }}
          navigation={{ nextEl: ".snbn35", prevEl: ".snbp35" }}
        >
          {products.map((item) => (
            <SwiperSlide className="swiper-slide" key={item.id}>
              <div className={`card_product--V01 type-space-35 ${item.outOfStock ? "out-of-stock" : ""}`}>
                <div className="card_product-wrapper">
                  <Link
                    href={`/product-default/${item.id}`}
                    className="product-img"
                  >
                    <Image
                      src={item.imgSrc}
                      alt={item.title}
                      className="lazyload img-product"
                      width={714}
                      height={900}
                      unoptimized
                    />
                    {item.hoverImgSrc && item.hoverImgSrc !== item.imgSrc && (
                      <Image
                        src={item.hoverImgSrc}
                        alt={item.title}
                        className="lazyload img-hover"
                        width={714}
                        height={900}
                        unoptimized
                      />
                    )}
                  </Link>

                  {!item.outOfStock && (
                    <ul className="list-product-btn">
                      <li className="wishlist">
                        <AddtoWishlist product={item} />
                      </li>
                      <li>
                        <AddtoCart product={item} />
                      </li>
                      <li>
                        <QuickView product={item} />
                      </li>
                      <li className="compare">
                        <AddtoCompare product={item} />
                      </li>
                    </ul>
                  )}

                  {item.badge && (
                    <div className="badge-box">
                      <span className="badge-item">{item.badge}</span>
                    </div>
                  )}
                </div>

                <div className="card_product-info">
                  <Link
                    href={`/product-default/${item.id}`}
                    className="name-product h5 fw-normal link text-line-clamp-2"
                    style={{ textAlign: "right" }}
                  >
                    {item.title}
                  </Link>
                  <div className="price-wrap">
                    {item.oldPrice && (
                      <span className="price-old fw-normal">
                        ₪{item.oldPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="price-new h5">
                      ₪{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination type-space-2 spd35" />
        </Swiper>
      </div>
    </section>
  );
}
