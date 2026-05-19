"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import styles from "./AdminNav.module.css";

const NAV = [
  {
    id: "dashboard",
    label: "דשבורד",
    icon: "📊",
    href: "/admin",
  },
  {
    id: "products",
    label: "מוצרים",
    icon: "💍",
    base: "/admin/products",
    children: [
      { href: "/admin/products",          label: "כל המוצרים" },
      { href: "/admin/products?new=true", label: "הוספת מוצר +" },
    ],
  },
  {
    id: "categories",
    label: "קטגוריות",
    icon: "🏷️",
    base: "/admin/categories",
    children: [
      { href: "/admin/categories",          label: "כל הקטגוריות" },
      { href: "/admin/categories?new=true", label: "הוספת קטגוריה +" },
    ],
  },
  {
    id: "orders",
    label: "הזמנות",
    icon: "📦",
    base: "/admin/orders",
    children: [
      { href: "/admin/orders",                label: "כל ההזמנות" },
      { href: "/admin/orders?status=pending", label: "ממתין לאישור" },
      { href: "/admin/orders?status=paid",    label: "שולם" },
      { href: "/admin/orders?status=shipped", label: "נשלח" },
    ],
  },
];

const BOTTOM = [
  { href: "/admin",            label: "דשבורד",   icon: "📊", base: "/admin" },
  { href: "/admin/products",   label: "מוצרים",   icon: "💍", base: "/admin/products" },
  { href: "/admin/categories", label: "קטגוריות", icon: "🏷️", base: "/admin/categories" },
  { href: "/admin/orders",     label: "הזמנות",   icon: "📦", base: "/admin/orders" },
];

function isActive(pathname, base) {
  if (base === "/admin") return pathname === "/admin";
  return pathname.startsWith(base);
}

/* ── Desktop sidebar (always expanded) ── */
function SidebarNav({ pathname }) {
  return (
    <nav className={styles.nav}>
      {NAV.map((item) =>
        !item.children ? (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ""}`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
          </Link>
        ) : (
          <div key={item.id}>
            <div className={`${styles.sectionLabel} ${isActive(pathname, item.base) ? styles.sectionLabelActive : ""}`}>
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </div>
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={`${styles.subLink} ${pathname === child.base && !child.href.includes("?") ? styles.subLinkActive : ""}`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )
      )}
    </nav>
  );
}

/* ── Mobile drawer (accordion) ── */
function DrawerNav({ pathname, onLinkClick }) {
  const [expanded, setExpanded] = useState(() => {
    const active = NAV.find((i) => i.base && pathname.startsWith(i.base));
    return new Set(active ? [active.id] : ["products"]);
  });

  function toggle(id) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <nav className={styles.drawerNav}>
      {NAV.map((item) =>
        !item.children ? (
          <Link
            key={item.id}
            href={item.href}
            onClick={onLinkClick}
            className={`${styles.drawerItem} ${pathname === item.href ? styles.drawerItemActive : ""}`}
          >
            <span className={styles.drawerIcon}>{item.icon}</span>
            {item.label}
          </Link>
        ) : (
          <div key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className={`${styles.drawerSection} ${isActive(pathname, item.base) ? styles.drawerSectionActive : ""}`}
            >
              <span className={styles.drawerIcon}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: "right" }}>{item.label}</span>
              <span className={`${styles.chevron} ${expanded.has(item.id) ? styles.chevronOpen : ""}`}>›</span>
            </button>
            <div className={`${styles.drawerChildren} ${expanded.has(item.id) ? styles.drawerChildrenOpen : ""}`}>
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onLinkClick}
                  className={`${styles.drawerChild} ${child.href.includes("?new") ? styles.drawerChildNew : pathname === child.href.split("?")[0] ? styles.drawerChildActive : ""}`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        )
      )}
    </nav>
  );
}

/* ── Root ── */
export default function AdminNav({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useEffect(() => { setDrawerOpen(false); }, [pathname]);

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
        <SidebarNav pathname={pathname} />
        <button onClick={handleLogout} className={styles.logoutBtn}>יציאה</button>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className={styles.topBar}>
        <button onClick={() => setDrawerOpen(true)} className={styles.hamburger} aria-label="תפריט">
          <span /><span /><span />
        </button>
        <span className={styles.topBarTitle}>ASSERTA</span>
        <button onClick={handleLogout} className={styles.topBarLogout}>יציאה</button>
      </div>

      {/* ── Overlay ── */}
      <div
        className={`${styles.overlay} ${drawerOpen ? styles.overlayVisible : ""}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ── Drawer ── */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>ASSERTA ADMIN</span>
          <button onClick={() => setDrawerOpen(false)} className={styles.drawerClose}>×</button>
        </div>
        <DrawerNav pathname={pathname} onLinkClick={() => setDrawerOpen(false)} />
        <button onClick={handleLogout} className={styles.drawerLogoutBtn}>יציאה מהמערכת</button>
      </div>

      {/* ── Page content ── */}
      <main className={styles.content}>{children}</main>

      {/* ── Mobile bottom nav ── */}
      <nav className={styles.bottomNav}>
        {BOTTOM.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.bottomNavItem} ${isActive(pathname, item.base) ? styles.bottomNavItemActive : ""}`}
          >
            <span className={styles.bottomNavIcon}>{item.icon}</span>
            <span className={styles.bottomNavLabel}>{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`${styles.bottomNavItem} ${styles.bottomNavBtn}`}
        >
          <span className={styles.bottomNavIcon}>☰</span>
          <span className={styles.bottomNavLabel}>תפריט</span>
        </button>
      </nav>

    </div>
  );
}
