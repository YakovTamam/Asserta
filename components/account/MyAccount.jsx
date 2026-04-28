import React from "react";
import CountdownTimer from "../common/Countdown";
import Link from "next/link";

export default function MyAccount() {
  return (
    <div className="my-acount-content account-dashboard">
      <div className="heading">
        <p className="hello-name">
          <span className="hello fw-normal h4">Hello</span> VINCENT PHAM!{" "}
          <span>
            (not <span className="name text-main">Vincent Pham</span>?{" "}
          </span>
          <a href="#" className="link text-body">
            Log Out
          </a>
          <span>)</span>
        </p>
      </div>
      <p className="notice">
        Today is a great day to check your account page. You can check{" "}
        <Link
          href={`/account-orders`}
          className="text-primary text-decoration-underline"
        >
          your last orders
        </Link>{" "}
        or have a look to{" "}
        <Link
          href={`/wishlist`}
          className="text-primary text-decoration-underline"
        >
          your wishlist
        </Link>{" "}
        . Or maybe you can start to shop{" "}
        <Link
          href={`/shop-default`}
          className="text-primary text-decoration-underline"
        >
          our latest offers
        </Link>
        ?
      </p>
      <ul className="box-check-list">
        <li>
          <Link href={`/account-orders`} className="box-check">
            <span className="icon">
              <i className="icon-dou-bag" />
            </span>
            <div className="text">
              <h4 className="link name-type">
                Orders
                <span className="count-number">1</span>
              </h4>
              <p className="sub-type">Check the history of all your orders</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href={`/wishlist`} className="box-check">
            <span className="icon">
              <i className="icon-hearth-2" />
            </span>
            <div className="text">
              <h4 className="link name-type">
                wishlist
                <span className="count-number">1</span>
              </h4>
              <p className="sub-type">Check your wishlist</p>
            </div>
          </Link>
        </li>
      </ul>
      <div className="banner_V02 hover-img flex-wrap-reverse">
        <div className="bn-content bg-linear-golden-cream-2">
          <h6 className="caption text-caption text-uppercase">
            discount code: vemus20off
          </h6>
          <h2 className="title font-2 fw-normal">
            <span className="fst-italic">Unveil</span> Your Sparkle
          </h2>
          <p className="sub-title">
            Enjoy exclusive deals and limited-time offers—your moment to shine
            is now!
          </p>
          <Link href={`/shop-default`} className="tf-btn type-large">
            Shop Now
            <i className="icon-arrow-right-2 fs-24" />
          </Link>
        </div>
        <div className="bn-image img-style">
          <img
            src="images/banner/banner-1.jpg"
            data-=""
            alt=""
            className="lazyload"
            width={1914}
            height={1436}
          />
        </div>
      </div>
      <div className="banner_countdown-v3">
        <div className="bn_content">
          <p className="text-top text-caption fw-medium">DON’T MISS OUT!</p>
          <h2 className="title font-2">
            <span className="fst-italic">Limited</span> Time Deal
          </h2>
          <p className="sub-title">
            Score exclusive discounts on our top styles! Hurry – these offers
            won’t last long.
          </p>
          <Link
            href={`/shop-collection-list`}
            className="tf-btn text-uppercase type-large"
          >
            SHOP COLLECTION
            <i className="icon-arrow-right-3 fs-24" />
          </Link>
        </div>
        <div className="countdown-V04">
          <div className="js-countdown cd-custom">
            <CountdownTimer style={7} />
          </div>
        </div>
      </div>
    </div>
  );
}
