"use client";
import { useState, useEffect, useRef } from "react";

/* Images → /api/upload (simple, works). Videos → direct to Cloudinary (bypasses Vercel 4.5MB) */
async function uploadFile(file) {
  const isVideo = file.type.startsWith("video/");

  if (!isVideo) {
    // Images go through the server route — simple and reliable
    const fd = new FormData();
    fd.append("file", file);
    const res  = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.url) throw new Error("העלאה נכשלה");
    return { url: data.url, type: "image" };
  }

  // Videos: upload directly to Cloudinary from browser (no Vercel size limit)
  const signRes = await fetch("/api/cloudinary-sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "asserta/media" }),
  });
  if (!signRes.ok) throw new Error("חתימה נכשלה");
  const { signature, timestamp, api_key, cloud_name, folder } = await signRes.json();

  const fd = new FormData();
  fd.append("file", file);
  fd.append("signature", signature);
  fd.append("timestamp", String(timestamp));
  fd.append("api_key", api_key);
  fd.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
    { method: "POST", body: fd }
  );
  const data = await uploadRes.json();
  if (!data.secure_url) throw new Error(data.error?.message || "העלאת וידאו נכשלה");

  return { url: data.secure_url, type: "video" };
}

const C = {
  primary: "#0f172a", bg: "#f1f5f9", border: "#e2e8f0", muted: "#64748b",
  danger: "#dc2626", dangerBg: "#fee2e2",
};

const TABS = [
  { id: "all",   label: "הכל" },
  { id: "image", label: "תמונות" },
  { id: "video", label: "סרטונים" },
];

export default function MediaPage() {
  const [files,     setFiles]     = useState([]);
  const [tab,       setTab]       = useState("all");
  const [search,    setSearch]    = useState("");
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast,     setToast]     = useState(null); // { msg, type }
  const [dragOver,  setDragOver]  = useState(false);
  const [selected,  setSelected]  = useState(null); // file object for preview
  const [uploadProgress, setUploadProgress] = useState(null); // { current, total, name }
  const fileRef = useRef(null);

  useEffect(() => { fetchFiles(); }, []);

  async function fetchFiles() {
    setLoading(true);
    const data = await fetch("/api/admin/media").then(r => r.json());
    setFiles(data || []);
    setLoading(false);
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  async function handleUpload(fileList) {
    if (!fileList?.length) return;
    const list = Array.from(fileList);
    setUploading(true);
    let count = 0;
    let lastError = "";
    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      setUploadProgress({ current: i + 1, total: list.length, name: file.name });
      try {
        await uploadFile(file);
        count++;
      } catch (err) {
        lastError = err.message || "שגיאה לא ידועה";
      }
    }
    await fetchFiles();
    setUploading(false);
    setUploadProgress(null);
    if (count > 0) {
      showToast(`הועלו ${count} קבצים בהצלחה`, "success");
    } else {
      showToast(`ההעלאה נכשלה: ${lastError}`, "danger");
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(file) {
    if (!confirm(`למחוק את "${file.name || file.url.split("/").pop()}"?`)) return;
    await fetch("/api/admin/media", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: file._id || file.id }) });
    if (selected?.id === file.id) setSelected(null);
    setFiles(prev => prev.filter(f => (f._id || f.id) !== (file._id || file.id)));
    showToast("הקובץ נמחק", "danger");
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url).then(() => showToast("הקישור הועתק ✓"));
  }

  const filtered = files.filter(f => {
    if (tab !== "all" && f.type !== tab) return false;
    if (search && !(f.name || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function formatSize(bytes) {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  return (
    <div style={{ minHeight: "100vh", direction: "rtl" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: toast.type === "danger" ? C.danger : "#16a34a",
          color: "#fff", padding: "10px 20px", borderRadius: 10,
          fontSize: 14, fontWeight: 600, zIndex: 9999,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Upload progress banner */}
      {uploadProgress && (
        <div style={{
          background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12,
          padding: "14px 20px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ display: "inline-block", width: 18, height: 18, border: "2px solid #93c5fd", borderTopColor: "#1d4ed8", borderRadius: "50%", flexShrink: 0, animation: "spin 0.7s linear infinite" }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1d4ed8" }}>
              מעלה קובץ {uploadProgress.current} מתוך {uploadProgress.total}...
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "#3b82f6", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {uploadProgress.name}
            </p>
          </div>
          {uploadProgress.total > 1 && (
            <div style={{ marginRight: "auto", flexShrink: 0 }}>
              <div style={{ width: 80, height: 6, background: "#bfdbfe", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(uploadProgress.current / uploadProgress.total) * 100}%`, background: "#1d4ed8", borderRadius: 3, transition: "width 0.3s" }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.primary, margin: 0 }}>ספריית מדיה</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "3px 0 0" }}>{files.length} קבצים</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{ padding: "10px 20px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: uploading ? 0.6 : 1, display: "flex", alignItems: "center", gap: 6 }}
        >
          {uploading ? "⏳ מעלה..." : "⬆ העלאת קבצים"}
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*,video/*" style={{ display: "none" }}
          onChange={e => handleUpload(e.target.files)} />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? C.primary : "#cbd5e1"}`,
          borderRadius: 14, padding: "28px 20px", textAlign: "center",
          background: dragOver ? "#f1f5f9" : "#fafafa",
          cursor: "pointer", marginBottom: 20, transition: "all 0.2s",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
        <p style={{ fontWeight: 600, color: C.primary, margin: "0 0 4px" }}>גרור קבצים לכאן או לחץ להעלאה</p>
        <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>תמונות וסרטונים — PNG, JPG, SVG, MP4, MOV</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "7px 16px", borderRadius: 20, border: "1.5px solid",
            borderColor: tab === t.id ? C.primary : C.border,
            background: tab === t.id ? C.primary : "#fff",
            color: tab === t.id ? "#fff" : C.muted,
            fontSize: 13, fontWeight: tab === t.id ? 700 : 400, cursor: "pointer",
          }}>
            {t.label}
          </button>
        ))}
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="חיפוש לפי שם..."
          style={{ padding: "7px 14px", border: `1.5px solid ${C.border}`, borderRadius: 20, fontSize: 13, outline: "none", background: "#fff", color: C.primary, marginRight: "auto" }}
        />
      </div>

      {/* Grid + Preview layout */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

        {/* Grid */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ aspectRatio: "1", borderRadius: 12, background: "#e2e8f0", animation: "pulse 1.5s ease infinite alternate" }} />
              ))}
              <style>{`@keyframes pulse{from{opacity:1}to{opacity:0.4}}`}</style>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: C.muted }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
              <p style={{ fontWeight: 600, color: C.primary }}>אין קבצים</p>
              <p style={{ fontSize: 13 }}>העלי קבצים כדי להתחיל</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12 }}>
              {filtered.map(file => (
                <FileCard
                  key={file.id}
                  file={file}
                  selected={selected?.id === file.id}
                  onSelect={() => setSelected(selected?.id === file.id ? null : file)}
                  onCopy={() => copyUrl(file.url)}
                  onDelete={() => handleDelete(file)}
                  formatSize={formatSize}
                />
              ))}
            </div>
          )}
        </div>

        {/* Preview panel */}
        {selected && (
          <div style={{
            width: 260, flexShrink: 0,
            background: "#fff", borderRadius: 16, padding: 16,
            boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
            border: `1.5px solid ${C.border}`,
            position: "sticky", top: 16,
          }}>
            {/* Preview */}
            <div style={{ borderRadius: 10, overflow: "hidden", marginBottom: 14, background: "#f8fafc", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {selected.type === "video" ? (
                <video src={selected.url} controls muted style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              ) : (
                <img src={selected.url} alt={selected.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              )}
            </div>

            {/* Info */}
            <p style={{ fontSize: 13, fontWeight: 600, color: C.primary, margin: "0 0 4px", wordBreak: "break-all" }}>
              {selected.name || selected.url.split("/").pop()}
            </p>
            <p style={{ fontSize: 11, color: C.muted, margin: "0 0 14px" }}>
              {selected.type === "video" ? "🎬 סרטון" : "🖼️ תמונה"}
              {selected.size ? ` · ${formatSize(selected.size)}` : ""}
            </p>

            {/* URL */}
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "8px 10px", marginBottom: 12, wordBreak: "break-all", fontSize: 10, color: C.muted, lineHeight: 1.5 }}>
              {selected.url}
            </div>

            {/* Actions */}
            <button onClick={() => copyUrl(selected.url)} style={{ width: "100%", padding: "10px", background: C.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>
              📋 העתק קישור
            </button>
            <button onClick={() => handleDelete(selected)} style={{ width: "100%", padding: "10px", background: C.dangerBg, color: C.danger, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              🗑 מחק
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FileCard({ file, selected, onSelect, onCopy, onDelete, formatSize }) {
  const [hover, setHover] = useState(false);
  const name = file.name || file.url.split("/").pop();

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 12, overflow: "hidden", cursor: "pointer",
        border: `2px solid ${selected ? "#0f172a" : hover ? "#94a3b8" : "#e2e8f0"}`,
        background: "#fff", transition: "border-color 0.15s",
        boxShadow: selected ? "0 0 0 3px rgba(15,23,42,0.1)" : "none",
      }}
    >
      {/* Thumbnail */}
      <div style={{ aspectRatio: "1", background: "#f8fafc", position: "relative", overflow: "hidden" }}>
        {file.type === "video" ? (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e293b" }}>
            <span style={{ fontSize: 32 }}>🎬</span>
          </div>
        ) : (
          <img src={file.url} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}

        {/* Hover actions */}
        {hover && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <button onClick={e => { e.stopPropagation(); onCopy(); }} style={{ background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", fontSize: 14, fontWeight: 700 }} title="העתק קישור">📋</button>
            <button onClick={e => { e.stopPropagation(); onDelete(); }} style={{ background: "rgba(220,38,38,0.9)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", fontSize: 14 }} title="מחק">🗑</button>
          </div>
        )}
      </div>

      {/* Name + size */}
      <div style={{ padding: "8px 10px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#0f172a", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
        {file.size && <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{formatSize(file.size)}</p>}
      </div>
    </div>
  );
}
