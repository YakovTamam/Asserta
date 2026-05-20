"use client";
import Link from "next/link";

const C = {
  primary: "#0f172a",
  bg: "#f1f5f9",
  card: "#ffffff",
  border: "#e2e8f0",
  muted: "#64748b",
};

const HUB_CARDS = [
  {
    href: "/admin/content/videos",
    icon: "🎬",
    title: "סרטוני גלילה",
    description: "העלאת וידאו, טקסטים ממוקמים וכפתורים על גבי הסרטון",
  },
  {
    href: "/admin/content/faq",
    icon: "❓",
    title: "שאלות נפוצות",
    description: "ניהול שאלות ותשובות המוצגות בדף הבית",
  },
  {
    href: "/admin/content/why-us",
    icon: "✦",
    title: "למה אנחנו",
    description: "עריכת יתרונות הברנד המוצגים בדף הבית",
  },
];

export default function ContentHubPage() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "32px 24px", direction: "rtl" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.primary, margin: 0 }}>
            תוכן האתר
          </h1>
          <p style={{ fontSize: 14, color: C.muted, marginTop: 6, marginBottom: 0 }}>
            נהל את התכנים הדינמיים המוצגים בדף הבית
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {HUB_CARDS.map((card) => (
            <HubCard key={card.href} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HubCard({ href, icon, title, description }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: C.card,
          borderRadius: 16,
          padding: "28px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          border: `1.5px solid ${C.border}`,
          cursor: "pointer",
          transition: "all 0.18s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = C.primary;
          e.currentTarget.style.borderColor = C.primary;
          e.currentTarget.querySelector(".hub-icon").style.background = "rgba(255,255,255,0.12)";
          e.currentTarget.querySelector(".hub-title").style.color = "#fff";
          e.currentTarget.querySelector(".hub-desc").style.color = "rgba(255,255,255,0.65)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = C.card;
          e.currentTarget.style.borderColor = C.border;
          e.currentTarget.querySelector(".hub-icon").style.background = "#f1f5f9";
          e.currentTarget.querySelector(".hub-title").style.color = C.primary;
          e.currentTarget.querySelector(".hub-desc").style.color = C.muted;
        }}
      >
        <div
          className="hub-icon"
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            marginBottom: 16,
            transition: "background 0.18s ease",
          }}
        >
          {icon}
        </div>
        <div
          className="hub-title"
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: C.primary,
            marginBottom: 8,
            transition: "color 0.18s ease",
          }}
        >
          {title}
        </div>
        <p
          className="hub-desc"
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.6,
            margin: 0,
            transition: "color 0.18s ease",
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
