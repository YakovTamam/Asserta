"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import axios from "axios";
const menuItems = [
  "New Collection",
  "All Jewelry",
  "Charms",
  "Bracelets",
  "Rings",
  "Earrings",
  "Gifts",
  "Collections",
];
export default function Footer3() {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };
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
    <footer className="tf-footer">
      <div className="footer-top border-top-0">
        <div className="container">
          <ul className="category-list justify-content-xl-center">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href="/shop-collection-list"
                  className="tf-btn btn-line has-icon link"
                >
                  <span className="text h6 text-uppercase fw-normal">
                    {item}
                  </span>
                  <i className="icon icon-arrow-top-right" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-body p-xl-0">
        <div className="container">
          <div className="row-footer">
            <div className="col-s1">
              <div className="footer-inner-wrap flex-lg-nowrap align-items-end">
                <div className="box-title">
                  <h6>
                    JOIN THE <span className="text-primary">#VEMUS</span> TRIBE
                  </h6>
                  <p className="notice font-2">
                    <span className="fst-italic">Shiny Things</span> Await - 10%
                    Off Inside!
                  </p>
                </div>
                <div className="box-email">
                  <p className="text-body text-main-3">
                    Get early access to new products, exclusive deals &amp;
                    more.
                  </p>
                  <div
                    className={`tfSubscribeMsg  footer-sub-element ${
                      showMessage ? "active" : ""
                    }`}
                  >
                    {success ? (
                      <p style={{ color: "rgb(52, 168, 83)" }}>
                        You have successfully subscribed.
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>Something went wrong</p>
                    )}
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendEmail(e);
                    }}
                    className="form-email"
                  >
                    <fieldset>
                      <input
                        className="bg-transparent"
                        type="email"
                        name="email"
                        placeholder="Your_email@example.com"
                        required
                      />
                    </fieldset>
                    <div className="box-btn">
                      <button type="submit" className="btn-submit link">
                        <i className="icon-arrow-right-2" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-s2">
              <div className="footer-inner-wrap flex-sm-nowrap s2">
                <div className="footer-col-block">
                  <p className="footer-heading footer-heading-mobile font-2">
                    find us
                  </p>
                  <div className="tf-collapse-content">
                    <ul className="footer-menu-list mb-24">
                      <li>
                        <p className="text-main-4">
                          Find a location nearest you.
                        </p>
                      </li>
                      <li>
                        <a
                          href="https://www.google.com/maps?q=123+Yarran+st,Punchbowl,NSW+202196,Australia"
                          target="_blank"
                          className="text-main-4 link text-decoration-underline"
                        >
                          See Our Stores
                        </a>
                      </li>
                      <li>
                        <a href="tel:6483441233" className="text-main-4 link">
                          (64) 8344 1233
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:hello@vemus.com"
                          className="text-main-4 link"
                        >
                          hello@vemus.com
                        </a>
                      </li>
                    </ul>
                    <ul className="tf-social-icon">
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
                        <a
                          href="https://x.com/"
                          target="_blank"
                          className="social-x"
                        >
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
                </div>
                <div className="footer-col-block p-xl-0">
                  <p className="footer-heading footer-heading-mobile font-2">
                    HELP
                  </p>
                  <div className="tf-collapse-content">
                    <ul className="footer-menu-list">
                      <li>
                        <Link href={`/shipping`} className="text-main-4 link">
                          Shipping
                        </Link>
                      </li>
                      <li>
                        <Link href={`/return`} className="text-main-4 link">
                          Returns
                        </Link>
                      </li>
                      <li>
                        <Link href={`/privacy`} className="text-main-4 link">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href={`/wishlist`} className="text-main-4 link">
                          My Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link href={`/compare`} className="text-main-4 link">
                          Compare
                        </Link>
                      </li>
                      <li>
                        <Link href={`/faq`} className="text-main-4 link">
                          FAQ’s
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer-col-block">
                  <p className="footer-heading footer-heading-mobile font-2">
                    ABOUT US
                  </p>
                  <div className="tf-collapse-content">
                    <ul className="footer-menu-list">
                      <li>
                        <Link href={`/about-us`} className="text-main-4 link">
                          Our Story
                        </Link>
                      </li>
                      <li>
                        <Link href={`/our-store`} className="text-main-4 link">
                          Visit Our Store
                        </Link>
                      </li>
                      <li>
                        <Link href={`/contact-us`} className="text-main-4 link">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/account-page`}
                          className="text-main-4 link"
                        >
                          Account
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-wrap">
            <div className="footer-bar-language">
              <div className="tf-currencies">
                <CurrencySelect />
              </div>
              <div className="tf-languages">
                <LanguageSelect />
              </div>
            </div>
            <p className="text-nocopy">All Rights Reserved 2025 VEMUS.</p>
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
    </footer>
  );
}
