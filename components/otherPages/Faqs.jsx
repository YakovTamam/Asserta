import React from "react";
import Link from "next/link";
export default function Faqs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="s-faq flex-md-nowrap">
          <div className="sb-contact sticky-top">
            <h3 className="title fw-normal">Can’t find your answer?</h3>
            <p className="sub-title text-main-6">
              If you have an issue or question that requires immediate
              assistance, you can click the button below to chat live with a
              Customer Service representative.
              <br />
              <br className="d-none d-xl-block" />
              Please allow 06 - 12 business days from the time your package
              arrives back to us for a refund to be issued.
            </p>
            <div className="group-btn flex-sm-nowrap">
              <Link
                href={`/contact-us`}
                className="tf-btn btn-fill fw-medium animate-btn letter-space-0"
              >
                CONTACT US
              </Link>
              <Link
                href={`/contact-us`}
                className="tf-btn btn-fill-white animate-btn animate-dark text-capitalize fw-medium line"
              >
                <i className="icon-chat fs-20" />
                Chat with Us
              </Link>
            </div>
          </div>
          <ul className="faq-list tf-grid-layout">
            <li className="faq-item">
              <h3 className="name-faq">Orders &amp; Shipping</h3>
              <div className="faq-wrap" id="order-and-shipping">
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#how-order"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="how-order"
                  >
                    <span className="fw-medium">
                      1. How can I place an order?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="how-order"
                    className="collapse"
                    data-bs-parent="#order-and-shipping"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#offer-ship"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="offer-ship"
                  >
                    <span className="fw-medium">
                      2. Do you offer international shipping?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="offer-ship"
                    className="collapse"
                    data-bs-parent="#order-and-shipping"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#ship-take"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="ship-take"
                  >
                    <span className="fw-medium">
                      3. How long does shipping take?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="ship-take"
                    className="collapse"
                    data-bs-parent="#order-and-shipping"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#track-order"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="track-order"
                  >
                    <span className="fw-medium">4. Can I track my order?</span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="track-order"
                    className="collapse"
                    data-bs-parent="#order-and-shipping"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="faq-item">
              <h3 className="name-faq">Returns &amp; Exchanges</h3>
              <div className="faq-wrap" id="return-and-exchanges">
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#return-policy"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="return-policy"
                  >
                    <span className="fw-medium">
                      4. What is your return policy?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="return-policy"
                    className="collapse"
                    data-bs-parent="#return-and-exchanges"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#return-exchange"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="return-exchange"
                  >
                    <span className="fw-medium">
                      5. How do I initiate a return or exchange?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="return-exchange"
                    className="collapse"
                    data-bs-parent="#return-and-exchanges"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="faq-item">
              <h3 className="name-faq">Jewelry Care</h3>
              <div className="faq-wrap" id="jewelry-care">
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#take-care"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="take-care"
                  >
                    <span className="fw-medium">
                      7. How do I take care of my jewelry?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="take-care"
                    className="collapse"
                    data-bs-parent="#jewelry-care"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#hypoa"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="hypoa"
                  >
                    <span className="fw-medium">
                      8. Is your jewelry hypoallergenic?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="hypoa"
                    className="collapse"
                    data-bs-parent="#jewelry-care"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="faq-item">
              <h3 className="name-faq">Customization &amp; Sizing</h3>
              <div className="faq-wrap" id="custom-size">
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#custom"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="custom"
                  >
                    <span className="fw-medium">
                      9. Do you offer custom jewelry?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="custom"
                    className="collapse"
                    data-bs-parent="#custom-size"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="widget-accordion-2 style-2">
                  <div
                    className="accordion-title collapsed"
                    data-bs-target="#size"
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="size"
                  >
                    <span className="fw-medium">
                      10. How do I find my ring size?
                    </span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id="size"
                    className="collapse"
                    data-bs-parent="#custom-size"
                  >
                    <div className="accordion-body">
                      <p>
                        If you have an issue or question that requires immediate
                        assistance, you can click the button below to chat live
                        with a Customer Service representative.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
