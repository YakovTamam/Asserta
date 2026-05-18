"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
export default function Banner() {
  const t = useTranslations("banner");
  return (
    <div className="flat-spacing-3 pt-0 pb-sm-5">
      <div className="container-full-2">
        <div className="banner_V06">
          <div className="bn-image mb-md-0">
            <Image
              src="/images/banner2.png"
              alt=""
              className="lazyload"
              width={3720}
              height={1322}
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
          <div className="bn-content">
            <div className="container">
              <div className="col-md-5 offset-md-7">
                <div className="wrap wow fadeInUp">
                  <h6 className="caption fw-normal">{t("caption")}</h6>
                  <p className="title text-hero-2 font-2">
                    {t("title")} <br className="d-none d-xl-block" />
                    <span className="fst-italic">{t("title2")}</span>
                  </p>
                  <p className="sub-title">{t("subtitle")}</p>
                  <Link
                    href={`/shop-collection-list`}
                    className="tf-btn btn-fill animate-btn type-large text-uppercase"
                  >
                    {t("cta")}
                    <i className="icon-arrow-left fs-24" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
