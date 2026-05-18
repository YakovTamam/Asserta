import React from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

export default function Header1({ parentClass = "tf-header line-bt-2" }) {
  return (
    <header className={parentClass}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 col-3 d-xl-none">
            <a
              href="#mobileMenu"
              data-bs-toggle="offcanvas"
              className="btn-mobile-menu"
            >
              <span />
            </a>
          </div>
          <div className="col-xl-2 col-md-4 col-6">
            <Link href={`/`} className="logo-site">
              <Image
                alt=""
                width={122}
                height={32}
                src="/images/logo/logo.svg"
                className="logo-desktop"
              />
              <Image
                alt=""
                width={100}
                height={28}
                src="/images/logo/logo-mobile.svg"
                className="logo-mobile"
              />
            </Link>
          </div>
          <div className="col-xl-8 d-none d-xl-block">
            <nav className="box-navigation">
              <ul className="box-nav-menu">
                <Nav />
              </ul>
            </nav>
          </div>
          <div className="col-xl-2 col-md-4 col-3">
            <ul className="nav-icon">
              {/* Account */}
              <li className="d-none d-md-inline-flex">
                <a
                  href="#log"
                  data-bs-toggle="modal"
                  className="nav-icon-item text-black link"
                >
                  <i className="icon icon-user" />
                </a>
              </li>
              {/* Shop */}
              <li className="d-none d-md-inline-flex">
                <Link
                  href={`/shop-collection-list`}
                  className="nav-icon-item text-black link"
                >
                  <i className="icon icon-dou-bag" />
                </Link>
              </li>
              {/* Wishlist — filled heart */}
              <li className="d-inline-flex">
                <Link
                  href={`/wishlist`}
                  className="nav-icon-item text-black link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </Link>
              </li>
              {/* Cart — rightmost */}
              <li className="d-inline-flex">
                <a
                  href="#shoppingCart"
                  data-bs-toggle="offcanvas"
                  className="nav-icon-item text-black link"
                >
                  <i className="icon icon-cart" />
                  <span className="count-notice" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
