"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase-browser";

const emptyForm = {
  title_he: "", title_en: "", slug: "",
  description_he: "", description_en: "",
  price: "", old_price: "",
  badge: "",
  in_stock: true, featured: false,
  images: [],
  category_ids: [],
  specs: [],
};

const s = {
  pageTitle:  { fontSize: 20, fontWeight: 700, color: "#111", margin: "0 0 20px" },
  card:       { background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 12 },
  label:      { fontSize: 12, color: "#888", display: "block", marginBottom: 5, fontWeight: 500 },
  input:      { width: "100%", padding: "12px 14px", border: "1.5px solid #e8e8e8", borderRadius: 10, fontSize: 15, boxSizing: "border-box", outline: "none", background: "#fafafa" },
  row:        { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 },
  btnPrimary: { padding: "13px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", flex: 1 },
  btnGhost:   { padding: "13px 24px", background: "#f0f0f0", color: "#555", border: "none", borderRadius: 10, fontSize: 15, cursor: "pointer" },
  btnDanger:  { padding: "7px 14px", background: "#fee2e2", color: "#e53e3e", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" },
  toggle:     { display: "flex", alignItems: "center", gap: 10, fontSize: 15, cursor: "pointer", userSelect: "none" },
};

export default function ProductsPage() {
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [form,       setForm]       = useState(emptyForm);
  const [editId,     setEditId]     = useState(null);
  const [view,       setView]       = useState("list"); // "list" | "form"
  const [saving,     setSaving]     = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [search,     setSearch]     = useState("");
  const fileRef = useRef(null);
  const supabase = createClient();

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("id, name_he, name_en, slug").order("name_he"),
    ]);
    setProducts(prods || []);
    setCategories(cats || []);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title_he" && !editId
        ? { slug: value.trim().toLowerCase().replace(/[\s]+/g, "-").replace(/[^\w-]/g, "") }
        : {}),
    }));
  }

  function toggleCategory(id) {
    setForm((prev) => ({
      ...prev,
      category_ids: prev.category_ids.includes(id)
        ? prev.category_ids.filter((c) => c !== id)
        : [...prev.category_ids, id],
    }));
  }

  function addSpec() {
    setForm((prev) => ({ ...prev, specs: [...prev.specs, { icon_url: "", value: "", label: "" }] }));
  }

  function removeSpec(i) {
    setForm((prev) => ({ ...prev, specs: prev.specs.filter((_, idx) => idx !== i) }));
  }

  function updateSpec(i, field, val) {
    setForm((prev) => ({
      ...prev,
      specs: prev.specs.map((sp, idx) => idx === i ? { ...sp, [field]: val } : sp),
    }));
  }

  async function handleSpecIcon(e, i) {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res  = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) updateSpec(i, "icon_url", data.url);
    e.target.value = "";
  }

  async function handleFileChange(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const uploaded = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) uploaded.push(data.url);
    }
    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeImage(i) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price:     parseFloat(form.price),
      old_price: form.old_price ? parseFloat(form.old_price) : null,
      category_id:  form.category_ids[0] || null,
      category_ids: form.category_ids,
    };
    if (editId) {
      await supabase.from("products").update(payload).eq("id", editId);
    } else {
      await supabase.from("products").insert(payload);
    }
    setForm(emptyForm);
    setEditId(null);
    setView("list");
    await fetchAll();
    setSaving(false);
  }

  function openEdit(p) {
    setEditId(p.id);
    setForm({
      title_he:      p.title_he || "",
      title_en:      p.title_en || "",
      slug:          p.slug     || "",
      description_he: p.description_he || "",
      description_en: p.description_en || "",
      price:         p.price    || "",
      old_price:     p.old_price || "",
      badge:         p.badge    || "",
      in_stock:      p.in_stock ?? true,
      featured:      p.featured  ?? false,
      images:        p.images    || [],
      category_ids:  p.category_ids || (p.category_id ? [p.category_id] : []),
      specs:         p.specs || [],
    });
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("למחוק מוצר זה?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchAll();
  }

  const filtered = products.filter((p) =>
    !search || (p.title_he + p.title_en).toLowerCase().includes(search.toLowerCase())
  );

  /* ── FORM VIEW ──────────────────────────────── */
  if (view === "form") {
    return (
      <div>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button onClick={() => { setView("list"); setEditId(null); setForm(emptyForm); }}
            style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#555", padding: 0, lineHeight: 1 }}>
            ←
          </button>
          <h2 style={{ ...s.pageTitle, margin: 0 }}>
            {editId ? "עריכת מוצר" : "מוצר חדש"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Images */}
          <div style={s.card}>
            <label style={s.label}>תמונות המוצר</label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: "2px dashed #ddd", borderRadius: 12, padding: "22px 16px",
                textAlign: "center", cursor: "pointer", background: "#fafafa",
                color: "#aaa", fontSize: 14, marginBottom: 14,
              }}
            >
              {uploading ? "מעלה..." : "לחץ להוספת תמונות"}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple
              onChange={handleFileChange} style={{ display: "none" }} />

            {form.images.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {form.images.map((url, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={url} alt="" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: "1px solid #eee" }} />
                    {i === 0 && (
                      <span style={{ position: "absolute", bottom: 4, right: 4, background: "#111", color: "#fff", fontSize: 9, padding: "2px 5px", borderRadius: 4 }}>ראשית</span>
                    )}
                    <button type="button" onClick={() => removeImage(i)}
                      style={{ position: "absolute", top: -6, left: -6, background: "#e53e3e", color: "#fff", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", fontSize: 13, lineHeight: "22px", textAlign: "center", padding: 0, fontWeight: 700 }}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Names */}
          <div style={s.card}>
            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>שם המוצר (עברית) *</label>
              <input name="title_he" value={form.title_he} onChange={handleChange} required
                placeholder="לדוגמה: טבעת יהלום" style={s.input} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>שם המוצר (אנגלית)</label>
              <input name="title_en" value={form.title_en} onChange={handleChange}
                placeholder="e.g. Diamond Ring" style={s.input} />
            </div>
            <div>
              <label style={s.label}>Slug (URL)</label>
              <input name="slug" value={form.slug} onChange={handleChange} required style={s.input} />
            </div>
          </div>

          {/* Prices */}
          <div style={s.card}>
            <div style={s.row}>
              <div>
                <label style={s.label}>מחיר (₪) *</label>
                <input name="price" type="number" step="0.01" min="0" value={form.price}
                  onChange={handleChange} required placeholder="0" style={s.input} />
              </div>
              <div>
                <label style={s.label}>מחיר לפני הנחה (₪)</label>
                <input name="old_price" type="number" step="0.01" min="0" value={form.old_price}
                  onChange={handleChange} placeholder="0" style={s.input} />
              </div>
            </div>
            <div>
              <label style={s.label}>תג (Badge)</label>
              <input name="badge" value={form.badge} onChange={handleChange}
                placeholder="SALE, NEW, HOT..." style={s.input} />
            </div>
          </div>

          {/* Categories */}
          <div style={s.card}>
            <label style={{ ...s.label, marginBottom: 12 }}>
              קטגוריות
              {form.category_ids.length > 0 && (
                <span style={{ marginRight: 8, background: "#111", color: "#fff", borderRadius: 10, padding: "2px 8px", fontSize: 11 }}>
                  {form.category_ids.length} נבחרו
                </span>
              )}
            </label>
            {categories.length === 0 ? (
              <p style={{ color: "#aaa", fontSize: 13, margin: 0 }}>אין קטגוריות — צור קודם בעמוד קטגוריות</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {categories.map((cat) => {
                  const active = form.category_ids.includes(cat.id);
                  return (
                    <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)}
                      style={{
                        padding: "8px 16px", borderRadius: 20,
                        border: `1.5px solid ${active ? "#111" : "#ddd"}`,
                        background: active ? "#111" : "#fafafa",
                        color:  active ? "#fff" : "#555",
                        fontSize: 13, fontWeight: active ? 600 : 400,
                        cursor: "pointer", transition: "all 0.15s",
                      }}>
                      {active && <span style={{ marginLeft: 4 }}>✓</span>}
                      {cat.name_he}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Specs */}
          <div style={s.card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <label style={{ ...s.label, margin: 0 }}>מפרטים טכניים</label>
              <button type="button" onClick={addSpec}
                style={{ padding: "6px 14px", background: "#111", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                + הוסף מפרט
              </button>
            </div>

            {form.specs.length === 0 && (
              <p style={{ color: "#bbb", fontSize: 13, margin: 0 }}>לחץ "הוסף מפרט" להוספת נתונים טכניים כמו קראט, סוג אבן וכו'</p>
            )}

            {form.specs.map((spec, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "52px 1fr 1fr 32px", gap: 8, alignItems: "center", marginBottom: 10, padding: "10px", background: "#fafafa", borderRadius: 10, border: "1px solid #f0f0f0" }}>
                {/* Icon upload */}
                <div>
                  <input
                    type="file" accept="image/*"
                    id={`spec-icon-${i}`}
                    style={{ display: "none" }}
                    onChange={(e) => handleSpecIcon(e, i)}
                  />
                  <label htmlFor={`spec-icon-${i}`} style={{ cursor: "pointer", display: "block" }}>
                    {spec.icon_url ? (
                      <img src={spec.icon_url} alt="" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8, border: "1px solid #eee", background: "#fff" }} />
                    ) : (
                      <div style={{ width: 44, height: 44, border: "1.5px dashed #ddd", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: 20, background: "#fff" }}>+</div>
                    )}
                  </label>
                </div>
                <input
                  placeholder="ערך (11.7ct)"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  style={{ ...s.input, fontSize: 13, padding: "9px 10px" }}
                />
                <input
                  placeholder="תווית (קראט)"
                  value={spec.label}
                  onChange={(e) => updateSpec(i, "label", e.target.value)}
                  style={{ ...s.input, fontSize: 13, padding: "9px 10px" }}
                />
                <button type="button" onClick={() => removeSpec(i)}
                  style={{ background: "none", border: "none", color: "#e53e3e", fontSize: 20, cursor: "pointer", padding: 0, lineHeight: 1 }}>
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Descriptions */}
          <div style={s.card}>
            <div style={{ marginBottom: 14 }}>
              <label style={s.label}>תיאור (עברית)</label>
              <textarea name="description_he" value={form.description_he} onChange={handleChange}
                rows={3} placeholder="תאר את המוצר בעברית..."
                style={{ ...s.input, resize: "vertical", lineHeight: 1.5 }} />
            </div>
            <div>
              <label style={s.label}>תיאור (אנגלית)</label>
              <textarea name="description_en" value={form.description_en} onChange={handleChange}
                rows={3} placeholder="Describe the product in English..."
                style={{ ...s.input, resize: "vertical", lineHeight: 1.5 }} />
            </div>
          </div>

          {/* Toggles */}
          <div style={{ ...s.card, display: "flex", gap: 32 }}>
            <label style={s.toggle}>
              <input type="checkbox" name="in_stock" checked={form.in_stock} onChange={handleChange}
                style={{ width: 18, height: 18, cursor: "pointer" }} />
              במלאי
            </label>
            <label style={s.toggle}>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange}
                style={{ width: 18, height: 18, cursor: "pointer" }} />
              מוצר מומלץ
            </label>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, position: "sticky", bottom: 16 }}>
            <button type="submit" disabled={saving || uploading} style={{ ...s.btnPrimary, opacity: (saving || uploading) ? 0.6 : 1 }}>
              {saving ? "שומר..." : editId ? "עדכן מוצר" : "הוסף מוצר"}
            </button>
            <button type="button" onClick={() => { setView("list"); setEditId(null); setForm(emptyForm); }} style={s.btnGhost}>
              ביטול
            </button>
          </div>
        </form>
      </div>
    );
  }

  /* ── LIST VIEW ──────────────────────────────── */
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={s.pageTitle}>מוצרים ({products.length})</h2>
        <button onClick={() => { setForm(emptyForm); setEditId(null); setView("form"); }} style={s.btnPrimary}>
          + מוצר חדש
        </button>
      </div>

      {/* Search */}
      <input
        value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="חיפוש מוצר..."
        style={{ ...s.input, marginBottom: 16 }}
      />

      {/* Product cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", color: "#aaa", padding: "60px 0" }}>
          {search ? "לא נמצאו תוצאות" : "אין מוצרים עדיין — לחץ + מוצר חדש"}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {filtered.map((p) => {
            const catNames = (p.category_ids || [])
              .map((id) => categories.find((c) => c.id === id)?.name_he)
              .filter(Boolean);

            return (
              <div key={p.id} style={{ ...s.card, display: "flex", gap: 14, alignItems: "center", cursor: "pointer", marginBottom: 0 }}
                onClick={() => openEdit(p)}>
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt="" style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 64, height: 64, background: "#f0f0f0", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 22, flexShrink: 0 }}>◈</div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title_he || p.title_en}</div>
                  {catNames.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
                      {catNames.map((n) => (
                        <span key={n} style={{ fontSize: 10, background: "#f0f0f0", color: "#666", padding: "2px 7px", borderRadius: 8 }}>{n}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: "#555" }}>
                    ₪{p.price}
                    {p.old_price && <span style={{ color: "#aaa", textDecoration: "line-through", marginRight: 6 }}>₪{p.old_price}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 10, background: p.in_stock ? "#dcfce7" : "#fee2e2", color: p.in_stock ? "#16a34a" : "#dc2626" }}>
                    {p.in_stock ? "במלאי" : "אזל"}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                    style={{ ...s.btnDanger, fontSize: 11, padding: "4px 10px" }}>
                    מחק
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
