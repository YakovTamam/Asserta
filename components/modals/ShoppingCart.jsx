"use client";

import Link from "next/link";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import ProgressBarComponent from "../common/Progressbar";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ShoppingCart() {
  const t = useTranslations("cart");
  const [openTool, setOpenTool] = useState(-1);
  const {
    cartProducts,
    totalPrice,
    setCartProducts,

    updateQuantity,
  } = useContextElement();

  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  return (
    <div
      className="offcanvas offcanvas-end popup-shopping-cart"
      id="shoppingCart"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <h3 className="title fw-normal text-uppercase">{t("title")}</h3>
          <span
            className="icon-close link icon-close-popup"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="wrap list-file-delete">
          <div className="tf-mini-cart-threshold">
            <h6 className="text fw-normal text-uppercase">
              Spend <span className="fw-medium">$100</span> more to get
              <span className="fw-medium">Free Shipping</span>
            </h6>
            <div className="tf-progress-bar tf-progress-ship">
              <ProgressBarComponent max={75}>
                <i className="icon icon-delivery" />
              </ProgressBarComponent>
            </div>
            <div className="tf-number-count">
              <p className="text-uppercase">
                <span className="prd-count">{cartProducts.length}</span>{" "}
                {t("products")}
              </p>
              <a
                href="#"
                onClick={() => setCartProducts([])}
                className="tf-btn-line style-line-2 clear-file-delete"
              >
                <span className="text-caption">{t("emptyCart")}</span>
              </a>
            </div>
          </div>
          <div className="tf-mini-cart-wrap">
            <div className="tf-mini-cart-main">
              <div className="tf-mini-cart-sroll">
                <ul className="tf-mini-cart-items">
                  {!cartProducts.length ? (
                    <>
                      <div>{t("empty")}</div>
                      <Link href={`/shop-default`} className="tf-btn w-100 style-2">
                        <span className="fw-medium">{t("exploreProducts")}</span>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  {cartProducts.map((product, i) => (
                    <li key={i} className="tf-mini-cart-item file-delete">
                      <div className="tf-mini-cart-image">
                        <Image
                          alt=""
                          width={714}
                          height={900}
                          src={product.imgSrc}
                        />
                      </div>
                      <div className="tf-mini-cart-info">
                        <Link
                          href={`/product-default/${product.id}`}
                          className="prd-name link"
                        >
                          {product.title}
                        </Link>
                        <p className="type-select text-main-4">
                          Rose Gold / 50
                        </p>
                        <div className="prd-quantity">
                          <p className="text-caption">{t("qty")}</p>
                          <div className="wg-quantity style-2">
                            <button
                              className="btn-quantity minus-quantity"
                              onClick={() =>
                                updateQuantity(product.id, product.quantity - 1)
                              }
                            >
                              <i className="icon-minus" />
                            </button>
                            <input
                              className="quantity-product"
                              type="text"
                              name="number"
                              readOnly
                              value={product.quantity}
                            />
                            <button
                              className="btn-quantity plus-quantity"
                              onClick={() =>
                                updateQuantity(product.id, product.quantity + 1)
                              }
                            >
                              <i className="icon-plus" />
                            </button>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="tf-btn-line style-line-2 remove"
                          onClick={() => removeItem(product.id)}
                        >
                          <span className="text-caption">{t("remove")}</span>
                        </a>
                      </div>
                      <p className="tf-mini-card-price h6 fw-normal">
                        ${product.price.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tf-mini-cart-bottom">
              <div className="tf-mini-cart-tool">
                <div
                  className="tf-mini-cart-tool-btn btn-add-gift"
                  onClick={() => setOpenTool((pre) => (pre == 1 ? -1 : 1))}
                >
                  <i className="icon icon-box" />
                  <p className="text-caption">{t("addGiftWrap")}</p>
                </div>
                <div
                  className="tf-mini-cart-tool-btn btn-add-note"
                  onClick={() => setOpenTool((pre) => (pre == 2 ? -1 : 2))}
                >
                  <i className="icon icon-note" />
                  <p className="text-caption">{t("orderNote")}</p>
                </div>
                <div
                  className="tf-mini-cart-tool-btn btn-estimate-shipping"
                  onClick={() => setOpenTool((pre) => (pre == 3 ? -1 : 3))}
                >
                  <i className="icon icon-delivery-3" />
                  <p className="text-caption">{t("shipping")}</p>
                </div>
              </div>
              <div className="tf-mini-cart-bottom-wrap">
                <div className="tf-cart-totals-discounts">
                  <h6 className="tf-cart-total-text fw-normal text-uppercase">{t("total")}</h6>
                  <div className="tf-totals-total-value h6 fw-normal">
                    {totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="tf-mini-cart-view-checkout">
                  <Link href={`/shop-cart`} className="tf-btn w-100 style-2">
                    <span className="fw-medium">{t("goToCart")}</span>
                  </Link>
                  <Link
                    href={`/checkout`}
                    className="tf-btn btn-fill animate-btn w-100"
                  >
                    <span className="fw-medium">{t("checkout")}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`tf-mini-cart-tool-openable add-gift  ${
                openTool == 1 ? "open" : ""
              }`}
            >
              <div className="overlay tf-mini-cart-tool-close" />
              <form
                action="#"
                className="tf-mini-cart-tool-content"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="tf-mini-cart-tool-text h5 fw-normal text-uppercase">
                  Add gift wrap
                </div>
                <div className="tf-mini-cart-tool-text1">
                  The product will be wrapped carefully. Fee is only
                  <span className="text text-main">$10.00</span>. Do you want a
                  gift wrap?
                </div>
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn w-100 btn-fill animate-btn"
                    type="submit"
                  >
                    Add a Gift Wrap
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenTool(-1)}
                    className="tf-btn w-100 tf-mini-cart-tool-close"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`tf-mini-cart-tool-openable add-note   ${
                openTool == 2 ? "open" : ""
              }`}
            >
              <div className="overlay tf-mini-cart-tool-close" />
              <form
                action="#"
                onSubmit={(e) => e.preventDefault()}
                className="tf-mini-cart-tool-content style-border"
              >
                <label
                  htmlFor="Cart-note"
                  className="tf-mini-cart-tool-text h5 fw-normal text-uppercase"
                >
                  Order note
                </label>
                <textarea
                  name="note"
                  id="Cart-note"
                  placeholder="Instruction for seller..."
                  className="d-flex"
                  defaultValue={""}
                />
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn w-100 btn-fill animate-btn"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenTool(-1)}
                    className="tf-btn w-100 tf-mini-cart-tool-close"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`tf-mini-cart-tool-openable estimate-shipping   ${
                openTool == 3 ? "open" : ""
              }`}
            >
              <div className="overlay tf-mini-cart-tool-close" />
              <form
                id="shipping-form"
                onSubmit={(e) => e.preventDefault()}
                className="tf-mini-cart-tool-content style-border"
              >
                <div className="tf-mini-cart-tool-text h5 fw-normal text-uppercase">
                  Shipping estimates
                </div>
                <div className="field">
                  <p className="text-sm">Country</p>
                  <div className="tf-select">
                    <select
                      className="w-100"
                      id="shipping-country-form"
                      name="address[country]"
                      data-default=""
                    >
                      <option
                        value="Australia"
                        data-provinces='[["Australian Capital Territory","Australian Capital Territory"],["New South Wales","New South Wales"],["Northern Territory","Northern Territory"],["Queensland","Queensland"],["South Australia","South Australia"],["Tasmania","Tasmania"],["Victoria","Victoria"],["Western Australia","Western Australia"]]'
                      >
                        Australia
                      </option>
                      <option value="Austria" data-provinces="[]">
                        Austria
                      </option>
                      <option value="Belgium" data-provinces="[]">
                        Belgium
                      </option>
                      <option
                        value="Canada"
                        data-provinces='[["Ontario","Ontario"],["Quebec","Quebec"]]'
                      >
                        Canada
                      </option>
                      <option value="Czech Republic" data-provinces="[]">
                        Czechia
                      </option>
                      <option value="Denmark" data-provinces="[]">
                        Denmark
                      </option>
                      <option value="Finland" data-provinces="[]">
                        Finland
                      </option>
                      <option value="France" data-provinces="[]">
                        France
                      </option>
                      <option value="Germany" data-provinces="[]">
                        Germany
                      </option>
                      <option
                        value="United States"
                        data-provinces='[["Alabama","Alabama"],["California","California"],["Florida","Florida"]]'
                      >
                        United States
                      </option>
                      <option
                        value="United Kingdom"
                        data-provinces='[["England","England"],["Scotland","Scotland"],["Wales","Wales"],["Northern Ireland","Northern Ireland"]]'
                      >
                        United Kingdom
                      </option>
                      <option value="India" data-provinces="[]">
                        India
                      </option>
                      <option value="Japan" data-provinces="[]">
                        Japan
                      </option>
                      <option value="Mexico" data-provinces="[]">
                        Mexico
                      </option>
                      <option value="South Korea" data-provinces="[]">
                        South Korea
                      </option>
                      <option value="Spain" data-provinces="[]">
                        Spain
                      </option>
                      <option value="Italy" data-provinces="[]">
                        Italy
                      </option>
                      <option
                        value="Vietnam"
                        data-provinces='[["Ha Noi","Ha Noi"],["Da Nang","Da Nang"],["Ho Chi Minh","Ho Chi Minh"]]'
                      >
                        Vietnam
                      </option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <p className="text-sm">State/Province</p>
                  <div className="tf-select">
                    <select
                      id="shipping-province-form"
                      name="address[province]"
                      data-default=""
                    />
                  </div>
                </div>
                <div className="field">
                  <p className="text-sm">Zipcode</p>
                  <input
                    type="number"
                    data-opend-focus=""
                    placeholder={41000}
                    id="zipcode"
                    name="address[zip]"
                    defaultValue=""
                  />
                </div>
                <div
                  id="zipcode-message"
                  className="error"
                  style={{ display: "none" }}
                >
                  We found one shipping rate available for undefined.
                </div>
                <div
                  id="zipcode-success"
                  className="success"
                  style={{ display: "none" }}
                >
                  <p>We found one shipping rate available for your address:</p>
                  <p className="standard">
                    Standard at <span>$0.00</span> USD
                  </p>
                </div>
                <div className="tf-cart-tool-btns">
                  <button
                    className="tf-btn w-100 btn-fill animate-btn"
                    type="submit"
                    onClick={() => setOpenTool(-1)}
                  >
                    Estimate
                  </button>
                  <div className="tf-mini-cart-tool-primary tf-btn btn-out-line-dark2 w-100 tf-mini-cart-tool-close">
                    Close
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
