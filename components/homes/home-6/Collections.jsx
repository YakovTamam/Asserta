"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import AddtoWishlist from "@/components/common/AddtoWishlist";
import AddtoCart from "@/components/common/AddtoCart";
import QuickView from "@/components/common/QuickView";

export default function Collections() {
  const [products,       setProducts]       = useState([]);
  const [categories,     setCategories]     = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(r => r.json()),
      fetch("/api/categories").then(r => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(Array.isArray(prods) ? prods : []);
      setCategories(Array.isArray(cats)  ? cats  : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "all"
    ? products
    : products.filter(p => p.categories?.some(c => c.slug === activeCategory));

  if (loading || products.length === 0) return null;

  return (
    <section style={{ padding:"48px 0 40px", background:"#fff", direction:"rtl" }}>
      <div className="container">

        {/* Title */}
        <h2 style={{ fontSize:26, fontWeight:800, textAlign:"center", marginBottom:20, color:"#111", letterSpacing:-0.5 }}>
          חדש באתר
        </h2>

        {/* Category pills */}
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", scrollbarWidth:"none", marginBottom:28 }}>
          <div style={{ display:"flex", gap:8, width:"max-content", margin:"0 auto", padding:"0 4px 4px" }}>
            <button onClick={() => setActiveCategory("all")} style={pill(activeCategory === "all")}>
              הכל
            </button>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.slug)} style={pill(activeCategory === cat.slug)}>
                {cat.name_he || cat.name_en}
              </button>
            ))}
          </div>
        </div>

        {/* Products swiper */}
        {filtered.length === 0 ? (
          <p style={{ textAlign:"center", color:"#aaa", padding:"40px 0" }}>אין מוצרים בקטגוריה זו</p>
        ) : (
          <Swiper
            className="swiper tf-swiper"
            breakpoints={{
              0:    { slidesPerView: 1.35, spaceBetween: 12 },
              575:  { slidesPerView: 2,    spaceBetween: 16 },
              768:  { slidesPerView: 3,    spaceBetween: 20 },
              1200: { slidesPerView: 4,    spaceBetween: 24 },
            }}
            modules={[Navigation]}
            navigation={{ nextEl: ".col-next", prevEl: ".col-prev" }}
          >
            {filtered.map(item => (
              <SwiperSlide key={item.id}>
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
}

function pill(active) {
  return {
    padding: "9px 20px",
    borderRadius: 100,
    border: "none",
    background: active ? "#111" : "#f3f3f3",
    color:  active ? "#fff" : "#444",
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.15s",
  };
}

function ProductCard({ item }) {
  return (
    <div style={{ borderRadius:16, overflow:"hidden", background:"#fff", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", display:"flex", flexDirection:"column" }}>

      {/* Image */}
      <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden", background:"#f5f5f5" }}>
        <Link href={`/product-default/${item.id}`}>
          <Image
            src={item.imgSrc || "/images/placeholder.jpg"}
            alt={item.title}
            fill
            style={{ objectFit:"cover" }}
            unoptimized
          />
        </Link>

        {/* Badges */}
        <div style={{ position:"absolute", top:10, right:10, display:"flex", flexDirection:"column", gap:6, zIndex:2 }}>
          {item.badge && (
            <span style={{ background:"#f97316", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:20, display:"inline-flex", alignItems:"center", gap:4 }}>
              {item.badge}
            </span>
          )}
          {item.oldPrice && (
            <span style={{ background:"#fff", color:"#333", fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20, border:"1px solid #eee" }}>
              Special Price
            </span>
          )}
        </div>

        {/* Action buttons */}
        {!item.outOfStock && (
          <ul className="list-product-btn" style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)" }}>
            <li className="wishlist"><AddtoWishlist product={item} /></li>
            <li><AddtoCart product={item} /></li>
            <li><QuickView product={item} /></li>
          </ul>
        )}
      </div>

      {/* Info */}
      <div style={{ padding:"14px 14px 0" }}>
        <Link href={`/product-default/${item.id}`}
          style={{ fontSize:14, fontWeight:600, color:"#111", textDecoration:"none", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", lineHeight:1.4, marginBottom:8 }}>
          {item.title}
        </Link>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <span style={{ fontSize:15, fontWeight:700, color:"#111" }}>₪{Number(item.price).toLocaleString("he-IL")}</span>
          {item.oldPrice && (
            <span style={{ fontSize:13, color:"#aaa", textDecoration:"line-through" }}>₪{Number(item.oldPrice).toLocaleString("he-IL")}</span>
          )}
        </div>
      </div>

      {/* Specs */}
      {item.specs?.length > 0 && (
        <div style={{ margin:"0 14px 14px", padding:"10px 0 0", borderTop:"1px solid #f0f0f0", display:"flex", overflowX:"auto", scrollbarWidth:"none" }}>
          {item.specs.map((spec, i) => (
            <div key={i} style={{ flex:"0 0 auto", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"0 10px", borderRight: i < item.specs.length - 1 ? "1px solid #ececec" : "none", minWidth:60 }}>
              {spec.icon_url && <img src={spec.icon_url} alt="" style={{ width:26, height:26, objectFit:"contain" }} />}
              <span style={{ fontSize:12, fontWeight:700, color:"#111" }}>{spec.value}</span>
              <span style={{ fontSize:10, color:"#888" }}>{spec.label}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
