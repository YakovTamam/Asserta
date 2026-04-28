"use client";

import { useContextElement } from "@/context/Context";

export default function AddtoCompare({
  product,
  additionalClass = "box-icon",
  tooltipDirection = "left",
}) {
  const { addToCompareItem, isAddedtoCompareItem } = useContextElement();
  return (
    <a
      href="#compare"
      data-bs-toggle="modal"
      aria-controls="compare"
      onClick={() => {
        if (product.id) {
          addToCompareItem(product.id);
        }
      }}
      className={`hover-tooltip tooltip-${tooltipDirection} ${additionalClass} `}
    >
      <span className="icon icon-compare" />
      <span className="tooltip">
        {isAddedtoCompareItem(product.id) ? "Compared" : "Compare"}
      </span>
    </a>
  );
}
