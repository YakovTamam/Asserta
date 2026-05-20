"use client";
import React, { useState } from "react";
import Link from "next/link";
import AccountSheet from "./AccountSheet";

export default function Toolbar() {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <>
      <div className="tf-toolbar-bottom">
        <div className="toolbar-item">
          <a href="#mobileMenu" data-bs-toggle="offcanvas">
            <span className="toolbar-icon">
              <i className="icon icon-menu-2" />
            </span>
            <span className="toolbar-label">תפריט</span>
          </a>
        </div>
        <div className="toolbar-item">
          <a href="#shoppingCart" data-bs-toggle="offcanvas">
            <span className="toolbar-icon">
              <i className="icon icon-cart-2" />
              <span className="toolbar-count">0</span>
            </span>
            <span className="toolbar-label">עגלה</span>
          </a>
        </div>
        <div className="toolbar-item">
          <Link href={`/wishlist`}>
            <span className="toolbar-icon">
              <i className="icon icon-hearth-3" />
              <span className="toolbar-count">0</span>
            </span>
            <span className="toolbar-label">סומן בלב</span>
          </Link>
        </div>
        <div className="toolbar-item">
          <Link href={`/shop-collection-list`}>
            <span className="toolbar-icon">
              <i className="icon icon-menu-home" />
            </span>
            <span className="toolbar-label">חנות</span>
          </Link>
        </div>
        <div className="toolbar-item">
          <button
            onClick={() => setAccountOpen(true)}
            style={{ background:"none", border:"none", cursor:"pointer", padding:0, width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}
          >
            <span className="toolbar-icon">
              <i className="icon icon-user-2" />
            </span>
            <span className="toolbar-label">חשבון</span>
          </button>
        </div>
      </div>

      <AccountSheet open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}
