"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("cookies");

  useEffect(() => {
    const choice = localStorage.getItem("cookiesChoice");
    if (!choice) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookiesChoice", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookiesChoice", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9996,
        background: "#fff",
        borderTop: "1px solid #e5e5e5",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.07)",
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: "#555",
          margin: 0,
          flex: 1,
          minWidth: 220,
        }}
      >
        {t("message")}{" "}
        <Link
          href="/privacy-policy"
          style={{
            color: "#111",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          {t("learnMore")}
        </Link>
      </p>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button
          onClick={accept}
          style={{
            padding: "8px 20px",
            border: "none",
            borderRadius: 6,
            background: "#111",
            color: "#fff",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {t("accept")}
        </button>
        <button
          onClick={decline}
          style={{
            padding: "8px 18px",
            border: "1px solid #ddd",
            borderRadius: 6,
            background: "#fff",
            cursor: "pointer",
            fontSize: 13,
            color: "#666",
          }}
        >
          {t("decline")}
        </button>
      </div>
    </div>
  );
}
