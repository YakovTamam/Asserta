"use client";
import { useState, useEffect } from "react";

const FALLBACK_ITEMS = [
  {
    icon: "✦",
    title: "עיצוב ייחודי",
    text: "כל תכשיט מעוצב בקפידה ומיוצר בעבודת יד על ידי אומנים מנוסים",
  },
  {
    icon: "🚚",
    title: "משלוח חינם",
    text: "משלוח חינם לכל הארץ על הזמנות מעל ₪500, עם מעקב בזמן אמת",
  },
  {
    icon: "🔒",
    title: "אחריות שנתיים",
    text: "כל תכשיט מגיע עם אחריות מלאה לשנתיים ותעודת אותנטיות",
  },
  {
    icon: "💬",
    title: "שירות אישי",
    text: "צוות מומחים זמין לייעוץ אישי ולסיוע בבחירת התכשיט המושלם",
  },
];

export default function WhyUs() {
  const [items, setItems] = useState(FALLBACK_ITEMS);

  useEffect(() => {
    fetch("/api/content/why-us")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.map(item => ({ icon: item.icon, title: item.title, text: item.body })));
        }
      })
      .catch(() => {/* keep fallback */});
  }, []);

  return (
    <section
      style={{
        background: "#0d0d0d",
        color: "#fff",
        padding: "80px 20px",
        direction: "rtl",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            למה דווקא אנחנו
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.45)",
              margin: 0,
              fontWeight: 400,
            }}
          >
            הסיבות שלקוחותינו חוזרים שוב ושוב
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {items.map((item) => (
            <div
              key={item.title}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  lineHeight: 1,
                  color: "#fff",
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#fff",
                  marginTop: 12,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
