"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

export default function AdminFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setShow(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setShow(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!show) return null;

  return (
    <Link
      href="/admin"
      style={{
        position: "fixed",
        bottom: 90,
        left: 16,
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        background: "rgba(18,18,22,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 100,
        color: "#fff",
        fontSize: 12,
        fontWeight: 600,
        textDecoration: "none",
        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        letterSpacing: 0.3,
        transition: "opacity 0.2s",
      }}
      title="לוח בקרה"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
      </svg>
      Admin
    </Link>
  );
}
