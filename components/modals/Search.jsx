"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { products1 } from "@/data/products";
export default function Search() {
  return (
    <div className="offcanvas offcanvas-top offcanvas-search" id="search">
      <div className="offcanvas-content">
        <div className="container">
          <div className="popup-content">
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <fieldset>
                <input
                  type="text"
                  placeholder="ENTER YOUR SEARCH"
                  className=""
                  name="text"
                  tabIndex={0}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <button type="submit" className="link">
                <i className="icon icon-search" />
              </button>
              <span className="icon-close-popup" data-bs-dismiss="offcanvas">
                <i className="icon-close" />
              </span>
            </form>
            <div className="tf-grid-layout sm-col-2">
              <div className="feature-wrap">
                <p className="title">QUICK LINK</p>
                <ul className="quick-link-list">
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="link-item text-main-4 link"
                    >
                      Best Sellers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="link-item text-main-4 link"
                    >
                      Bracelets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="link-item text-main-4 link"
                    >
                      Earrings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="link-item text-main-4 link"
                    >
                      Rings
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="feature-wrap">
                <p className="title">SUGGESTION FOR YOU</p>
                <ul className="product-list">
                  {products1.slice(0, 2).map((product, i) => (
                    <li key={i}>
                      <div className="tf-product-mini-view">
                        <Link
                          href={`/product-default/${product.id}`}
                          className="prd-image"
                        >
                          <Image
                            alt=""
                            width={714}
                            height={900}
                            src={product.imgSrc}
                          />
                        </Link>
                        <div className="prd-content">
                          <Link
                            href={`/product-default/${product.id}`}
                            className="prd-name link text-uppercase"
                          >
                            {product.title}
                          </Link>
                          <div className="price-wrap">
                            <span className="price-new price-on-sale">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.oldPrice && (
                              <span className="price-old compare-at-price text-caption">
                                ${product.oldPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="close" data-bs-dismiss="offcanvas" />
    </div>
  );
}
