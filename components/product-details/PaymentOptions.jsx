import Image from "next/image";
import React from "react";

export default function PaymentOptions() {
  return (
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
  );
}
