"use client";
import React, { useState } from "react";

import Link from "next/link";

import ColorSelect from "./ColorSelect";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../common/QuantitySelect";
import AddtoWishlist from "../common/AddtoWishlist";
import AddtoCompare from "../common/AddtoCompare";
import SizePicker from "./SizeSelect";

import Image from "next/image";
import PairProducts from "./PairProducts";
import Slider3 from "./sliders/Slider3";
import ProgressBarComponent from "../common/Progressbar";
import DescriptionSideAccordion from "./DescriptionSideAccordion";
export default function Details5({ product }) {
  const [activeColor, setActiveColor] = useState("gold");
  const [quantity, setQuantity] = useState(1);
  const {
    addProductToCart,
    isAddedToCartProducts,

    cartProducts,
    updateQuantity,
  } = useContextElement();
  return (
    <section className="flat-spacing-3 pt-xl-0">
      <div className="container-full">
        <div className="tf-main-product-grid section-image-zoom tf-product-info-list">
          <div className="main-grid-a">
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
          <div className="main-grid-b">
            <div className="breadcrumbs">
              <ul className="bread-wrap mb-0">
                <li>
                  <Link href={`/`} className="text-main-4 link">
                    Home
                  </Link>
                </li>
                <li className="br-line w-12 bg-main" />
                <li>
                  <p>Earrings</p>
                </li>
              </ul>
            </div>
            <div className="main-product-info left sticky-top">
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
                    <p className="badges-on-sale">
                      <i className="icon-tag" />
                      <span className="number-sale" data-person-sale={30}>
                        30% OFF
                      </span>
                    </p>
                  </div>
                </div>
                <h6 className="product-infor-sub text-main-4 fw-normal">
                  This regulator has a rolled diaphragm and high flow rate with
                  reduced pressure drop.It has an excellent degree of
                  condensation.
                </h6>
              </div>
              <DescriptionSideAccordion />
              <PairProducts />
            </div>
          </div>
          <div className="main-grid-c">
            <div className="main-product-info right sticky-top">
              <div className="tf-zoom-main sticky-top" />
              <div className="product-info-progress-sale">
                <h6 className="text-hurry-up fw-normal">Only 4 items left</h6>
                <div className="progress-cart">
                  <ProgressBarComponent max={70} />
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
                <SizePicker hasSizePicker />
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
              <ul className="tf-product-info-delivery">
                <li>
                  <i className="icon icon-box" />
                  <h6 className="fw-normal">Free shipping on order $200+</h6>
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
              <div className="tf-product-payment-method">
                <p className="text-guarantee text-caption">
                  <i className="icon icon-shield" />
                  Guarantee Safe <br />
                  Checkout
                </p>
                <ul className="paymend-method-list">
                  <li>
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/payment/visa-2.svg"
                        width={45}
                        height={32}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/payment/dinner-2.svg"
                        width={45}
                        height={32}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/payment/master-3.svg"
                        width={45}
                        height={32}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/payment/stripe.svg"
                        width={45}
                        height={32}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/payment/paypal.svg"
                        width={45}
                        height={32}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/payment/gg-pay-2.svg"
                        width={45}
                        height={32}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        alt=""
                        src="/images/payment/apple-pay-2.svg"
                        width={45}
                        height={32}
                      />
                    </a>
                  </li>
                </ul>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
