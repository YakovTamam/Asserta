"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const SKELETON_ANIM = `
  @keyframes skeletonPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: "#f0f0f0",
        animation: "skeletonPulse 1.4s ease-in-out infinite",
      }}
    >
      <div style={{ aspectRatio: "1/1", background: "#e0e0e0" }} />
      <div style={{ padding: "14px 16px 18px" }}>
        <div style={{ height: 10, background: "#d8d8d8", borderRadius: 4, marginBottom: 8, width: "50%" }} />
        <div style={{ height: 14, background: "#d0d0d0", borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 12, background: "#d8d8d8", borderRadius: 4, width: "40%" }} />
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const imgSrc = product.imgSrc || null;
  const hoverSrc = product.hoverImgSrc || null;

  function handleAddToCart(e) {
    e.preventDefault();
    if (typeof window !== "undefined" && typeof window.__openCart === "function") {
      window.__openCart();
    }
  }

  const cardStyle = {
    borderRadius: 12,
    overflow: "hidden",
    background: "#fff",
    border: "1px solid #f0f0f0",
    boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.25s ease, transform 0.25s ease",
    transform: hovered ? "translateY(-4px)" : "translateY(0)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
  };

  const imageWrapStyle = {
    position: "relative",
    aspectRatio: "1/1",
    overflow: "hidden",
    borderRadius: "12px 12px 0 0",
    background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.3s ease",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={imageWrapStyle}>
        {imgSrc ? (
          <>
            <img
              src={imgSrc}
              alt={product.title || ""}
              style={{ ...imgStyle, opacity: hovered && hoverSrc ? 0 : 1, position: "absolute", inset: 0 }}
            />
            {hoverSrc && (
              <img
                src={hoverSrc}
                alt=""
                style={{ ...imgStyle, opacity: hovered ? 1 : 0, position: "absolute", inset: 0 }}
              />
            )}
          </>
        ) : (
          <span style={{ fontSize: 48 }}>💍</span>
        )}

        {product.badge && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "#111",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: "0.03em",
            }}
          >
            {product.badge}
          </div>
        )}
      </div>

      <div style={{ padding: "14px 16px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        {product.categoryName && (
          <span style={{ fontSize: 11, color: "#999", fontWeight: 500 }}>
            {product.categoryName}
          </span>
        )}

        <div style={{ fontSize: 15, fontWeight: 700, color: "#111", lineHeight: 1.4, marginBottom: 2 }}>
          {product.title || product.title_he || ""}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>
            ₪{Number(product.price).toLocaleString("he-IL")}
          </span>
          {product.oldPrice && (
            <span style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>
              ₪{Number(product.oldPrice).toLocaleString("he-IL")}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          style={{
            width: "100%",
            padding: "10px 0",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.02em",
            marginBottom: 8,
            transition: "background 0.2s",
          }}
        >
          הוסף לעגלה
        </button>

        <Link
          href={`/product-default/${product.id}`}
          style={{
            display: "block",
            textAlign: "center",
            fontSize: 13,
            color: "#555",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          לפרטים →
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeSlug, setActiveSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);
        const [prodData, catData] = await Promise.all([
          prodRes.json(),
          catRes.json(),
        ]);
        setProducts(Array.isArray(prodData) ? prodData : []);
        setCategories(Array.isArray(catData) ? catData : []);
      } catch (err) {
        console.error("FeaturedProducts fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = activeSlug
    ? products.filter(
        (p) =>
          p.category === activeSlug ||
          (Array.isArray(p.categoryIds) &&
            categories.find((c) => c.slug === activeSlug && p.categoryIds.includes(c.id)))
      )
    : products;

  const displayProducts = filteredProducts.slice(0, 8);

  const pillBase = {
    padding: "7px 18px",
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    border: "1.5px solid #ddd",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  };

  const pillActive = {
    ...pillBase,
    background: "#111",
    color: "#fff",
    border: "1.5px solid #111",
  };

  const pillInactive = {
    ...pillBase,
    background: "#fff",
    color: "#333",
  };

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#fff",
        direction: "rtl",
      }}
    >
      <style>{SKELETON_ANIM}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#111",
              margin: "0 0 10px",
              letterSpacing: "-0.02em",
            }}
          >
            הקולקציה שלנו
          </h2>
          <p style={{ fontSize: 16, color: "#888", margin: 0, fontWeight: 400 }}>
            תכשיטים מעוצבים בעבודת יד
          </p>
        </div>

        {/* Category pills */}
        {!loading && categories.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 36,
            }}
          >
            <button
              style={activeSlug === null ? pillActive : pillInactive}
              onClick={() => setActiveSlug(null)}
            >
              הכל
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                style={cat.slug === activeSlug ? pillActive : pillInactive}
                onClick={() => setActiveSlug(cat.slug)}
              >
                {cat.name_he || cat.name_en}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {!loading && displayProducts.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", marginTop: 40, fontSize: 15 }}>
            אין מוצרים להצגה
          </p>
        )}
      </div>
    </section>
  );
}
