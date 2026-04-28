"use client";

import { useContextElement } from "@/context/Context";

export default function QuickView({ tooltipDirection = "left", product }) {
  const { setQuickViewItem } = useContextElement();
  return (
    <a
      href="#quickView"
      data-bs-toggle="modal"
      onClick={() => {
        if (product) {
          setQuickViewItem(product);
        }
      }}
      className="hover-tooltip tooltip-left box-icon quickview"
    >
      <span className="icon icon-view" />
      <span className="tooltip">Quick View</span>
    </a>
  );
}
