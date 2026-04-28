"use client";

import { products1 } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

export default function BeforeLeave() {
  const modalElement = useRef();
  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap"); // dynamically import bootstrap
      const myModal = new bootstrap.Modal(
        document.getElementById("beforeYouLeave"),
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
      className="modal modalCentered fade auto-popup modal-before-leave"
      id="beforeYouLeave"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="image-coupon flex-shrink-xl-0">
              <div className="image">
                <Image
                  alt="Image"
                  src="/images/banner/banner-you-leave.jpg"
                  width={1120}
                  height={1120}
                />
              </div>
              <div className="wrap text-center">
                <p className="title text-lg fw-medium text-white">
                  WAIT! BEFORE YOU LEAVE...
                </p>
                <p className="sub-title text-white">
                  Take 20% off on first order when checkout.
                </p>
                <div className="d-flex justify-content-center">
                  <div className="coupon-copy-wrap">
                    <p className="coupon-code fw-medium">GET20OFF</p>
                    <i className="icon icon-clip-board" />
                  </div>
                </div>
                <Link
                  href={`/shop-default`}
                  className="tf-btn btn-fill animate-btn w-100"
                >
                  <span className="fw-medium">CONTINUE SHOPPING</span>
                </Link>
              </div>
            </div>
            <div className="content">
              <span className="icon-close-popup" data-bs-dismiss="modal">
                <i className="icon-close" />
              </span>
              <h4 className="title fw-normal text-uppercase">
                recommended products
              </h4>
              <div className="tf-mini-cart-main wrapper-leave-main">
                <div className="tf-mini-cart-sroll wrapper-leave-scroll p-0">
                  {products1.map((product, i) => (
                    <div key={i} className="tf-product-mini-view">
                      <Link
                        href={`/product-default/${product.id}`}
                        className="prd-image"
                      >
                        <Image
                          alt=""
                          src={product.imgSrc}
                          width={714}
                          height={900}
                        />
                      </Link>
                      <div className="prd-content">
                        <Link
                          href={`/product-default/${product.id}`}
                          className="prd-name link"
                        >
                          {product.title}
                        </Link>
                        <div className="price-wrap">
                          <span className="price-new price-on-sale fw-medium">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.oldPrice && (
                            <span className="price-old compare-at-price text-caption">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
