"use client";
import React, { useState } from "react";
import Slider1 from "./sliders/Slider1";
import ProgressBarComponent from "../common/Progressbar";

import Link from "next/link";
import BoughtTogther from "./BoughtTogther";

import { useContextElement } from "@/context/Context";
import QuantitySelect from "../common/QuantitySelect";
import AddtoWishlist from "../common/AddtoWishlist";
import AddtoCompare from "../common/AddtoCompare";
import SizePicker from "./SizeSelect";
import ColorSelect2 from "./ColorSelect2";
export default function Details15({ product }) {
  const [activeColor, setActiveColor] = useState("gold");
  const [quantity, setQuantity] = useState(1);
  const {
    addProductToCart,
    isAddedToCartProducts,

    cartProducts,
    updateQuantity,
  } = useContextElement();
  return (
    <section className="themesFlat">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  <Slider1
                    firstItem={product.imgSrc}
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap">
                <div className="tf-zoom-main sticky-top" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <ul className="product-info-rate rate-wrap">
                      <li>
                        <i className="icon-star" />
                      </li>
                      <li>
                        <i className="icon-star" />
                      </li>
                      <li>
                        <i className="icon-star" />
                      </li>
                      <li>
                        <i className="icon-star" />
                      </li>
                      <li>
                        <i className="icon-star" />
                      </li>
                    </ul>
                    <h3 className="product-info-name fw-normal">
                      {product.title}
                    </h3>
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
                          <i className="icon-tag"></i>
                          <span className="number-sale" data-person-sale="30">
                            30% OFF
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="product-infor-sub h6 fw-normal text-main-4">
                      This regulator has a rolled diaphragm and high flow rate
                      with reduced pressure drop.It has an excellent degree of
                      condensation.
                    </p>
                    <div className="product-info-progress-sale">
                      <h6 className="text-hurry-up fw-normal">
                        Only 4 items left
                      </h6>
                      <div className="progress-cart">
                        <ProgressBarComponent max={70} />
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-variant">
                    <div className="variant-picker-item variant-color">
                      <div className="variant-picker-label h6 fw-normal">
                        Material:
                        <span className="variant-picker-label-value value-currentColor d-none">
                          {activeColor}
                        </span>
                      </div>
                      <div className="variant-picker-values">
                        <ColorSelect2
                          activeColor={activeColor}
                          setActiveColor={setActiveColor}
                        />
                      </div>
                    </div>
                    <SizePicker />
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
                <BoughtTogther />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
