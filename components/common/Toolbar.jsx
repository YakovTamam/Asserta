"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
export default function Toolbar() {
  const t = useTranslations();
  return (
    <div className="tf-toolbar-bottom">
      <div className="toolbar-item">
        <Link href={`/shop-collection-list`}>
          <span className="toolbar-icon">
            <i className="icon icon-menu-home" />
          </span>
          <span className="toolbar-label">{t("nav.shop")}</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <a href="#search" data-bs-toggle="offcanvas">
          <span className="toolbar-icon">
            <i className="icon icon-search-2" />
          </span>
          <span className="toolbar-label">{t("header.search")}</span>
        </a>
      </div>
      <div className="toolbar-item">
        <Link href={`/account-page`}>
          <span className="toolbar-icon">
            <i className="icon icon-user-2" />
          </span>
          <span className="toolbar-label">{t("header.account")}</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <Link href={`/wishlist`}>
          <span className="toolbar-icon">
            <i className="icon icon-hearth-3" />
            <span className="toolbar-count">0</span>
          </span>
          <span className="toolbar-label">{t("header.wishlist")}</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <Link href={`/shop-cart`}>
          <span className="toolbar-icon">
            <i className="icon icon-cart-2" />
            <span className="toolbar-count">0</span>
          </span>
          <span className="toolbar-label">{t("header.cart")}</span>
        </Link>
      </div>
    </div>
  );
}
