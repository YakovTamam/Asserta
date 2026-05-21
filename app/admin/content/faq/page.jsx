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

const emptyForm = { question: "", answer: "" };

/* ── Toggle switch ── */
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

export default function FAQPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    const data = await fetch("/api/admin/content/faq").then(r => r.json());
    setItems(data || []);
  }

  function showFlash(msg) {
    setFlash(msg);
    setTimeout(() => setFlash(""), 2000);
  }

  async function handleSave() {
    if (!form.question.trim() || !form.answer.trim()) {
      setError("יש למלא שאלה ותשובה");
      return;
    }
    setSaving(true);
    setError("");

    if (editId) {
      const res = await fetch("/api/admin/content/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, question: form.question, answer: form.answer }) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "שגיאה בשמירה"); setSaving(false); return; }
    } else {
      const maxPos = items.length > 0 ? Math.max(...items.map(i => i.position || 0)) : 0;
      const res = await fetch("/api/admin/content/faq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: form.question, answer: form.answer, position: maxPos + 1, is_active: true }) });
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
    const res = await fetch("/api/admin/content/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, is_active: !item.is_active }) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "שגיאה"); return; }
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_active: !i.is_active } : i));
  }

  async function handleDelete(id) {
    if (!confirm("האם למחוק את השאלה?")) return;
    const res = await fetch("/api/admin/content/faq", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || "שגיאה במחיקה"); return; }
    await fetchItems();
    showFlash("נמחק ✓");
  }

  function openEdit(item) {
    setEditId(item._id || item.id);
    setForm({ question: item.question || "", answer: item.answer || "" });
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
      fetch("/api/admin/content/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: newItems[index].id, position: posB }) }),
      fetch("/api/admin/content/faq", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: newItems[swapIndex].id, position: posA }) }),
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
            <h1 style={{ fontSize: 24, fontWeight: 800, color: C.primary, margin: 0 }}>שאלות נפוצות</h1>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 4, marginBottom: 0 }}>{items.length} פריטים</p>
          </div>
          {!showForm && (
            <button
              onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); setError(""); }}
              style={{ padding: "10px 20px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              + הוסף שאלה
            </button>
          )}
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
              {editId ? "עריכת שאלה" : "שאלה חדשה"}
            </h3>

            <div style={{ marginBottom: 16 }}>
              <label style={C.label}>שאלה</label>
              <input
                style={C.input}
                value={form.question}
                onChange={e => setForm(p => ({ ...p, question: e.target.value }))}
                placeholder="הכנס את השאלה..."
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={C.label}>תשובה</label>
              <textarea
                style={{ ...C.input, height: 100, resize: "vertical" }}
                value={form.answer}
                onChange={e => setForm(p => ({ ...p, answer: e.target.value }))}
                placeholder="הכנס את התשובה..."
                rows={4}
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
            <div style={{ fontSize: 32, marginBottom: 12 }}>❓</div>
            <p style={{ margin: 0 }}>אין שאלות עדיין. לחץ על "הוסף שאלה" להתחלה.</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={item._id || item.id} style={{ ...C.cardStyle }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>

                {/* Drag handle (visual only) */}
                <div style={{ color: "#cbd5e1", fontSize: 18, cursor: "grab", paddingTop: 2, flexShrink: 0 }}>☰</div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.primary, marginBottom: 4, lineHeight: 1.4 }}>
                    {item.question}
                  </div>
                  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                    {item.answer}
                  </div>
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
