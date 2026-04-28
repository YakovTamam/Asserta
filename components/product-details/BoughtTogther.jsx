"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BoughtTogther() {
  return (
    <div className="tf-product-fbt">
      <h4 className="title fw-normal text-uppercase">
        Frequently Bought together
      </h4>
      <form
        className="tf-product-form-bundle"
        onSubmit={(e) => e.preventDefault()}
      >
        <ul className="tf-bundle-products">
          <li className="tf-bundle-product-item">
            <div className="bundle-check">
              <input
                type="checkbox"
                className="tf-check style-2"
                defaultChecked=""
                disabled=""
              />
            </div>
            <Link href={`/product-default`} className="bundle-image">
              <Image
                alt="img-product"
                src="/images/products/product-3.jpg"
                width={714}
                height={900}
              />
            </Link>
            <div className="bundle-info">
              <Link
                href={`/product-default`}
                className="name link h5 fw-normal"
              >
                Crystal Birthstone Eternity Circle Charm
              </Link>
              <div className="bundle-price price-wrap">
                <span className="price-new h5">$2,499.00</span>
                <span className="price-old fw-normal">$2,899.00</span>
              </div>
            </div>
          </li>
          <li className="tf-bundle-product-item">
            <div className="bundle-check">
              <input type="checkbox" className="tf-check style-2" />
            </div>
            <Link href={`/product-default`} className="bundle-image">
              <Image
                alt="img-product"
                src="/images/products/product-24.jpg"
                width={714}
                height={900}
              />
            </Link>
            <div className="bundle-info">
              <Link
                href={`/product-default`}
                className="name link h5 fw-normal"
              >
                Sparkling Infinity Heart Clasp Snake Chain Bracelet
              </Link>
              <div className="bundle-price price-wrap">
                <span className="price-new h5">$2,499.00</span>
                <span className="price-old fw-normal">$2,899.00</span>
              </div>
            </div>
          </li>
          <li className="tf-bundle-product-item">
            <div className="bundle-check">
              <input type="checkbox" className="tf-check style-2" />
            </div>
            <Link href={`/product-default`} className="bundle-image">
              <Image
                alt="img-product"
                src="/images/products/product-28.jpg"
                width={714}
                height={900}
              />
            </Link>
            <div className="bundle-info">
              <Link
                href={`/product-default`}
                className="name link h5 fw-normal"
              >
                Engagement Ring in 18k Yellow Gold
              </Link>
              <div className="bundle-price price-wrap">
                <span className="price-new h5">$2,499.00</span>
                <span className="price-old fw-normal">$2,899.00</span>
              </div>
            </div>
          </li>
        </ul>
        <a
          href="#shoppingCart"
          data-bs-toggle="offcanvas"
          className="tf-btn btn-fill text-uppercase fw-medium w-100 animate-btn"
        >
          add to bag
          <i className="icon-minus" />
          <span className="total-price" />
        </a>
      </form>
    </div>
  );
}
