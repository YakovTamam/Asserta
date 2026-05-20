"use client";
import { useEffect, useRef, useState } from "react";

/* ── Animation helpers ────────────────────────────────── */
const ANIM_KEYFRAMES = `
@keyframes vs-fadeIn      { from{opacity:0}                       to{opacity:1} }
@keyframes vs-slideUp     { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes vs-slideDown   { from{opacity:0;transform:translateY(-32px)}to{opacity:1;transform:translateY(0)} }
@keyframes vs-slideLeft   { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
@keyframes vs-slideRight  { from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:translateX(0)} }
@keyframes vs-zoom        { from{opacity:0;transform:scale(0.88)}   to{opacity:1;transform:scale(1)} }
`;

function animStyle(anim_in) {
  if (!anim_in || anim_in === "none") return {};
  return { animation: `vs-${anim_in} 0.7s cubic-bezier(0.23,1,0.32,1) both` };
}

/* ── Position → CSS ───────────────────────────────────── */
function posStyle(pos_x = "center", pos_y = "middle") {
  const justify = pos_x === "right" ? "flex-end" : pos_x === "left" ? "flex-start" : "center";
  const align   = pos_y === "top"   ? "flex-start": pos_y === "bottom"? "flex-end"  : "center";
  const textAlign = pos_x === "right" ? "right" : pos_x === "left" ? "left" : "center";
  const padding =
    pos_x === "right" ? "0 48px 0 0" :
    pos_x === "left"  ? "0 0 0 48px" : "0 32px";
  return { justifyContent: justify, alignItems: align, textAlign, padding };
}

/* ── Font size by type ────────────────────────────────── */
const TYPE_SIZE = { h1: "clamp(28px,5vw,72px)", h2: "clamp(20px,3.5vw,48px)", p: "clamp(14px,2vw,20px)", caption: "clamp(11px,1.5vw,14px)" };
const TYPE_WEIGHT = { h1: 800, h2: 700, p: 400, caption: 500 };

/* ── Demo data (used until DB is connected) ───────────── */
const DEMO = [
  {
    position: 1,
    video_url: null,
    overlays: [
      { id:"o1", text:"כל תכשיט מספר סיפור", type:"h1", pos_x:"center", pos_y:"middle", color:"#ffffff", anim_in:"slideUp",   scroll_show:0.05, scroll_hide:0.85 },
      { id:"o2", text:"קולקציית 2025",         type:"caption", pos_x:"center", pos_y:"middle", color:"rgba(255,255,255,0.55)", anim_in:"fadeIn", scroll_show:0.15, scroll_hide:0.85 },
    ],
    buttons: [
      { id:"b1", text:"לקולקציה", href:"/shop-collection-list", style:"outline", pos_x:"center", pos_y:"bottom", scroll_show:0.2, scroll_hide:0.85 },
    ],
  },
  {
    position: 2,
    video_url: null,
    overlays: [
      { id:"o3", text:"עיצוב שנולד מאהבה", type:"h1", pos_x:"right", pos_y:"middle", color:"#ffffff", anim_in:"slideRight", scroll_show:0.05, scroll_hide:0.85 },
      { id:"o4", text:"תכשיטים בעבודת יד · מ-₪650", type:"p", pos_x:"right", pos_y:"middle", color:"rgba(255,255,255,0.7)", anim_in:"slideRight", scroll_show:0.18, scroll_hide:0.85 },
    ],
    buttons: [
      { id:"b2", text:"גלי עכשיו", href:"/shop-collection-list", style:"primary", pos_x:"right", pos_y:"bottom", scroll_show:0.25, scroll_hide:0.85 },
    ],
  },
];

export default function VideoScrollSection({ position = 1 }) {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const [progress, setProgress] = useState(0);
  const [sections, setSections] = useState(null); // null = loading

  useEffect(() => {
    fetch("/api/content/videos")
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setSections(data); else setSections([]); })
      .catch(() => setSections([]));
  }, []);

  const dbSection = sections ? sections.find(s => s.position === position) : undefined;
  const data      = dbSection !== undefined ? dbSection : (DEMO.find(d => d.position === position) || DEMO[0]);
  const src      = data.video_url;
  const overlays = data.overlays || [];
  const buttons  = data.buttons  || [];

  /* Scroll → progress + video scrub */
  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!section) return;

    function handleScroll() {
      const top    = section.getBoundingClientRect().top + window.scrollY;
      const height = section.offsetHeight;
      const p = Math.min(Math.max((window.scrollY - top) / (height - window.innerHeight), 0), 1);
      setProgress(p);
      if (video?.duration && isFinite(video.duration)) {
        video.currentTime = p * video.duration;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [position]);

  // Still loading from API — show gradient placeholder
  if (sections === null) {
    return (
      <section style={{ position: "relative", height: "300vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%",
            background: position === 1
              ? "linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 50%,#0d0d1a 100%)"
              : "linear-gradient(135deg,#0d0d0d 0%,#1a0a00 50%,#2d1200 100%)" }} />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} style={{ position: "relative", height: "300vh" }}>
      <style>{ANIM_KEYFRAMES}</style>

      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Video or gradient placeholder */}
        {src ? (
          <video ref={videoRef} src={src} muted playsInline preload="auto"
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        ) : (
          <div style={{ width:"100%", height:"100%",
            background: position === 1
              ? "linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 50%,#0d0d1a 100%)"
              : "linear-gradient(135deg,#0d0d0d 0%,#1a0a00 50%,#2d1200 100%)" }} />
        )}

        {/* Dark scrim */}
        <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.38)", zIndex:1 }} />

        {/* Overlays */}
        {overlays.map(ov => {
          const visible = progress >= ov.scroll_show && progress <= ov.scroll_hide;
          const ps = posStyle(ov.pos_x, ov.pos_y);
          return (
            <div key={ov.id} style={{
              position:"absolute", inset:0, zIndex:2, display:"flex",
              flexDirection:"column", direction:"rtl",
              pointerEvents:"none",
              ...ps,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}>
              {visible && (
                <span style={{
                  color: ov.color || "#fff",
                  fontSize: TYPE_SIZE[ov.type] || TYPE_SIZE.p,
                  fontWeight: ov.fontWeight || TYPE_WEIGHT[ov.type] || 400,
                  lineHeight: ov.type === "h1" ? 1.1 : 1.5,
                  textShadow: "0 2px 24px rgba(0,0,0,0.7)",
                  maxWidth: 700,
                  marginBottom: ov.type === "caption" ? 0 : 10,
                  ...animStyle(ov.anim_in),
                }}>
                  {ov.text}
                </span>
              )}
            </div>
          );
        })}

        {/* Buttons */}
        {buttons.map(btn => {
          const visible = progress >= btn.scroll_show && progress <= btn.scroll_hide;
          const ps = posStyle(btn.pos_x, btn.pos_y);
          const isPrimary = btn.style === "primary";
          return (
            <div key={btn.id} style={{
              position:"absolute", inset:"0 0 48px 0", zIndex:3, display:"flex",
              direction:"rtl", pointerEvents: visible ? "auto" : "none",
              ...ps,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}>
              {visible && (
                <a href={btn.href} style={{
                  display:"inline-block",
                  padding:"13px 32px",
                  borderRadius:10,
                  fontSize:14, fontWeight:700,
                  textDecoration:"none",
                  letterSpacing:0.3,
                  animation: "vs-slideUp 0.6s 0.15s cubic-bezier(0.23,1,0.32,1) both",
                  ...(isPrimary
                    ? { background:"#fff", color:"#111" }
                    : { background:"transparent", color:"#fff", border:"1.5px solid rgba(255,255,255,0.6)" }
                  ),
                }}>
                  {btn.text}
                </a>
              )}
            </div>
          );
        })}

        {/* Scroll hint — fades out after 5% scroll */}
        <div style={{
          position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)",
          zIndex:4, display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          opacity: progress < 0.05 ? 1 : 0, transition:"opacity 0.4s",
          pointerEvents:"none",
        }}>
          <span style={{ fontSize:11, fontWeight:600, letterSpacing:3, color:"rgba(255,255,255,0.5)", textTransform:"uppercase" }}>גלול</span>
          <div style={{ width:1, height:40, background:"linear-gradient(to bottom,rgba(255,255,255,0.5),transparent)" }} />
        </div>

      </div>
    </section>
  );
}
