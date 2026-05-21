"use client";
import { useState, useEffect, useRef } from "react";

/* Upload directly to Cloudinary — bypasses Vercel's 4.5MB serverless limit */
async function uploadDirect(file) {
  const signRes = await fetch("/api/cloudinary-sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "asserta/media" }),
  });
  const { signature, timestamp, api_key, cloud_name, folder } = await signRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("signature", signature);
  fd.append("timestamp", String(timestamp));
  fd.append("api_key", api_key);
  fd.append("folder", folder);

  const res  = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
    { method: "POST", body: fd }
  );
  const data = await res.json();
  if (!data.secure_url) throw new Error(data.error?.message || "Upload failed");
  return data.secure_url;
}

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
  cardStyle: { background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.07)", marginBottom: 12 },
};

const defaultOverlay = () => ({
  id: crypto.randomUUID(),
  text: "", type: "h1",
  pos_x: "center", pos_y: "middle",
  color: "#ffffff", fontSize: 40, fontWeight: 700,
  anim_in: "fadeIn", scroll_show: 0.05, scroll_hide: 0.85,
});

const defaultButton = () => ({
  id: crypto.randomUUID(),
  text: "", href: "", style: "primary",
  pos_x: "center", pos_y: "bottom",
  scroll_show: 0.2, scroll_hide: 0.85,
});

const defaultSection = (position) => ({
  _isNew: true, position,
  video_url: "", poster_url: "",
  overlays: [], buttons: [], is_active: true,
});

const GRID_CELLS = [
  { pos_x: "right",  pos_y: "top",    label: "↗" },
  { pos_x: "center", pos_y: "top",    label: "↑" },
  { pos_x: "left",   pos_y: "top",    label: "↖" },
  { pos_x: "right",  pos_y: "middle", label: "→" },
  { pos_x: "center", pos_y: "middle", label: "·" },
  { pos_x: "left",   pos_y: "middle", label: "←" },
  { pos_x: "right",  pos_y: "bottom", label: "↘" },
  { pos_x: "center", pos_y: "bottom", label: "↓" },
  { pos_x: "left",   pos_y: "bottom", label: "↙" },
];

function PosGrid({ pos_x, pos_y, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 36px)", gap: 3 }}>
      {GRID_CELLS.map((cell) => {
        const selected = cell.pos_x === pos_x && cell.pos_y === pos_y;
        return (
          <button key={`${cell.pos_x}-${cell.pos_y}`} type="button"
            onClick={() => onChange(cell.pos_x, cell.pos_y)}
            style={{ width: 36, height: 36, borderRadius: 7, border: `1.5px solid ${selected ? C.primary : C.border}`, background: selected ? C.primary : "#fff", color: selected ? "#fff" : C.muted, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
            {cell.label}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
      <div onClick={onChange} style={{ width: 40, height: 22, borderRadius: 11, background: checked ? C.primary : "#cbd5e1", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>
        <div style={{ position: "absolute", top: 3, right: checked ? 3 : "auto", left: checked ? "auto" : 3, width: 16, height: 16, borderRadius: 8, background: "#fff", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      {label && <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{label}</span>}
    </label>
  );
}

/* ── Collapsible row wrapper ── */
function CollapsibleRow({ title, subtitle, badge, onDelete, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#f8fafc", borderRadius: 10, border: "1px solid #e2e8f0", marginBottom: 8, overflow: "hidden" }}>
      <div
        onClick={() => setOpen(p => !p)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", cursor: "pointer", gap: 10 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          {badge && (
            <span style={{ fontSize: 10, fontWeight: 700, background: "#e2e8f0", color: C.muted, padding: "2px 7px", borderRadius: 5, flexShrink: 0 }}>{badge}</span>
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: C.primary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title || <span style={{ color: "#94a3b8", fontStyle: "italic" }}>ללא טקסט</span>}
          </span>
          {subtitle && <span style={{ fontSize: 11, color: C.muted, flexShrink: 0 }}>{subtitle}</span>}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          {onDelete && (
            <button type="button" onClick={e => { e.stopPropagation(); onDelete(); }}
              style={{ width: 24, height: 24, borderRadius: 6, background: "#fee2e2", border: "none", color: C.danger, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
              ×
            </button>
          )}
          <span style={{ color: C.muted, fontSize: 12, fontWeight: 600 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && <div style={{ padding: "0 14px 14px" }}>{children}</div>}
    </div>
  );
}

/* ── Overlay editor ── */
function OverlayEditor({ overlay, onChange, onDelete }) {
  const typeLabel = { h1: "כותרת גדולה", h2: "כותרת", p: "פסקה", caption: "כיתוב" };
  return (
    <CollapsibleRow
      title={overlay.text}
      subtitle={typeLabel[overlay.type] || overlay.type}
      badge="טקסט"
      onDelete={onDelete}
    >
      <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={C.label}>טקסט</label>
          <input style={C.input} value={overlay.text} onChange={e => onChange({ ...overlay, text: e.target.value })} placeholder="הכנס טקסט..." />
        </div>
        <div>
          <label style={C.label}>סוג</label>
          <select style={{ ...C.input, cursor: "pointer" }} value={overlay.type} onChange={e => onChange({ ...overlay, type: e.target.value })}>
            <option value="h1">כותרת גדולה (h1)</option>
            <option value="h2">כותרת קטנה (h2)</option>
            <option value="p">פסקה (p)</option>
            <option value="caption">כיתוב (caption)</option>
          </select>
        </div>
        <div>
          <label style={C.label}>מיקום</label>
          <PosGrid pos_x={overlay.pos_x} pos_y={overlay.pos_y} onChange={(px, py) => onChange({ ...overlay, pos_x: px, pos_y: py })} />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div>
            <label style={C.label}>צבע</label>
            <input type="color" value={overlay.color || "#ffffff"} onChange={e => onChange({ ...overlay, color: e.target.value })}
              style={{ width: 48, height: 36, border: "1.5px solid #e2e8f0", borderRadius: 8, cursor: "pointer", padding: 2 }} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={C.label}>גודל פונט: {overlay.fontSize || 40}px</label>
            <input type="range" min={12} max={96} value={overlay.fontSize || 40} onChange={e => onChange({ ...overlay, fontSize: Number(e.target.value) })} style={{ width: "100%", marginTop: 8 }} />
          </div>
        </div>
        <div>
          <label style={C.label}>אנימציית כניסה</label>
          <select style={{ ...C.input, cursor: "pointer" }} value={overlay.anim_in || "none"} onChange={e => onChange({ ...overlay, anim_in: e.target.value })}>
            <option value="none">ללא</option>
            <option value="fadeIn">fadeIn</option>
            <option value="slideUp">slideUp</option>
            <option value="slideDown">slideDown</option>
            <option value="slideLeft">slideLeft</option>
            <option value="slideRight">slideRight</option>
            <option value="zoom">zoom</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={C.label}>הצג מ: {Math.round((overlay.scroll_show || 0) * 100)}%</label>
            <input type="range" min={0} max={100} value={Math.round((overlay.scroll_show || 0) * 100)} onChange={e => onChange({ ...overlay, scroll_show: Number(e.target.value) / 100 })} style={{ width: "100%", marginTop: 8 }} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={C.label}>הסתר מ: {Math.round((overlay.scroll_hide || 0.85) * 100)}%</label>
            <input type="range" min={0} max={100} value={Math.round((overlay.scroll_hide || 0.85) * 100)} onChange={e => onChange({ ...overlay, scroll_hide: Number(e.target.value) / 100 })} style={{ width: "100%", marginTop: 8 }} />
          </div>
        </div>
      </div>
    </CollapsibleRow>
  );
}

/* ── Button editor ── */
function ButtonEditor({ btn, onChange, onDelete }) {
  return (
    <CollapsibleRow
      title={btn.text}
      subtitle={btn.href || "ללא קישור"}
      badge="כפתור"
      onDelete={onDelete}
    >
      <div style={{ paddingTop: 10, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={C.label}>טקסט</label>
            <input style={C.input} value={btn.text} onChange={e => onChange({ ...btn, text: e.target.value })} placeholder="לחץ כאן..." />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={C.label}>קישור</label>
            <input style={C.input} value={btn.href} onChange={e => onChange({ ...btn, href: e.target.value })} placeholder="/shop-collection-list" />
          </div>
        </div>
        <div>
          <label style={C.label}>סגנון</label>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ val: "primary", label: "ממולא" }, { val: "outline", label: "מסגרת" }].map(({ val, label }) => (
              <button key={val} type="button" onClick={() => onChange({ ...btn, style: val })}
                style={{ padding: "7px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: `1.5px solid ${btn.style === val ? C.primary : C.border}`, background: btn.style === val ? C.primary : "#fff", color: btn.style === val ? "#fff" : C.muted, cursor: "pointer" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={C.label}>מיקום</label>
          <PosGrid pos_x={btn.pos_x} pos_y={btn.pos_y} onChange={(px, py) => onChange({ ...btn, pos_x: px, pos_y: py })} />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={C.label}>הצג מ: {Math.round((btn.scroll_show || 0) * 100)}%</label>
            <input type="range" min={0} max={100} value={Math.round((btn.scroll_show || 0) * 100)} onChange={e => onChange({ ...btn, scroll_show: Number(e.target.value) / 100 })} style={{ width: "100%", marginTop: 8 }} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={C.label}>הסתר מ: {Math.round((btn.scroll_hide || 0.85) * 100)}%</label>
            <input type="range" min={0} max={100} value={Math.round((btn.scroll_hide || 0.85) * 100)} onChange={e => onChange({ ...btn, scroll_hide: Number(e.target.value) / 100 })} style={{ width: "100%", marginTop: 8 }} />
          </div>
        </div>
      </div>
    </CollapsibleRow>
  );
}

/* ── Media library picker modal ── */
function MediaPicker({ onSelect, onClose }) {
  const [videos, setVideos]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/media")
      .then(r => r.json())
      .then(data => {
        setVideos((data || []).filter(f => f.type === "video"));
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />

      {/* Panel */}
      <div style={{ position: "relative", background: "#fff", borderRadius: 18, width: "100%", maxWidth: 680, maxHeight: "85vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", direction: "rtl" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: C.primary }}>בחר סרטון מהספרייה</h2>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: "#f1f5f9", border: "none", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.muted }}>×</button>
        </div>

        {/* Grid */}
        <div style={{ overflowY: "auto", padding: 16, flex: 1 }}>
          {loading ? (
            <p style={{ textAlign: "center", color: C.muted, fontSize: 14, paddingTop: 40 }}>טוען...</p>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 40 }}>
              <p style={{ fontSize: 32, marginBottom: 8 }}>🎬</p>
              <p style={{ color: C.muted, fontSize: 14 }}>אין סרטונים בספרייה — העלה סרטון תחילה</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {videos.map(v => {
                const name = v.name || v.url.split("/").pop();
                return (
                  <button key={v.id} type="button" onClick={() => onSelect(v.url)}
                    style={{ background: "#f8fafc", borderRadius: 10, border: "1.5px solid #e2e8f0", cursor: "pointer", padding: 0, overflow: "hidden", textAlign: "right", transition: "border-color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                  >
                    <div style={{ background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", height: 90 }}>
                      <span style={{ fontSize: 28 }}>🎬</span>
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: C.primary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Section card ── */
function SectionCard({ section, onChange, onSave, onDelete, savingId, flashId, errorId }) {
  const videoFileRef = useRef(null);
  const [uploading, setUploading]     = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [expanded, setExpanded]       = useState(false);
  const [showPicker, setShowPicker]   = useState(false);

  async function handleVideoUpload(file) {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const url     = await uploadDirect(file);
      const updated = { ...section, video_url: url };
      onChange(updated);
      await onSave(updated);
    } catch (e) {
      setUploadError(e.message || "ההעלאה נכשלה — נסה שנית");
    }
    setUploading(false);
  }

  const isSaving = savingId === section._tempId || savingId === section.id;
  const isFlash  = flashId  === section._tempId || flashId  === section.id;
  const isError  = errorId  === section._tempId || errorId  === section.id;

  /* summary chips */
  const chips = [
    section.video_url ? "🎬 וידאו" : "⚠️ אין וידאו",
    section.overlays.length > 0 ? `${section.overlays.length} טקסטים` : null,
    section.buttons.length  > 0 ? `${section.buttons.length} כפתורים` : null,
    section.is_active ? null : "כבוי",
  ].filter(Boolean);

  return (
    <div style={{ ...C.cardStyle, border: isError ? "1.5px solid #fca5a5" : "1.5px solid #e2e8f0" }}>

      {/* ── Collapsed header ── */}
      <div
        onClick={() => setExpanded(p => !p)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 10 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
            {section.position}
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.primary, flexShrink: 0 }}>סרטון {section.position}</span>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {chips.map(chip => (
              <span key={chip} style={{ fontSize: 11, color: C.muted, background: "#f1f5f9", padding: "2px 8px", borderRadius: 5 }}>{chip}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          {isFlash && <span style={{ fontSize: 12, fontWeight: 600, color: C.success }}>נשמר ✓</span>}
          {onDelete && (
            <button type="button" onClick={e => { e.stopPropagation(); onDelete(); }}
              style={{ padding: "5px 9px", background: "#fee2e2", border: "none", borderRadius: 7, fontSize: 13, cursor: "pointer", color: C.danger }}>
              🗑
            </button>
          )}
          <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* ── Expanded body ── */}
      {expanded && (
        <div style={{ marginTop: 20 }}>

          {/* Video */}
          <div style={{ background: "#f8fafc", borderRadius: 12, padding: 14, marginBottom: 16, border: "1px solid #e2e8f0" }}>
            <label style={{ ...C.label, marginBottom: 10 }}>וידאו</label>

            {/* Upload progress banner */}
            {uploading && (
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "12px 16px", marginBottom: 10, fontSize: 13, color: "#1d4ed8", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #93c5fd", borderTopColor: "#1d4ed8", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                מעלה סרטון לשרת... זה עשוי לקחת כמה שניות
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            )}

            {/* Error */}
            {uploadError && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", marginBottom: 10, fontSize: 13, color: C.danger }}>
                ❌ {uploadError}
              </div>
            )}

            {section.video_url ? (
              <video src={section.video_url} muted controls style={{ width: "100%", maxHeight: 180, borderRadius: 8, background: "#000", marginBottom: 10 }} />
            ) : !uploading && (
              <div style={{ background: "#f1f5f9", borderRadius: 8, padding: 16, textAlign: "center", marginBottom: 10, color: C.muted, fontSize: 13 }}>
                אין וידאו — לחץ להעלאה
              </div>
            )}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button type="button" onClick={() => videoFileRef.current?.click()} disabled={uploading}
                style={{ padding: "8px 16px", background: C.primary, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.5 : 1 }}>
                העלאת וידאו
              </button>
              <button type="button" onClick={() => setShowPicker(true)} disabled={uploading}
                style={{ padding: "8px 14px", background: "#f1f5f9", color: C.primary, border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.5 : 1 }}>
                🗂 בחר מספרייה
              </button>
              {section.video_url && !uploading && (
                <button type="button" onClick={() => onChange({ ...section, video_url: "" })}
                  style={{ padding: "8px 14px", background: "#fee2e2", color: C.danger, border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                  מחק
                </button>
              )}
            </div>
            <input ref={videoFileRef} type="file" accept="video/*" style={{ display: "none" }} onChange={e => handleVideoUpload(e.target.files[0])} />
            {showPicker && (
              <MediaPicker
                onSelect={async url => {
                  setShowPicker(false);
                  const updated = { ...section, video_url: url };
                  onChange(updated);
                  await onSave(updated);
                }}
                onClose={() => setShowPicker(false)}
              />
            )}
          </div>

          {/* Overlays */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ ...C.label, marginBottom: 0 }}>טקסטים על הוידאו ({section.overlays.length})</label>
              <button type="button"
                onClick={() => onChange({ ...section, overlays: [...section.overlays, defaultOverlay()] })}
                style={{ padding: "6px 12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", color: C.success }}>
                + הוסף טקסט
              </button>
            </div>
            {section.overlays.map((ov, idx) => (
              <OverlayEditor key={ov.id} overlay={ov}
                onChange={updated => { const a = [...section.overlays]; a[idx] = updated; onChange({ ...section, overlays: a }); }}
                onDelete={() => onChange({ ...section, overlays: section.overlays.filter((_, i) => i !== idx) })}
              />
            ))}
          </div>

          {/* Buttons */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ ...C.label, marginBottom: 0 }}>כפתורים ({section.buttons.length})</label>
              <button type="button"
                onClick={() => onChange({ ...section, buttons: [...section.buttons, defaultButton()] })}
                style={{ padding: "6px 12px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#1d4ed8" }}>
                + הוסף כפתור
              </button>
            </div>
            {section.buttons.map((btn, idx) => (
              <ButtonEditor key={btn.id} btn={btn}
                onChange={updated => { const a = [...section.buttons]; a[idx] = updated; onChange({ ...section, buttons: a }); }}
                onDelete={() => onChange({ ...section, buttons: section.buttons.filter((_, i) => i !== idx) })}
              />
            ))}
          </div>

          {/* Footer */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <Toggle checked={section.is_active} onChange={() => onChange({ ...section, is_active: !section.is_active })} label="פעיל" />
            <button type="button" onClick={() => onSave(section)} disabled={isSaving}
              style={{ padding: "10px 26px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: isSaving ? 0.7 : 1 }}>
              {isSaving ? "שומר..." : "שמור שינויים"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page ── */
export default function VideosPage() {
  const [sections, setSections] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [flashId,  setFlashId]  = useState(null);
  const [errors,   setErrors]   = useState({});

  useEffect(() => { fetchSections(); }, []);

  async function fetchSections() {
    const data = await fetch("/api/admin/content/videos").then(r => r.json());
    if (!data || data.length === 0) {
      setSections([
        { ...defaultSection(1), _tempId: "tmp-1" },
        { ...defaultSection(2), _tempId: "tmp-2" },
      ]);
    } else {
      setSections(data.map(s => ({ ...s, overlays: s.overlays || [], buttons: s.buttons || [] })));
    }
    setLoading(false);
  }

  function updateSection(updated) {
    setSections(prev => prev.map(s => {
      const byId  = updated.id     && s.id     === updated.id;
      const byTmp = updated._tempId && s._tempId === updated._tempId;
      return (byId || byTmp) ? updated : s;
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

    if (section.id) {
      const res = await fetch("/api/admin/content/videos", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: section.id, ...payload }) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setErrors(prev => ({ ...prev, [key]: d.error || "שגיאה בשמירה" })); setSavingId(null); return; }
    } else {
      const res = await fetch("/api/admin/content/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setErrors(prev => ({ ...prev, [key]: d.error || "שגיאה בשמירה" })); setSavingId(null); return; }
      const saved = await res.json();
      setSections(prev => prev.map(s => s._tempId === section._tempId ? { ...s, id: saved._id || saved.id, _isNew: false, _tempId: undefined } : s));
    }

    setSavingId(null);
    setFlashId(section.id || key);
    setTimeout(() => setFlashId(null), 2000);
  }

  async function deleteSection(section) {
    if (!confirm("האם למחוק את הסרטון?")) return;
    if (section.id) await fetch("/api/admin/content/videos", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: section.id }) });
    setSections(prev => prev.filter(s => s !== section));
  }

  function addSection() {
    const maxPos = sections.length > 0 ? Math.max(...sections.map(s => s.position)) : 0;
    setSections(prev => [...prev, { ...defaultSection(maxPos + 1), _tempId: `tmp-${Date.now()}` }]);
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: C.muted, fontSize: 14 }}>טוען...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "28px 20px", direction: "rtl" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.primary, margin: 0 }}>סרטוני גלילה</h1>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 3, marginBottom: 0 }}>{sections.length} סרטונים — לחץ כדי לפתוח</p>
          </div>
          <button onClick={addSection}
            style={{ padding: "9px 18px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            + הוסף סרטון
          </button>
        </div>

        {Object.entries(errors).map(([key, msg]) =>
          msg ? <div key={key} style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginBottom: 10, color: C.danger, fontSize: 13 }}>{msg}</div> : null
        )}

        {sections.map(section => (
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
