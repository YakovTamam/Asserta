import React from "react";
import CountdownTimer from "../common/Countdown";
import Image from "next/image";
import Link from "next/link";

export default function BannerCountdown() {
  return (
    <div className="banner_countdown">
      <div className="bn_content bg-light-peach-3">
        <div className="heading">
          <h6 className="text-top">DON’T MISS OUT!</h6>
          <h2 className="title font-2">
            <span className="fst-italic">Limited</span> Time Deal
          </h2>
          <p className="sub-title">
            Score exclusive discounts on our top styles! Hurry – these offers
            won’t last long.
            <br className="d-none d-xxl-block" />
            Shop now and elevate your wardrobe at unbeatable prices.
          </p>
        </div>
        <div className="countdown-V04">
          <div className="js-countdown cd-custom">
            <CountdownTimer style={7} />
          </div>
        </div>
        <Link href={`/shop-default`} className="tf-btn type-large style-3">
          Shop NOW
          <i className="icon-arrow-right-2 fs-24" />
        </Link>
      </div>
      <div className="bn_image">
        <Image
          src="/images/banner/banner-1.jpg"
          alt=""
          className="lazyload"
          width={1914}
          height={1436}
        />
      </div>
    </div>
  );
}
