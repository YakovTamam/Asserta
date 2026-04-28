"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  blogMenuLinks,
  demoPages,
  otherPages,
  productDetailPages,
  shopPages,
} from "@/data/menu";

export default function MobileNav() {
  const pathname = usePathname();
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  const isMenuParentActive = (menu) => {
    return menu.some((elm) => isMenuActive(elm));
  };
  const isMenuParentActive2 = (menu) => {
    return menu.some((elm) => isMenuParentActive(elm.links));
  };
  return (
    <>
      {" "}
      <li className="nav-mb-item">
        <a
          href="#dropdown-menu-home"
          className="collapsed mb-menu-link"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="dropdown-menu-home"
        >
          <span>Home</span>
          <span className="btn-open-sub" />
        </a>
        <div id="dropdown-menu-home" className="collapse">
          <ul className="sub-nav-menu">
            {demoPages.map((page, index) => (
              <li key={index}>
                <Link href={page.href} className="sub-nav-link">
                  {page.name}
                  {page.label && (
                    <span
                      className={`demo-label ${page.labelType || ""}`.trim()}
                    >
                      {page.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="nav-mb-item">
        <a
          href="#dropdown-menu-shop"
          className="collapsed mb-menu-link"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="dropdown-menu-shop"
        >
          <span>Shop</span>
          <span className="btn-open-sub" />
        </a>
        <div id="dropdown-menu-shop" className="collapse">
          <ul className="sub-nav-menu">
            {shopPages.map((section, index) => (
              <li key={index}>
                <a
                  href={`#sub-shop-layout${index}`}
                  className="sub-nav-link collapsed"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls={`sub-shop-layout${index}`}
                >
                  <span>{section.heading}</span>
                  <span className="btn-open-sub" />
                </a>
                <div id={`sub-shop-layout${index}`} className="collapse">
                  <ul className="sub-nav-menu sub-menu-level-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href2 ? link.href2 : link.href}
                          className="sub-nav-link"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="nav-mb-item">
        <a
          href="#dropdown-menu-product"
          className="collapsed mb-menu-link"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="dropdown-menu-product"
        >
          <span>Products</span>
          <span className="btn-open-sub" />
        </a>
        <div id="dropdown-menu-product" className="collapse">
          <ul className="sub-nav-menu">
            {productDetailPages.map((section, sectionIndex) => (
              <li key={sectionIndex}>
                <a
                  href={`#sub-product-layout${sectionIndex}`}
                  className="sub-nav-link collapsed"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls={`sub-product-layout${sectionIndex}`}
                >
                  <span> {section.heading}</span>
                  <span className="btn-open-sub" />
                </a>
                <div
                  id={`sub-product-layout${sectionIndex}`}
                  className="collapse"
                >
                  <ul className="sub-nav-menu sub-menu-level-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href2 ? link.href2 : link.href}
                          className="sub-nav-link"
                        >
                          {link.label}
                          {link.badge && (
                            <span
                              className={`demo-label ${
                                link.badgeType || ""
                              }`.trim()}
                            >
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="nav-mb-item">
        <a
          href="#dropdown-menu-pages"
          className="collapsed mb-menu-link"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="dropdown-menu-pages"
        >
          <span>Pages</span>
          <span className="btn-open-sub" />
        </a>
        <div id="dropdown-menu-pages" className="collapse">
          <ul className="sub-nav-menu">
            {otherPages.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="sub-nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="nav-mb-item">
        <a
          href="#dropdown-menu-blog"
          className="collapsed mb-menu-link"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="dropdown-menu-blog"
        >
          <span>Blog</span>
          <span className="btn-open-sub" />
        </a>
        <div id="dropdown-menu-blog" className="collapse">
          <ul className="sub-nav-menu">
            {blogMenuLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="sub-nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="nav-mb-item">
        <a
          href="https://themeforest.net/user/themesflat"
          className="mb-menu-link"
        >
          Buy Theme
        </a>
      </li>
    </>
  );
}
