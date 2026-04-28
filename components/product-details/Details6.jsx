"use client";
import React, { useState } from "react";

import Link from "next/link";

import ColorSelect from "./ColorSelect";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../common/QuantitySelect";
import AddtoWishlist from "../common/AddtoWishlist";
import AddtoCompare from "../common/AddtoCompare";

import Image from "next/image";
import PairProducts from "./PairProducts";
import Slider3 from "./sliders/Slider3";
import ProgressBarComponent from "../common/Progressbar";
import PaymentOptions from "./PaymentOptions";
export default function Details6({ product }) {
  const [activeColor, setActiveColor] = useState("gold");
  const [quantity, setQuantity] = useState(1);
  const {
    addProductToCart,
    isAddedToCartProducts,

    cartProducts,
    updateQuantity,
  } = useContextElement();
  return (
    <section className="flat-spacing-3 pt-lg-0">
      <div className="tf-main-product-2 section-image-zoom">
        <div className="container-layout-left ps-lg-0">
          <div className="row">
            <div className="col-lg-7 col-xxl-8">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  <div className="flat-wrap-media-product">
                    <Slider3
                      firstItem={product.imgSrc}
                      activeColor={activeColor}
                      setActiveColor={setActiveColor}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-xxl-4">
              <div className="tf-product-info-wrap">
                <div className="tf-zoom-main sticky-top" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="breadcrumbs">
                    <ul className="bread-wrap mb-0">
                      <li>
                        <Link href={`/`} className="text-main-4 link">
                          Home
                        </Link>
                      </li>
                      <li className="br-line w-12 bg-main" />
                      <li>
                        <p>Shop</p>
                      </li>
                    </ul>
                  </div>

                  <div className="tf-product-info-heading">
                    <h4 className="product-info-name text-uppercase">
                      {product.title}
                    </h4>
                    <div className="product-info-price">
                      <div className="price-wrap">
                        <span className="price-new price-on-sale h4">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="price-old compare-at-price fw-normal h6">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="product-infor-sub">
                      <p className="text-sub text-main-4">
                        Pay in 4 interest-free installments with
                        <Image
                          alt=""
                          src="/images/payment/shop-pay-2.svg"
                          width={83}
                          height={20}
                        />
                      </p>
                      <Link
                        href={`/shipping`}
                        className="tf-btn-line style-line-2"
                      >
                        <span className="text-body"> Learn more </span>
                      </Link>
                    </div>
                  </div>
                  <div className="tf-product-info-variant">
                    <div className="variant-picker-item variant-color">
                      <div className="variant-picker-label h6 fw-normal">
                        Material:
                        <span className="variant-picker-label-value value-currentColor">
                          {activeColor}
                        </span>
                      </div>
                      <div className="variant-picker-values">
                        <ColorSelect
                          activeColor={activeColor}
                          setActiveColor={setActiveColor}
                        />
                      </div>
                    </div>

                    <div className="variant-picker-item">
                      <div className="variant-picker-label h6 fw-normal">
                        Quantity
                      </div>
                      <div className="variant-picker-values">
                        <QuantitySelect
                          quantity={
                            isAddedToCartProducts(product.id)
                              ? cartProducts.filter(
                                  (elm) => elm.id == product.id
                                )[0].quantity
                              : quantity
                          }
                          setQuantity={(qty) => {
                            if (isAddedToCartProducts(product.id)) {
                              updateQuantity(product.id, qty);
                            } else {
                              setQuantity(qty);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="product-info-progress-sale">
                    <p className="text-hurry-up type-dot-2 fw-normal">
                      In Stock and ready to ship
                    </p>
                    <div className="progress-cart">
                      <ProgressBarComponent max={70} />
                    </div>
                  </div>

                  <div className="tf-product-total-quantity">
                    <div className="group-btn">
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        onClick={() => addProductToCart(product.id, quantity)}
                        className="tf-btn btn-fill-2 text-uppercase fw-medium animate-btn"
                      >
                        {isAddedToCartProducts(product.id)
                          ? "already added"
                          : "add to bag"}
                        <i className="icon-minus d-none d-sm-block" />
                        <span className="price-add d-none d-sm-block">
                          {(product.price * quantity).toFixed(2)}
                        </span>
                      </a>
                      <div className="group-btn-action">
                        <AddtoWishlist
                          additionalClass="tf-btn-icon btn-add-wishlist"
                          product={product}
                          tooltipDirection="top"
                        />

                        <AddtoCompare
                          tooltipDirection="top"
                          product={product}
                          additionalClass="tf-btn-icon"
                        />
                      </div>
                    </div>
                    <Link
                      href={`/checkout`}
                      className="tf-btn w-100 text-uppercase fw-medium"
                    >
                      buy it now
                    </Link>
                  </div>
                  <div className="tf-product-more-infor">
                    <PaymentOptions />
                    <div className="tf-product-pickup-store">
                      <ul className="store-pickup-list">
                        <li className="store-pickup-item">
                          <span className="dot" />
                          <div className="store-info">
                            <p className="address-avaiable h6 fw-normal">
                              Pickup available at{" "}
                              <a
                                href="https://www.google.com/maps?q=345+Geogre+st"
                                target="_blank"
                                className="h6 link"
                              >
                                345 Geogre st
                              </a>
                            </p>
                            <p className="address-ready text-caption text-main-4">
                              Usually ready in 24 hours
                            </p>
                            <a
                              href="#pickUp"
                              data-bs-toggle="offcanvas"
                              className="tf-btn-line style-line-2"
                            >
                              <span className="text-caption fw-normal">
                                View store information
                              </span>
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <span className="br-line" />
                    <div className="tf-product-info-extra-link">
                      <a
                        href="#productDes"
                        data-bs-toggle="offcanvas"
                        className="product-extra-icon link text-caption"
                      >
                        <i className="icon icon-description fs-14" />
                        DESCRIPTION
                      </a>
                      <a
                        href="#delivery"
                        data-bs-toggle="offcanvas"
                        className="product-extra-icon link text-caption"
                      >
                        <i className="icon icon-delivery-2 fs-20" />
                        SHIPPING
                      </a>
                      <a
                        href="#askQuestion"
                        data-bs-toggle="offcanvas"
                        className="product-extra-icon link text-caption"
                      >
                        <i className="icon icon-ask fs-18" />
                        ASK A QUESTION
                      </a>
                    </div>
                    <div className="tf-product-share">
                      <ul className="tf-social-icon">
                        <li>
                          <a href="#" className="social-facebook">
                            <span className="icon">
                              <i className="icon-facebook" />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="social-instagram">
                            <span className="icon">
                              <i className="icon-instagram" />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="social-x">
                            <span className="icon">
                              <i className="icon-x" />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="social-snapchat">
                            <span className="icon">
                              <i className="icon-snapchat" />
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <ul className="tf-product-info-delivery">
                      <li>
                        <i className="icon icon-box" />
                        <h6 className="fw-normal">
                          Free shipping on order $200+
                        </h6>
                      </li>
                      <li>
                        <i className="icon icon-return" />
                        <h6 className="fw-normal">Free 30-day returns</h6>
                      </li>
                      <li>
                        <i className="icon icon-credit-card" />
                        <h6 className="fw-normal">Interest monthly accepted</h6>
                      </li>
                      <li>
                        <i className="icon icon-gift" />
                        <h6 className="fw-normal">Gift packaging available</h6>
                      </li>
                    </ul>
                  </div>
                </div>
                <PairProducts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
