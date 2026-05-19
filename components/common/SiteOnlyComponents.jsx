"use client";
import { usePathname } from "next/navigation";
import Toolbar from "./Toolbar";
import AccessibilityWidget from "./AccessibilityWidget";

export default function SiteOnlyComponents() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <Toolbar />
      <AccessibilityWidget />
    </>
  );
}
