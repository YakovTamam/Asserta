"use client";

import { products13 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef } from "react";
import { useContextElement } from "@/context/Context";
export default function Lookbook() {
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperButtons = document.querySelectorAll(".swiper-button");
    const cards = document.querySelectorAll(
      ".tf-swiper .card_product--V01.style_2"
    );

    const handleMouseEnter = (e) => {
      const slideIndex = parseInt(
        e.currentTarget.getAttribute("data-slide"),
        10
      );
      if (!isNaN(slideIndex)) {
        cards.forEach((card) => card.classList.remove("active"));
        if (cards[slideIndex]) {
          cards[slideIndex].classList.add("active");
        }
      }
    };

    const handleMouseLeave = () => {
      cards.forEach((card) => card.classList.remove("active"));
    };

    swiperButtons.forEach((button) => {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup on unmount
    return () => {
      swiperButtons.forEach((button) => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);
  return (
    <section className="flat-spacing-3 px-xxl_15">
      <div className="container">
        <div className="banner_lookbook">
          <div className="image-left">
            <div className="image">
              <Image
                src="/images/banner/banner-14.jpg"
                alt=""
                className="lazyload"
                width={1420}
                height={1484}
              />
            </div>
            <a
              href="#prd-lb"
              onMouseOver={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(0);
                }
              }}
              className="lookbook-item position1 swiper-button"
              data-slide={0}
            >
              <div className="dropup-center dropup">
                <div className="tf-pin-btn">
                  <span />
                </div>
              </div>
            </a>
            <a
              href="#prd-lb"
              className="lookbook-item position2 swiper-button"
              data-slide={1}
              onMouseOver={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(1);
                }
              }}
            >
              <div className="dropup-center dropup">
                <div className="tf-pin-btn">
                  <span />
                </div>
              </div>
            </a>
          </div>
          <div className="product-right wow fadeInUp" id="prd-lb">
            <h2 className="s-title font-2 text-capitalize">
              Shop The <span className="fst-italic">Look</span>
            </h2>
            <Swiper
              dir="ltr"
              className="swiper tf-swiper sw-look"
              spaceBetween={10}
              breakpoints={{
                0: { slidesPerView: 1 },
                575: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                1200: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination]}
              pagination={{
                clickable: true,
                el: ".spd34",
              }}
            >
              {products13.map((product, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="card_product--V01 style_2">
                    <div className="card_product-wrapper">
                      <a href="#" className="product-img">
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
                      </a>
                      <ul className="list-product-btn">
                        <li className="wishlist">
                          <AddtoWishlist product={product} />
                        </li>
                        <li>
                          <QuickView product={product} />
                        </li>
                        <li className="compare">
                          <AddtoCompare product={product} />
                        </li>
                      </ul>
                      {product.oldPrice && (
                        <div className="badge-box">
                          <span className="badge-item sale">30% OFF</span>
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
                        <span className="price-new h5 text-secondary">
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
                      <ul className="rate-wrap">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <li key={i}>
                            <i className="icon-star" />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card_product-btn">
                      <a
                        href="#shoppingCart"
                        onClick={() => {
                          if (product.id) {
                            addProductToCart(product.id);
                          }
                        }}
                        data-bs-toggle="offcanvas"
                        className="tf-btn hover-primary fw-medium w-100"
                      >
                        {isAddedToCartProducts(product.id)
                          ? "Already Added"
                          : "Add to Cart"}
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-dot-default tf-sw-pagination spd34" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
