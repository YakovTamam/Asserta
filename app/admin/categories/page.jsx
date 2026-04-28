"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name_he: "", name_en: "", slug: "", image_url: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    const { data } = await supabase.from("categories").select("*").order("created_at", { ascending: false });
    setCategories(data || []);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name_he" && !editId ? { slug: value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") } : {}),
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
    setForm({ name_he: "", name_en: "", slug: "", image_url: "" });
    await fetchCategories();
    setLoading(false);
  }

  function handleEdit(cat) {
    setEditId(cat.id);
    setForm({ name_he: cat.name_he, name_en: cat.name_en, slug: cat.slug, image_url: cat.image_url || "" });
  }

  async function handleDelete(id) {
    if (!confirm("למחוק קטגוריה זו?")) return;
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  }

  const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 7, fontSize: 14, boxSizing: "border-box" };

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#111" }}>קטגוריות</h2>

      <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{editId ? "עריכת קטגוריה" : "קטגוריה חדשה"}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: "#777", display: "block", marginBottom: 4 }}>שם בעברית</label>
              <input name="name_he" value={form.name_he} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#777", display: "block", marginBottom: 4 }}>שם באנגלית</label>
              <input name="name_en" value={form.name_en} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#777", display: "block", marginBottom: 4 }}>Slug</label>
              <input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#777", display: "block", marginBottom: 4 }}>קישור לתמונה</label>
              <input name="image_url" value={form.image_url} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" disabled={loading} style={{ padding: "9px 20px", background: "#111", color: "#fff", border: "none", borderRadius: 7, fontSize: 14, cursor: "pointer" }}>
              {editId ? "עדכן" : "הוסף"}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm({ name_he: "", name_en: "", slug: "", image_url: "" }); }}
                style={{ padding: "9px 20px", background: "#f0f0f0", color: "#555", border: "none", borderRadius: 7, fontSize: 14, cursor: "pointer" }}>
                ביטול
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
              {["שם (עברית)", "שם (אנגלית)", "Slug", "פעולות"].map((h) => (
                <th key={h} style={{ textAlign: "right", padding: "10px 0", color: "#888", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr><td colSpan={4} style={{ padding: "24px 0", color: "#aaa", textAlign: "center" }}>אין קטגוריות עדיין</td></tr>
            )}
            {categories.map((cat) => (
              <tr key={cat.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "12px 0" }}>{cat.name_he}</td>
                <td style={{ padding: "12px 0", color: "#888" }}>{cat.name_en}</td>
                <td style={{ padding: "12px 0", color: "#888", fontSize: 12 }}>{cat.slug}</td>
                <td style={{ padding: "12px 0" }}>
                  <button onClick={() => handleEdit(cat)} style={{ marginLeft: 8, padding: "4px 12px", background: "#f0f0f0", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 13 }}>עריכה</button>
                  <button onClick={() => handleDelete(cat.id)} style={{ padding: "4px 12px", background: "#fee2e2", color: "#e53e3e", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 13 }}>מחיקה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
