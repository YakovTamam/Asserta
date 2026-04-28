"use client";
import React from "react";
import Image from "next/image";
export default function Cta() {
  return (
    <div className="banner_V01">
      <div className="bn-image">
        <Image
          src="/images/banner/banner-3.jpg"
          alt=""
          className="lazyload"
          width={1920}
          height={766}
        />
      </div>
      <div className="bn-content bg-light-peach">
        <h6 className="caption wow fadeInUp">JOIN THE #VEMUS TRIBE</h6>
        <h2 className="title font-2 fw-normal wow fadeInUp">
          <span className="fst-italic">Shiny Things</span> Await -
          <br className="d-none d-lg-block" />
          10% Off Inside!
        </h2>
        <p className="sub-title text-main-3 wow fadeInUp">
          Get early access to new products, exclusive deals &amp; more.
        </p>
        <form
          className="form-email wow fadeInUp"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-content">
            <fieldset>
              <input
                type="text"
                placeholder="Your_email@example.com"
                required
                className="bg-transparent"
              />
            </fieldset>
            <button type="submit" className="link">
              <i className="icon icon-arrow-right-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
