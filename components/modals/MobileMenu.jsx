"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SOCIAL = [
  {
    label: "Instagram", href: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "TikTok", href: "https://tiktok.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
  },
  {
    label: "Pinterest", href: "https://pinterest.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp", href: "https://wa.me/972500000000",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
];

const STATIC_CATEGORIES = [
  { label: "טבעות",    slug: "rings" },
  { label: "שרשראות",  slug: "necklaces" },
  { label: "עגילים",   slug: "earrings" },
  { label: "טניס",     slug: "tennis" },
  { label: "גברים",    slug: "men" },
  { label: "חדש",      slug: "new" },
];

const KF = `
  @keyframes luxShimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes floatUp {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-4px); }
  }
`;

export default function MobileMenu() {
  const [products,    setProducts]    = useState([]);
  const [categories,  setCategories]  = useState(STATIC_CATEGORIES);
  const [viewed,      setViewed]      = useState([]);
  const [activeSlug,  setActiveSlug]  = useState(null);
  const [isOpen,      setIsOpen]      = useState(false);

  /* Detect offcanvas open/close */
  useEffect(() => {
    const el = document.getElementById("mobileMenu");
    if (!el) return;
    const onShow = () => setIsOpen(true);
    const onHide = () => setIsOpen(false);
    el.addEventListener("show.bs.offcanvas",   onShow);
    el.addEventListener("hidden.bs.offcanvas", onHide);
    return () => {
      el.removeEventListener("show.bs.offcanvas",   onShow);
      el.removeEventListener("hidden.bs.offcanvas", onHide);
    };
  }, []);

  /* Fetch products + categories */
  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(r => r.json()).catch(() => []),
      fetch("/api/categories").then(r => r.json()).catch(() => []),
    ]).then(([prods, cats]) => {
      setProducts(Array.isArray(prods) ? prods.slice(0, 12) : []);
      if (Array.isArray(cats) && cats.length > 0) {
        setCategories(cats.map(c => ({ label: c.name_he || c.name_en, slug: c.slug })));
      }
    });
    /* Load viewed products from localStorage */
    try {
      const v = JSON.parse(localStorage.getItem("viewed_products") || "[]");
      setViewed(v);
    } catch {}
  }, []);

  const displayProducts = viewed.length > 0
    ? products.filter(p => viewed.includes(p.id)).concat(products.filter(p => !viewed.includes(p.id))).slice(0, 10)
    : products.slice(0, 10);

  const filtered = activeSlug
    ? products.filter(p => p.categories?.some(c => c.slug === activeSlug))
    : displayProducts;

  const sectionTitle = activeSlug
    ? categories.find(c => c.slug === activeSlug)?.label || "מוצרים"
    : viewed.length > 0 ? "Inspired By Your Taste" : "Best Sellers";

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="mobileMenu"
      style={{
        background: "linear-gradient(160deg, rgba(18,18,20,0.97) 0%, rgba(10,10,12,0.99) 100%)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        boxShadow: "4px 0 60px rgba(0,0,0,0.8), inset 1px 0 0 rgba(255,255,255,0.06)",
        border: "none",
        width: "min(360px, 92vw)",
        overflowY: "auto",
        overflowX: "hidden",
        scrollbarWidth: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{KF}</style>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "24px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}>
          <div style={{
            fontSize: 18, fontWeight: 800, letterSpacing: 6,
            background: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.6) 50%, #fff 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "luxShimmer 4s linear infinite",
          }}>
            ASSERTA
          </div>
          <button
            data-bs-dismiss="offcanvas"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 18, transition: "all 0.2s",
            }}
          >
            ×
          </button>
        </div>

        {/* ── Category pills ── */}
        <div style={{ padding: "20px 0 0", flexShrink: 0 }}>
          <p style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 3,
            color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
            padding: "0 20px", marginBottom: 14,
          }}>
            Collections
          </p>
          <div style={{
            display: "flex", gap: 8, overflowX: "auto",
            padding: "4px 20px 16px", scrollbarWidth: "none",
          }}>
            <PillBtn
              label="הכל"
              active={activeSlug === null}
              onClick={() => setActiveSlug(null)}
            />
            {categories.map(cat => (
              <PillBtn
                key={cat.slug}
                label={cat.label}
                active={activeSlug === cat.slug}
                onClick={() => setActiveSlug(activeSlug === cat.slug ? null : cat.slug)}
              />
            ))}
          </div>
        </div>

        {/* ── Products section ── */}
        <div style={{ flexShrink: 0 }}>
          <p style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 3,
            color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
            padding: "0 20px", marginBottom: 14,
          }}>
            {sectionTitle}
          </p>

          {filtered.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, padding: "0 20px 20px" }}>
              אין מוצרים
            </p>
          ) : (
            <div style={{
              display: "flex", gap: 14, overflowX: "auto",
              padding: "4px 20px 24px", scrollbarWidth: "none",
            }}>
              {filtered.map((p, i) => (
                <LuxProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* ── Divider ── */}
        <div style={{
          margin: "0 20px",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          flexShrink: 0,
        }} />

        {/* ── Nav links ── */}
        <nav style={{ padding: "20px 20px", flexShrink: 0 }}>
          {[
            { label: "החנות",        href: "/shop-collection-list" },
            { label: "אודות Asserta", href: "/about-us" },
            { label: "צרו קשר",      href: "/contact-us" },
            { label: "מדיניות פרטיות",href: "/privacy" },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -16 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                data-bs-dismiss="offcanvas"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.75)", textDecoration: "none",
                  fontSize: 14, fontWeight: 500, letterSpacing: 0.3,
                  transition: "color 0.2s",
                }}
              >
                {item.label}
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>›</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* ── Spacer ── */}
        <div style={{ flex: 1 }} />

        {/* ── Social icons ── */}
        <div style={{
          padding: "20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}>
          <p style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 3,
            color: "rgba(255,255,255,0.25)", textTransform: "uppercase",
            marginBottom: 14,
          }}>
            Follow Us
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {SOCIAL.map(s => (
              <SocialBtn key={s.label} {...s} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Pill button ── */
function PillBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 16px",
      borderRadius: 100,
      border: `1px solid ${active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)"}`,
      background: active
        ? "rgba(255,255,255,0.12)"
        : "rgba(255,255,255,0.04)",
      backdropFilter: "blur(8px)",
      color: active ? "#fff" : "rgba(255,255,255,0.55)",
      fontSize: 12, fontWeight: active ? 700 : 400,
      cursor: "pointer", whiteSpace: "nowrap",
      boxShadow: active ? "0 0 12px rgba(255,255,255,0.08)" : "none",
      transition: "all 0.25s ease",
      flexShrink: 0,
    }}>
      {label}
    </button>
  );
}

/* ── Luxury product card ── */
function LuxProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      style={{ flexShrink: 0, width: 130 }}
    >
      <Link
        href={`/product-default/${product.id}`}
        data-bs-dismiss="offcanvas"
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div style={{
          width: 130, height: 160,
          borderRadius: 14,
          overflow: "hidden",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          boxShadow: hovered
            ? "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)"
            : "0 8px 24px rgba(0,0,0,0.4)",
          transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
          transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        }}>
          {product.imgSrc ? (
            <Image
              src={product.imgSrc}
              alt={product.title}
              fill
              style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
              unoptimized
            />
          ) : (
            <div style={{
              width: "100%", height: "100%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32,
            }}>💍</div>
          )}

          {/* Reflection overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

          {/* Badge */}
          {product.badge && (
            <div style={{
              position: "absolute", top: 8, right: 8,
              background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 9, fontWeight: 700,
              padding: "3px 8px", borderRadius: 100,
              letterSpacing: 0.5,
            }}>
              {product.badge}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "10px 2px 0" }}>
          <p style={{
            color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 500,
            lineHeight: 1.3, marginBottom: 4,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {product.title}
          </p>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600,
            letterSpacing: 0.3,
          }}>
            ₪{Number(product.price).toLocaleString("he-IL")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Social button ── */
function SocialBtn({ label, href, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}`,
        background: hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
        color: hovered ? "#fff" : "rgba(255,255,255,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        boxShadow: hovered ? "0 0 16px rgba(255,255,255,0.1)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      {icon}
    </a>
  );
}
