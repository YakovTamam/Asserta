"use client";
import { accountLinks } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AccountSidebar() {
  const pathname = usePathname();
  return (
    <>
      {accountLinks.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className={`link-account${
              link.href.split("/")[1] == pathname.split("/")[1] ? " active" : ""
            }`}
          >
            <span className="text">{link.text}</span>
          </Link>
        </li>
      ))}
    </>
  );
}
