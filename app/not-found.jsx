import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

export const metadata = {
  title: "דף לא נמצא — Asserta",
};

export default function NotFound() {
  return (
    <>
      <Header1 />
      <main style={{ minHeight: "100vh", background: "#f9f9f9", direction: "rtl", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{ fontSize: 80, fontWeight: 900, color: "#111", letterSpacing: "-4px", marginBottom: 16 }}>404</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111", marginBottom: 12 }}>הדף לא נמצא</h1>
          <p style={{ color: "#888", fontSize: 15, marginBottom: 32 }}>הדף שחיפשת לא קיים או הוסר. חזרי לדף הבית להמשך קנייה.</p>
          <Link href="/" style={{
            display: "inline-block", padding: "14px 36px",
            background: "#111", color: "#fff", borderRadius: 12,
            fontWeight: 700, fontSize: 15, textDecoration: "none",
          }}>
            חזרה לדף הבית
          </Link>
        </div>
      </main>
      <Footer1 />
    </>
  );
}
