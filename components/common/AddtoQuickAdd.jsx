"use client";

import { useContextElement } from "@/context/Context";

export default function AddtoQuickAdd({ tooltipDirection = "left", product }) {
  const { setQuickAddItem } = useContextElement();
  return (
    <a
      href="#quickAdd"
      data-bs-toggle="modal"
      onClick={() => {
        if (product.id) {
          setQuickAddItem(product.id);
        }
      }}
      className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
    >
      <span className="icon icon-shop-cart" />
      <span className="tooltip">Add to Cart</span>
    </a>
  );
}
