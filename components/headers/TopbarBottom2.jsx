import React from "react";
import Link from "next/link";
import CountdownTimer from "../common/Countdown";
import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
export default function TopbarBottom2() {
  return (
    <div className="topbar-botom bg-primary d-none d-xl-block">
      <div className="container-3">
        <div className="row align-items-center">
          <div className="col-3">
            <ul className="box-action justify-content-start">
              <li>
                <i className="icon-phone text-white" />
                <a
                  href="tel:85332453"
                  className="text-caption text-white link-secondary"
                >
                  (61) 8533 2453
                </a>
              </li>
              <li className="br-line bg-white" />
              <li>
                <i className="icon-location text-white" />
                <a
                  href="#register"
                  className="text-caption text-white link-secondary"
                >
                  Our Store
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6">
            <div className="countdown-V01 text-xs text-white">
              <span>Get 30% off and FREE SHIPPING. Sale ends in</span>
              <div className="count-down">
                <div className="js-countdown">
                  <CountdownTimer style={5} />
                </div>
              </div>
              <span>-</span>
              <Link
                href={`/shop-default`}
                className="tf-btn-line style-white-2 lh-20"
              >
                <span className="text-xs">SHOP NOW</span>
              </Link>
            </div>
          </div>
          <div className="col-3">
            <div className="tf-dropdown-wrap justify-content-end">
              <div className="tf-currencies">
                <CurrencySelect topStart light />
              </div>
              <div className="tf-languages">
                <LanguageSelect
                  topStart
                  parentClassName="tf-dropdown-select style-default color-white type-languages"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
