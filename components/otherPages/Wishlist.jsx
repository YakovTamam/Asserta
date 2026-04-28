"use client";

import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import AddtoWishlist from "../common/AddtoWishlist";
import AddtoQuickAdd from "../common/AddtoQuickAdd";
import QuickView from "../common/QuickView";
import AddtoCompare from "../common/AddtoCompare";
import CountdownTimer from "../common/Countdown";
import DiscountMarquee from "../common/DiscountMarquee";
import Link from "next/link";
import { allProducts } from "@/data/products";
import Image from "next/image";

export default function Wishlist() {
  const { wishList, removeFromWishlist } = useContextElement();
  const [items, setItems] = useState(allProducts);
  useEffect(() => {
    setItems([...allProducts.filter((elm) => wishList.includes(elm.id))]);
  }, [wishList]);
  return (
    <div className="flat-spacing">
      <div className="container">
        <div className="wrapper-wishlist tf-grid-layout tf-col-2 md-col-3 xl-col-4">
          {/* Product 1 */}
          {items.map((product, i) => (
            <div key={i} className="card_product--V01">
              <div className="card_product-wrapper">
                <span
                  className="remove icon-close"
                  onClick={() => removeFromWishlist(product.id)}
                />
                <Link
                  href={`/product-default/${product.id}`}
                  className="product-img"
                >
                  <Image
                    src={product.imgSrc}
                    alt="Image Product"
                    className="lazyload img-product"
                    width={714}
                    height={900}
                  />
                  {product.hoverImgSrc && (
                    <Image
                      src={product.hoverImgSrc}
                      alt="Image Product"
                      className="lazyload img-hover"
                      width={714}
                      height={900}
                    />
                  )}
                </Link>
                <ul className="list-product-btn">
                  <li className="wishlist">
                    <AddtoWishlist product={product} />
                  </li>
                  <li>
                    <AddtoQuickAdd product={product} />
                  </li>
                  <li>
                    <QuickView product={product} />
                  </li>
                  <li className="compare">
                    <AddtoCompare product={product} />
                  </li>
                </ul>
                {product.badge && (
                  <div className="badge-box">
                    <span className="badge-item new">{product.badge}</span>
                  </div>
                )}
                {product.variantType === "text" && (
                  <div className="variant-box">
                    <p className="size-box text-center text-caption">
                      {product.variantText}
                    </p>
                  </div>
                )}
                {product.variantType === "countdown" && (
                  <div className="variant-box count-down">
                    <div className="countdown-V02">
                      <div className="js-countdown">
                        <CountdownTimer style={5} />
                      </div>
                    </div>
                  </div>
                )}
                {product.variantType === "marquee" && (
                  <div className="variant-box bg-primary">
                    <div
                      className="infiniteslide_wrap"
                      style={{ overflow: "hidden" }}
                    >
                      <DiscountMarquee />
                    </div>
                  </div>
                )}
                {product.variantType === "notify" && product.outOfStock && (
                  <a
                    href="#unavailable"
                    data-bs-toggle="modal"
                    className="variant-box stock bg-main link text-white"
                  >
                    <p className="text-center d-none d-md-block">
                      {product.variantText}
                    </p>
                    <p className="text-center d-md-none">Notify Me</p>
                  </a>
                )}
              </div>
              <div className="card_product-info">
                <Link
                  href={`/product-default/${product.id}`}
                  className="name-product h5 fw-normal link text-line-clamp-2"
                >
                  Emerald-cut Halo Engagement Ring with a Diamond Platinum Band
                </Link>
                <div className="price-wrap">
                  <span className="price-new h5">
                    $
                    {product.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  {product.oldPrice && (
                    <span className="price-old fw-normal">
                      $
                      {product.oldPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="loadItem wd-2-cols box_image--V02 style-2 hover-img">
            <a href="#" className="box_image-image img-style">
              <Image
                src="/images/collections/discover-2.jpg"
                alt=""
                className="lazyload"
                width={1488}
                height={1080}
              />
            </a>
            <div className="box_image-content type-left">
              <div className="heading">
                <p className="fw-medium text-white text-uppercase">be love</p>
                <a
                  href="#"
                  className="title h3 fw-normal font-2 text-white link link-secondary"
                >
                  Be <span className="fst-italic">Unmissable.</span>
                </a>
              </div>
              <a
                href="#"
                className="tf-btn style-3 btn-fill-white animate-btn animate-dark"
              >
                <span className="fw-medium text-uppercase">discover more</span>
              </a>
            </div>
          </div>
          {/* Pagination */}
          <div className="wd-full">
            <div className="wg-pagination">
              <a href="#" className="tf-btn-line style-line-2">
                <span className="text-body">PREV</span>
              </a>
              <ul className="pagition-list">
                <li>
                  <p className="pagination-item active">1</p>
                </li>
                <li>
                  <a href="#" className="pagination-item link">
                    2
                  </a>
                </li>
                <li>
                  <a href="#" className="pagination-item link">
                    3
                  </a>
                </li>
              </ul>
              <a href="#" className="tf-btn-line style-line-2">
                <span className="text-body">NEXT</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
