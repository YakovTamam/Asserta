"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

const statusLabels = { pending: "ממתין", paid: "שולם", shipped: "נשלח", delivered: "נמסר", cancelled: "בוטל" };
const statusColors = { pending: "#fef9c3", paid: "#dcfce7", shipped: "#dbeafe", delivered: "#f3e8ff", cancelled: "#fee2e2" };
const statusTextColors = { pending: "#854d0e", paid: "#16a34a", shipped: "#1d4ed8", delivered: "#7c3aed", cancelled: "#dc2626" };

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const supabase = createClient();

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    const { data } = await supabase.from("orders").select("*, customers(full_name, email, phone)").order("created_at", { ascending: false });
    setOrders(data || []);
  }

  async function updateStatus(id, status) {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
    if (selected?.id === id) setSelected((prev) => ({ ...prev, status }));
  }

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#111" }}>הזמנות</h2>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 380px" : "1fr", gap: 16 }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                {["מזהה", "לקוח", "סטטוס", "סכום", "תאריך", "פעולה"].map((h) => (
                  <th key={h} style={{ textAlign: "right", padding: "10px 0", color: "#888", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr><td colSpan={6} style={{ padding: "24px 0", color: "#aaa", textAlign: "center" }}>אין הזמנות עדיין</td></tr>
              )}
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #f5f5f5", background: selected?.id === order.id ? "#fafafa" : "transparent" }}>
                  <td style={{ padding: "12px 0", fontFamily: "monospace", fontSize: 12, color: "#888" }}>{order.id.slice(0, 8)}...</td>
                  <td style={{ padding: "12px 0" }}>{order.customers?.full_name || "—"}</td>
                  <td style={{ padding: "12px 0" }}>
                    <span style={{ background: statusColors[order.status], color: statusTextColors[order.status], padding: "3px 10px", borderRadius: 20, fontSize: 12 }}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td style={{ padding: "12px 0" }}>₪{order.total_amount}</td>
                  <td style={{ padding: "12px 0", color: "#888" }}>{new Date(order.created_at).toLocaleDateString("he-IL")}</td>
                  <td style={{ padding: "12px 0" }}>
                    <button onClick={() => setSelected(selected?.id === order.id ? null : order)}
                      style={{ padding: "4px 12px", background: "#f0f0f0", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 13 }}>
                      פרטים
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", alignSelf: "start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>פרטי הזמנה</h3>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#888" }}>×</button>
            </div>

            <div style={{ fontSize: 13, color: "#555", marginBottom: 16 }}>
              <p style={{ margin: "4px 0" }}><strong>מזהה:</strong> {selected.id}</p>
              <p style={{ margin: "4px 0" }}><strong>לקוח:</strong> {selected.customers?.full_name || "—"}</p>
              <p style={{ margin: "4px 0" }}><strong>אימייל:</strong> {selected.customers?.email || "—"}</p>
              <p style={{ margin: "4px 0" }}><strong>טלפון:</strong> {selected.customers?.phone || "—"}</p>
              <p style={{ margin: "4px 0" }}><strong>סכום:</strong> ₪{selected.total_amount}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>עדכון סטטוס:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Object.entries(statusLabels).map(([key, label]) => (
                  <button key={key} onClick={() => updateStatus(selected.id, key)}
                    style={{ padding: "5px 12px", background: selected.status === key ? "#111" : "#f0f0f0", color: selected.status === key ? "#fff" : "#555", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {selected.items && (
              <div>
                <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>פריטים:</p>
                {(Array.isArray(selected.items) ? selected.items : []).map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span>{item.title_he || item.name}</span>
                    <span style={{ color: "#888" }}>x{item.qty} — ₪{item.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
