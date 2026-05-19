"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

const C = {
  primary:   "#0f172a",
  bg:        "#f1f5f9",
  card:      { background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)" },
  label:     { fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.6px", textTransform: "uppercase", display: "block", marginBottom: 6 },
  input:     { width: "100%", padding: "13px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, boxSizing: "border-box", outline: "none", background: "#fff", color: "#0f172a", WebkitAppearance: "none" },
};

const emptyForm = { name_he: "", name_en: "", slug: "", image_url: "" };

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form,       setForm]       = useState(emptyForm);
  const [editId,     setEditId]     = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [showForm,   setShowForm]   = useState(false);
  const fileRef = useRef(null);
  const supabase = createClient();
  const searchParams = useSearchParams();

  useEffect(() => { fetchCategories(); }, []);

  useEffect(() => {
    if (searchParams.get("new") === "true") setShowForm(true);
  }, [searchParams]);

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

  async function handleImageUpload(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const { url } = await res.json();
    if (url) setForm((prev) => ({ ...prev, image_url: url }));
    setUploading(false);
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
    setForm({ name_he: cat.name_he || "", name_en: cat.name_en || "", slug: cat.slug || "", image_url: cat.image_url || "" });
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
    <div style={{ maxWidth: 720, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#0f172a" }}>קטגוריות ({categories.length})</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{ padding: "10px 20px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            + קטגוריה
          </button>
        )}
      </div>

      {/* Form card */}
      {showForm && (
        <div style={{ ...C.card, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 18px", color: "#0f172a" }}>
            {editId ? "עריכת קטגוריה" : "קטגוריה חדשה"}
          </h3>
          <form onSubmit={handleSubmit}>

            {/* Image upload */}
            <div style={{ marginBottom: 16 }}>
              <label style={C.label}>תמונה</label>
              <div
                onClick={() => fileRef.current?.click()}
                style={{ width: "100%", height: 120, border: "2px dashed #e2e8f0", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "#f8fafc", position: "relative", overflow: "hidden" }}
              >
                {form.image_url ? (
                  <img src={form.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <span style={{ fontSize: 28 }}>🖼️</span>
                    <span style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>{uploading ? "מעלה..." : "לחץ להוספת תמונה"}</span>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e.target.files?.[0])} />
            </div>

            {/* Name fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={C.label}>שם בעברית *</label>
                <input name="name_he" value={form.name_he} onChange={handleChange} required placeholder="טבעות" style={C.input} />
              </div>
              <div>
                <label style={C.label}>שם באנגלית</label>
                <input name="name_en" value={form.name_en} onChange={handleChange} placeholder="Rings" style={C.input} />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={C.label}>Slug (URL)</label>
              <input name="slug" value={form.slug} onChange={handleChange} required placeholder="rings" style={{ ...C.input, fontFamily: "monospace", fontSize: 13 }} />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" disabled={loading || uploading} style={{ flex: 1, padding: "13px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
                {loading ? "שומר..." : editId ? "עדכן" : "הוסף"}
              </button>
              <button type="button" onClick={cancelForm} style={{ padding: "13px 20px", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 10, fontSize: 15, cursor: "pointer" }}>
                ביטול
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category list */}
      {categories.length === 0 ? (
        <div style={{ textAlign: "center", color: "#94a3b8", padding: "60px 0", fontSize: 14 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏷️</div>
          אין קטגוריות עדיין — לחץ + קטגוריה
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ ...C.card, display: "flex", alignItems: "center", gap: 14, padding: 14 }}>
              {/* Thumbnail */}
              <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", background: "#f1f5f9", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                {cat.image_url
                  ? <img src={cat.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : "🏷️"}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{cat.name_he}</div>
                {cat.name_en && <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{cat.name_en}</div>}
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2, fontFamily: "monospace" }}>{cat.slug}</div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => handleEdit(cat)} style={{ padding: "7px 14px", background: "#f1f5f9", color: "#374151", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  עריכה
                </button>
                <button onClick={() => handleDelete(cat.id)} style={{ padding: "7px 14px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  מחק
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
