import React from "react";
import Link from "next/link";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
export default function Banner() {
  return (
    <div className="banner_countdown">
      <div className="bn_content">
        <div className="heading wow fadeInUp">
          <h6 className="text-top">DON’T MISS OUT!</h6>
          <h2 className="title font-2">
            <span className="fst-italic">Limited</span> Time Deal
          </h2>
          <p className="sub-title">
            Score exclusive discounts on our top styles! Hurry – these offers
            won’t last long. <br className="d-none d-xxl-block" />
            Shop now and elevate your wardrobe at unbeatable prices.
          </p>
        </div>
        <div className="countdown-V04 wow fadeInUp">
          <div className="js-countdown cd-custom">
            <CountdownTimer style={7} />
          </div>
        </div>
        <Link href={`/shop-default`} className="tf-btn type-large wow fadeInUp">
          Shop Now
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
