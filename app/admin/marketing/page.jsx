"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

const C = {
  primary: "#0f172a",
  card:    { background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)", marginBottom: 16 },
  label:   { fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "0.6px", textTransform: "uppercase", display: "block", marginBottom: 6 },
  input:   { width: "100%", padding: "13px 14px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, boxSizing: "border-box", outline: "none", background: "#fff", color: "#0f172a", fontFamily: "monospace" },
  hint:    { fontSize: 12, color: "#94a3b8", marginTop: 5 },
};

const FIELDS = [
  {
    section: "Google Tag Manager",
    icon: "📊",
    color: "#4285f4",
    key: "gtm_id",
    label: "GTM Container ID",
    placeholder: "GTM-XXXXXXX",
    hint: "נמצא ב-tagmanager.google.com → Admin → Container ID",
  },
  {
    section: "Facebook Pixel",
    icon: "📘",
    color: "#1877f2",
    key: "fb_pixel_id",
    label: "Pixel ID",
    placeholder: "123456789012345",
    hint: "נמצא ב-Meta Business Manager → Events Manager → Pixel",
  },
  {
    section: "Microsoft Clarity",
    icon: "🔥",
    color: "#0078d4",
    key: "clarity_id",
    label: "Clarity Project ID",
    placeholder: "abc1def2gh",
    hint: "נמצא ב-clarity.microsoft.com → Settings → Project ID",
  },
  {
    section: "Google Analytics 4",
    icon: "📈",
    color: "#e37400",
    key: "ga4_id",
    label: "Measurement ID",
    placeholder: "G-XXXXXXXXXX",
    hint: "נמצא ב-analytics.google.com → Admin → Data Streams → Measurement ID",
  },
];

export default function MarketingPage() {
  const [values,  setValues]  = useState({});
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("settings").select("key, value");
      const map = Object.fromEntries((data || []).map(({ key, value }) => [key, value]));
      setValues(map);
    })();
  }, []);

  async function handleSave() {
    setSaving(true);
    const rows = Object.entries(values)
      .filter(([, v]) => v !== undefined)
      .map(([key, value]) => ({ key, value: value || "" }));
    await supabase.from("settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>הגדרות שיווק</h1>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
          הזן את מזהי הכלים — הסקריפטים יוזרקו אוטומטית לכל דפי האתר
        </p>
      </div>

      {FIELDS.map((f) => (
        <div key={f.key} style={C.card}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {f.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{f.section}</div>
              <div style={{ fontSize: 11, color: values[f.key] ? "#16a34a" : "#94a3b8", fontWeight: 600 }}>
                {values[f.key] ? "✓ מחובר" : "לא מוגדר"}
              </div>
            </div>
          </div>
          <label style={C.label}>{f.label}</label>
          <input
            value={values[f.key] || ""}
            onChange={(e) => setValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
            placeholder={f.placeholder}
            style={C.input}
          />
          <p style={C.hint}>{f.hint}</p>
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={saving}
        style={{ width: "100%", padding: 15, background: saved ? "#16a34a" : C.primary, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "background 0.3s", opacity: saving ? 0.7 : 1 }}
      >
        {saving ? "שומר..." : saved ? "✓ נשמר בהצלחה!" : "שמור הגדרות"}
      </button>

      <div style={{ marginTop: 16, padding: "14px 16px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
        <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.7 }}>
          <strong>SQL נדרש ב-Supabase:</strong><br />
          <code style={{ fontFamily: "monospace", background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>
            CREATE TABLE settings (key text PRIMARY KEY, value text, updated_at timestamptz DEFAULT now());
          </code><br />
          <code style={{ fontFamily: "monospace", background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>
            ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
          </code>
        </p>
      </div>
    </div>
  );
}
