"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

const C = {
  primary:   "#0f172a",
  bg:        "#f1f5f9",
  card:      "#ffffff",
  border:    "#e2e8f0",
  muted:     "#64748b",
};

const statusLabels     = { pending: "ממתין", paid: "שולם", shipped: "נשלח", delivered: "נמסר", cancelled: "בוטל" };
const statusColors     = { pending: "#fef9c3", paid: "#dcfce7", shipped: "#dbeafe", delivered: "#f3e8ff", cancelled: "#fee2e2" };
const statusTextColors = { pending: "#854d0e", paid: "#16a34a", shipped: "#1d4ed8", delivered: "#7c3aed", cancelled: "#dc2626" };

function KpiCard({ label, value, icon, color }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 20px 18px", boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, margin: "0 0 4px", letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</p>
        <p style={{ fontSize: 28, fontWeight: 700, color, margin: 0, lineHeight: 1 }}>{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [counts,       setCounts]       = useState({ products: "—", orders: "—", categories: "—" });
  const [recentOrders, setRecentOrders] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const [{ count: p }, { count: o }, { count: c }] = await Promise.all([
        supabase.from("products").select("*",   { count: "exact", head: true }),
        supabase.from("orders").select("*",     { count: "exact", head: true }),
        supabase.from("categories").select("*", { count: "exact", head: true }),
      ]);
      setCounts({ products: p ?? 0, orders: o ?? 0, categories: c ?? 0 });

      const { data } = await supabase
        .from("orders")
        .select("id, status, total_amount, created_at")
        .order("created_at", { ascending: false })
        .limit(6);
      setRecentOrders(data || []);
    })();
  }, []);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px", color: "#0f172a" }}>דשבורד</h2>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        <KpiCard label="מוצרים"    value={counts.products}   icon="💍" color="#6366f1" />
        <KpiCard label="הזמנות"    value={counts.orders}     icon="📦" color="#f59e0b" />
        <KpiCard label="קטגוריות"  value={counts.categories} icon="🏷️" color="#10b981" />
      </div>

      {/* Recent orders */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "20px 20px 8px", boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 16px", color: "#0f172a", letterSpacing: "0.3px" }}>הזמנות אחרונות</h3>

        {recentOrders.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", padding: "24px 0" }}>אין הזמנות עדיין</p>
        ) : (
          <div>
            {recentOrders.map((order) => (
              <div key={order.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "#94a3b8" }}>{order.id.slice(0, 8)}</span>
                  <span style={{ background: statusColors[order.status] || "#f0f0f0", color: statusTextColors[order.status] || "#555", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>₪{order.total_amount}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(order.created_at).toLocaleDateString("he-IL")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
