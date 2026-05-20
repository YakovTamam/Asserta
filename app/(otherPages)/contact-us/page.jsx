"use client";

import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import { useState } from "react";

const contactInfo = [
  {
    label: "וואטסאפ",
    value: "050-0000000",
    href: "https://wa.me/9720500000000",
    icon: "💬",
  },
  {
    label: 'דוא"ל',
    value: "info@asserta.co.il",
    href: "mailto:info@asserta.co.il",
    icon: "✉",
  },
  {
    label: "שעות פעילות",
    value: "א–ה  10:00–19:00",
    secondLine: "שישי  10:00–14:00",
    icon: "◷",
  },
];

const inputStyle = {
  width: "100%",
  background: "#1a1614",
  border: "1px solid #2a2416",
  borderRadius: 3,
  padding: "12px 16px",
  color: "#e8e0d0",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  direction: "rtl",
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  letterSpacing: "0.15em",
  color: "#c9a84c",
  textTransform: "uppercase",
  marginBottom: 8,
};

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div dir="rtl" style={{ backgroundColor: "#0d0d0d", color: "#e8e0d0", minHeight: "100vh" }}>
      <Header1 parentClass="tf-header" />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, #111 0%, #1a1409 60%, #111 100%)",
          padding: "80px 24px 70px",
          textAlign: "center",
          borderBottom: "1px solid #2a2416",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#c9a84c",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          אנחנו כאן בשבילך
        </p>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 68px)",
            fontWeight: 200,
            letterSpacing: "0.08em",
            color: "#f0e6cc",
            margin: "0 auto 20px",
          }}
        >
          צרי קשר
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#8a7a60",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.85,
            fontWeight: 300,
          }}
        >
          נשמח לענות על כל שאלה, לעזור בבחירת תכשיט או לתאם ייעוץ אישי. השאירי פרטים ונחזור אלייך בהקדם.
        </p>
      </section>

      {/* Main content */}
      <section
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "72px 24px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 60,
          alignItems: "start",
        }}
      >
        {/* Contact info column */}
        <div>
          <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "block", width: 28, height: 1, background: "#c9a84c" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#c9a84c", textTransform: "uppercase" }}>
              פרטי התקשרות
            </span>
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 300,
              color: "#f0e6cc",
              marginBottom: 36,
              letterSpacing: "0.03em",
            }}
          >
            נשמח לשמוע ממך
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {contactInfo.map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: 20,
                    color: "#c9a84c",
                    width: 28,
                    textAlign: "center",
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {item.icon}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      color: "#6a5a40",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontSize: 15,
                        color: "#d4c4a0",
                        textDecoration: "none",
                        fontWeight: 300,
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <>
                      <p style={{ fontSize: 15, color: "#d4c4a0", fontWeight: 300, margin: 0 }}>
                        {item.value}
                      </p>
                      {item.secondLine && (
                        <p style={{ fontSize: 15, color: "#d4c4a0", fontWeight: 300, margin: "4px 0 0" }}>
                          {item.secondLine}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Decorative line */}
          <div
            style={{
              marginTop: 48,
              padding: "28px 0",
              borderTop: "1px solid #2a2416",
            }}
          >
            <p style={{ fontSize: 13, color: "#6a5a40", lineHeight: 1.8, fontWeight: 300 }}>
              זמן מענה ממוצע: עד 24 שעות בימי עסקים.
              <br />
              לשירות מיידי — כתבי לנו בוואטסאפ.
            </p>
          </div>
        </div>

        {/* Form column */}
        <div
          style={{
            background: "linear-gradient(145deg, #1a1614 0%, #141210 100%)",
            border: "1px solid #2a2416",
            borderRadius: 4,
            padding: "40px 36px",
          }}
        >
          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "transparent",
                  border: "2px solid #c9a84c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                  color: "#c9a84c",
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 300,
                  color: "#f0e6cc",
                  letterSpacing: "0.03em",
                }}
              >
                ההודעה נשלחה!
              </h3>
              <p style={{ fontSize: 14, color: "#8a7a60", lineHeight: 1.8, fontWeight: 300 }}>
                נחזור אליך בהקדם האפשרי.
                <br />
                תודה שפנית אלינו.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <label style={labelStyle}>שם מלא</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="השם המלא שלך"
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>כתובת מייל</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  style={{ ...inputStyle, direction: "ltr", textAlign: "right" }}
                />
              </div>

              <div>
                <label style={labelStyle}>טלפון</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="050-0000000"
                  style={{ ...inputStyle, direction: "ltr", textAlign: "right" }}
                />
              </div>

              <div>
                <label style={labelStyle}>הודעה</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="כתבי לנו הכל — נשמח לעזור."
                  required
                  rows={5}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: 120,
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: 8,
                  padding: "14px 0",
                  background: "transparent",
                  border: "1px solid #c9a84c",
                  color: "#c9a84c",
                  fontSize: 12,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  borderRadius: 2,
                  fontFamily: "inherit",
                  transition: "background 0.25s, color 0.25s",
                }}
              >
                שליחה
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer1 />
    </div>
  );
}
