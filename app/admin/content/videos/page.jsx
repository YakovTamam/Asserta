"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase-browser";

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

/* ── Defaults ── */
const defaultOverlay = () => ({
  id: crypto.randomUUID(),
  text: "",
  type: "h1",
  pos_x: "center",
  pos_y: "middle",
  color: "#ffffff",
  fontSize: 40,
  fontWeight: 700,
  anim_in: "fadeIn",
  scroll_show: 0.05,
  scroll_hide: 0.85,
});

const defaultButton = () => ({
  id: crypto.randomUUID(),
  text: "",
  href: "",
  style: "primary",
  pos_x: "center",
  pos_y: "bottom",
  scroll_show: 0.2,
  scroll_hide: 0.85,
});

const defaultSection = (position) => ({
  _isNew: true,
  position,
  video_url: "",
  poster_url: "",
  overlays: [],
  buttons: [],
  is_active: true,
});

/* ── Position Grid (3×3) ── */
const GRID_CELLS = [
  { pos_x: "right", pos_y: "top",    label: "↗" },
  { pos_x: "center", pos_y: "top",   label: "↑" },
  { pos_x: "left",  pos_y: "top",    label: "↖" },
  { pos_x: "right", pos_y: "middle", label: "→" },
  { pos_x: "center", pos_y: "middle",label: "·" },
  { pos_x: "left",  pos_y: "middle", label: "←" },
  { pos_x: "right", pos_y: "bottom", label: "↘" },
  { pos_x: "center", pos_y: "bottom",label: "↓" },
  { pos_x: "left",  pos_y: "bottom", label: "↙" },
];

function PosGrid({ pos_x, pos_y, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 40px)", gap: 4 }}>
      {GRID_CELLS.map((cell) => {
        const selected = cell.pos_x === pos_x && cell.pos_y === pos_y;
        return (
          <button
            key={`${cell.pos_x}-${cell.pos_y}`}
            type="button"
            onClick={() => onChange(cell.pos_x, cell.pos_y)}
            style={{
              width: 40, height: 40, borderRadius: 8,
              border: `1.5px solid ${selected ? C.primary : C.border}`,
              background: selected ? C.primary : "#fff",
              color: selected ? "#fff" : C.muted,
              fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            {cell.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Toggle switch ── */
function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
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
      {label && <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{label}</span>}
    </label>
  );
}

/* ── Overlay editor ── */
function OverlayEditor({ overlay, onChange, onDelete }) {
  return (
    <div style={{
      background: "#f8fafc", borderRadius: 12, padding: 16,
      border: "1px solid #e2e8f0", marginBottom: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.5px", textTransform: "uppercase" }}>טקסט כיסוי</span>
        <button
          type="button"
          onClick={onDelete}
          style={{ width: 28, height: 28, borderRadius: 8, background: "#fee2e2", border: "none", color: C.danger, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
        >×</button>
      </div>

      {/* Text */}
      <div style={{ marginBottom: 12 }}>
        <label style={C.label}>טקסט</label>
        <input
          style={C.input}
          value={overlay.text}
          onChange={e => onChange({ ...overlay, text: e.target.value })}
          placeholder="הכנס טקסט..."
        />
      </div>

      {/* Type */}
      <div style={{ marginBottom: 12 }}>
        <label style={C.label}>סוג</label>
        <select
          style={{ ...C.input, cursor: "pointer" }}
          value={overlay.type}
          onChange={e => onChange({ ...overlay, type: e.target.value })}
        >
          <option value="h1">כותרת גדולה (h1)</option>
          <option value="h2">כותרת קטנה (h2)</option>
          <option value="p">פסקה (p)</option>
          <option value="caption">כיתוב (caption)</option>
        </select>
      </div>

      {/* Position grid */}
      <div style={{ marginBottom: 12 }}>
        <label style={C.label}>מיקום</label>
        <PosGrid
          pos_x={overlay.pos_x}
          pos_y={overlay.pos_y}
          onChange={(px, py) => onChange({ ...overlay, pos_x: px, pos_y: py })}
        />
      </div>

      {/* Color + font size */}
      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 auto" }}>
          <label style={C.label}>צבע</label>
          <input
            type="color"
            value={overlay.color || "#ffffff"}
            onChange={e => onChange({ ...overlay, color: e.target.value })}
            style={{ width: 48, height: 40, border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", padding: 2 }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <label style={C.label}>גודל פונט: {overlay.fontSize || 40}px</label>
          <input
            type="range"
            min={12} max={96}
            value={overlay.fontSize || 40}
            onChange={e => onChange({ ...overlay, fontSize: Number(e.target.value) })}
            style={{ width: "100%", marginTop: 8 }}
          />
        </div>
      </div>

      {/* Animation */}
      <div style={{ marginBottom: 12 }}>
        <label style={C.label}>אנימציית כניסה</label>
        <select
          style={{ ...C.input, cursor: "pointer" }}
          value={overlay.anim_in || "none"}
          onChange={e => onChange({ ...overlay, anim_in: e.target.value })}
        >
          <option value="none">ללא</option>
          <option value="fadeIn">fadeIn</option>
          <option value="slideUp">slideUp</option>
          <option value="slideDown">slideDown</option>
          <option value="slideLeft">slideLeft</option>
          <option value="slideRight">slideRight</option>
          <option value="zoom">zoom</option>
        </select>
      </div>

      {/* Scroll show/hide */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={C.label}>מתי להציג (% גלילה): {Math.round((overlay.scroll_show || 0) * 100)}%</label>
          <input
            type="range"
            min={0} max={100}
            value={Math.round((overlay.scroll_show || 0) * 100)}
            onChange={e => onChange({ ...overlay, scroll_show: Number(e.target.value) / 100 })}
            style={{ width: "100%", marginTop: 8 }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={C.label}>מתי להסתיר (% גלילה): {Math.round((overlay.scroll_hide || 0.85) * 100)}%</label>
          <input
            type="range"
            min={0} max={100}
            value={Math.round((overlay.scroll_hide || 0.85) * 100)}
            onChange={e => onChange({ ...overlay, scroll_hide: Number(e.target.value) / 100 })}
            style={{ width: "100%", marginTop: 8 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Button editor ── */
function ButtonEditor({ btn, onChange, onDelete }) {
  return (
    <div style={{
      background: "#f8fafc", borderRadius: 12, padding: 16,
      border: "1px solid #e2e8f0", marginBottom: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.5px", textTransform: "uppercase" }}>כפתור</span>
        <button
          type="button"
          onClick={onDelete}
          style={{ width: 28, height: 28, borderRadius: 8, background: "#fee2e2", border: "none", color: C.danger, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
        >×</button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={C.label}>טקסט הכפתור</label>
          <input
            style={C.input}
            value={btn.text}
            onChange={e => onChange({ ...btn, text: e.target.value })}
            placeholder="לחץ כאן..."
          />
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={C.label}>קישור (href)</label>
          <input
            style={C.input}
            value={btn.href}
            onChange={e => onChange({ ...btn, href: e.target.value })}
            placeholder="/shop-collection-list"
          />
        </div>
      </div>

      {/* Style toggle */}
      <div style={{ marginBottom: 12 }}>
        <label style={C.label}>סגנון</label>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ val: "primary", label: "ממולא" }, { val: "outline", label: "מסגרת" }].map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => onChange({ ...btn, style: val })}
              style={{
                padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: `1.5px solid ${btn.style === val ? C.primary : C.border}`,
                background: btn.style === val ? C.primary : "#fff",
                color: btn.style === val ? "#fff" : C.muted,
                cursor: "pointer",
              }}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Position grid */}
      <div style={{ marginBottom: 12 }}>
        <label style={C.label}>מיקום</label>
        <PosGrid
          pos_x={btn.pos_x}
          pos_y={btn.pos_y}
          onChange={(px, py) => onChange({ ...btn, pos_x: px, pos_y: py })}
        />
      </div>

      {/* Scroll show/hide */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={C.label}>מתי להציג (% גלילה): {Math.round((btn.scroll_show || 0) * 100)}%</label>
          <input
            type="range"
            min={0} max={100}
            value={Math.round((btn.scroll_show || 0) * 100)}
            onChange={e => onChange({ ...btn, scroll_show: Number(e.target.value) / 100 })}
            style={{ width: "100%", marginTop: 8 }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <label style={C.label}>מתי להסתיר (% גלילה): {Math.round((btn.scroll_hide || 0.85) * 100)}%</label>
          <input
            type="range"
            min={0} max={100}
            value={Math.round((btn.scroll_hide || 0.85) * 100)}
            onChange={e => onChange({ ...btn, scroll_hide: Number(e.target.value) / 100 })}
            style={{ width: "100%", marginTop: 8 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Section card ── */
function SectionCard({ section, onChange, onSave, onDelete, savingId, flashId, errorId }) {
  const videoFileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [expanded, setExpanded] = useState(true);

  async function handleVideoUpload(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange({ ...section, video_url: data.url });
    } catch (e) {
      console.error("Upload error:", e);
    }
    setUploading(false);
  }

  const isSaving = savingId === section._tempId || savingId === section.id;
  const isFlash = flashId === section._tempId || flashId === section.id;
  const errMsg = (errorId === section._tempId || errorId === section.id) ? errorId : null;

  return (
    <div style={{ ...C.cardStyle, border: "1.5px solid #e2e8f0" }}>
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: expanded ? 20 : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
            {section.position}
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.primary }}>
            סרטון {section.position}
          </span>
          {section.video_url && <span style={{ fontSize: 12, color: C.success, background: "#dcfce7", padding: "2px 8px", borderRadius: 6 }}>✓ וידאו מוגדר</span>}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              style={{ padding: "6px 10px", background: "#fee2e2", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer", color: C.danger }}
            >
              🗑
            </button>
          )}
          <button
            type="button"
            onClick={() => setExpanded(p => !p)}
            style={{ padding: "6px 14px", background: "#f1f5f9", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer", color: C.primary, fontWeight: 600 }}
          >
            {expanded ? "▲ כווץ" : "▼ פתח"}
          </button>
        </div>
      </div>

      {!expanded && null}

      {expanded && (
        <>
          {/* A) Video upload */}
          <div style={{ background: "#f8fafc", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid #e2e8f0" }}>
            <label style={{ ...C.label, marginBottom: 12 }}>וידאו</label>

            {section.video_url ? (
              <div style={{ marginBottom: 12 }}>
                <video
                  src={section.video_url}
                  muted
                  controls
                  style={{ width: "100%", maxHeight: 200, borderRadius: 8, background: "#000" }}
                />
              </div>
            ) : (
              <div style={{ background: "#f1f5f9", borderRadius: 8, padding: 20, textAlign: "center", marginBottom: 12, color: C.muted, fontSize: 13 }}>
                אין וידאו — לחץ "העלאת וידאו" כדי להוסיף
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => videoFileRef.current?.click()}
                disabled={uploading}
                style={{ padding: "9px 18px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: uploading ? 0.7 : 1 }}
              >
                {uploading ? "מעלה..." : "העלאת וידאו"}
              </button>
              {section.video_url && (
                <button
                  type="button"
                  onClick={() => onChange({ ...section, video_url: "" })}
                  style={{ padding: "9px 16px", background: "#fee2e2", color: C.danger, border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
                >
                  מחק וידאו
                </button>
              )}
            </div>
            <input
              ref={videoFileRef}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={e => handleVideoUpload(e.target.files[0])}
            />
          </div>

          {/* B) Overlays */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <label style={{ ...C.label, marginBottom: 0 }}>טקסטים על הוידאו ({section.overlays.length})</label>
              <button
                type="button"
                onClick={() => onChange({ ...section, overlays: [...section.overlays, defaultOverlay()] })}
                style={{ padding: "7px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.success }}
              >
                + הוסף טקסט
              </button>
            </div>
            {section.overlays.map((ov, idx) => (
              <OverlayEditor
                key={ov.id}
                overlay={ov}
                onChange={(updated) => {
                  const newOverlays = [...section.overlays];
                  newOverlays[idx] = updated;
                  onChange({ ...section, overlays: newOverlays });
                }}
                onDelete={() => {
                  onChange({ ...section, overlays: section.overlays.filter((_, i) => i !== idx) });
                }}
              />
            ))}
          </div>

          {/* C) Buttons */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <label style={{ ...C.label, marginBottom: 0 }}>כפתורים ({section.buttons.length})</label>
              <button
                type="button"
                onClick={() => onChange({ ...section, buttons: [...section.buttons, defaultButton()] })}
                style={{ padding: "7px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#1d4ed8" }}
              >
                + הוסף כפתור
              </button>
            </div>
            {section.buttons.map((btn, idx) => (
              <ButtonEditor
                key={btn.id}
                btn={btn}
                onChange={(updated) => {
                  const newBtns = [...section.buttons];
                  newBtns[idx] = updated;
                  onChange({ ...section, buttons: newBtns });
                }}
                onDelete={() => {
                  onChange({ ...section, buttons: section.buttons.filter((_, i) => i !== idx) });
                }}
              />
            ))}
          </div>

          {/* D) Footer — active toggle + save */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <Toggle
              checked={section.is_active}
              onChange={() => onChange({ ...section, is_active: !section.is_active })}
              label="פעיל"
            />

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {isFlash && (
                <span style={{ fontSize: 14, fontWeight: 600, color: C.success }}>נשמר ✓</span>
              )}
              <button
                type="button"
                onClick={() => onSave(section)}
                disabled={isSaving}
                style={{ padding: "10px 28px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: isSaving ? 0.7 : 1 }}
              >
                {isSaving ? "שומר..." : "שמור שינויים"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function VideosPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [flashId, setFlashId] = useState(null);
  const [errors, setErrors] = useState({});
  const supabase = createClient();

  useEffect(() => { fetchSections(); }, []);

  async function fetchSections() {
    const { data } = await supabase
      .from("video_sections")
      .select("*")
      .order("position");

    if (!data || data.length === 0) {
      // Default 2 empty sections
      setSections([
        { ...defaultSection(1), _tempId: "tmp-1" },
        { ...defaultSection(2), _tempId: "tmp-2" },
      ]);
    } else {
      setSections(data.map(s => ({
        ...s,
        overlays: s.overlays || [],
        buttons: s.buttons || [],
      })));
    }
    setLoading(false);
  }

  function updateSection(updated) {
    setSections(prev => prev.map(s => {
      const matchId = updated.id && s.id === updated.id;
      const matchTmp = updated._tempId && s._tempId === updated._tempId;
      return (matchId || matchTmp) ? updated : s;
    }));
  }

  async function saveSection(section) {
    const key = section.id || section._tempId;
    setSavingId(key);
    setErrors(prev => ({ ...prev, [key]: "" }));

    const payload = {
      position: section.position,
      video_url: section.video_url || null,
      poster_url: section.poster_url || null,
      overlays: section.overlays,
      buttons: section.buttons,
      is_active: section.is_active,
    };

    let savedId = section.id;

    if (section.id) {
      // Update existing
      const { error } = await supabase
        .from("video_sections")
        .update(payload)
        .eq("id", section.id);
      if (error) {
        setErrors(prev => ({ ...prev, [key]: error.message }));
        setSavingId(null);
        return;
      }
    } else {
      // Insert new
      const { data, error } = await supabase
        .from("video_sections")
        .insert(payload)
        .select()
        .single();
      if (error) {
        setErrors(prev => ({ ...prev, [key]: error.message }));
        setSavingId(null);
        return;
      }
      savedId = data.id;
      // Promote from temp to real
      setSections(prev => prev.map(s =>
        s._tempId === section._tempId
          ? { ...s, id: savedId, _isNew: false, _tempId: undefined }
          : s
      ));
    }

    setSavingId(null);
    const flashKey = savedId || key;
    setFlashId(flashKey);
    setTimeout(() => setFlashId(null), 2000);
  }

  async function deleteSection(section) {
    if (!confirm("האם למחוק את הסרטון?")) return;
    if (section.id) {
      await supabase.from("video_sections").delete().eq("id", section.id);
    }
    setSections(prev => prev.filter(s => s !== section));
  }

  function addSection() {
    const maxPos = sections.length > 0 ? Math.max(...sections.map(s => s.position)) : 0;
    setSections(prev => [...prev, { ...defaultSection(maxPos + 1), _tempId: `tmp-${Date.now()}` }]);
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: C.muted, fontSize: 14 }}>טוען...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "32px 24px", direction: "rtl" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: C.primary, margin: 0 }}>סרטוני גלילה</h1>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 4, marginBottom: 0 }}>{sections.length} סרטונים</p>
          </div>
          <button
            onClick={addSection}
            style={{ padding: "10px 20px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            + הוסף סרטון
          </button>
        </div>

        {/* Global errors */}
        {Object.entries(errors).map(([key, msg]) =>
          msg ? (
            <div key={key} style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginBottom: 12, color: C.danger, fontSize: 14 }}>
              {msg}
            </div>
          ) : null
        )}

        {/* Section cards */}
        {sections.map((section) => (
          <SectionCard
            key={section.id || section._tempId}
            section={section}
            onChange={updateSection}
            onSave={saveSection}
            onDelete={sections.length > 1 ? () => deleteSection(section) : null}
            savingId={savingId}
            flashId={flashId}
            errorId={errors[section.id || section._tempId] ? (section.id || section._tempId) : null}
          />
        ))}
      </div>
    </div>
  );
}
