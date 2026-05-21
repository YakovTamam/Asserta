"use client";
import { useState, useEffect } from "react";

const C = {
  primary: "#0f172a",
  bg: "#f1f5f9",
  card: "#ffffff",
  border: "#e2e8f0",
  muted: "#64748b",
  success: "#16a34a",
  danger: "#dc2626",
  label: { fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.6px", textTransform: "uppercase", display: "block", marginBottom: 6 },
  input: { width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, boxSizing: "border-box", outline: "none", background: "#fff", color: "#0f172a" },
  cardStyle: { background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.07)", marginBottom: 16 },
};

const DEFAULT_ITEMS = [
  { icon: "✦", title: "עיצוב ייחודי", body: "כל תכשיט מעוצב בקפידה ומיוצר בעבודת יד על ידי אומנים מנוסים" },
  { icon: "🚚", title: "משלוח חינם", body: "משלוח חינם לכל הארץ על הזמנות מעל ₪500, עם מעקב בזמן אמת" },
  { icon: "🔒", title: "אחריות שנתיים", body: "כל תכשיט מגיע עם אחריות מלאה לשנתיים ותעודת אותנטיות" },
  { icon: "💬", title: "שירות אישי", body: "צוות מומחים זמין לייעוץ אישי ולסיוע בבחירת התכשיט המושלם" },
];

const emptyForm = { icon: "", title: "", body: "" };

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 40, height: 22, borderRadius: 11,
        background: checked ? C.primary : "#cbd5e1",
        position: "relative", cursor: "pointer", flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div style={{
        position: "absolute", top: 3,
        right: checked ? 3 : "auto",
        left: checked ? "auto" : 3,
        width: 16, height: 16, borderRadius: 8,
        background: "#fff", transition: "all 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </div>
  );
}

export default function WhyUsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const data = await fetch("/api/admin/content/why-us").then(r => r.json());
    setItems(data || []);
  }

  function showFlash(msg) {
    setFlash(msg);
    setTimeout(() => setFlash(""), 2000);
  }

  async function seedDefaults() {
    setSeeding(true);
    setError("");
    for (let idx = 0; idx < DEFAULT_ITEMS.length; idx++) {
      const item = DEFAULT_ITEMS[idx];
      await fetch("/api/admin/content/why-us", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...item, position: idx + 1, is_active: true }) });
    }
    await fetchItems();
    setSeeding(false);
    showFlash("פריטי ברירת מחדל נטענו ✓");
  }

  async function handleSave() {
    if (!form.title.trim() || !form.body.trim()) {
      setError("יש למלא כותרת ותוכן");
      return;
    }
    setSaving(true);
    setError("");

    if (editId) {
      const res = await fetch("/api/admin/content/why-us", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, icon: form.icon, title: form.title, body: form.body }) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "שגיאה בשמירה"); setSaving(false); return; }
    } else {
      const maxPos = items.length > 0 ? Math.max(...items.map(i => i.position || 0)) : 0;
      const res = await fetch("/api/admin/content/why-us", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ icon: form.icon, title: form.title, body: form.body, position: maxPos + 1, is_active: true }) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "שגיאה בשמירה"); setSaving(false); return; }
    }

    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    await fetchItems();
    setSaving(false);
    showFlash("נשמר ✓");
  }

  async function toggleActive(item) {
    const id = item._id || item.id;
    const res = await fetch("/api/admin/content/why-us", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, is_active: !item.is_active }) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "שגיאה"); return; }
    setItems(prev => prev.map(i => (i._id || i.id) === id ? { ...i, is_active: !i.is_active } : i));
  }

  async function handleDelete(id) {
    if (!confirm("האם למחוק את הפריט?")) return;
    const res = await fetch("/api/admin/content/why-us", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "שגיאה במחיקה"); return; }
    await fetchItems();
    showFlash("נמחק ✓");
  }

  function openEdit(item) {
    setEditId(item._id || item.id);
    setForm({ icon: item.icon || "", title: item.title || "", body: item.body || "" });
    setShowForm(true);
    setError("");
  }

  function cancelForm() {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    setError("");
  }

  async function moveItem(index, direction) {
    const newItems = [...items];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newItems.length) return;

    const posA = newItems[index].position;
    const posB = newItems[swapIndex].position;

    const [r1, r2] = await Promise.all([
      fetch("/api/admin/content/why-us", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: newItems[index]._id || newItems[index].id, position: posB }) }),
      fetch("/api/admin/content/why-us", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: newItems[swapIndex]._id || newItems[swapIndex].id, position: posA }) }),
    ]);
    if (!r1.ok || !r2.ok) { setError("שגיאה בסידור מחדש"); return; }

    newItems[index] = { ...newItems[index], position: posB };
    newItems[swapIndex] = { ...newItems[swapIndex], position: posA };
    newItems.sort((a, b) => a.position - b.position);
    setItems(newItems);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "32px 24px", direction: "rtl" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: C.primary, margin: 0 }}>למה אנחנו</h1>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 4, marginBottom: 0 }}>{items.length} פריטים</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {items.length === 0 && (
              <button
                onClick={seedDefaults}
                disabled={seeding}
                style={{ padding: "10px 18px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: seeding ? 0.7 : 1 }}
              >
                {seeding ? "טוען..." : "טען ברירת מחדל"}
              </button>
            )}
            {!showForm && (
              <button
                onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); setError(""); }}
                style={{ padding: "10px 20px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
              >
                + הוסף פריט
              </button>
            )}
          </div>
        </div>

        {/* Flash */}
        {flash && (
          <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 16px", marginBottom: 16, color: C.success, fontWeight: 600, fontSize: 14 }}>
            {flash}
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginBottom: 16, color: C.danger, fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Inline form */}
        {showForm && (
          <div style={{ ...C.cardStyle, border: `1.5px solid ${C.primary}` }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginTop: 0, marginBottom: 20 }}>
              {editId ? "עריכת פריט" : "פריט חדש"}
            </h3>

            {/* Icon input with preview */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-end", marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={C.label}>אייקון (עד 2 תווים)</label>
                <input
                  style={C.input}
                  value={form.icon}
                  maxLength={2}
                  onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
                  placeholder="✦ או אמוג'י..."
                />
              </div>
              {form.icon && (
                <div style={{
                  width: 60, height: 60, background: "#f1f5f9", borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, flexShrink: 0,
                }}>
                  {form.icon}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={C.label}>כותרת</label>
              <input
                style={C.input}
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="שם היתרון..."
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={C.label}>תיאור</label>
              <textarea
                style={{ ...C.input, height: 80, resize: "vertical" }}
                value={form.body}
                onChange={e => setForm(p => ({ ...p, body: e.target.value }))}
                placeholder="תיאור קצר..."
                rows={3}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{ padding: "10px 24px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "שומר..." : "שמור"}
              </button>
              <button
                onClick={cancelForm}
                style={{ padding: "10px 20px", background: "#f1f5f9", color: C.primary, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer" }}
              >
                ביטול
              </button>
            </div>
          </div>
        )}

        {/* Items list */}
        {items.length === 0 && !showForm ? (
          <div style={{ ...C.cardStyle, textAlign: "center", padding: 48, color: C.muted }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
            <p style={{ margin: 0, marginBottom: 16 }}>אין פריטים עדיין.</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={item._id || item.id} style={{ ...C.cardStyle }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>

                {/* Icon preview */}
                <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0, paddingTop: 2, minWidth: 36, textAlign: "center" }}>
                  {item.icon || "•"}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.primary, marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{item.body}</div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  {/* Up/Down */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <button
                      onClick={() => moveItem(idx, -1)}
                      disabled={idx === 0}
                      style={{ width: 28, height: 24, border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", fontSize: 12, cursor: idx === 0 ? "default" : "pointer", color: idx === 0 ? "#cbd5e1" : C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}
                    >▲</button>
                    <button
                      onClick={() => moveItem(idx, 1)}
                      disabled={idx === items.length - 1}
                      style={{ width: 28, height: 24, border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", fontSize: 12, cursor: idx === items.length - 1 ? "default" : "pointer", color: idx === items.length - 1 ? "#cbd5e1" : C.primary, display: "flex", alignItems: "center", justifyContent: "center" }}
                    >▼</button>
                  </div>

                  {/* Active toggle */}
                  <Toggle checked={item.is_active} onChange={() => toggleActive(item)} />

                  {/* Edit */}
                  <button
                    onClick={() => openEdit(item)}
                    style={{ padding: "6px 14px", background: "#f1f5f9", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", color: C.primary }}
                  >
                    עריכה
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item._id || item.id)}
                    style={{ padding: "6px 10px", background: "#fee2e2", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer", color: C.danger }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
