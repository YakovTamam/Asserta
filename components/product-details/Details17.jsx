"use client";
import Slider1 from "./sliders/Slider1";
import ProgressBarComponent from "../common/Progressbar";

import AddtoWishlist from "../common/AddtoWishlist";
import AddtoCompare from "../common/AddtoCompare";

export default function Details17({ product }) {
  return (
    <section className="themesFlat">
      <div className="tf-main-product section-image-zoom product-unavailable">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="thumbs-slider">
                  <Slider1 firstItem={product.imgSrc} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tf-product-info-wrap">
                <div className="tf-zoom-main sticky-top" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <ul className="product-info-rate rate-wrap">
                      <li>
                        <i className="icon-star" />
                      </li>
                      <li>
                        <i className="icon-star" />
                      </li>
                      <li>
                        <i className="icon-star" />
                      </li>
                      <li>
                        <i className="icon-star" />
                      </li>
                      <li>
                        <i className="icon-star" />
                      </li>
                    </ul>
                    <h3 className="product-info-name fw-normal">
                      {product.title}
                    </h3>
                    <div className="product-info-price">
                      <div className="price-wrap">
                        <span className="price-new price-on-sale h4">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="price-old compare-at-price fw-normal h6">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="product-infor-sub h6 fw-normal text-main-4">
                      This regulator has a rolled diaphragm and high flow rate
                      with reduced pressure drop.It has an excellent degree of
                      condensation.
                    </p>
                  </div>

                  <div className="tf-product-total-quantity">
                    <div className="group-btn">
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        className="tf-btn btn-unavailable animate-btn text-line-clamp-1 text-center text-nowrap"
                      >
                        This item is currently unavailable
                      </a>
                      <div className="group-btn-action">
                        <AddtoWishlist
                          additionalClass="tf-btn-icon btn-add-wishlist"
                          product={product}
                          tooltipDirection="top"
                        />

                        <AddtoCompare
                          tooltipDirection="top"
                          product={product}
                          additionalClass="tf-btn-icon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-share">
                    <ul className="tf-social-icon">
                      <li>
                        <a href="#" className="social-facebook">
                          <span className="icon">
                            <i className="icon-facebook" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-instagram">
                          <span className="icon">
                            <i className="icon-instagram" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-x">
                          <span className="icon">
                            <i className="icon-x" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-snapchat">
                          <span className="icon">
                            <i className="icon-snapchat" />
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tf-product-notify">
                    <h4 className="title">Notify me when it back in stock</h4>
                    <p className="sub-title text-main-6">
                      Enter your email address to be notified if the product
                      becomes available again.
                    </p>
                    <form
                      className="style-border form-notify"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="form-content-2">
                        <input type="text" required placeholder="Name" />
                        <input type="text" required placeholder="Email*" />
                      </div>
                      <button
                        type="submit"
                        className="tf-btn btn-fill-2 w-100 fw-medium animate-btn"
                      >
                        submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
