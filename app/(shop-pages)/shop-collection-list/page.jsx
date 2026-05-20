"use client";

import { useState } from "react";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "@/lib/demo-products";


const styles = {
  page: {
    backgroundColor: "#111",
    minHeight: "100vh",
    direction: "rtl",
  },
  hero: {
    padding: "60px 24px 32px",
    maxWidth: 1280,
    margin: "0 auto",
    borderBottom: "1px solid #222",
  },
  heroTitle: {
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: 300,
    color: "#fff",
    letterSpacing: "0.04em",
    margin: 0,
    fontFamily: "serif",
  },
  heroSubtitle: {
    color: "#888",
    marginTop: 8,
    fontSize: 14,
    letterSpacing: "0.06em",
  },
  filtersWrapper: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "24px 24px 0",
  },
  filtersRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  grid: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "32px 24px 80px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    textDecoration: "none",
    display: "block",
    boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  imageBox: {
    aspectRatio: "4/5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(40px, 8vw, 72px)",
    position: "relative",
  },
  badgePill: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#111",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 20,
    letterSpacing: "0.05em",
  },
  cardBody: {
    padding: "14px 16px 18px",
    borderTop: "1px solid #f0f0f0",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111",
    margin: 0,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  priceNew: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111",
  },
  priceOld: {
    fontSize: 13,
    color: "#aaa",
    textDecoration: "line-through",
    fontWeight: 400,
  },
  empty: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#666",
    padding: "80px 0",
    fontSize: 16,
  },
};

function filterTabStyle(active) {
  return {
    padding: "8px 20px",
    borderRadius: 30,
    border: "1px solid",
    borderColor: active ? "#fff" : "#333",
    background: active ? "#fff" : "transparent",
    color: active ? "#111" : "#aaa",
    fontSize: 13,
    fontWeight: active ? 700 : 400,
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.03em",
    fontFamily: "inherit",
  };
}

function gridStyle(isMounted) {
  if (!isMounted) return { ...styles.grid };
  return {
    ...styles.grid,
    gridTemplateColumns:
      typeof window !== "undefined" && window.innerWidth >= 768
        ? "repeat(4, 1fr)"
        : "repeat(2, 1fr)",
  };
}

export default function ShopCollectionListPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hovered, setHovered] = useState(null);

  const allCategories = [
    { id: "all", name: "הכל" },
    ...DEMO_CATEGORIES.map((c) => ({ id: c.slug, name: c.name })),
  ];

  const filtered =
    activeCategory === "all"
      ? DEMO_PRODUCTS
      : DEMO_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div style={styles.page}>
      <Header1 parentClass="tf-header" />

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>הקולקציה שלנו</h1>
        <p style={styles.heroSubtitle}>
          {filtered.length} פריטים{" "}
          {activeCategory !== "all" &&
            `· ${allCategories.find((c) => c.id === activeCategory)?.name}`}
        </p>
      </div>

      <div style={styles.filtersWrapper}>
        <ul style={styles.filtersRow}>
          {allCategories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setActiveCategory(cat.id)}
                style={filterTabStyle(activeCategory === cat.id)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          ...styles.grid,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
        className="shop-grid"
      >
        <style>{`
          @media (min-width: 768px) {
            .shop-grid {
              grid-template-columns: repeat(4, 1fr) !important;
            }
          }
        `}</style>

        {filtered.length === 0 ? (
          <p style={styles.empty}>אין מוצרים בקטגוריה זו</p>
        ) : (
          filtered.map((product) => (
            <Link
              key={product.id}
              href={`/product-default/${product.id}`}
              style={{
                ...styles.card,
                transform: hovered === product.id ? "translateY(-4px)" : "none",
                boxShadow:
                  hovered === product.id
                    ? "0 8px 28px rgba(0,0,0,0.7)"
                    : "0 2px 12px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  ...styles.imageBox,
                  background: product.gradient,
                }}
              >
                <span>{product.emoji}</span>
                {product.badge && (
                  <span style={styles.badgePill}>{product.badge}</span>
                )}
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardTitle}>{product.title}</p>
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
              </div>
            </Link>
          ))
        )}
      </div>

      <Footer1 />
    </div>
  );
}
