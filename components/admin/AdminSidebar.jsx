"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

const navItems = [
  { href: "/admin", label: "דשבורד", icon: "◻" },
  { href: "/admin/products", label: "מוצרים", icon: "◈" },
  { href: "/admin/categories", label: "קטגוריות", icon: "◧" },
  { href: "/admin/orders", label: "הזמנות", icon: "◫" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside style={{ width: 220, background: "#111", color: "#fff", display: "flex", flexDirection: "column", minHeight: "100vh", padding: "24px 0" }}>
      <div style={{ padding: "0 24px 32px", borderBottom: "1px solid #222" }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: 3, margin: 0 }}>ASSERTA</h1>
        <p style={{ fontSize: 11, color: "#666", margin: "4px 0 0", letterSpacing: 1 }}>ADMIN PANEL</p>
      </div>

      <nav style={{ flex: 1, padding: "16px 0" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 24px", color: isActive ? "#fff" : "#888",
              background: isActive ? "#222" : "transparent",
              textDecoration: "none", fontSize: 14,
              borderRight: isActive ? "3px solid #fff" : "3px solid transparent",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "16px 24px", borderTop: "1px solid #222" }}>
        <button onClick={handleLogout} style={{
          background: "none", border: "1px solid #333", color: "#888",
          padding: "8px 16px", borderRadius: 6, cursor: "pointer",
          fontSize: 13, width: "100%",
        }}>
          יציאה
        </button>
      </div>
    </aside>
  );
}
