"use client";
import React from "react";
import Link from "next/link";

export default function Toolbar() {
  return (
    <div className="tf-toolbar-bottom">
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
        <Link href={`/account-page`}>
          <span className="toolbar-icon">
            <i className="icon icon-user-2" />
          </span>
          <span className="toolbar-label">חשבון</span>
        </Link>
      </div>
    </div>
  );
}
