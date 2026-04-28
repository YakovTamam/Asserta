"use client";
import React from "react";
import Link from "next/link";
import MobileNav from "../headers/MobileNav";
import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
export default function MobileMenu() {
  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span className="icon-close-popup" data-bs-dismiss="offcanvas">
        <i className="icon-close" />
      </span>
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <fieldset>
                <input
                  type="text"
                  placeholder="Search for anything..."
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
            </form>
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              <MobileNav />
            </ul>
          </div>
          <div className="mb-other-content">
            <div className="group-icon">
              <Link href={`/wishlist`} className="site-nav-icon">
                <i className="icon icon-hearth" />
                Wishlist
              </Link>
              <p data-bs-dismiss="offcanvas">
                <a href="#log" data-bs-toggle="modal" className="site-nav-icon">
                  <i className="icon icon-user" />
                  Login
                </a>
              </p>
            </div>
            <div className="mb-notice">
              <Link href={`/contact-us`} className="text-need">
                Need Help?
              </Link>
            </div>
            <ul className="mb-info">
              <li>
                <p>
                  Address:
                  <a
                    href="https://www.google.com/maps?q=123+Yarran+St,+Punchbowl,+NSW+2196,+Australia"
                    className="fw-medium"
                    target="_blank"
                  >
                    123 Yarran st, Punchbowl, NSW 2196, Australia
                  </a>
                </p>
              </li>
              <li>
                Email:
                <a href="mailto:hello@vemus.com" className="fw-medium">
                  hello@vemus.com
                </a>
              </li>
              <li>
                Phone:
                <a href="tel:6483441233" className="fw-medium">
                  (64) 8344 1233
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-bottom">
          <div className="bottom-bar-language">
            <div className="tf-currencies">
              <CurrencySelect />
            </div>
            <div className="tf-languages">
              <LanguageSelect />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
