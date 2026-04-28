"use client";

import React, { useEffect, useRef } from "react";
import CountdownTimer from "../common/Countdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { products5 } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
export default function ProductsModal() {
  const modalElement = useRef();
  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap"); // dynamically import bootstrap
      const myModal = new bootstrap.Modal(
        document.getElementById("autoProduct"),
        {
          keyboard: false,
        }
      );

      // Show the modal after a delay using a promise
      await new Promise((resolve) => setTimeout(resolve, 2000));
      myModal.show();

      modalElement.current?.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    };

    showModal();
  }, []);
  return (
    <div
      className="modal modalCentered fade auto-popup modal-auto-product"
      id="autoProduct"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span className="icon-close-popup" data-bs-dismiss="modal">
            <i className="icon-close" />
          </span>
          <div className="modal-body">
            <h3 className="title fw-normal text-uppercase text-center">
              flash sale will ends in:
            </h3>
            <div className="countdown-V03">
              <div
                className="js-countdown cd-custom"
                data-timer={596}
                data-labels="DAY,Hours,Mins,Secs"
              >
                <CountdownTimer style={7} />
              </div>
            </div>
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
                  spaceBetween: 20,
                },
              }}
              spaceBetween={15}
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
                        className="name-product link text-line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      <div className="price-wrap">
                        <span className={`price-new`}>
                          $
                          {product.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        {product.oldPrice && (
                          <span className="price-old text-caption">
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
    </div>
  );
}
