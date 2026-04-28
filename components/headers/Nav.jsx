"use client";
import { products5 } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import QuickView from "../common/QuickView";
import {
  blogMenuLinks,
  demoPages,
  otherPages,
  productDetailPages,
  shopPages,
} from "@/data/menu";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Nav({ megaMarginRight = true }) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  const isMenuParentActive = (menu) => {
    return menu.some((elm) => isMenuActive(elm));
  };
  const isMenuParentActive2 = (menu) => {
    return menu.some((elm) => isMenuParentActive(elm.links));
  };
  return (
    <>
      <li
        className={`menu-item ${isMenuParentActive(demoPages) ? "active" : ""}`}
      >
        <a href="#" className="item-link">
          {t("home")}
          <i className="icon icon-arrow-angle-down" />
        </a>
        <div className="sub-menu mega-home start-0">
          <ul className="row-demo">
            {demoPages.map((page, index) => (
              <li
                key={index}
                className={`demo-item ${isMenuActive(page) ? "active" : ""}`}
              >
                <Link href={page.href}>
                  <div className="demo-image relative">
                    <Image
                      src={page.imgSrc}
                      alt={page.name}
                      className="lazyload"
                      width={417}
                      height={555}
                    />
                  </div>
                  <p className="demo-name">
                    {page.name}
                    {page.label && (
                      <span
                        className={`demo-label ${page.labelType || ""}`.trim()}
                      >
                        {page.label}
                      </span>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-2 text-coming">
            {t("moreComing")}
          </p>
        </div>
      </li>
      <li
        className={`menu-item  ${
          isMenuParentActive2(shopPages) ? "active" : ""
        }`}
      >
        <a href="#" className="item-link">
          {t("shop")}
          <i className="icon icon-arrow-angle-down" />
        </a>
        <div
          className={`sub-menu mega-menu container-layout-right${
            megaMarginRight ? "-2" : ""
          } mega-menu-shop mega-menu-style-2`}
        >
          <div className="mega-menu-wrap">
            <div className="wrapper-sub-menu">
              {shopPages.map((section, index) => (
                <div className="mega-menu-item" key={index}>
                  <p className="text-caption menu-heading">{section.heading}</p>
                  <ul className="menu-list">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href2 ? link.href2 : link.href}
                          className={`menu-link-text link ${
                            isMenuActive(link) ? "active" : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="wrapper-sub-collection">
              <div className="box_image--V01 h-100 hover-img">
                <div className="image h-100 img-style">
                  <Image
                    src="/images/collections/cls-header.jpg"
                    alt=""
                    className="lazyload"
                    width={1188}
                    height={914}
                  />
                </div>
                <div className="content">
                  <h5 className="box-text fw-medium text-white">
                    <span>Flash Sale</span>
                    <span className="br-line w-22 bg-white d-block" />
                    <span>30% OFF</span>
                  </h5>
                  <div className="box-btn">
                    <Link
                      href={`/shop-collection-list`}
                      className="tf-btn-line style-white text-uppercase"
                    >
                      <span className="text-caption lh-28">Shop Now</span>
                      <i className="icon-arrow-top-right-2 fs-10" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item   ${
          isMenuParentActive2(productDetailPages) ? "active" : ""
        }`}
      >
        <a href="#" className="item-link">
          {t("products")}
          <i className="icon icon-arrow-angle-down" />
        </a>
        <div className="sub-menu mega-menu mega-menu-product">
          <div className="container-layout-right">
            <div className="mega-menu-wrap">
              <div className="wrapper-sub-menu">
                {productDetailPages.map((section, sectionIndex) => (
                  <div className="mega-menu-item" key={sectionIndex}>
                    <p className="text-caption menu-heading">
                      {section.heading}
                    </p>
                    <ul className="menu-list">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href2 ? link.href2 : link.href}
                            className={`menu-link-text link ${
                              isMenuActive(link) ? "active" : ""
                            }`}
                          >
                            <>
                              {link.label}
                              {link.badge && (
                                <span
                                  className={`demo-label ${
                                    link.badgeType || ""
                                  }`.trim()}
                                >
                                  {link.badge}
                                </span>
                              )}
                            </>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="wrapper-sub-collection">
                {products5.slice(0, 2).map((product, i) => (
                  <div key={i} className="card_product--V01">
                    <div className="card_product-wrapper aspect-ratio-1">
                      <Link
                        href={`/product-default/${product.id}`}
                        className="product-img"
                      >
                        <Image
                          src={product.imgSrc}
                          alt="Image Product"
                          className="lazyload img-product"
                          width={714}
                          height={900}
                        />
                        <Image
                          src={product.hoverImgSrc}
                          alt="Image Product"
                          className="lazyload img-hover"
                          width={714}
                          height={900}
                        />
                      </Link>
                      <ul className="list-product-btn center">
                        <li>
                          <QuickView product={product} />
                        </li>
                      </ul>
                    </div>
                    <div className="card_product-info">
                      <Link
                        href={`/product-default/${product.id}`}
                        className="name-product h5 fw-normal link text-line-clamp-2"
                      >
                        Engagement Ring in 18k Yellow Gold
                      </Link>
                      <div className="price-wrap">
                        <span className="price-new h5">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="price-old fw-normal">
                            {" "}
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`sub-menu mega-menu mega-menu-page container-layout-right${
          megaMarginRight ? "-3" : ""
        } mega-menu-style-2`}
      >
        <a href="#" className="item-link">
          {t("about")}
          <i className="icon icon-arrow-angle-down" />
        </a>
        <div className="sub-menu mega-menu mega-menu-page container-layout-right-3 mega-menu-style-2">
          <div className="mega-menu-wrap">
            <div className="wrapper-sub-menu">
              <div className="mega-menu-item">
                <p className="text-caption menu-heading">PAGES</p>
                <ul className="menu-list">
                  {otherPages.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className={`menu-link-text link ${
                          isMenuActive(link) ? "active" : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="wrapper-sub-collection gap-0">
              <div className="box_image--V01 h-100 hover-img">
                <div className="image h-100 img-style">
                  <Image
                    src="/images/collections/cls-header-2.jpg"
                    alt=""
                    className="lazyload"
                    width={792}
                    height={914}
                  />
                </div>
                <div className="content">
                  <h5 className="box-text fw-medium text-white">Most Gifted</h5>
                  <div className="box-btn">
                    <Link
                      href={`/shop-collection-list`}
                      className="tf-btn-line style-white text-uppercase"
                    >
                      <span className="text-caption lh-28">Shop Now</span>
                      <i className="icon-arrow-top-right-2 fs-10" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="box_image--V01 h-100 hover-img">
                <div className="image h-100 img-style">
                  <Image
                    src="/images/collections/cls-header-3.jpg"
                    alt=""
                    className="lazyload"
                    width={792}
                    height={914}
                  />
                </div>
                <div className="content">
                  <h5 className="box-text fw-medium text-white">
                    <span>Flash Sale</span>
                    <span className="br-line w-22 bg-white d-block" />
                    <span>30% OFF</span>
                  </h5>
                  <div className="box-btn">
                    <Link
                      href={`/shop-collection-list`}
                      className="tf-btn-line style-white text-uppercase"
                    >
                      <span className="text-caption lh-28">Shop Now</span>
                      <i className="icon-arrow-top-right-2 fs-10" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item position-relative   ${
          isMenuParentActive(blogMenuLinks) ? "active" : ""
        }`}
      >
        <a href="#" className="item-link">
          {t("blog")}
          <i className="icon icon-arrow-angle-down" />
        </a>
        <div className="sub-menu">
          <div className="mega-menu-item">
            <p className="text-caption menu-heading">BLOGS</p>
            <ul className="menu-list">
              {blogMenuLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={`menu-link-text link ${
                      isMenuActive(link) ? "active" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
    </>
  );
}
