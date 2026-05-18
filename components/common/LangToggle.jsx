"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LangToggle() {
  const [locale, setLocale] = useState("he");
  const router = useRouter();

  useEffect(() => {
    const cur = document.cookie.match(/locale=([^;]+)/)?.[1] || "he";
    setLocale(cur);
  }, []);

  function toggle() {
    const next = locale === "he" ? "en" : "he";
    setLocale(next);
    document.cookie = `locale=${next};path=/;max-age=31536000`;
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      style={{
        background: "none",
        border: "1px solid #111",
        borderRadius: 4,
        padding: "3px 9px",
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        letterSpacing: "0.5px",
        color: "#111",
        lineHeight: 1.5,
      }}
    >
      {locale === "he" ? "EN" : "עב"}
    </button>
  );
}
