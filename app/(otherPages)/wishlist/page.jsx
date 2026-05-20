"use client";
import { useState } from "react";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

export default function WishlistPage() {
  const [items, setItems] = useState([DEMO_PRODUCTS[3], DEMO_PRODUCTS[8]]);

  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id));

  return (
    <>
      <Header1 />
      <main style={{ minHeight: "100vh", background: "#f9f9f9", direction: "rtl", padding: "40px 16px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: "#111" }}>רשימת המשאלות</h1>
          <p style={{ color: "#888", marginBottom: 32, fontSize: 14 }}>{items.length} פריטים שמורים</p>

          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🤍</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#111" }}>רשימת המשאלות ריקה</h2>
              <p style={{ color: "#888", marginBottom: 24 }}>שמרי את המוצרים שאהבת לכאן</p>
              <Link href="/shop-collection-list" style={{
                display: "inline-block", padding: "13px 32px",
                background: "#111", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 14,
              }}>גלי את הקולקציה</Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {items.map(item => (
                <div key={item.id} style={{
                  background: "#fff", borderRadius: 16, padding: 20,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  {/* Image */}
                  <div style={{
                    width: 80, height: 80, borderRadius: 12, flexShrink: 0,
                    background: item.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
                  }}>
                    {item.emoji}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{item.categoryName}</p>
                    <Link href={`/product-default/${item.id}`} style={{ fontSize: 15, fontWeight: 700, color: "#111", textDecoration: "none" }}>
                      {item.title}
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>₪{Number(item.price).toLocaleString("he-IL")}</span>
                      {item.oldPrice && (
                        <span style={{ fontSize: 13, color: "#aaa", textDecoration: "line-through" }}>₪{Number(item.oldPrice).toLocaleString("he-IL")}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                    <Link href={`/product-default/${item.id}`} style={{
                      padding: "9px 18px", background: "#111", color: "#fff",
                      borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}>
                      הוסף לעגלה
                    </Link>
                    <button onClick={() => remove(item.id)} style={{
                      background: "none", border: "none", color: "#ccc", cursor: "pointer",
                      fontSize: 12, padding: "4px 8px", fontFamily: "inherit",
                    }}>
                      הסר
                    </button>
                  </div>
                </div>
              ))}

              <Link href="/shop-collection-list" style={{
                display: "block", textAlign: "center", padding: "14px",
                border: "1px solid #e5e7eb", borderRadius: 12, color: "#555",
                fontSize: 14, fontWeight: 600, marginTop: 8, textDecoration: "none",
              }}>
                המשך קנייה
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer1 />
    </>
  );
}
