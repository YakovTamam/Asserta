import React from "react";
import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";

export default function TopbarBottom() {
  return (
    <div className="topbar-botom bg-white d-none d-xl-block">
      <div className="container-2">
        <div className="row align-items-center">
          <div className="col-4">
            <div className="tf-dropdown-wrap">
              <div className="tf-currencies">
                <CurrencySelect topStart />
              </div>
              <div className="tf-languages">
                <LanguageSelect topStart />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="box-suport">
              <p className="text-caption fw-medium">
                <i className="icon-headphone-2" />
                <span>Support 24/7</span>
                <span>-</span>
              </p>
              <a href="tel:85332453" className="text-caption fw-medium link">
                (61) 8533 2453
              </a>
            </div>
          </div>
          <div className="col-4">
            <ul className="box-action">
              <li>
                <a
                  href="#log"
                  data-bs-toggle="modal"
                  className="text-caption link"
                >
                  Sign in
                </a>
              </li>
              <li className="br-line" />
              <li>
                <a
                  href="#register"
                  data-bs-toggle="modal"
                  className="text-caption link"
                >
                  Sign up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
