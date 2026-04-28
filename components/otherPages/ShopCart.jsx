"use client";
import React from "react";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import CartTestimonials from "./CartTestimonials";
export default function ShopCart() {
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
    <section className="flat-spacing s-shop-cart each-list-prd">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="left mb-xl-0">
              <div className="table-shop-cart table-order-detail">
                {!cartProducts.length ? (
                  <>
                    <div>Your Cart is Empty</div>
                    <Link
                      href={`/shop-default`}
                      className="tf-btn w-100 style-2"
                    >
                      <span className="fw-medium"> Explore Products </span>
                    </Link>
                  </>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th className="order_product h6 fw-normal">Product</th>
                        <th className="order_price h6 fw-normal">price</th>
                        <th className="order_quantity h6 fw-normal">
                          quantity
                        </th>
                        <th className="order_subtotal h6 fw-normal">
                          subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((product, i) => (
                        <tr key={i} className="file-delete order_item each-prd">
                          <td>
                            <div className="order_product">
                              <a href="#" className="image">
                                <Image
                                  alt=""
                                  src={product.imgSrc}
                                  width={714}
                                  height={900}
                                />
                              </a>
                              <div className="infor">
                                <Link
                                  href={`/product-default/${product.id}`}
                                  className="prd-name h6 fw-normal link"
                                >
                                  {product.title}
                                </Link>
                                <p className="prd-type">Rose Gold / 50</p>
                              </div>
                            </div>
                          </td>
                          <td className="order_price each-price">
                            {" "}
                            ${product.price.toFixed(2)}
                          </td>
                          <td>
                            <div className="order_quantity">
                              <div className="wg-quantity style-2">
                                <button
                                  className="btn-quantity minus-quantity"
                                  onClick={() =>
                                    updateQuantity(
                                      product.id,
                                      product.quantity - 1
                                    )
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
                                    updateQuantity(
                                      product.id,
                                      product.quantity + 1
                                    )
                                  }
                                >
                                  <i className="icon-plus" />
                                </button>
                              </div>
                              <span
                                onClick={() => removeItem(product.id)}
                                className="remove tf-btn-line style-line-2 fw-normal"
                              >
                                Remove
                              </span>
                            </div>
                          </td>
                          <td className="order_subtotal each-subtotal-price" />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="checkbox-wrap">
                <input
                  id="add-gift"
                  type="checkbox"
                  className="tf-check style-4"
                />
                <label htmlFor="add-gift">Add gift packaging ($10.00)</label>
              </div>
              <form
                className="style-border"
                onSubmit={(e) => e.preventDefault()}
              >
                <fieldset>
                  <label className="label-text">
                    Special instructions for seller
                  </label>
                  <textarea style={{ height: 206 }} defaultValue={""} />
                </fieldset>
              </form>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="right">
              <div className="checkout-sidebar">
                <form
                  className="form-checkout-sidebar"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="form-content">
                    <h4 className="title-total">
                      TOTAL: {totalPrice.toFixed(2)}
                      <span className="each-total-price" />
                    </h4>
                    <p className="tax-text">
                      Taxes and shipping calculated at checkout
                    </p>
                    <span className="br-line" />
                    <div className="checkbox-wrap">
                      <input
                        id="agree-term"
                        type="checkbox"
                        className="tf-check style-4"
                        required
                      />
                      <label htmlFor="agree-term">
                        I argee Terms and conditions
                      </label>
                    </div>
                  </div>
                  <Link
                    type="button"
                    id="checkout-btn"
                    href={`/checkout`}
                    className="tf-btn btn-fill fw-medium animate-btn w-100"
                  >
                    CHECKOUT
                  </Link>
                </form>
                <p className="text-caption text-center text-we-accept">
                  We accept
                </p>
                <ul className="paymend-method-list justify-content-center">
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
              <CartTestimonials />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
