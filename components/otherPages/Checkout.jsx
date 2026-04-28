"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
export default function Checkout() {
  const { cartProducts, totalPrice } = useContextElement();

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="s-checkout flex-xl-nowrap">
          <div className="left-col">
            <div className="s-wrap">
              <form
                className="form-checkout-cart-main style-border"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="box-ip-checkout">
                  <h4 className="checkout-title">DELIVERY</h4>
                  <div className="form-content-2">
                    <div className="cols tf-grid-layout sm-col-2">
                      <fieldset className="tf-field-2">
                        <input
                          className="tf-input"
                          type="text"
                          defaultValue="Vincent"
                          placeholder=""
                        />
                        <label className="tf-lable">First name</label>
                      </fieldset>
                      <fieldset className="tf-field-2">
                        <input
                          className="tf-input"
                          type="text"
                          placeholder=""
                        />
                        <label className="tf-lable">Last name</label>
                      </fieldset>
                    </div>
                    <fieldset className="tf-field-2">
                      <input className="tf-input" type="text" placeholder="" />
                      <label className="tf-lable">Country</label>
                    </fieldset>
                    <fieldset className="tf-field-2">
                      <input className="tf-input" type="text" placeholder="" />
                      <label className="tf-lable">Address</label>
                    </fieldset>
                    <fieldset className="tf-field-2">
                      <input className="tf-input" type="text" placeholder="" />
                      <label className="tf-lable">
                        Apartment, suite, etc (optional)
                      </label>
                    </fieldset>
                    <div className="cols tf-grid-layout sm-col-2 md-col-3">
                      <fieldset className="tf-field-2">
                        <input
                          className="tf-input"
                          type="text"
                          placeholder=""
                        />
                        <label className="tf-lable">City</label>
                      </fieldset>
                      <fieldset className="tf-field-2">
                        {/* <input class="tf-input" type="text" placeholder="">
                                          <label class="tf-lable">State</label> */}
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
                      </fieldset>
                      <fieldset className="tf-field-2">
                        <input
                          className="tf-input"
                          type="text"
                          data-opend-focus=""
                          placeholder=""
                          id="zipcode"
                          name="address[zip]"
                          defaultValue=""
                        />
                        <label className="tf-lable">Zipcode/Postal</label>
                      </fieldset>
                    </div>
                    <fieldset className="tf-field-2">
                      <input
                        className="tf-input"
                        type="number"
                        placeholder=""
                      />
                      <label className="tf-lable">Phone</label>
                    </fieldset>
                  </div>
                </div>
                <div className="box-ip-contact">
                  <h4 className="checkout-title">
                    CONTACT INFORMATION
                    <a
                      href="#log"
                      data-bs-toggle="modal"
                      className="tf-btn-line"
                    >
                      Log in
                    </a>
                  </h4>
                  <fieldset className="tf-field-2">
                    <input className="tf-input" type="text" placeholder="" />
                    <label className="tf-lable">Email or phone number</label>
                  </fieldset>
                </div>
                <div className="box-ip-shipping">
                  <h4 className="checkout-title">
                    SHIPPING METHOD
                    <a
                      href="#log"
                      data-bs-toggle="modal"
                      className="tf-btn-line"
                    >
                      Log in
                    </a>
                  </h4>
                  <div className="form-content-2">
                    <label htmlFor="freeship" className="check-ship">
                      <input
                        type="radio"
                        id="freeship"
                        className="tf-check-rounded"
                        name="checkshipping"
                      />
                      <span className="text">
                        <span>
                          Free Shipping (Estimate in 7/10 - 10/10/2025)
                        </span>
                        <span className="price">$00.00</span>
                      </span>
                    </label>
                    <label htmlFor="express-ship" className="check-ship">
                      <input
                        type="radio"
                        id="express-ship"
                        className="tf-check-rounded"
                        name="checkshipping"
                      />
                      <span className="text">
                        <span>
                          Express Shipping (Estimate in 4/10 - 5/10/2025)
                        </span>
                        <span className="price">$10.00</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="box-ip-payment">
                  <h4 className="checkout-title mb_12">PAYMENT</h4>
                  <p className="sub-title text-main-4">
                    All transactions are secure and encrypted.
                  </p>
                  <fieldset className="payment-item mb_12">
                    <label htmlFor="bank-transfer" className="check-payment">
                      <input
                        type="checkbox"
                        id="bank-transfer"
                        className="tf-check-rounded"
                        name="bank-transfer"
                      />
                      <span className="text-payment">Direct bank transfer</span>
                    </label>
                  </fieldset>
                  <p className="mb_15 text-main-4">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account.
                  </p>
                  <div className="payment-method-box" id="payment-method-box">
                    <div className="payment-item">
                      <label
                        htmlFor="delivery"
                        className="check-payment collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#delivery-payment"
                        aria-controls="delivery-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="delivery"
                        />
                        <span className="pay-title">Cash on delivery</span>
                      </label>
                      <div
                        id="delivery-payment"
                        className="collapse"
                        data-bs-parent="#payment-method-box"
                      />
                    </div>
                    <div className="payment-item">
                      <label
                        htmlFor="credit-card"
                        className="check-payment"
                        data-bs-toggle="collapse"
                        data-bs-target="#credit-card-payment"
                        aria-controls="credit-card-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="credit-card"
                          defaultChecked=""
                        />
                        <span className="pay-title">Credit card</span>
                      </label>
                      <div
                        id="credit-card-payment"
                        className="collapse show"
                        data-bs-parent="#payment-method-box"
                      >
                        <div className="payment-body form-content-2">
                          <fieldset className="tf-field-2 ip-card">
                            <input
                              className="tf-input"
                              type="text"
                              placeholder=""
                            />
                            <label className="tf-lable">Card number</label>
                            <Image
                              className="card-logo"
                              width={41}
                              height={12}
                              alt="card"
                              src="/images/payment/visa-3.svg"
                            />
                          </fieldset>
                          <div className="cols tf-grid-layout sm-col-2">
                            <fieldset className="tf-field-2">
                              <input
                                className="tf-input"
                                type="text"
                                placeholder=""
                              />
                              <label className="tf-lable">
                                Expiration date (MM/YY)
                              </label>
                            </fieldset>
                            <fieldset className="tf-field-2">
                              <input
                                className="tf-input"
                                type="text"
                                placeholder=""
                              />
                              <label className="tf-lable">Sercurity code</label>
                            </fieldset>
                          </div>
                          <fieldset className="tf-field-2">
                            <input
                              className="tf-input"
                              type="text"
                              placeholder=""
                            />
                            <label className="tf-lable">Name on card</label>
                          </fieldset>
                          <div className="checkbox-wrap">
                            <input
                              id="this-address"
                              type="checkbox"
                              className="tf-check style-4 p-0"
                              required
                            />
                            <label htmlFor="this-address">
                              Use shipping address as billing address
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="payment-item">
                      <label
                        htmlFor="paypal"
                        className="check-payment collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#paypal-payment"
                        aria-controls="paypal-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="paypal"
                        />
                        <span className="pay-title">
                          PayPal
                          <Image
                            className="card-logo"
                            width={78}
                            height={20}
                            alt="apple"
                            src="/images/payment/paypal-2.svg"
                          />
                        </span>
                      </label>
                      <div
                        id="paypal-payment"
                        className="collapse"
                        data-bs-parent="#payment-method-box"
                      />
                    </div>
                  </div>
                  <p className="text-main-4">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <Link
                      href={`/privacy`}
                      className="fw-medium text-decoration-underline link"
                    >
                      privacy policy.
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="right-col sticky-top">
            <div className="tf-page-cart-sidebar">
              <h4 className="checkout-title">YOUR CART</h4>
              {!cartProducts.length ? (
                <>
                  <div>Your Cart is Empty</div>
                  <Link href={`/shop-default`} className="tf-btn w-100 style-2">
                    <span className="fw-medium"> Explore Products </span>
                  </Link>
                </>
              ) : (
                <ul className="list-order-product">
                  {cartProducts.map((product, i) => (
                    <li key={i} className="order-item">
                      <div className="content">
                        <div className="img-product">
                          <Image
                            alt=""
                            className="prd"
                            src={product.imgSrc}
                            width={714}
                            height={900}
                          />
                          <span className="text-caption quantity">
                            {" "}
                            {product.quantity}
                          </span>
                        </div>
                        <div className="info">
                          <p className="name">{product.title}</p>
                          <span className="variant">Rose Gold / 50</span>
                        </div>
                      </div>
                      <h6 className="price">
                        {" "}
                        ${(product.price * product.quantity).toFixed(2)}
                      </h6>
                    </li>
                  ))}
                </ul>
              )}
              <span className="br-line" />
              <ul className="list-total">
                <li className="total-item">
                  <span>SUBTOTAL:</span>
                  <span>${totalPrice.toFixed(2)} USD</span>
                </li>
                <li className="total-item">
                  <span>DISCOUNT:</span>
                  <span>-$48.00 USD</span>
                </li>
                <li className="total-item">
                  <span>SHIPPING:</span>
                  <span>$10.00 USD</span>
                </li>
                <li className="total-item">
                  <span>TAXES:</span>
                  <span>$48.00 USD</span>
                </li>
              </ul>
              <span className="br-line" />
              <h4 className="last-total d-flex justify-content-between">
                <span>SUBTOTAL:</span>
                <span className="total-price-order">
                  ${totalPrice.toFixed(2)} USD
                </span>
              </h4>
              <Link
                href={`/thank-you`}
                className="tf-btn btn-fill fw-medium animate-btn w-100"
              >
                Place order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
