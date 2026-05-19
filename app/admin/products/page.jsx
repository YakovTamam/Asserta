"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

/* ── Design tokens ─────────────────────────────── */
const C = {
  primary:    "#0f172a",
  primaryHov: "#1e293b",
  bg:         "#f1f5f9",
  card:       "#ffffff",
  border:     "#e2e8f0",
  muted:      "#64748b",
  mutedBg:    "#f8fafc",
  success:    "#16a34a",
  successBg:  "#dcfce7",
  danger:     "#dc2626",
  dangerBg:   "#fee2e2",
  label:      { fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.6px", textTransform: "uppercase", display: "block", marginBottom: 6 },
  input:      { width: "100%", padding: "13px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 15, boxSizing: "border-box", outline: "none", background: "#fff", color: "#0f172a", WebkitAppearance: "none" },
  card:       { background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)", marginBottom: 12 },
};

const emptyForm = {
  title_he: "", title_en: "", slug: "",
  description_he: "", description_en: "",
  price: "", old_price: "",
  badge: "", in_stock: true, featured: false,
  images: [], category_ids: [], specs: [],
};

const STEPS = ["תמונות", "פרטים", "קטגוריות ומפרטים"];

/* ── Toggle switch ─────────────────────────────── */
function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
      <div onClick={onChange} style={{ width: 46, height: 26, borderRadius: 13, background: checked ? C.primary : "#cbd5e1", position: "relative", transition: "background 0.2s", cursor: "pointer", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 3, right: checked ? 3 : "auto", left: checked ? "auto" : 3, width: 20, height: 20, borderRadius: 10, background: "#fff", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{label}</span>
    </label>
  );
}

/* ── Step indicator ────────────────────────────── */
function StepBar({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24, gap: 0 }}>
      {STEPS.map((label, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            {i > 0 && <div style={{ flex: 1, height: 2, background: step >= i ? C.primary : "#e2e8f0", transition: "background 0.3s" }} />}
            <div style={{ width: 30, height: 30, borderRadius: 15, background: step >= i ? C.primary : "#e2e8f0", color: step >= i ? "#fff" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, transition: "all 0.3s" }}>
              {step > i ? "✓" : i + 1}
            </div>
            {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: step > i ? C.primary : "#e2e8f0", transition: "background 0.3s" }} />}
          </div>
          <span style={{ fontSize: 10, color: step >= i ? C.primary : "#94a3b8", fontWeight: step === i ? 700 : 400, whiteSpace: "nowrap" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main component ─────────────────────────────── */
export default function ProductsPage() {
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [form,       setForm]       = useState(emptyForm);
  const [editId,     setEditId]     = useState(null);
  const [view,       setView]       = useState("list");
  const [step,       setStep]       = useState(0);
  const [saving,     setSaving]     = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [search,     setSearch]     = useState("");
  const fileRef = useRef(null);
  const supabase = createClient();
  const searchParams = useSearchParams();

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    if (searchParams.get("new") === "true") openNew();
  }, [searchParams]);

  async function fetchAll() {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("id, name_he, slug").order("name_he"),
    ]);
    setProducts(prods || []);
    setCategories(cats || []);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p, [name]: type === "checkbox" ? checked : value,
      ...(name === "title_he" && !editId ? { slug: value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") } : {}),
    }));
  }

  function toggleCategory(id) {
    setForm((p) => ({ ...p, category_ids: p.category_ids.includes(id) ? p.category_ids.filter((c) => c !== id) : [...p.category_ids, id] }));
  }

  async function handleImages(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const uploaded = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) uploaded.push(data.url);
    }
    setForm((p) => ({ ...p, images: [...p.images, ...uploaded] }));
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeImage(i) { setForm((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) })); }
  function addSpec()       { setForm((p) => ({ ...p, specs: [...p.specs, { icon_url: "", value: "", label: "" }] })); }
  function removeSpec(i)   { setForm((p) => ({ ...p, specs: p.specs.filter((_, idx) => idx !== i) })); }
  function updateSpec(i, field, val) { setForm((p) => ({ ...p, specs: p.specs.map((sp, idx) => idx === i ? { ...sp, [field]: val } : sp) })); }

  async function handleSpecIcon(e, i) {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) updateSpec(i, "icon_url", data.url);
    e.target.value = "";
  }

  async function handleSave() {
    if (!form.title_he || !form.price || form.category_ids.length === 0) return;
    setSaving(true);
    const payload = { ...form, price: parseFloat(form.price), old_price: form.old_price ? parseFloat(form.old_price) : null, category_id: form.category_ids[0] || null };
    if (editId) {
      await supabase.from("products").update(payload).eq("id", editId);
    } else {
      await supabase.from("products").insert(payload);
    }
    setForm(emptyForm); setEditId(null); setStep(0); setView("list");
    await fetchAll(); setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm("למחוק מוצר זה?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchAll();
  }

  function openNew()  { setEditId(null); setForm(emptyForm); setStep(0); setView("form"); }
  function openEdit(p) {
    setEditId(p.id);
    setForm({ title_he: p.title_he || "", title_en: p.title_en || "", slug: p.slug || "", description_he: p.description_he || "", description_en: p.description_en || "", price: p.price || "", old_price: p.old_price || "", badge: p.badge || "", in_stock: p.in_stock ?? true, featured: p.featured ?? false, images: p.images || [], category_ids: p.category_ids || (p.category_id ? [p.category_id] : []), specs: p.specs || [] });
    setStep(0); setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filtered = products.filter((p) => !search || (p.title_he + (p.title_en || "")).toLowerCase().includes(search.toLowerCase()));

  /* ── LIST VIEW ── */
  if (view === "list") return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.primary, margin: 0 }}>מוצרים</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "3px 0 0" }}>{products.length} מוצרים במאגר</p>
        </div>
        <button onClick={openNew} style={{ padding: "10px 18px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> הוסף
        </button>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <span style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 16, pointerEvents: "none" }}>🔍</span>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="חיפוש מוצר..." style={{ ...C.input, paddingRight: 38 }} />
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: C.muted }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
          <p style={{ fontWeight: 600, color: C.primary, marginBottom: 4 }}>אין מוצרים עדיין</p>
          <p style={{ fontSize: 13 }}>לחץ "הוסף" כדי להוסיף את המוצר הראשון</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {filtered.map((p) => (
            <div key={p.id} onClick={() => openEdit(p)} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.07)"; }}
            >
              {/* Product image */}
              <div style={{ aspectRatio: "1", background: "#f8fafc", overflow: "hidden", position: "relative" }}>
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#cbd5e1", fontSize: 36 }}>📷</div>
                )}
                <span style={{ position: "absolute", top: 8, left: 8, background: p.in_stock ? C.successBg : C.dangerBg, color: p.in_stock ? C.success : C.danger, fontSize: 10, fontWeight: 700, padding: "3px 7px", borderRadius: 6 }}>
                  {p.in_stock ? "במלאי" : "אזל"}
                </span>
              </div>
              {/* Info */}
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.primary, margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title_he || p.title_en}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.primary }}>₪{p.price}</span>
                  {p.old_price && <span style={{ fontSize: 11, color: "#94a3b8", textDecoration: "line-through" }}>₪{p.old_price}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button onClick={openNew} style={{ position: "fixed", bottom: 88, left: 20, width: 56, height: 56, borderRadius: 28, background: C.primary, color: "#fff", border: "none", fontSize: 28, cursor: "pointer", boxShadow: "0 4px 20px rgba(15,23,42,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
        +
      </button>
    </div>
  );

  /* ── FORM VIEW ── */
  return (
    <div style={{ maxWidth: 540, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={() => { setView("list"); setEditId(null); setForm(emptyForm); }} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: C.muted, padding: 0, lineHeight: 1, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }}>←</button>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.primary, margin: 0 }}>{editId ? "עריכת מוצר" : "מוצר חדש"}</h2>
          <p style={{ fontSize: 12, color: C.muted, margin: "2px 0 0" }}>שלב {step + 1} מתוך {STEPS.length}</p>
        </div>
      </div>

      <StepBar step={step} />

      {/* ── STEP 0: Photos ── */}
      {step === 0 && (
        <div>
          <div style={C.card}>
            <span style={C.label}>תמונות המוצר</span>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImages} style={{ display: "none" }} />
            <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed #cbd5e1", borderRadius: 14, padding: "32px 20px", textAlign: "center", cursor: "pointer", background: "#f8fafc", transition: "all 0.2s", marginBottom: form.images.length ? 16 : 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.background = "#f1f5f9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.background = "#f8fafc"; }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{uploading ? "⏳" : "📷"}</div>
              <p style={{ fontWeight: 700, color: C.primary, margin: "0 0 4px", fontSize: 15 }}>{uploading ? "מעלה..." : "לחץ להוספת תמונות"}</p>
              <p style={{ color: C.muted, fontSize: 12, margin: 0 }}>מצלמה או גלריה · ניתן לבחור מספר תמונות</p>
            </div>

            {form.images.length > 0 && (
              <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
                {form.images.map((url, i) => (
                  <div key={i} style={{ position: "relative", flexShrink: 0 }}>
                    <img src={url} alt="" style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 10, border: "2px solid " + (i === 0 ? C.primary : "#e2e8f0") }} />
                    {i === 0 && <span style={{ position: "absolute", bottom: 5, right: 5, background: C.primary, color: "#fff", fontSize: 9, padding: "2px 5px", borderRadius: 4, fontWeight: 700 }}>ראשית</span>}
                    <button onClick={() => removeImage(i)} style={{ position: "absolute", top: -6, left: -6, width: 22, height: 22, borderRadius: 11, background: C.danger, color: "#fff", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button disabled={uploading} onClick={() => setStep(1)} style={{ flex: 1, padding: 15, background: C.primary, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", opacity: uploading ? 0.6 : 1 }}>
              הבא ←
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 1: Details ── */}
      {step === 1 && (
        <div>
          <div style={C.card}>
            <div style={{ marginBottom: 16 }}>
              <span style={C.label}>שם המוצר (עברית) *</span>
              <input name="title_he" value={form.title_he} onChange={handleChange} required placeholder="לדוגמה: טבעת יהלום 1 קראט" style={C.input} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <span style={C.label}>שם המוצר (אנגלית)</span>
              <input name="title_en" value={form.title_en} onChange={handleChange} placeholder="e.g. Diamond Ring 1ct" style={C.input} />
            </div>
            <div>
              <span style={C.label}>Slug</span>
              <input name="slug" value={form.slug} onChange={handleChange} placeholder="diamond-ring" style={{ ...C.input, fontFamily: "monospace", fontSize: 13 }} />
            </div>
          </div>

          <div style={C.card}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <span style={C.label}>מחיר (₪) *</span>
                <input name="price" type="number" inputMode="decimal" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0" style={{ ...C.input, fontSize: 18, fontWeight: 700 }} />
              </div>
              <div>
                <span style={C.label}>מחיר לפני הנחה (₪)</span>
                <input name="old_price" type="number" inputMode="decimal" min="0" step="0.01" value={form.old_price} onChange={handleChange} placeholder="0" style={C.input} />
              </div>
            </div>
            <div>
              <span style={C.label}>Badge (אופציונלי)</span>
              <input name="badge" value={form.badge} onChange={handleChange} placeholder="SALE · NEW · HOT" style={C.input} />
            </div>
          </div>

          <div style={{ ...C.card, display: "flex", gap: 24 }}>
            <Toggle checked={form.in_stock} onChange={() => setForm((p) => ({ ...p, in_stock: !p.in_stock }))} label="במלאי" />
            <Toggle checked={form.featured} onChange={() => setForm((p) => ({ ...p, featured: !p.featured }))} label="מומלץ ⭐" />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(0)} style={{ padding: 15, background: "#f1f5f9", color: C.primary, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", minWidth: 80 }}>→ חזור</button>
            <button onClick={() => setStep(2)} disabled={!form.title_he || !form.price} style={{ flex: 1, padding: 15, background: C.primary, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", opacity: (!form.title_he || !form.price) ? 0.5 : 1 }}>הבא ←</button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Categories + Specs ── */}
      {step === 2 && (
        <div>
          {/* Categories */}
          <div style={C.card}>
            <span style={C.label}>קטגוריות {form.category_ids.length > 0 && <span style={{ background: C.primary, color: "#fff", borderRadius: 8, padding: "1px 7px", fontSize: 10, marginRight: 6 }}>{form.category_ids.length}</span>}</span>
            {categories.length === 0 ? (
              <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>אין קטגוריות — צור קודם בעמוד קטגוריות</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
                {categories.map((cat) => {
                  const active = form.category_ids.includes(cat.id);
                  return (
                    <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)} style={{ padding: "9px 16px", borderRadius: 22, border: `1.5px solid ${active ? C.primary : "#e2e8f0"}`, background: active ? C.primary : "#fff", color: active ? "#fff" : C.muted, fontSize: 13, fontWeight: active ? 700 : 400, cursor: "pointer", transition: "all 0.15s" }}>
                      {active && "✓ "}{cat.name_he}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Specs */}
          <div style={C.card}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={C.label}>מפרטים טכניים</span>
              <button type="button" onClick={addSpec} style={{ padding: "6px 12px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ הוסף</button>
            </div>
            {form.specs.length === 0 && <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>לחץ "הוסף" להוספת נתונים טכניים (קראט, סוג אבן...)</p>}
            {form.specs.map((spec, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "52px 1fr 1fr 28px", gap: 8, alignItems: "center", marginBottom: 10, padding: "10px 12px", background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                <div>
                  <input type="file" accept="image/*" id={`si-${i}`} style={{ display: "none" }} onChange={(e) => handleSpecIcon(e, i)} />
                  <label htmlFor={`si-${i}`} style={{ cursor: "pointer", display: "block" }}>
                    {spec.icon_url ? <img src={spec.icon_url} alt="" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff" }} /> : <div style={{ width: 44, height: 44, border: "1.5px dashed #cbd5e1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 20, background: "#fff" }}>+</div>}
                  </label>
                </div>
                <input placeholder="ערך (11.7ct)" value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)} style={{ ...C.input, fontSize: 13, padding: "9px 10px" }} />
                <input placeholder="תווית (קראט)" value={spec.label} onChange={(e) => updateSpec(i, "label", e.target.value)} style={{ ...C.input, fontSize: 13, padding: "9px 10px" }} />
                <button type="button" onClick={() => removeSpec(i)} style={{ background: "none", border: "none", color: C.danger, fontSize: 20, cursor: "pointer", padding: 0, lineHeight: 1 }}>×</button>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={C.card}>
            <span style={C.label}>תיאור (אופציונלי)</span>
            <textarea name="description_he" value={form.description_he} onChange={handleChange} rows={3} placeholder="תאר את המוצר..." style={{ ...C.input, resize: "vertical", lineHeight: 1.6 }} />
          </div>

          {/* Actions */}
          {form.category_ids.length === 0 && (
            <div style={{ padding: "12px 16px", background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 10, fontSize: 13, color: "#92400e", marginBottom: 10, textAlign: "center" }}>
              יש לבחור קטגוריה אחת לפחות לפני השמירה
            </div>
          )}
          <div style={{ display: "flex", gap: 10, position: "sticky", bottom: 16 }}>
            <button onClick={() => setStep(1)} style={{ padding: 15, background: "#f1f5f9", color: C.primary, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", minWidth: 80 }}>→ חזור</button>
            <button onClick={handleSave} disabled={saving || form.category_ids.length === 0} style={{ flex: 1, padding: 15, background: C.primary, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", opacity: (saving || form.category_ids.length === 0) ? 0.4 : 1 }}>
              {saving ? "שומר..." : editId ? "✓ עדכן מוצר" : "✓ שמור מוצר"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
