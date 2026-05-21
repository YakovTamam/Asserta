"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const C = {
  primary: "#0f172a",
  card:    { background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)" },
};

const STATUS_META = {
  pending:   { label: "ממתין",  bg: "#fef9c3", text: "#854d0e"  },
  paid:      { label: "שולם",   bg: "#dcfce7", text: "#16a34a"  },
  shipped:   { label: "נשלח",   bg: "#dbeafe", text: "#1d4ed8"  },
  delivered: { label: "נמסר",   bg: "#f3e8ff", text: "#7c3aed"  },
  cancelled: { label: "בוטל",   bg: "#fee2e2", text: "#dc2626"  },
};

function StatusBadge({ status }) {
  const m = STATUS_META[status] || { label: status, bg: "#f0f0f0", text: "#555" };
  return (
    <span style={{ background: m.bg, color: m.text, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      {m.label}
    </span>
  );
}

function OrderDetail({ order, onClose, onStatusChange }) {
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div style={{ ...C.card, marginBottom: 16, borderRight: `4px solid ${C.primary}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8", marginBottom: 4 }}>{order.id}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{order.customers?.full_name || "לקוח לא ידוע"}</div>
          {order.customers?.email && <div style={{ fontSize: 12, color: "#64748b" }}>{order.customers.email}</div>}
          {order.customers?.phone && <div style={{ fontSize: 12, color: "#64748b" }}>{order.customers.phone}</div>}
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#94a3b8", lineHeight: 1, padding: 0 }}>×</button>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "#64748b" }}>סטטוס:</span>
        <StatusBadge status={order.status} />
        <span style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginRight: "auto" }}>₪{order.total_amount}</span>
      </div>

      {/* Status buttons */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>שנה סטטוס</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Object.entries(STATUS_META).map(([key, m]) => (
            <button key={key} onClick={() => onStatusChange(order.id, key)}
              style={{ padding: "6px 12px", background: order.status === key ? C.primary : m.bg, color: order.status === key ? "#fff" : m.text, border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>פריטים</div>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ color: "#374151" }}>{item.title_he || item.name}</span>
              <span style={{ color: "#64748b" }}>×{item.qty} — ₪{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const [orders,   setOrders]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState("all");
  const searchParams = useSearchParams();

  useEffect(() => { fetchOrders(); }, []);

  useEffect(() => {
    const s = searchParams.get("status");
    if (s) setFilter(s);
  }, [searchParams]);

  async function fetchOrders() {
    const data = await fetch("/api/admin/orders").then(r => r.json());
    setOrders(data || []);
  }

  async function updateStatus(id, status) {
    await fetch("/api/admin/orders", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (selected?.id === id) setSelected((prev) => ({ ...prev, status }));
  }

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px", color: "#0f172a" }}>הזמנות ({orders.length})</h2>

      {/* Order detail panel (mobile-first: shows above list) */}
      {selected && (
        <OrderDetail
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={updateStatus}
        />
      )}

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
        {[["all", "הכל"], ...Object.entries(STATUS_META).map(([k, m]) => [k, m.label])].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            style={{ padding: "7px 16px", background: filter === key ? C.primary : "#fff", color: filter === key ? "#fff" : "#64748b", border: "1.5px solid", borderColor: filter === key ? C.primary : "#e2e8f0", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
            {label}
          </button>
        ))}
      </div>

      {/* Order cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", color: "#94a3b8", padding: "60px 0", fontSize: 14 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
          אין הזמנות
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map((order) => (
            <div key={order.id}
              onClick={() => setSelected(selected?.id === order.id ? null : order)}
              style={{ ...C.card, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: 14, transition: "box-shadow 0.15s", outline: selected?.id === order.id ? `2px solid ${C.primary}` : "none" }}>

              {/* Left: id + customer */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", marginBottom: 2 }}>
                  {order.customers?.full_name || "לקוח לא ידוע"}
                </div>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: "#94a3b8" }}>{order.id.slice(0, 8)}...</div>
              </div>

              {/* Status badge */}
              <StatusBadge status={order.status} />

              {/* Amount + date */}
              <div style={{ textAlign: "left", flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>₪{order.total_amount}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{new Date(order.created_at).toLocaleDateString("he-IL")}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
