import { products3 } from "@/data/products";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import AddtoCompare from "@/components/common/AddtoCompare";
export default function Products3() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="box_image--V01 style-2 hover-img">
              <div className="image img-style">
                <Image
                  src="/images/banner/banner-11.jpg"
                  alt="Box Image"
                  className="lazyload"
                  width={1488}
                  height={1956}
                />
              </div>
              <div className="content wow fadeInUp">
                <h3 className="title fw-medium font-2">
                  Shine with Seasonal Picks
                </h3>
                <Link
                  href={`/shop-collection-list`}
                  className="tf-btn-line gap-10"
                >
                  <span className="h5">Explore Collection</span>
                  <i className="icon-arrow-top-right fs-18" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tf-grid-layout tf-col-2">
              {products3.map((product) => (
                <div
                  className="card_product--V01 style-2 wow fadeInUp"
                  key={product.id}
                >
                  <div className="card_product-wrapper aspect-ratio-1">
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
                      <Image
                        src={product.hoverImgSrc}
                        alt="Image Product"
                        className="lazyload img-hover"
                        width={714}
                        height={900}
                      />
                    </Link>

                    <ul className="list-product-btn">
                      <li className="wishlist">
                        <AddtoWishlist product={product} />
                      </li>
                      <li>
                        <AddtoCart product={product} />
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
                        <span className="badge-item sale">{product.badge}</span>
                      </div>
                    )}
                  </div>

                  <div className="card_product-info">
                    <Link
                      href={`/product-default/${product.id}`}
                      className="name-product h5 fw-normal link text-line-clamp-2"
                    >
                      {product.title}
                    </Link>
                    <div className="price-wrap">
                      <span className={`price-new h5 ${product.textColor}`}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
