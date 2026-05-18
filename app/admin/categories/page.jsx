"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

const emptyForm = { name_he: "", name_en: "", slug: "", image_url: "" };

const s = {
  pageTitle: { fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 20px" },
  card:      { background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 12 },
  label:     { fontSize: 12, color: "#888", display: "block", marginBottom: 5, fontWeight: 500 },
  input:     { width: "100%", padding: "12px 14px", border: "1.5px solid #e8e8e8", borderRadius: 10, fontSize: 15, boxSizing: "border-box", outline: "none", background: "#fafafa" },
  row:       { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 },
  btnPrimary:{ padding: "13px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" },
  btnGhost:  { padding: "13px 24px", background: "#f0f0f0", color: "#555", border: "none", borderRadius: 10, fontSize: 15, cursor: "pointer" },
  btnEdit:   { padding: "7px 14px", background: "#f0f0f0", color: "#333", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" },
  btnDanger: { padding: "7px 14px", background: "#fee2e2", color: "#e53e3e", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" },
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form,       setForm]       = useState(emptyForm);
  const [editId,     setEditId]     = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [showForm,   setShowForm]   = useState(false);
  const supabase = createClient();

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    const { data } = await supabase.from("categories").select("*").order("name_he");
    setCategories(data || []);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name_he" && !editId
        ? { slug: value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") }
        : {}),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (editId) {
      await supabase.from("categories").update(form).eq("id", editId);
      setEditId(null);
    } else {
      await supabase.from("categories").insert(form);
    }
    setForm(emptyForm);
    setShowForm(false);
    await fetchCategories();
    setLoading(false);
  }

  function handleEdit(cat) {
    setEditId(cat.id);
    setForm({ name_he: cat.name_he, name_en: cat.name_en || "", slug: cat.slug, image_url: cat.image_url || "" });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("למחוק קטגוריה זו?")) return;
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  }

  function cancelForm() {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={s.pageTitle}>קטגוריות ({categories.length})</h2>
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={s.btnPrimary}>+ קטגוריה</button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div style={s.card}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, margin: "0 0 16px" }}>
            {editId ? "עריכת קטגוריה" : "קטגוריה חדשה"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={s.row}>
              <div>
                <label style={s.label}>שם בעברית *</label>
                <input name="name_he" value={form.name_he} onChange={handleChange} required
                  placeholder="לדוגמה: טבעות" style={s.input} />
              </div>
              <div>
                <label style={s.label}>שם באנגלית</label>
                <input name="name_en" value={form.name_en} onChange={handleChange}
                  placeholder="e.g. Rings" style={s.input} />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>Slug (URL)</label>
              <input name="slug" value={form.slug} onChange={handleChange} required
                placeholder="rings" style={s.input} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={s.label}>קישור לתמונה (אופציונלי)</label>
              <input name="image_url" value={form.image_url} onChange={handleChange}
                placeholder="https://..." style={s.input} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" disabled={loading} style={{ ...s.btnPrimary, opacity: loading ? 0.6 : 1 }}>
                {loading ? "שומר..." : editId ? "עדכן" : "הוסף"}
              </button>
              <button type="button" onClick={cancelForm} style={s.btnGhost}>ביטול</button>
            </div>
          </form>
        </div>
      )}

      {/* Category cards */}
      {categories.length === 0 ? (
        <div style={{ textAlign: "center", color: "#aaa", padding: "60px 0", fontSize: 14 }}>
          אין קטגוריות עדיין — לחץ + קטגוריה
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ ...s.card, display: "flex", alignItems: "center", gap: 14, marginBottom: 0 }}>
              {cat.image_url ? (
                <img src={cat.image_url} alt="" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
              ) : (
                <div style={{ width: 52, height: 52, background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>⊙</div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{cat.name_he}</div>
                {cat.name_en && <div style={{ fontSize: 12, color: "#888" }}>{cat.name_en}</div>}
                <div style={{ fontSize: 11, color: "#bbb", marginTop: 2, fontFamily: "monospace" }}>{cat.slug}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => handleEdit(cat)} style={s.btnEdit}>עריכה</button>
                <button onClick={() => handleDelete(cat.id)} style={s.btnDanger}>מחק</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
