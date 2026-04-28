import React from "react";
import Link from "next/link";
export default function Toolbar() {
  return (
    <div className="tf-toolbar-bottom">
      <div className="toolbar-item">
        <Link href={`/shop-default`}>
          <span className="toolbar-icon">
            <i className="icon icon-menu-home" />
          </span>
          <span className="toolbar-label">Shop</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <a href="#search" data-bs-toggle="offcanvas">
          <span className="toolbar-icon">
            <i className="icon icon-search-2" />
          </span>
          <span className="toolbar-label">Search</span>
        </a>
      </div>
      <div className="toolbar-item">
        <Link href={`/account-page`}>
          <span className="toolbar-icon">
            <i className="icon icon-user-2" />
          </span>
          <span className="toolbar-label">Account</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <Link href={`/wishlist`}>
          <span className="toolbar-icon">
            <i className="icon icon-hearth-3" />
            <span className="toolbar-count">0</span>
          </span>
          <span className="toolbar-label">Wishlist</span>
        </Link>
      </div>
      <div className="toolbar-item">
        <Link href={`/shop-cart`}>
          <span className="toolbar-icon">
            <i className="icon icon-cart-2" />
            <span className="toolbar-count">0</span>
          </span>
          <span className="toolbar-label">Cart</span>
        </Link>
      </div>
    </div>
  );
}
