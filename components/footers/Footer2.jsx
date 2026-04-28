"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CurrencySelect from "../common/CurrencySelect";
export default function Footer2() {
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount

  return (
    <footer className="tf-footer style-2 bg-dark-brown">
      <div className="footer-body p-xl-0">
        <div className="container">
          <div className="footer-inner-wrap d-xl-flex flex-xl-nowrap">
            <div className="footer-infor">
              <div className="box-title">
                <Link href={`/home-2`} className="logo-site d-inline-block">
                  <Image
                    alt=""
                    src="/images/logo/logo-white.svg"
                    width={122}
                    height={31}
                  />
                </Link>
                <p className="text-main-5 lt-sp-nor">
                  <span className="text-white">Explore</span> our curated
                  collections designed to{" "}
                  <span className="text-white">
                    elevate every <br className="d-none d-xl-block" />
                    look
                  </span>{" "}
                  , from <span className="text-white">
                    timeless essentials
                  </span>{" "}
                  to <span className="text-white">trendsetting pieces</span> .
                  Step <br className="d-none d-xl-block" />
                  in and find the{" "}
                  <span className="text-white">perfect match</span> for your{" "}
                  <span className="text-white">unique</span> style.
                </p>
              </div>
              <ul className="tf-social-icon style-white">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="social-facebook"
                  >
                    <span className="icon">
                      <i className="icon-facebook" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    className="social-instagram"
                  >
                    <span className="icon">
                      <i className="icon-instagram" />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" target="_blank" className="social-x">
                    <span className="icon">
                      <i className="icon-x" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.snapchat.com/"
                    target="_blank"
                    className="social-snapchat"
                  >
                    <span className="icon">
                      <i className="icon-snapchat" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col-block">
              <p className="footer-heading footer-heading-mobile text-white font-2">
                Explore
              </p>
              <div className="tf-collapse-content">
                <ul className="footer-menu-list">
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="text-white link"
                    >
                      Bracelets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="text-white link"
                    >
                      Rings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="text-white link"
                    >
                      Necklaces
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="text-white link"
                    >
                      Earrings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="text-white link"
                    >
                      Gifts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/shop-collection-list`}
                      className="text-white link"
                    >
                      Collections
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-col-block">
              <p className="footer-heading footer-heading-mobile text-white font-2">
                HELP
              </p>
              <div className="tf-collapse-content">
                <ul className="footer-menu-list">
                  <li>
                    <Link href={`/faq`} className="text-white link">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href={`/term-condition`} className="text-white link">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href={`/privacy`} className="text-white link">
                      Privacy Policies
                    </Link>
                  </li>
                  <li>
                    <Link href={`/return`} className="text-white link">
                      Returns &amp; Refunds
                    </Link>
                  </li>
                  <li>
                    <Link href={`/shipping`} className="text-white link">
                      Shipping
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-col-block">
              <p className="footer-heading footer-heading-mobile text-white font-2">
                Store Information
              </p>
              <div className="tf-collapse-content">
                <ul className="footer-menu-list">
                  <li className="text-caption">
                    <span className="fw-medium text-white">Email: </span>
                    <a
                      href="mailto:clientcare@ecom.com"
                      className="text-white link fw-normal"
                    >
                      clientcare@ecom.com
                    </a>
                  </li>
                  <li className="text-caption">
                    <span className="fw-medium text-white">Phone: </span>
                    <a
                      href="tel:18888383022"
                      className="text-white link fw-normal"
                    >
                      1.888.838.3022
                    </a>
                  </li>
                  <li className="text-caption">
                    <a
                      target="_blank"
                      href="https://www.google.com/maps?q=123+Yarran+st,Punchbowl,NSW+2196,Australia"
                      className="text-white link fw-normal"
                    >
                      <span className="fw-medium text-white">Address: </span>
                      123 Yarran st, Punchbowl,
                      <br className="d-none d-xl-block" />
                      NSW 2196, Australia
                    </a>
                  </li>
                  <li>
                    <Link
                      href={`/our-store`}
                      className="tf-btn-line style-white"
                    >
                      <span className="text-caption"> Get direction </span>
                      <i className="icon-arrow-right-2 fs-16" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-wrap">
            <p className="text-nocopy text-white">
              All Rights Reserved 2025 VEMUS.
            </p>
            <div className="tf-currencies">
              <CurrencySelect light />
            </div>
            <ul className="paymend-method-list">
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/am-ex.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/apple-pay.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/dinner.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/discover.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/gg-pay.svg"
                    width={38}
                    height={24}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/master-2.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/master.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/shop-pay.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/unicon-pay.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image
                    alt="Paymend Method"
                    src="/images/payment/visa.svg"
                    width={40}
                    height={25}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="logo-bottom wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="d-flex justify-content-center">
            <Image
              className="lazyload"
              alt="Logo"
              src="/images/logo/logo-very-large.svg"
              width={1422}
              height={185}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
