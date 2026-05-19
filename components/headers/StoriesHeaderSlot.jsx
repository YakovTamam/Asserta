"use client";
import { useState, useEffect } from "react";

const DEMO = [
  { id:"s1", initials:"מ", avatarBg:"linear-gradient(135deg,#a855f7,#ec4899)", borderColor:"#a855f7" },
  { id:"s2", initials:"ל", avatarBg:"linear-gradient(135deg,#ec4899,#f43f5e)", borderColor:"#ec4899" },
  { id:"s3", initials:"ש", avatarBg:"linear-gradient(135deg,#f59e0b,#f97316)", borderColor:"#f59e0b" },
  { id:"s4", initials:"נ", avatarBg:"linear-gradient(135deg,#06b6d4,#3b82f6)", borderColor:"#06b6d4" },
  { id:"s5", initials:"א", avatarBg:"linear-gradient(135deg,#10b981,#059669)", borderColor:"#10b981" },
];

export default function StoriesHeaderSlot() {
  const [visible, setVisible]  = useState(false);
  const [viewed,  setViewed]   = useState(new Set());

  /* Watch for header-sticky class on <header> */
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const obs = new MutationObserver(() => {
      setVisible(header.classList.contains("header-sticky"));
    });
    obs.observe(header, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /* Sync viewed state from Stories component via custom event */
  useEffect(() => {
    function onViewed(e) { setViewed(new Set(e.detail)); }
    window.addEventListener("stories:viewed", onViewed);
    return () => window.removeEventListener("stories:viewed", onViewed);
  }, []);

  function handleClick(idx) {
    window.__openStory?.(idx, 0);
  }

  return (
    <div style={{
      maxHeight:   visible ? 52 : 0,
      overflow:    "hidden",
      transition:  "max-height 0.3s ease",
      borderTop:   visible ? "1px solid rgba(255,255,255,0.08)" : "none",
      direction:   "rtl",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 4px" }}>
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", flexShrink:0 }}>
          Stories
        </span>
        {DEMO.map((s, i) => {
          const isViewed = viewed.has(s.id);
          return (
            <button key={s.id} onClick={() => handleClick(i)}
              style={{
                width:36, height:36, borderRadius:"50%", border:"none", cursor:"pointer", padding:0, flexShrink:0,
                background: isViewed ? "#374151" : s.avatarBg,
                boxShadow: isViewed ? "none" : `0 0 0 2px #111, 0 0 0 3.5px ${s.borderColor}`,
                color:"#fff", fontSize:13, fontWeight:800,
                opacity: isViewed ? 0.4 : 1,
                transition:"all 0.2s",
              }}>
              {s.initials}
            </button>
          );
        })}
      </div>
    </div>
  );
}
