"use client";
import { useState } from "react";
import { products11, products12 } from "@/data/products";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar3 from "@/components/headers/Topbar3";
import Link from "next/link";
import Image from "next/image";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";
import { useTranslations } from "next-intl";

const allShopProducts = [...products11, ...products12];

const categories = [
  { id: "all", labelKey: "all" },
  { id: "rings", labelKey: "rings" },
  { id: "earrings", labelKey: "earrings" },
  { id: "necklaces", labelKey: "necklaces" },
  { id: "bracelets", labelKey: "bracelets" },
  { id: "charms", labelKey: "charms" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const t = useTranslations();

  const categoryLabels = {
    all: t("common.viewAll"),
    rings: t("collections.rings"),
    earrings: t("collections.earrings"),
    necklaces: t("collections.necklaces"),
    bracelets: t("collections.bracelets"),
    charms: t("collections.charms"),
  };

  return (
    <>
      <div className="bg-surface">
        <div id="wrapper">
          <Topbar3 />
          <Header1 parentClass="tf-header" />

          {/* Breadcrumb */}
          <section className="flat-spacing-2 pb-0">
            <div className="container">
              <div className="page-title">
                <div className="breadcrumbs">
                  <ul className="bread-wrap">
                    <li>
                      <Link href="/" className="text-main-4 link-secondary">
                        {t("nav.home")}
                      </Link>
                    </li>
                    <li className="br-line w-12 bg-main" />
                    <li><p>{t("nav.shop")}</p></li>
                  </ul>
                  <h1 className="heading fw-normal text-uppercase">
                    {t("nav.shop")}
                    <span className="number-count"> {allShopProducts.length} </span>
                  </h1>
                </div>
              </div>
            </div>
          </section>

          {/* Category Tabs */}
          <div className="flat-spacing-4 pb-0">
            <div className="container">
              <ul style={{ display: "flex", gap: 8, flexWrap: "wrap", listStyle: "none", padding: 0, margin: 0 }}>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: "7px 18px",
                        borderRadius: 30,
                        border: "1px solid",
                        borderColor: activeCategory === cat.id ? "#111" : "#ddd",
                        background: activeCategory === cat.id ? "#111" : "transparent",
                        color: activeCategory === cat.id ? "#fff" : "#555",
                        fontSize: 13,
                        fontWeight: activeCategory === cat.id ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {categoryLabels[cat.id]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <section className="flat-spacing-6">
            <div className="container">
              <div className="tf-grid-layout sm-col-2 md-col-3 xl-col-4 gap-30">
                {allShopProducts.map((product) => (
                  <div key={product.id} className={`card_product--V01 ${product.outOfStock ? "out-of-stock" : ""}`}>
                    <div className="card_product-wrapper">
                      <Link href={`/product-default/${product.id}`} className="product-img">
                        <Image
                          src={product.imgSrc}
                          alt={product.title}
                          className="lazyload img-product"
                          width={714}
                          height={900}
                        />
                        {product.hoverImgSrc && (
                          <Image
                            src={product.hoverImgSrc}
                            alt={product.title}
                            className="lazyload img-hover"
                            width={714}
                            height={900}
                          />
                        )}
                      </Link>

                      {!product.outOfStock && (
                        <ul className="list-product-btn">
                          <li className="wishlist">
                            <AddtoWishlist product={product} />
                          </li>
                          <li>
                            <AddtoCart product={product} />
                          </li>
                          <li>
                            <QuickView product={product} />
                          </li>
                        </ul>
                      )}

                      {product.badge && (
                        <div className="badge-box">
                          <span className={`badge-item ${product.badgeType || ""}`}>
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {product.outOfStock && (
                        <div className="badge-box">
                          <span className="badge-item">{t("common.soldOut")}</span>
                        </div>
                      )}
                    </div>

                    <div className="card_product-info">
                      <Link
                        href={`/product-default/${product.id}`}
                        className="name-product h5 fw-normal link text-line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      <div className="price-wrap">
                        <span className={`price-new h5 ${product.textColor || ""}`}>
                          ₪{product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="price-old fw-normal">
                            ₪{product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Footer1 />
        </div>
      </div>
    </>
  );
}
