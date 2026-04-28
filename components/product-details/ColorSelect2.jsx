"use client";
import Image from "next/image";
import { useState } from "react";

export default function ColorSelect2({ activeColor, setActiveColor }) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSelect = (colorKey) => {
    if (setActiveColor) {
      setActiveColor(colorKey);
    }
    setSelectedColor(colorKey);
  };

  const colors = [
    {
      name: "Gold",
      colorKey: "gold",
      price: "2,499.00",
      image: "/images/products/detail/prd-detail-1.jpg",
    },
    {
      name: "Rose",
      colorKey: "rose",
      price: "2,499.00",
      image: "/images/products/detail/prd-detail-4.jpg",
    },
    {
      name: "Titanium",
      colorKey: "titanium",
      price: "2,499.00",
      image: "/images/products/detail/prd-detail-7.jpg",
    },
  ];

  return (
    <>
      {colors.map((color) => (
        <div
          key={color.colorKey}
          className={`hover-tooltip color-btn style-image-square ${
            activeColor
              ? activeColor === color.colorKey
                ? "active"
                : ""
              : selectedColor === color.colorKey
              ? "active"
              : ""
          }`}
          data-color={color.colorKey}
          data-price={color.price}
          onClick={() => handleSelect(color.colorKey)}
        >
          <span className="check-color">
            <Image
              alt={color.name}
              src={color.image}
              width={1000}
              height={1000}
            />
          </span>
          <span className="tooltip">{color.name}</span>
        </div>
      ))}
    </>
  );
}
