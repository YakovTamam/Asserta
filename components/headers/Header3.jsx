import React from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";
export default function Header3({
  parentClass = "tf-header header-absolute-2",
}) {
  return (
    <header className={parentClass}>
      <div className="container-2">
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
          <div className="col-xl-5 d-none d-xl-block">
            <nav className="box-navigation">
              <ul className="box-nav-menu justify-content-start">
                <Nav megaMarginRight={false} />
              </ul>
            </nav>
          </div>
          <div className="col-xl-2 col-md-4 col-6">
            <Link
              href={`/home-3`}
              className="logo-site justify-content-center w-100"
            >
              <Image
                alt=""
                className="logo-black"
                src="/images/logo/logo.svg"
                width={122}
                height={32}
              />
              <Image
                alt=""
                className="logo-white"
                src="/images/logo/logo-white.svg"
                width={122}
                height={31}
              />
            </Link>
          </div>
          <div className="col-xl-5 col-md-4 col-3">
            <ul className="nav-icon">
              <li className="d-inline-flex">
                <a
                  href="#search"
                  data-bs-toggle="offcanvas"
                  className="nav-icon-item text-black link"
                >
                  <i className="icon icon-search" />
                </a>
              </li>
              <li className="br-line d-none d-xl-flex" />
              <li className="d-none d-md-inline-flex">
                <a
                  href="#log"
                  data-bs-toggle="modal"
                  className="nav-icon-item text-black link"
                >
                  <i className="icon icon-user" />
                </a>
              </li>
              <li className="d-none d-md-inline-flex">
                <Link
                  href={`/wishlist`}
                  className="nav-icon-item text-black link"
                >
                  <i className="icon icon-hearth" />
                </Link>
              </li>
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
