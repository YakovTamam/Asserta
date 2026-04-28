"use client";
import { useEffect } from "react";
const layouts = [
  { id: 2, className: "icon-grid-2", visible: "d-md-flex" },
  { id: 3, className: "icon-grid-3", visible: "d-md-flex" },
  { id: 4, className: "icon-grid-4", visible: "d-xl-flex" },
];

export default function LayoutHandler({
  activeLayout,
  setActiveLayout,
  hasSidebar = false,
}) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200 && window.innerWidth > 767) {
        setActiveLayout((pre) => (pre > 3 ? 3 : pre));
      } else if (window.innerWidth < 768) {
        setActiveLayout((pre) => (pre > 2 ? 2 : pre));
      }
    };
    handleResize();
    // Add the resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {layouts.map((layout) => (
        <li
          key={layout.id}
          className={`tf-view-layout-switch sw-layout-${layout.id} ${
            layout.visible
          } ${activeLayout === layout.id ? "active" : ""}`}
          onClick={() => setActiveLayout(layout.id)}
        >
          <div className={`item ${layout.className}`}>
            {Array.from({ length: layout.id }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        </li>
      ))}
    </>
  );
}
