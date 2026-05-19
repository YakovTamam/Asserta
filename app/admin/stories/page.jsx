"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

const C = {
  primary: "#0f172a",
  card:    { background:"#fff", borderRadius:16, padding:20, boxShadow:"0 1px 3px rgba(0,0,0,0.07)", marginBottom:16 },
  label:   { fontSize:11, fontWeight:700, color:"#64748b", letterSpacing:"0.6px", textTransform:"uppercase", display:"block", marginBottom:6 },
};

function Toggle({ checked, onChange, label, description }) {
  return (
    <label style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer", userSelect:"none" }}>
      <div onClick={onChange} style={{ width:48, height:27, borderRadius:14, background: checked ? C.primary : "#cbd5e1", position:"relative", transition:"background 0.2s", cursor:"pointer", flexShrink:0 }}>
        <div style={{ position:"absolute", top:3.5, left: checked ? "auto" : 3.5, right: checked ? 3.5 : "auto", width:20, height:20, borderRadius:10, background:"#fff", transition:"all 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      <div>
        <div style={{ fontWeight:600, fontSize:14, color:"#0f172a" }}>{label}</div>
        {description && <div style={{ fontSize:12, color:"#64748b", marginTop:2 }}>{description}</div>}
      </div>
    </label>
  );
}

export default function StoriesAdminPage() {
  const [isSticky, setIsSticky]   = useState(false);
  const [saving,   setSaving]     = useState(false);
  const [saved,    setSaved]      = useState(false);
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("settings").select("value").eq("key", "stories_sticky").single();
      if (data) setIsSticky(data.value === "true");
    })();
  }, []);

  async function handleSave() {
    setSaving(true);
    await supabase.from("settings").upsert({ key:"stories_sticky", value: String(isSticky) }, { onConflict:"key" });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div style={{ maxWidth:640, margin:"0 auto" }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:20, fontWeight:800, color:"#0f172a", margin:"0 0 6px" }}>הגדרות Stories</h1>
        <p style={{ fontSize:13, color:"#64748b", margin:0 }}>ניהול קומפוננטת ה-Stories בדף הבית</p>
      </div>

      {/* Sticky setting */}
      <div style={C.card}>
        <span style={C.label}>התנהגות</span>
        <Toggle
          checked={isSticky}
          onChange={() => setIsSticky(v => !v)}
          label="Sticky Mode"
          description="כשהמשתמש גולל מעבר ל-Stories, מופיע בר קטן בראש המסך עם עיגולי ה-Stories"
        />
      </div>

      {/* Preview info */}
      <div style={{ ...C.card, background:"#f8fafc", border:"1px solid #e2e8f0" }}>
        <span style={C.label}>מה כלול בקומפוננטה</span>
        <div style={{ display:"grid", gap:10 }}>
          {[
            { icon:"👤", title:"עיגולי Stories", desc:"5 יוצרות עם גרדיאנט צבעוני — לחיצה פותחת מצגת מסך מלא" },
            { icon:"▶️", title:"מצגת Stories", desc:"פסי התקדמות, ניווט בטאץ׳, מעבר אוטומטי בין סטוריז" },
            { icon:"🛍️", title:"כרטיסיית מוצר", desc:"מוצרים מקושרים לכל Story עם מחיר ועיצוב luxury" },
            { icon:"📌", title:"Sticky bar", desc:"נגיש בראש המסך גם אחרי גלילה (אם מופעל)" },
          ].map(item => (
            <div key={item.icon} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <span style={{ fontSize:20, flexShrink:0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight:600, fontSize:13, color:"#0f172a" }}>{item.title}</div>
                <div style={{ fontSize:12, color:"#64748b" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        style={{ width:"100%", padding:15, background: saved ? "#16a34a" : C.primary, color:"#fff", border:"none", borderRadius:12, fontSize:16, fontWeight:700, cursor:"pointer", transition:"background 0.3s", opacity: saving ? 0.7 : 1 }}>
        {saving ? "שומר..." : saved ? "✓ נשמר!" : "שמור הגדרות"}
      </button>
    </div>
  );
}
