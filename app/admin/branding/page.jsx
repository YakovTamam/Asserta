"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase-browser";
import Image from "next/image";

const C = {
  primary: "#0f172a",
  card: { background:"#fff", borderRadius:16, padding:24, boxShadow:"0 1px 3px rgba(0,0,0,0.07)" },
  label: { fontSize:11, fontWeight:700, color:"#64748b", letterSpacing:"0.6px", textTransform:"uppercase", display:"block", marginBottom:8 },
};

const FIELDS = [
  { key:"logo_url",        label:"לוגו ראשי (דסקטופ)",  hint:"מומלץ SVG או PNG שקוף, רוחב ~120px" },
  { key:"logo_mobile_url", label:"לוגו מובייל",          hint:"מומלץ SVG או PNG שקוף, רוחב ~100px" },
  { key:"favicon_url",     label:"Favicon",              hint:"ICO, PNG או SVG, 32×32px" },
];

export default function BrandingPage() {
  const [settings, setSettings] = useState({});
  const [uploading, setUploading] = useState({});
  const [saved, setSaved] = useState(false);
  const supabase = createClient();
  const fileRefs = useRef({});

  useEffect(() => {
    supabase.from("settings").select("key,value")
      .in("key", FIELDS.map(f => f.key))
      .then(({ data }) => {
        const map = Object.fromEntries((data || []).map(({ key, value }) => [key, value]));
        setSettings(map);
      });
  }, []);

  async function handleUpload(key, file) {
    if (!file) return;
    setUploading(prev => ({ ...prev, [key]: true }));
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method:"POST", body:fd });
    const { url } = await res.json();
    if (url) {
      setSettings(prev => ({ ...prev, [key]: url }));
      await supabase.from("settings").upsert({ key, value: url }, { onConflict:"key" });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setUploading(prev => ({ ...prev, [key]: false }));
  }

  return (
    <div style={{ maxWidth:680, margin:"0 auto" }}>
      <h2 style={{ fontSize:20, fontWeight:700, marginBottom:24, color:"#0f172a" }}>מיתוג האתר 🎨</h2>

      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        {FIELDS.map(({ key, label, hint }) => (
          <div key={key} style={C.card}>
            <label style={C.label}>{label}</label>
            <p style={{ fontSize:12, color:"#94a3b8", marginBottom:14 }}>{hint}</p>

            <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              {/* Preview */}
              <div style={{
                width:120, height:60, borderRadius:10, border:"1.5px dashed #e2e8f0",
                background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"center",
                overflow:"hidden", flexShrink:0,
              }}>
                {settings[key]
                  ? <img src={settings[key]} alt="" style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain" }} />
                  : <span style={{ fontSize:22 }}>🖼️</span>
                }
              </div>

              {/* Upload button */}
              <div>
                <button
                  onClick={() => fileRefs.current[key]?.click()}
                  disabled={uploading[key]}
                  style={{
                    padding:"10px 20px", background:C.primary, color:"#fff",
                    border:"none", borderRadius:10, fontSize:14, fontWeight:600,
                    cursor:"pointer", opacity: uploading[key] ? 0.6 : 1,
                  }}>
                  {uploading[key] ? "מעלה..." : "העלה קובץ"}
                </button>
                {settings[key] && (
                  <p style={{ fontSize:11, color:"#94a3b8", marginTop:6, wordBreak:"break-all" }}>
                    ✓ מחובר
                  </p>
                )}
                <input
                  ref={el => fileRefs.current[key] = el}
                  type="file"
                  accept="image/*,.ico,.svg"
                  style={{ display:"none" }}
                  onChange={e => handleUpload(key, e.target.files?.[0])}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {saved && (
        <div style={{
          position:"fixed", bottom:90, left:"50%", transform:"translateX(-50%)",
          background:"#0f172a", color:"#fff", padding:"10px 24px",
          borderRadius:100, fontSize:14, fontWeight:600, zIndex:9999,
        }}>
          ✓ נשמר בהצלחה
        </div>
      )}

      <div style={{ marginTop:24, padding:16, background:"#fef9c3", borderRadius:12, fontSize:13, color:"#92400e" }}>
        <strong>שים לב:</strong> לאחר שינוי לוגו/פביקון, יש לרפרש את העמוד כדי לראות את השינויים.
        הפביקון עלול להישאר בקאש של הדפדפן — נסה Ctrl+Shift+R.
      </div>
    </div>
  );
}
