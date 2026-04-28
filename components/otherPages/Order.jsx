"use client";

import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import OrderPageTestimonials from "./OrderPageTestimonials";

export default function Order() {
  const { cartProducts, totalPrice } = useContextElement();

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="thank-wrap flat-spacing pt-0">
          <span className="icon d-block">
            <i className="icon-check-3" />
          </span>
          <h2 className="title">THANK YOU FOR YOUR ORDER!</h2>
          <p className="sub-title">
            You are awesome, Vincent! Thank you so much for your purchase.
          </p>
        </div>
        <div className="s-checkout place-order-wrap">
          <div className="left-col">
            <div className="table-order-finish">
              <table>
                <thead>
                  <tr>
                    <th className="order_product h6 fw-normal">order number</th>
                    <th className="order_price h6 fw-normal">order date</th>
                    <th className="order_quantity h6 fw-normal">order total</th>
                    <th className="order_subtotal h6 fw-normal">
                      payment method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="order_item">
                    <td className="order_number">#1001</td>
                    <td className="order_date">27 Mar 2025</td>
                    <td className="order_total">$480.00</td>
                    <td className="order_payment">Direct bank transfer</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flat-spacing">
              <div className="delivery-progress">
                <span className="checkout-bar" />
                <div className="delivery-step confirmed">
                  <div className="box-icon">
                    <i className="icon-check" />
                  </div>
                  <h6 className="title">Confirmed</h6>
                  <p className="date text-caption">10 Oct 2025</p>
                </div>
                <div className="delivery-step">
                  <div className="box-icon">
                    <i className="icon-box" />
                  </div>
                  <h6 className="title">Shipped</h6>
                  <p className="date text-caption">20 Oct 2025</p>
                </div>
                <div className="delivery-step">
                  <div className="box-icon">
                    <i className="icon-location-2" />
                  </div>
                  <h6 className="title">Delivered</h6>
                  <p className="date text-caption">22 Oct 2025</p>
                </div>
              </div>
            </div>
            <div className="map d-flex">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.5857104277184!2d151.04672747646993!3d-33.92606072202828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12bbff3cb96e71%3A0xad3243fb988463dc!2s15%20Yarran%20St%2C%20Punchbowl%20NSW%202196%2C%20Australia!5e0!3m2!1sen!2s!4v1745205637101!5m2!1sen!2s"
                width="100%"
                height={499}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flat-spacing-11">
              <div className="box-ship-address s-wrap flex-sm-nowrap">
                <div className="ship-address-item">
                  <h6 className="address-title">Shipping address</h6>
                  <ul className="list-address">
                    <li>Vincent Pham</li>
                    <li>15 Yarran st</li>
                    <li>Punchbowl, NSW</li>
                    <li>Australia</li>
                    <li>2196</li>
                    <li>vince@gmail.com</li>
                  </ul>
                </div>
                <div className="ship-address-item">
                  <h6 className="address-title">Billing address</h6>
                  <ul className="list-address">
                    <li>Vincent Pham</li>
                    <li>15 Yarran st</li>
                    <li>Punchbowl, NSW</li>
                    <li>Australia</li>
                    <li>2196</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tes-slider-2 bg-linear-golden-cream">
              <OrderPageTestimonials />
            </div>
          </div>
          <div className="right-col">
            <div className="tf-page-cart-sidebar">
              <h4 className="checkout-title">ORDER DETAIL</h4>
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
              <a
                href="#"
                className="tf-btn btn-fill fw-medium animate-btn w-100"
              >
                Place order
              </a>
            </div>
            <div className="feedback-sidebar s-wrap">
              <h4 className="checkout-title">GIVE US A FEEDBACK</h4>
              <p className="checkout-subtitle">
                Let us know what you think about the shopping experience, and
                get a gift coupon for the next shopping.
              </p>
              <form
                className="form-feedback style-border"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-content-2 mb_32">
                  <fieldset className="tf-field-2">
                    <input
                      className="tf-input"
                      type="text"
                      placeholder=""
                      required
                    />
                    <label className="tf-lable">Name</label>
                  </fieldset>
                  <fieldset className="tf-field-2">
                    <input
                      className="tf-input"
                      type="email"
                      placeholder=""
                      required
                    />
                    <label className="tf-lable">Email</label>
                  </fieldset>
                  <div className="check-wrapper">
                    <p className="text-main-6">How was your experience?</p>
                    <div className="check-wrap-list">
                      <div className="checkbox-wrap type-2">
                        <input
                          type="radio"
                          id="exp-1y"
                          className="tf-check-rounded"
                          name="checkshipping"
                          defaultChecked=""
                        />
                        <label htmlFor="exp-1y">1</label>
                      </div>
                      <div className="checkbox-wrap type-2">
                        <input
                          type="radio"
                          id="exp-2y"
                          className="tf-check-rounded"
                          name="checkshipping"
                        />
                        <label htmlFor="exp-2y">2</label>
                      </div>
                      <div className="checkbox-wrap type-2">
                        <input
                          type="radio"
                          id="exp-3y"
                          className="tf-check-rounded"
                          name="checkshipping"
                        />
                        <label htmlFor="exp-3y">3</label>
                      </div>
                      <div className="checkbox-wrap type-2">
                        <input
                          type="radio"
                          id="exp-4y"
                          className="tf-check-rounded"
                          name="checkshipping"
                        />
                        <label htmlFor="exp-4y">4</label>
                      </div>
                      <div className="checkbox-wrap type-2">
                        <input
                          type="radio"
                          id="exp-5y"
                          className="tf-check-rounded"
                          name="checkshipping"
                        />
                        <label htmlFor="exp-5y">5</label>
                      </div>
                    </div>
                  </div>
                  <fieldset className="tf-field-2">
                    <textarea
                      className="tf-input d-flex"
                      placeholder=""
                      style={{ height: 139 }}
                      defaultValue={""}
                    />
                    <label className="tf-lable type-2">
                      Share your exprience...
                    </label>
                  </fieldset>
                </div>
                <button
                  type="submit"
                  className="tf-btn btn-fill fw-medium animate-btn w-100"
                >
                  SEND
                </button>
              </form>
              <h4 className="checkout-title">SHARE THE LOVE</h4>
              <ul className="tf-social-icon style-large">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="social-facebook"
                  >
                    <span className="icon">
                      <i className="icon-facebook" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    className="social-instagram"
                  >
                    <span className="icon">
                      <i className="icon-instagram" />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" target="_blank" className="social-x">
                    <span className="icon">
                      <i className="icon-x" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.snapchat.com/"
                    target="_blank"
                    className="social-snapchat"
                  >
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
    </section>
  );
}
