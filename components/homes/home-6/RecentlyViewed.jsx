"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function RecentlyViewed() {
  const [items, setItems] = useState(null); // null = loading, [] = none

  useEffect(() => {
    async function load() {
      let ids = [];
      try {
        const raw = localStorage.getItem("viewed_products");
        if (!raw) {
          setItems([]);
          return;
        }
        ids = JSON.parse(raw);
        if (!Array.isArray(ids) || ids.length === 0) {
          setItems([]);
          return;
        }
      } catch {
        setItems([]);
        return;
      }

      try {
        const res = await fetch("/api/products");
        const allProducts = await res.json();
        if (!Array.isArray(allProducts)) {
          setItems([]);
          return;
        }

        // Filter and keep localStorage order, max 6
        const map = {};
        allProducts.forEach((p) => {
          map[String(p.id)] = p;
        });

        const ordered = ids
          .map((id) => map[String(id)])
          .filter(Boolean)
          .slice(0, 6);

        setItems(ordered);
      } catch {
        setItems([]);
      }
    }

    load();
  }, []);

  // Still loading or no items — render nothing
  if (items === null || items.length === 0) return null;

  return (
    <section
      style={{
        padding: "60px 20px",
        background: "#f9f9f9",
        direction: "rtl",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#111",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            צפית לאחרונה
          </h2>
          <p style={{ fontSize: 13, color: "#999", margin: 0 }}>
            המוצרים שסקרת לאחרונה
          </p>
        </div>

        {/* Horizontal scroll row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            padding: "8px 0 16px",
          }}
        >
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/product-default/${product.id}`}
              style={{
                width: 160,
                flexShrink: 0,
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: 160,
                  height: 180,
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "linear-gradient(135deg,#1a1a2e,#16213e)",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {product.imgSrc ? (
                  <img
                    src={product.imgSrc}
                    alt={product.title || ""}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: 36 }}>💍</span>
                )}
              </div>

              {/* Title — 2 lines clamped */}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#222",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  marginBottom: 4,
                }}
              >
                {product.title || product.title_he || ""}
              </div>

              {/* Price */}
              <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
                ₪{Number(product.price).toLocaleString("he-IL")}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
