"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const POLICY_LINKS = [
  { label: "אודות",            href: "/about-us" },
  { label: "צרו קשר",          href: "/contact-us" },
  { label: "מדיניות פרטיות",  href: "/privacy-policy" },
];

const PAYMENT_ICONS = [
  { src: "/images/payment/am-ex.svg",    alt: "American Express", w: 48 },
  { src: "/images/payment/master-2.svg", alt: "Mastercard",        w: 44 },
  { src: "/images/payment/visa-2.svg",   alt: "Visa",              w: 52 },
  { src: "/images/payment/gg-pay-2.svg", alt: "Google Pay",        w: 54 },
  { src: "/images/payment/apple-pay.svg",alt: "Apple Pay",         w: 54 },
];

export default function Footer1() {
  const [email,       setEmail]       = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [emailError,  setEmailError]  = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    try {
      await axios.post("https://express-brevomail.vercel.app/api/contacts", { email });
      setSubmitted(true);
      setEmail("");
    } catch {
      setEmailError(true);
      setTimeout(() => setEmailError(false), 3000);
    }
  }

  return (
    <footer style={{ background:"#111", color:"#fff", direction:"rtl" }}>

      {/* ── Newsletter ── */}
      <div style={{ borderBottom:"1px solid rgba(255,255,255,0.1)", padding:"40px 20px" }}>
        <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
          <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>הצטרפי לקהילת ASSERTA</h3>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", marginBottom:20 }}>
            גישה מוקדמת למוצרים חדשים, מבצעים בלעדיים ועוד.
          </p>
          {submitted ? (
            <p style={{ color:"#4ade80", fontSize:14, fontWeight:600 }}>✓ נרשמת בהצלחה!</p>
          ) : (
            <form onSubmit={handleSubscribe}
              style={{ display:"flex", gap:0, maxWidth:440, margin:"0 auto", borderRadius:10, overflow:"hidden", border:"1px solid rgba(255,255,255,0.2)" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Your_email@example.com"
                style={{ flex:1, padding:"12px 16px", background:"transparent", border:"none", color:"#fff", fontSize:14, outline:"none", direction:"ltr" }}
              />
              <button type="submit"
                style={{ padding:"12px 22px", background:"#fff", color:"#111", border:"none", fontWeight:700, fontSize:14, cursor:"pointer", flexShrink:0 }}>
                →
              </button>
            </form>
          )}
          {emailError && <p style={{ color:"#f87171", fontSize:13, marginTop:8 }}>שגיאה — נסי שוב</p>}
        </div>
      </div>

      {/* ── Links ── */}
      <div style={{ borderBottom:"1px solid rgba(255,255,255,0.1)", padding:"28px 20px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"10px 32px" }}>
          {POLICY_LINKS.map(l => (
            <Link key={l.href} href={l.href}
              style={{ color:"rgba(255,255,255,0.7)", fontSize:14, textDecoration:"none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Payment icons ── */}
      <div style={{ borderBottom:"1px solid rgba(255,255,255,0.1)", padding:"24px 20px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center", gap:12 }}>
          {/* Bit — inline badge */}
          <div style={{
            width:56, height:36, borderRadius:8, background:"#fff",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:13, fontWeight:900, color:"#00a8e8", letterSpacing:-0.5,
          }}>
            bit.
          </div>
          {PAYMENT_ICONS.map(p => (
            <div key={p.alt} style={{ width:56, height:36, borderRadius:8, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", padding:"4px 6px" }}>
              <Image src={p.src} alt={p.alt} width={p.w} height={22} style={{ objectFit:"contain" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Copyright ── */}
      <div style={{ padding:"20px", textAlign:"center" }}>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", margin:0 }}>
          © {new Date().getFullYear()} Asserta.
        </p>
      </div>

    </footer>
  );
}
