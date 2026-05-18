"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
export default function Collections2() {
  const t = useTranslations();
  return (
    <div className="flat-spacing-3 pb-0">
      <div className="container-full-2">
        <div className="tf-grid-layout sm-col-2 gap-x-10">
          <div className="wg-cls hover-img wow fadeInUp">
            <Link href={`/shop-default`} className="image img-style">
              <Image
                src="/images/collections/cls-27.jpg"
                alt=""
                className="lazyload"
                width={1850}
                height={1044}
              />
            </Link>
            <div className="content">
              <h3 className="title text-uppercase">{t("home.giftUnder")}</h3>
              <Link
                href={`/shop-default`}
                className="tf-btn btn-def-2 type-black"
              >
                {t("common.shopNow")}
                <i className="icon icon-arrow-top-right" />
              </Link>
            </div>
          </div>
          <div className="wg-cls hover-img wow fadeInUp">
            <Link href={`/shop-default`} className="image img-style">
              <Image
                src="/images/collections/cls-28.jpg"
                alt=""
                className="lazyload"
                width={1850}
                height={1044}
              />
            </Link>
            <div className="content">
              <h3 className="title text-uppercase">{t("home.personalisedGifts")}</h3>
              <Link
                href={`/shop-default`}
                className="tf-btn btn-def-2 type-black"
              >
                {t("common.shopNow")}
                <i className="icon icon-arrow-top-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
