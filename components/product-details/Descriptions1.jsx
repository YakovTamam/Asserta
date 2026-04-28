import React from "react";
import Image from "next/image";
import ReviewForm from "./ReviewForm";
export default function Descriptions1() {
  return (
    <div className="flat-spacing-3">
      <div className="container">
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#description"
            data-bs-toggle="collapse"
            aria-expanded="false"
            aria-controls="description"
            role="button"
          >
            <span className="icon icon-arrow-right-down" />
            <span>Description</span>
          </div>
          <div id="description" className="collapse widget-desc">
            <div className="accordion-body">
              <h6 className="text-main-4 fw-normal">
                Link what you love. This sterling silver link chain holds
                endless styling potential. Featuring two openable links, groups
                of four static links between each one and a carabiner closure.
                Customise your link chain – then remix it with meaningful
                charms.
              </h6>
            </div>
          </div>
        </div>
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#material"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="material"
            role="button"
          >
            <span className="icon icon-arrow-right-down" />
            <span>additional information</span>
          </div>
          <div id="material" className="collapse widget-material">
            <div className="accordion-body">
              <table className="table-material">
                <tbody>
                  <tr>
                    <td className="h6">Material</td>
                    <td className="h6">Gold, Rose Gold, Silver</td>
                  </tr>
                  <tr>
                    <td className="h6">Color</td>
                    <td className="h6">White</td>
                  </tr>
                  <tr>
                    <td className="h6">Stone</td>
                    <td className="h6">Diamond</td>
                  </tr>
                  <tr>
                    <td className="h6">Brand</td>
                    <td className="h6">Vemus</td>
                  </tr>
                  <tr>
                    <td className="h6">Size</td>
                    <td className="h6">5, 6, 7, 8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#review"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="review"
            role="button"
          >
            <span className="icon icon-arrow-right-down" />
            <span>reviews</span>
          </div>
          <div id="review" className="collapse widget-review">
            <div className="accordion-body">
              <div className="wd-rating-review">
                <div className="rate-head">
                  <ul className="rate-wrap align-items-center">
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
                    <li>(3)</li>
                  </ul>
                  <p>4.5/5.0</p>
                </div>
                <ul className="rating-progress">
                  <li>
                    <div className="rate-number">
                      <span>5</span>
                      <i className="icon-star" />
                    </div>
                    <span
                      className="line-progress-rate progress"
                      role="progressbar"
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="progress-bar" />
                    </span>
                    <span className="rate-count">3</span>
                  </li>
                  <li>
                    <div className="rate-number">
                      <span>4</span>
                      <i className="icon-star" />
                    </div>
                    <span
                      className="line-progress-rate progress"
                      role="progressbar"
                      aria-valuenow={0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="progress-bar" style={{ width: 0 }} />
                    </span>
                    <span className="rate-count">0</span>
                  </li>
                  <li>
                    <div className="rate-number">
                      <span>3</span>
                      <i className="icon-star" />
                    </div>
                    <span
                      className="line-progress-rate progress"
                      role="progressbar"
                      aria-valuenow={0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="progress-bar" style={{ width: 0 }} />
                    </span>
                    <span className="rate-count">0</span>
                  </li>
                  <li>
                    <div className="rate-number">
                      <span>2</span>
                      <i className="icon-star" />
                    </div>
                    <span
                      className="line-progress-rate progress"
                      role="progressbar"
                      aria-valuenow={0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="progress-bar" style={{ width: 0 }} />
                    </span>
                    <span className="rate-count">0</span>
                  </li>
                  <li>
                    <div className="rate-number">
                      <span>1</span>
                      <i className="icon-star" />
                    </div>
                    <span
                      className="line-progress-rate progress"
                      role="progressbar"
                      aria-valuenow={0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className="progress-bar" style={{ width: 0 }} />
                    </span>
                    <span className="rate-count">0</span>
                  </li>
                </ul>
                <a href="#write-review" className="tf-btn fw-medium">
                  write a review
                </a>
              </div>
              <div className="box-preview-wrapper">
                <div className="review-post-list">
                  <h5 className="title">3 reviews</h5>
                  <ul>
                    <li className="post-review-item">
                      <div className="rv-image">
                        <Image
                          src="/images/avatar/avt-1.jpg"
                          alt=""
                          className="lazyload"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="rv-content">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <ul className="meta">
                            <li className="entry_name h6">Emily R.</li>
                            <li className="br-line" />
                            <li className="entry_date">Mar 3rd, 2025</li>
                          </ul>
                          <ul className="rate-wrap align-items-center">
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
                              <i className="icon-star text-main-10" />
                            </li>
                          </ul>
                        </div>
                        <h6 className="rv-text">
                          Absolutely stunning! I bought a gold necklace from
                          here, and the quality exceeded my expectations. The
                          craftsmanship is top-notch, and the packaging was
                          beautiful. Will definitely return for more!
                        </h6>
                      </div>
                    </li>
                    <li className="post-review-item">
                      <div className="rv-image">
                        <Image
                          src="/images/avatar/avt-2.jpg"
                          alt=""
                          className="lazyload"
                          width={400}
                          height={400}
                        />
                      </div>
                      <div className="rv-content">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <ul className="meta">
                            <li className="entry_name h6">James L.</li>
                            <li className="br-line" />
                            <li className="entry_date">Mar 3rd, 2025</li>
                          </ul>
                          <ul className="rate-wrap align-items-center">
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
                        </div>
                        <h6 className="rv-text">
                          I purchased an engagement ring, and my fiancée loves
                          it! The diamonds sparkle beautifully, and the staff
                          was incredibly helpful in guiding me through the
                          selection process. Highly recommend!
                        </h6>
                      </div>
                    </li>
                    <li className="post-review-item">
                      <div className="rv-image">
                        <Image
                          src="/images/avatar/avt-3.jpg"
                          alt=""
                          className="lazyload"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="rv-content">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <ul className="meta">
                            <li className="entry_name h6">Sophia M.</li>
                            <li className="br-line" />
                            <li className="entry_date">Mar 3rd, 2025</li>
                          </ul>
                          <ul className="rate-wrap align-items-center">
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
                        </div>
                        <h6 className="rv-text">
                          This jewelry shop is my go-to! The designs are
                          elegant, and the prices are reasonable for the quality
                          you get. I recently got a pair of silver earrings, and
                          they are just perfect. Amazing service too!
                        </h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="review-post-comment" id="write-review">
                  <ReviewForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
