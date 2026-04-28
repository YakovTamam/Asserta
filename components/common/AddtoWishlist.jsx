"use client";

import { useContextElement } from "@/context/Context";

export default function AddtoWishlist({
  tooltipDirection = "left",
  product,
  additionalClass = "box-icon",
}) {
  const { addToWishlist, isAddedtoWishlist } = useContextElement();
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        if (product.id) {
          addToWishlist(product.id);
        }
      }}
      className={`hover-tooltip tooltip-${tooltipDirection}  ${additionalClass}`}
    >
      <span
        className={`icon ${
          isAddedtoWishlist(product.id) ? "icon-trash" : "icon-heart-2"
        } `}
      />
      <span className="tooltip">
        {isAddedtoWishlist(product.id) ? "Remove Wishlist" : "Add to Wishlist"}
      </span>
    </a>
  );
}
