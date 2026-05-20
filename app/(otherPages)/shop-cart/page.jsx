"use client";

import { useState } from "react";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

const INITIAL_ITEMS = [
  { ...DEMO_PRODUCTS.find((p) => p.id === "demo-1"), qty: 1 },
  { ...DEMO_PRODUCTS.find((p) => p.id === "demo-3"), qty: 1 },
].filter(Boolean);

const s = {
  page: {
    backgroundColor: "#111",
    minHeight: "100vh",
    direction: "rtl",
    color: "#fff",
  },
  container: {
    maxWidth: 900,
    margin: "0 auto",
    padding: "40px 24px 100px",
  },
  pageTitle: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: 300,
    fontFamily: "serif",
    color: "#fff",
    margin: "0 0 8px",
    letterSpacing: "0.02em",
  },
  pageSubtitle: {
    color: "#666",
    fontSize: 14,
    marginBottom: 40,
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    marginBottom: 40,
  },
  itemRow: {
    display: "grid",
    gridTemplateColumns: "64px 1fr auto auto",
    gap: 16,
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: "16px 20px",
    marginBottom: 8,
  },
  emojiBox: {
    width: 64,
    height: 64,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    flexShrink: 0,
  },
  itemInfo: {
    minWidth: 0,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    margin: "0 0 4px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemPrice: {
    fontSize: 14,
    color: "#aaa",
    margin: 0,
  },
  qtyControl: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    border: "1px solid #333",
    borderRadius: 8,
    overflow: "hidden",
    height: 36,
  },
  qtyBtn: {
    width: 32,
    height: 36,
    backgroundColor: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    transition: "background-color 0.15s",
  },
  qtyValue: {
    width: 32,
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
    borderRight: "1px solid #333",
    borderLeft: "1px solid #333",
    lineHeight: "36px",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#555",
    fontSize: 22,
    cursor: "pointer",
    lineHeight: 1,
    padding: "4px 6px",
    borderRadius: 6,
    transition: "color 0.15s",
    fontFamily: "inherit",
  },
  divider: {
    height: 1,
    backgroundColor: "#222",
    margin: "32px 0",
  },
  summaryCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: "28px 28px 24px",
    border: "1px solid #222",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    margin: "0 0 20px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    fontSize: 14,
  },
  summaryLabel: {
    color: "#888",
  },
  summaryValue: {
    color: "#ddd",
    fontWeight: 500,
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid #2a2a2a",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
  },
  checkoutBtn: {
    width: "100%",
    height: 52,
    backgroundColor: "#fff",
    color: "#111",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 24,
    letterSpacing: "0.04em",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
    fontFamily: "inherit",
  },
  continueLink: {
    display: "block",
    textAlign: "center",
    marginTop: 16,
    color: "#888",
    textDecoration: "none",
    fontSize: 14,
    transition: "color 0.2s",
  },
  emptyState: {
    textAlign: "center",
    padding: "100px 24px",
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 24,
    display: "block",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 300,
    fontFamily: "serif",
    color: "#fff",
    marginBottom: 12,
  },
  emptySubtitle: {
    color: "#777",
    fontSize: 15,
    marginBottom: 32,
  },
  shopBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    color: "#111",
    textDecoration: "none",
    borderRadius: 10,
    padding: "14px 32px",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.03em",
    transition: "background-color 0.2s",
  },
};

export default function ShopCartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [checkoutHovered, setCheckoutHovered] = useState(false);

  function updateQty(id, delta) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
    );
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div style={s.page}>
        <Header1 parentClass="tf-header" />
        <div style={s.emptyState}>
          <span style={s.emptyEmoji}>🛍️</span>
          <h2 style={s.emptyTitle}>העגלה שלך ריקה</h2>
          <p style={s.emptySubtitle}>הוסף פריטים מהחנות שלנו</p>
          <Link href="/shop-collection-list" style={s.shopBtn}>
            לקנייה עכשיו
          </Link>
        </div>
        <Footer1 />
      </div>
    );
  }

  return (
    <div style={s.page}>
      <Header1 parentClass="tf-header" />

      <div style={s.container}>
        <h1 style={s.pageTitle}>עגלת הקניות</h1>
        <p style={s.pageSubtitle}>{items.length} פריטים בעגלה</p>

        {/* Items */}
        <div style={s.itemsList}>
          {items.map((item) => (
            <div key={item.id} style={s.itemRow} className="cart-item-row">
              <style>{`
                .cart-item-row {
                  grid-template-columns: 64px 1fr auto auto;
                }
                @media (max-width: 500px) {
                  .cart-item-row {
                    grid-template-columns: 52px 1fr auto;
                  }
                  .cart-remove-btn {
                    grid-column: 3;
                    grid-row: 1;
                  }
                  .cart-qty {
                    grid-column: 2 / 4;
                    grid-row: 2;
                    justify-self: start;
                  }
                }
              `}</style>

              {/* Emoji image */}
              <div
                style={{
                  ...s.emojiBox,
                  background: item.gradient,
                }}
              >
                {item.emoji}
              </div>

              {/* Info */}
              <div style={s.itemInfo}>
                <p style={s.itemTitle}>{item.title}</p>
                <p style={s.itemPrice}>
                  ₪{Number(item.price).toLocaleString("he-IL")} ×{" "}
                  {item.qty} ={" "}
                  <strong style={{ color: "#fff" }}>
                    ₪{Number(item.price * item.qty).toLocaleString("he-IL")}
                  </strong>
                </p>
              </div>

              {/* Quantity */}
              <div style={s.qtyControl} className="cart-qty">
                <button
                  style={s.qtyBtn}
                  onClick={() => updateQty(item.id, -1)}
                  aria-label="הפחת"
                >
                  −
                </button>
                <span style={s.qtyValue}>{item.qty}</span>
                <button
                  style={s.qtyBtn}
                  onClick={() => updateQty(item.id, 1)}
                  aria-label="הוסף"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                style={s.removeBtn}
                className="cart-remove-btn"
                onClick={() => removeItem(item.id)}
                aria-label="הסר מוצר"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e55")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div style={s.divider} />

        {/* Summary */}
        <div style={s.summaryCard}>
          <h3 style={s.summaryTitle}>סיכום הזמנה</h3>

          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>סכום ביניים</span>
            <span style={s.summaryValue}>
              ₪{Number(subtotal).toLocaleString("he-IL")}
            </span>
          </div>

          <div style={s.summaryRow}>
            <span style={s.summaryLabel}>משלוח</span>
            <span style={{ ...s.summaryValue, color: "#5c5" }}>
              חינם
            </span>
          </div>

          <div style={s.summaryTotal}>
            <span style={s.totalLabel}>סה״כ לתשלום</span>
            <span style={s.totalValue}>
              ₪{Number(total).toLocaleString("he-IL")}
            </span>
          </div>

          <Link
            href="/checkout"
            style={{
              ...s.checkoutBtn,
              backgroundColor: checkoutHovered ? "#e8e8e8" : "#fff",
            }}
            onMouseEnter={() => setCheckoutHovered(true)}
            onMouseLeave={() => setCheckoutHovered(false)}
          >
            לתשלום
          </Link>
        </div>

        <Link href="/shop-collection-list" style={s.continueLink}>
          ← המשך קנייה
        </Link>
      </div>

      <Footer1 />
    </div>
  );
}
