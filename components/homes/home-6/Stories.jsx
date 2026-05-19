"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── Keyframes ─────────────────────────────────────────────── */
const KF = `
  @keyframes progressFill {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes bgShift {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }
  @keyframes slideUpIn {
    from { transform: translateY(16px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes storyFadeIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

/* ── Demo data ─────────────────────────────────────────────── */
const DEMO = [
  {
    id: "s1", name: "מיה כהן", initials: "מ",
    avatarBg:    "linear-gradient(135deg,#a855f7,#ec4899)",
    borderColors: ["#a855f7","#ec4899","#f59e0b"],
    media: [
      { id:"m1", bg:"linear-gradient(160deg,#0f0c29,#302b63,#24243e)", duration:8,
        label:"קולקציית ליל הכוכבים ✨",
        products:[{ id:"p1", name:"טבעת יהלום קלאסית", price:4290, emoji:"💍", slug:"diamond-ring" }] },
      { id:"m2", bg:"linear-gradient(160deg,#1a1a2e,#16213e,#0f3460)", duration:10,
        label:"סט זהב לבן 14K",
        products:[
          { id:"p2", name:"עגיל טיפה זהב 14K", price:1890, emoji:"✨", slug:"gold-earring" },
          { id:"p3", name:"שרשרת ונוס",        price:2290, emoji:"📿", slug:"venus-necklace" },
        ]},
    ],
  },
  {
    id: "s2", name: "ליאור", initials: "ל",
    avatarBg:    "linear-gradient(135deg,#ec4899,#f43f5e)",
    borderColors: ["#ec4899","#f43f5e","#fb923c"],
    media: [
      { id:"m3", bg:"linear-gradient(160deg,#3d0c11,#c31432,#240b36)", duration:9,
        label:"Limited Edition ❤️‍🔥",
        products:[
          { id:"p4", name:"צמיד טניס יהלומים", price:8990, emoji:"💎", slug:"tennis-bracelet" },
          { id:"p5", name:'טבעת אתנה',          price:3200, emoji:"💍", slug:"athena-ring" },
        ]},
    ],
  },
  {
    id: "s3", name: "שירה לוי", initials: "ש",
    avatarBg:    "linear-gradient(135deg,#f59e0b,#f97316)",
    borderColors: ["#f59e0b","#f97316","#ef4444"],
    media: [
      { id:"m4", bg:"linear-gradient(160deg,#134e5e,#71b280,#1a472a)", duration:7,
        label:"ירוק זה החדש שחור 🌿",
        products:[{ id:"p6", name:"תליון עלה זהב", price:1290, emoji:"🌿", slug:"leaf-pendant" }] },
      { id:"m5", bg:"linear-gradient(160deg,#7f5a00,#a27c1a,#f7971e)", duration:11,
        label:"Bestsellers 2025 🏆",
        products:[{ id:"p7", name:"טבעת אירוסין סוליטר", price:12900, emoji:"💍", slug:"solitaire-ring" }] },
    ],
  },
  {
    id: "s4", name: "נועה", initials: "נ",
    avatarBg:    "linear-gradient(135deg,#06b6d4,#3b82f6)",
    borderColors: ["#06b6d4","#3b82f6","#8b5cf6"],
    media: [
      { id:"m6", bg:"linear-gradient(160deg,#0f2027,#203a43,#2c5364)", duration:12,
        label:"כחול כמו הים 🌊",
        products:[{ id:"p8", name:"שרשרת ספיר", price:5600, emoji:"🌊", slug:"sapphire-necklace" }] },
    ],
  },
  {
    id: "s5", name: "אביבה", initials: "א",
    avatarBg:    "linear-gradient(135deg,#10b981,#059669)",
    borderColors: ["#10b981","#34d399","#a3e635"],
    media: [
      { id:"m7", bg:"linear-gradient(160deg,#1f4037,#1a1a1a,#99f2c8)", duration:8,
        label:"Fresh Drop 🍃",
        products:[
          { id:"p9",  name:"עגיל חישוק זהב",    price:990, emoji:"⭕", slug:"gold-hoop" },
          { id:"p10", name:"צמיד מינימליסט כסף", price:780, emoji:"📿", slug:"minimal-bracelet" },
        ]},
    ],
  },
];

/* ── Progress bars ─────────────────────────────────────────── */
function ProgressBars({ total, current, duration }) {
  return (
    <div style={{ display:"flex", gap:4 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex:1, height:2.5, borderRadius:2, background:"rgba(255,255,255,0.3)", overflow:"hidden" }}>
          {i < current && <div style={{ width:"100%", height:"100%", background:"#fff" }} />}
          {i === current && (
            <div style={{
              height:"100%", background:"#fff", transformOrigin:"left center",
              animation:`progressFill ${duration}s linear forwards`,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Floating product card ─────────────────────────────────── */
function ProductCard({ products }) {
  const [idx, setIdx] = useState(0);
  const p = products[idx];
  useEffect(() => setIdx(0), [products]);

  return (
    <div style={{
      background:"rgba(15,23,42,0.75)", backdropFilter:"blur(20px)",
      border:"1px solid rgba(255,255,255,0.15)", borderRadius:20,
      padding:"14px 14px 10px", animation:"slideUpIn 0.3s ease",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom: products.length > 1 ? 10 : 0 }}>
        <div style={{
          width:50, height:50, borderRadius:12, flexShrink:0,
          background:"rgba(255,255,255,0.1)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:26,
        }}>{p.emoji}</div>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, marginBottom:2 }}>מוצר מומלץ</div>
          <div style={{ color:"#fff", fontWeight:700, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
          <div style={{ color:"#fbbf24", fontWeight:800, fontSize:16, marginTop:1 }}>
            ₪{p.price.toLocaleString("he-IL")}
          </div>
        </div>

        <Link href={`/product-default/${p.slug}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            padding:"10px 14px", background:"#fff", color:"#0f172a",
            borderRadius:12, fontSize:12, fontWeight:800,
            textDecoration:"none", whiteSpace:"nowrap", flexShrink:0,
            boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
          }}>
          לצפייה →
        </Link>
      </div>

      {products.length > 1 && (
        <div style={{ display:"flex", justifyContent:"center", gap:5 }}>
          {products.map((_, i) => (
            <button key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              style={{
                width: i === idx ? 18 : 6, height:6, borderRadius:3, border:"none", cursor:"pointer", padding:0,
                background: i === idx ? "#fff" : "rgba(255,255,255,0.35)",
                transition:"all 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */
export default function Stories({ isSticky = true }) {
  const [activeIdx,        setActiveIdx]        = useState(null);
  const [mediaIdx,         setMediaIdx]         = useState(0);
  const [viewed,           setViewed]           = useState(new Set());
  const [isStuck,          setIsStuck]          = useState(false);
  const [stickyDismissed,  setStickyDismissed]  = useState(false);
  const [progressKey,      setProgressKey]      = useState(0);

  const sectionRef  = useRef(null);
  const timerRef    = useRef(null);
  const touchStartX = useRef(null);

  const story = activeIdx !== null ? DEMO[activeIdx] : null;
  const media = story ? story.media[mediaIdx] : null;

  /* auto-advance */
  useEffect(() => {
    if (!media) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => advance(1), media.duration * 1000);
    return () => clearTimeout(timerRef.current);
  }, [activeIdx, mediaIdx]);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = activeIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeIdx]);

  /* sticky IntersectionObserver */
  useEffect(() => {
    if (!isSticky || !sectionRef.current) return;
    const obs = new IntersectionObserver(([e]) => setIsStuck(!e.isIntersecting), { threshold: 0 });
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [isSticky]);

  function openStory(idx, mIdx = 0) {
    clearTimeout(timerRef.current);
    setActiveIdx(idx);
    setMediaIdx(mIdx);
    setProgressKey(k => k + 1);
  }

  function closeStory() {
    clearTimeout(timerRef.current);
    setActiveIdx(null);
    setMediaIdx(0);
  }

  function advance(dir) {
    if (!story) return;
    clearTimeout(timerRef.current);
    const next = mediaIdx + dir;

    if (next >= 0 && next < story.media.length) {
      setMediaIdx(next);
      setProgressKey(k => k + 1);
    } else if (dir > 0) {
      setViewed(prev => new Set([...prev, story.id]));
      if (activeIdx + 1 < DEMO.length) openStory(activeIdx + 1, 0);
      else closeStory();
    } else {
      if (activeIdx - 1 >= 0) openStory(activeIdx - 1, DEMO[activeIdx - 1].media.length - 1);
    }
  }

  function handleTap(e) {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    advance(x < width * 0.35 ? -1 : 1);
  }

  function handleTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e) {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 55) advance(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  }

  return (
    <>
      <style>{KF}</style>

      {/* ── Sticky top bar ─────────────────────────────────── */}
      {isSticky && isStuck && !stickyDismissed && (
        <div style={{
          position:"fixed", top:0, left:0, right:0, zIndex:1000,
          background:"rgba(9,11,17,0.97)", backdropFilter:"blur(16px)",
          borderBottom:"1px solid rgba(255,255,255,0.07)",
          display:"flex", alignItems:"center", gap:14, padding:"9px 16px",
          animation:"slideUpIn 0.2s ease",
        }}>
          <span style={{ color:"rgba(255,255,255,0.45)", fontSize:10, fontWeight:800, letterSpacing:2, textTransform:"uppercase", flexShrink:0 }}>
            STORIES
          </span>
          <div style={{ display:"flex", gap:9, overflowX:"auto", flex:1, scrollbarWidth:"none" }}>
            {DEMO.map((s, i) => (
              <button key={s.id} onClick={() => openStory(i)}
                style={{
                  width:36, height:36, borderRadius:"50%", border:"none",
                  background: viewed.has(s.id) ? "#374151" : s.avatarBg,
                  color:"#fff", fontSize:13, fontWeight:800, cursor:"pointer", flexShrink:0,
                  boxShadow: viewed.has(s.id) ? "none" : `0 0 0 2px #111, 0 0 0 3.5px ${s.borderColors[0]}`,
                  opacity: viewed.has(s.id) ? 0.45 : 1, transition:"all 0.2s",
                }}>
                {s.initials}
              </button>
            ))}
          </div>
          <button onClick={() => setStickyDismissed(true)}
            style={{ background:"none", border:"none", color:"rgba(255,255,255,0.4)", cursor:"pointer", fontSize:24, lineHeight:1, padding:0, flexShrink:0 }}>
            ×
          </button>
        </div>
      )}

      {/* ── Stories row ────────────────────────────────────── */}
      <section ref={sectionRef} style={{ background:"#fff", padding:"24px 0 18px", direction:"rtl", borderBottom:"1px solid #f1f5f9" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <span style={{ fontSize:17, fontWeight:800, color:"#0f172a", letterSpacing:-0.3 }}>Stories</span>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"linear-gradient(135deg,#a855f7,#ec4899)", display:"inline-block" }} />
          </div>

          <div style={{ display:"flex", gap:18, overflowX:"auto", paddingBottom:6, scrollbarWidth:"none" }}>
            {DEMO.map((s, i) => {
              const isViewed = viewed.has(s.id);
              return (
                <button key={s.id} onClick={() => openStory(i)}
                  style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:7, padding:0, flexShrink:0 }}>
                  <div style={{
                    width:76, height:76, borderRadius:"50%", padding:2.5,
                    background: isViewed ? "#e2e8f0" : `linear-gradient(135deg,${s.borderColors.join(",")})`,
                    transition:"all 0.3s",
                  }}>
                    <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#fff", padding:2.5 }}>
                      <div style={{ width:"100%", height:"100%", borderRadius:"50%", background: isViewed ? "#94a3b8" : s.avatarBg, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:24, fontWeight:800 }}>
                        {s.initials}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize:11, fontWeight:600, color: isViewed ? "#94a3b8" : "#1e293b", maxWidth:72, textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Story viewer modal ─────────────────────────────── */}
      {activeIdx !== null && story && media && (
        <div
          style={{ position:"fixed", inset:0, zIndex:900, background:"rgba(0,0,0,0.94)", display:"flex", alignItems:"center", justifyContent:"center" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Story card */}
          <div style={{
            position:"relative", width:"100%", maxWidth:430,
            height:"100dvh", maxHeight:860,
            background: media.bg, backgroundSize:"200% 200%",
            animation:"storyFadeIn 0.25s ease, bgShift 10s ease infinite",
            borderRadius:window.innerWidth > 500 ? 24 : 0,
            overflow:"hidden", display:"flex", flexDirection:"column",
          }}>
            {/* Top vignette */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:200, background:"linear-gradient(to bottom,rgba(0,0,0,0.55),transparent)", zIndex:2, pointerEvents:"none" }} />
            {/* Bottom vignette */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:320, background:"linear-gradient(to top,rgba(0,0,0,0.75),transparent)", zIndex:2, pointerEvents:"none" }} />

            {/* Progress bars */}
            <div style={{ position:"absolute", top:14, left:12, right:12, zIndex:10 }}>
              <ProgressBars key={progressKey} total={story.media.length} current={mediaIdx} duration={media.duration} />
            </div>

            {/* Header */}
            <div style={{ position:"absolute", top:28, left:12, right:12, zIndex:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:story.avatarBg, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:15, fontWeight:800, flexShrink:0 }}>
                  {story.initials}
                </div>
                <div>
                  <div style={{ color:"#fff", fontSize:13, fontWeight:700, lineHeight:1 }}>{story.name}</div>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10, marginTop:2 }}>ASSERTA</div>
                </div>
              </div>
              <button onClick={closeStory}
                style={{ width:32, height:32, borderRadius:"50%", background:"rgba(0,0,0,0.45)", border:"none", color:"#fff", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>
                ×
              </button>
            </div>

            {/* Story visual content */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, padding:"80px 32px 180px" }}>
              <div style={{ fontSize:72 }}>{media.products[0]?.emoji}</div>
              <div style={{ color:"rgba(255,255,255,0.9)", fontSize:20, fontWeight:700, textAlign:"center", lineHeight:1.4 }}>
                {media.label}
              </div>
            </div>

            {/* Tap zone (over center, under header+product) */}
            <div onClick={handleTap} style={{ position:"absolute", top:80, left:0, right:0, bottom:160, zIndex:5, cursor:"pointer" }} />

            {/* Product card */}
            <div style={{ position:"absolute", bottom:20, left:16, right:16, zIndex:10 }}>
              <ProductCard key={media.id} products={media.products} />
            </div>
          </div>

          {/* Desktop side arrows */}
          {[{ dir:-1, label:"‹", side:"right", offset:"calc(50% + 230px)" }, { dir:1, label:"›", side:"left", offset:"calc(50% + 230px)" }].map(({ dir, label, side, offset }) => (
            <button key={dir} onClick={() => advance(dir)}
              style={{
                position:"absolute", [side === "right" ? "right" : "left"]: offset,
                top:"50%", transform:"translateY(-50%)",
                width:44, height:44, borderRadius:"50%",
                background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)",
                border:"1px solid rgba(255,255,255,0.15)",
                color:"#fff", fontSize:22, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
