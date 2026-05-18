"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import styles from "./AdminNav.module.css";

const navItems = [
  { href: "/admin",            label: "דשבורד",   icon: "◻" },
  { href: "/admin/products",   label: "מוצרים",   icon: "◈" },
  { href: "/admin/categories", label: "קטגוריות", icon: "⊙" },
  { href: "/admin/orders",     label: "הזמנות",   icon: "≡" },
];

export default function AdminNav({ children }) {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className={styles.shell}>

      {/* ── Desktop sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h1 className={styles.logoTitle}>ASSERTA</h1>
          <p className={styles.logoSub}>ADMIN</p>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ""}`}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>יציאה</button>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>ASSERTA</span>
        <button onClick={handleLogout} className={styles.topBarLogout}>יציאה</button>
      </div>

      {/* ── Page content ── */}
      <main className={styles.content}>{children}</main>

      {/* ── Mobile bottom nav ── */}
      <nav className={styles.bottomNav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.bottomNavItem} ${pathname === item.href ? styles.active : ""}`}
            style={{ color: pathname === item.href ? "#111" : "#bbb" }}
          >
            <span className={styles.bottomNavIcon}>{item.icon}</span>
            <span className={styles.bottomNavLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>

    </div>
  );
}
