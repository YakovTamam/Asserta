"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const KF = `
  @keyframes progressFill {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes bgShift {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }
  @keyframes slideDownIn {
    from { transform: translateY(-100%); }
    to   { transform: translateY(0); }
  }
  @keyframes storyFadeIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes slideUpIn {
    from { transform: translateY(16px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
`;

const DEMO = [
  {
    id: "s1", name: "מיה כהן", initials: "מ",
    avatarBg:    "linear-gradient(135deg,#a855f7,#ec4899)",
    borderColors: ["#a855f7","#ec4899","#f59e0b"],
    thumbBg:     "linear-gradient(160deg,#0f0c29,#302b63,#24243e)",
    thumbEmoji:  "💍",
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
    thumbBg:     "linear-gradient(160deg,#3d0c11,#c31432,#240b36)",
    thumbEmoji:  "💎",
    media: [
      { id:"m3", bg:"linear-gradient(160deg,#3d0c11,#c31432,#240b36)", duration:9,
        label:"Limited Edition ❤️‍🔥",
        products:[
          { id:"p4", name:"צמיד טניס יהלומים", price:8990, emoji:"💎", slug:"tennis-bracelet" },
          { id:"p5", name:"טבעת אתנה",          price:3200, emoji:"💍", slug:"athena-ring" },
        ]},
    ],
  },
  {
    id: "s3", name: "שירה לוי", initials: "ש",
    avatarBg:    "linear-gradient(135deg,#f59e0b,#f97316)",
    borderColors: ["#f59e0b","#f97316","#ef4444"],
    thumbBg:     "linear-gradient(160deg,#134e5e,#71b280,#1a472a)",
    thumbEmoji:  "🌿",
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
    thumbBg:     "linear-gradient(160deg,#0f2027,#203a43,#2c5364)",
    thumbEmoji:  "🌊",
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
    thumbBg:     "linear-gradient(160deg,#1f4037,#1a1a1a,#99f2c8)",
    thumbEmoji:  "⭕",
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

/* ── Facebook-style story card ─────────────────────────────── */
function StoryCard({ s, i, isViewed, onClick, small = false }) {
  const w = small ? 72 : 108;
  const h = small ? 110 : 168;
  const avatarSize = small ? 28 : 38;
  const fontSize   = small ? 9  : 11;

  return (
    <button onClick={() => onClick(i)}
      style={{
        position:"relative", width:w, height:h, borderRadius:12,
        border:"none", padding:0, cursor:"pointer", flexShrink:0, overflow:"hidden",
        background: isViewed ? "#cbd5e1" : s.thumbBg,
        backgroundSize:"200% 200%",
        filter: isViewed ? "grayscale(0.7) brightness(0.7)" : "none",
        transition:"filter 0.3s",
      }}>
      {/* Gradient overlay at bottom */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
        zIndex:1,
      }} />

      {/* Center emoji */}
      <div style={{
        position:"absolute", top:"50%", left:"50%",
        transform:"translate(-50%,-60%)", fontSize: small ? 22 : 34, zIndex:1,
        filter: isViewed ? "grayscale(1)" : "none",
      }}>
        {s.thumbEmoji}
      </div>

      {/* Avatar top-right (RTL → top-right = visual top-right) */}
      <div style={{
        position:"absolute", top:6, right:6, zIndex:2,
        width:avatarSize, height:avatarSize, borderRadius:"50%",
        padding: isViewed ? 1.5 : 2,
        background: isViewed ? "#94a3b8" : `linear-gradient(135deg,${s.borderColors.join(",")})`,
      }}>
        <div style={{
          width:"100%", height:"100%", borderRadius:"50%", background:"#111",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", fontSize: small ? 10 : 13, fontWeight:800,
        }}>
          {s.initials}
        </div>
      </div>

      {/* Name at bottom */}
      <div style={{
        position:"absolute", bottom:5, left:4, right:4, zIndex:2, textAlign:"center",
        color:"#fff", fontSize, fontWeight:700,
        textShadow:"0 1px 3px rgba(0,0,0,0.8)",
        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
      }}>
        {s.name}
      </div>
    </button>
  );
}

/* ── Progress bars ─────────────────────────────────────────── */
function ProgressBars({ total, current, duration }) {
  return (
    <div style={{ display:"flex", gap:4 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex:1, height:2.5, borderRadius:2, background:"rgba(255,255,255,0.3)", overflow:"hidden" }}>
          {i < current && <div style={{ width:"100%", height:"100%", background:"#fff" }} />}
          {i === current && (
            <div style={{ height:"100%", background:"#fff", transformOrigin:"left center",
              animation:`progressFill ${duration}s linear forwards` }} />
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
          <div style={{ color:"#fbbf24", fontWeight:800, fontSize:16, marginTop:1 }}>₪{p.price.toLocaleString("he-IL")}</div>
        </div>
        <Link href={`/product-default/${p.slug}`}
          onClick={(e) => e.stopPropagation()}
          style={{
            padding:"10px 14px", background:"#fff", color:"#0f172a",
            borderRadius:12, fontSize:12, fontWeight:800,
            textDecoration:"none", whiteSpace:"nowrap", flexShrink:0,
            boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
          }}>לצפייה →</Link>
      </div>
      {products.length > 1 && (
        <div style={{ display:"flex", justifyContent:"center", gap:5 }}>
          {products.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              style={{
                width: i === idx ? 18 : 6, height:6, borderRadius:3, border:"none", cursor:"pointer", padding:0,
                background: i === idx ? "#fff" : "rgba(255,255,255,0.35)", transition:"all 0.2s",
              }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────── */
export default function Stories({ isSticky = true }) {
  const [activeIdx,   setActiveIdx]   = useState(null);
  const [mediaIdx,    setMediaIdx]    = useState(0);
  const [viewed,      setViewed]      = useState(new Set());
  const [isStuck,     setIsStuck]     = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const sectionRef  = useRef(null);
  const timerRef    = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

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

  /* expose global opener */
  useEffect(() => {
    window.__openStory = (idx, mIdx = 0) => {
      clearTimeout(timerRef.current);
      setActiveIdx(idx);
      setMediaIdx(mIdx ?? 0);
      setProgressKey(k => k + 1);
    };
    return () => { delete window.__openStory; };
  }, []);

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
    advance((e.clientX - left) < width * 0.35 ? 1 : -1);
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function handleTouchEnd(e) {
    if (!touchStartX.current) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (diffY < -80 && Math.abs(diffY) > Math.abs(diffX)) {
      closeStory();
    } else if (Math.abs(diffX) > 55) {
      advance(diffX > 0 ? -1 : 1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  const showSticky = isSticky && isStuck;

  return (
    <>
      <style>{KF}</style>

      {/* ── Standalone sticky bar (outside header) ─────────── */}
      {showSticky && (
        <div style={{
          position:"fixed", top:0, left:0, right:0, zIndex:1100,
          background:"rgba(9,11,17,0.97)", backdropFilter:"blur(16px)",
          borderBottom:"1px solid rgba(255,255,255,0.07)",
          padding:"8px 14px",
          animation:"slideDownIn 0.25s ease",
          direction:"rtl",
        }}>
          <div style={{ display:"flex", gap:8, overflowX:"auto", scrollbarWidth:"none", paddingBottom:2 }}>
            {DEMO.map((s, i) => (
              <StoryCard key={s.id} s={s} i={i} isViewed={viewed.has(s.id)} onClick={openStory} small />
            ))}
          </div>
        </div>
      )}

      {/* ── Stories row ────────────────────────────────────── */}
      <section ref={sectionRef} style={{ background:"#fff", padding:"20px 0 16px", direction:"rtl", borderBottom:"1px solid #f1f5f9" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span style={{ fontSize:16, fontWeight:800, color:"#0f172a", letterSpacing:-0.3 }}>Stories</span>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"linear-gradient(135deg,#a855f7,#ec4899)", display:"inline-block" }} />
          </div>
          <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" }}>
            {DEMO.map((s, i) => (
              <StoryCard key={s.id} s={s} i={i} isViewed={viewed.has(s.id)} onClick={openStory} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Story viewer modal ─────────────────────────────── */}
      {activeIdx !== null && story && media && (
        <div
          style={{ position:"fixed", inset:0, zIndex:1200, background:"rgba(0,0,0,0.94)", display:"flex", alignItems:"center", justifyContent:"center" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{
            position:"relative", width:"100%", maxWidth:430,
            height:"100dvh", maxHeight:860,
            background: media.bg, backgroundSize:"200% 200%",
            animation:"storyFadeIn 0.25s ease, bgShift 10s ease infinite",
            borderRadius:window.innerWidth > 500 ? 24 : 0,
            overflow:"hidden", display:"flex", flexDirection:"column",
          }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:200, background:"linear-gradient(to bottom,rgba(0,0,0,0.55),transparent)", zIndex:2, pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:320, background:"linear-gradient(to top,rgba(0,0,0,0.75),transparent)", zIndex:2, pointerEvents:"none" }} />

            <div style={{ position:"absolute", top:14, left:12, right:12, zIndex:10 }}>
              <ProgressBars key={progressKey} total={story.media.length} current={mediaIdx} duration={media.duration} />
            </div>

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

            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, padding:"80px 32px 180px" }}>
              <div style={{ fontSize:72 }}>{media.products[0]?.emoji}</div>
              <div style={{ color:"rgba(255,255,255,0.9)", fontSize:20, fontWeight:700, textAlign:"center", lineHeight:1.4 }}>
                {media.label}
              </div>
            </div>

            <div onClick={handleTap} style={{ position:"absolute", top:80, left:0, right:0, bottom:160, zIndex:5, cursor:"pointer" }} />

            <div style={{ position:"absolute", bottom:20, left:16, right:16, zIndex:10 }}>
              <ProductCard key={media.id} products={media.products} />
            </div>
          </div>

          {[{ dir:-1, label:"‹", side:"right" }, { dir:1, label:"›", side:"left" }].map(({ dir, label, side }) => (
            <button key={dir} onClick={() => advance(dir)}
              style={{
                position:"absolute", [side]:  "calc(50% + 230px)",
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
