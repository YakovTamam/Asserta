"use client";

import { use } from "react";
import Link from "next/link";
import { useState } from "react";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

const styles = {
  page: {
    backgroundColor: "#111",
    minHeight: "100vh",
    direction: "rtl",
    color: "#fff",
  },
  breadcrumb: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "20px 24px 0",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#666",
    flexWrap: "wrap",
  },
  breadcrumbLink: {
    color: "#888",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  breadcrumbSep: {
    color: "#444",
    fontSize: 11,
  },
  layout: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "40px 24px 80px",
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 48,
  },
  imageWrap: {
    width: "100%",
    maxWidth: 400,
    margin: "0 auto",
    aspectRatio: "1 / 1",
    borderRadius: 20,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 120,
    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  },
  infoCol: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#fff",
    color: "#111",
    fontSize: 12,
    fontWeight: 700,
    padding: "5px 14px",
    borderRadius: 20,
    letterSpacing: "0.06em",
    alignSelf: "flex-start",
  },
  categoryBreadcrumb: {
    fontSize: 13,
    color: "#888",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "clamp(24px, 4vw, 40px)",
    fontWeight: 300,
    fontFamily: "serif",
    color: "#fff",
    margin: 0,
    lineHeight: 1.2,
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    flexWrap: "wrap",
  },
  priceNew: {
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.01em",
  },
  priceOld: {
    fontSize: 20,
    color: "#666",
    textDecoration: "line-through",
    fontWeight: 400,
  },
  divider: {
    height: 1,
    backgroundColor: "#222",
    margin: "4px 0",
  },
  description: {
    fontSize: 15,
    color: "#ccc",
    lineHeight: 1.8,
    margin: 0,
  },
  specsTitle: {
    fontSize: 13,
    color: "#888",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  specsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  specChip: {
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 13,
    color: "#ddd",
    lineHeight: 1.4,
  },
  specLabel: {
    color: "#888",
    marginLeft: 6,
    fontSize: 12,
  },
  addToCartBtn: {
    width: "100%",
    height: 52,
    backgroundColor: "#fff",
    color: "#111",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: "0.04em",
    transition: "background-color 0.2s, color 0.2s",
    fontFamily: "inherit",
  },
  wishlistLink: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    textDecoration: "none",
    cursor: "pointer",
    letterSpacing: "0.02em",
    display: "block",
    marginTop: 4,
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#888",
    textDecoration: "none",
    fontSize: 13,
    marginTop: 8,
    transition: "color 0.2s",
  },
  notFound: {
    textAlign: "center",
    padding: "120px 24px",
    color: "#666",
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: 300,
    color: "#fff",
    marginBottom: 16,
  },
};

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const product = DEMO_PRODUCTS.find((p) => p.id === id);
  const [added, setAdded] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  if (!product) {
    return (
      <div style={styles.page}>
        <Header1 parentClass="tf-header" />
        <div style={styles.notFound}>
          <h2 style={styles.notFoundTitle}>מוצר לא נמצא</h2>
          <Link
            href="/shop-collection-list"
            style={{ color: "#888", fontSize: 14, textDecoration: "underline" }}
          >
            חזרה לחנות
          </Link>
        </div>
        <Footer1 />
      </div>
    );
  }

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={styles.page}>
      <Header1 parentClass="tf-header" />

      <nav style={styles.breadcrumb}>
        <Link href="/" style={styles.breadcrumbLink}>בית</Link>
        <span style={styles.breadcrumbSep}>›</span>
        <Link href="/shop-collection-list" style={styles.breadcrumbLink}>חנות</Link>
        <span style={styles.breadcrumbSep}>›</span>
        <span style={{ color: "#ccc" }}>{product.title}</span>
      </nav>

      <div style={styles.layout} className="product-layout">
        <style>{`
          @media (min-width: 768px) {
            .product-layout {
              grid-template-columns: 1fr 1fr !important;
              align-items: start;
            }
          }
        `}</style>

        {/* Image */}
        <div
          style={{
            ...styles.imageWrap,
            background: product.gradient,
          }}
        >
          <span>{product.emoji}</span>
        </div>

        {/* Info */}
        <div style={styles.infoCol}>
          {product.badge && (
            <span style={styles.badge}>{product.badge}</span>
          )}

          <div style={styles.categoryBreadcrumb}>{product.categoryName}</div>

          <h1 style={styles.title}>{product.title}</h1>

          <div style={styles.priceRow}>
            <span style={styles.priceNew}>
              ₪{Number(product.price).toLocaleString("he-IL")}
            </span>
            {product.oldPrice && (
              <span style={styles.priceOld}>
                ₪{Number(product.oldPrice).toLocaleString("he-IL")}
              </span>
            )}
          </div>

          <div style={styles.divider} />

          <p style={styles.description}>{product.description}</p>

          {product.specs && product.specs.length > 0 && (
            <div>
              <p style={styles.specsTitle}>מפרט</p>
              <div style={styles.specsGrid}>
                {product.specs.map((spec, i) => (
                  <div key={i} style={styles.specChip}>
                    <span style={styles.specLabel}>{spec.label}:</span>{" "}
                    {spec.value}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={styles.divider} />

          <button
            style={{
              ...styles.addToCartBtn,
              backgroundColor: added
                ? "#222"
                : btnHovered
                ? "#f0f0f0"
                : "#fff",
              color: added ? "#fff" : "#111",
            }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            onClick={handleAddToCart}
          >
            {added ? "נוסף לעגלה ✓" : "הוסף לעגלה"}
          </button>

          <a style={styles.wishlistLink} href="#">
            שמור לרשימת המשאלות ♡
          </a>

          <Link
            href="/shop-collection-list"
            style={styles.backLink}
          >
            ← חזרה לחנות
          </Link>
        </div>
      </div>

      <Footer1 />
    </div>
  );
}
