"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

const emptyForm = { title_he: "", title_en: "", slug: "", description_he: "", description_en: "", price: "", old_price: "", category_id: "", badge: "", in_stock: true, featured: false };

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClient();

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from("products").select("*, categories(name_he)").order("created_at", { ascending: false }),
      supabase.from("categories").select("id, name_he"),
    ]);
    setProducts(prods || []);
    setCategories(cats || []);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title_he" && !editId ? { slug: value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") } : {}),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, price: parseFloat(form.price), old_price: form.old_price ? parseFloat(form.old_price) : null, category_id: form.category_id || null };
    if (editId) {
      await supabase.from("products").update(payload).eq("id", editId);
      setEditId(null);
    } else {
      await supabase.from("products").insert(payload);
    }
    setForm(emptyForm);
    setShowForm(false);
    await fetchAll();
    setLoading(false);
  }

  function handleEdit(p) {
    setEditId(p.id);
    setForm({ title_he: p.title_he, title_en: p.title_en, slug: p.slug, description_he: p.description_he || "", description_en: p.description_en || "", price: p.price, old_price: p.old_price || "", category_id: p.category_id || "", badge: p.badge || "", in_stock: p.in_stock, featured: p.featured });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("למחוק מוצר זה?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchAll();
  }

  const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 7, fontSize: 14, boxSizing: "border-box" };
  const labelStyle = { fontSize: 12, color: "#777", display: "block", marginBottom: 4 };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: 0 }}>מוצרים</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}
          style={{ padding: "9px 20px", background: "#111", color: "#fff", border: "none", borderRadius: 7, fontSize: 14, cursor: "pointer" }}>
          {showForm ? "סגור" : "+ מוצר חדש"}
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{editId ? "עריכת מוצר" : "מוצר חדש"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div><label style={labelStyle}>שם בעברית</label><input name="title_he" value={form.title_he} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>שם באנגלית</label><input name="title_en" value={form.title_en} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>Slug</label><input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>קטגוריה</label>
                <select name="category_id" value={form.category_id} onChange={handleChange} style={inputStyle}>
                  <option value="">ללא קטגוריה</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name_he}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>מחיר (₪)</label><input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>מחיר לפני הנחה (₪)</label><input name="old_price" type="number" step="0.01" value={form.old_price} onChange={handleChange} style={inputStyle} /></div>
              <div><label style={labelStyle}>תג (Badge)</label><input name="badge" value={form.badge} onChange={handleChange} placeholder="NEW, SALE..." style={inputStyle} /></div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>תיאור בעברית</label>
              <textarea name="description_he" value={form.description_he} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>תיאור באנגלית</label>
              <textarea name="description_en" value={form.description_en} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer" }}>
                <input type="checkbox" name="in_stock" checked={form.in_stock} onChange={handleChange} /> במלאי
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, cursor: "pointer" }}>
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /> מוצר מומלץ
              </label>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit" disabled={loading} style={{ padding: "9px 20px", background: "#111", color: "#fff", border: "none", borderRadius: 7, fontSize: 14, cursor: "pointer" }}>
                {editId ? "עדכן" : "הוסף"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}
                style={{ padding: "9px 20px", background: "#f0f0f0", color: "#555", border: "none", borderRadius: 7, fontSize: 14, cursor: "pointer" }}>
                ביטול
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
              {["שם", "קטגוריה", "מחיר", "מלאי", "מומלץ", "פעולות"].map((h) => (
                <th key={h} style={{ textAlign: "right", padding: "10px 0", color: "#888", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "24px 0", color: "#aaa", textAlign: "center" }}>אין מוצרים עדיין</td></tr>
            )}
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "12px 0" }}>{p.title_he}</td>
                <td style={{ padding: "12px 0", color: "#888" }}>{p.categories?.name_he || "—"}</td>
                <td style={{ padding: "12px 0" }}>₪{p.price}</td>
                <td style={{ padding: "12px 0" }}>
                  <span style={{ background: p.in_stock ? "#dcfce7" : "#fee2e2", color: p.in_stock ? "#16a34a" : "#dc2626", padding: "2px 8px", borderRadius: 20, fontSize: 12 }}>
                    {p.in_stock ? "כן" : "לא"}
                  </span>
                </td>
                <td style={{ padding: "12px 0" }}>{p.featured ? "⭐" : "—"}</td>
                <td style={{ padding: "12px 0" }}>
                  <button onClick={() => handleEdit(p)} style={{ marginLeft: 8, padding: "4px 12px", background: "#f0f0f0", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 13 }}>עריכה</button>
                  <button onClick={() => handleDelete(p.id)} style={{ padding: "4px 12px", background: "#fee2e2", color: "#e53e3e", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 13 }}>מחיקה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
