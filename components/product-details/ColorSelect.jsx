"use clienr";
import React, { useState } from "react";
import Image from "next/image";

const colors = [
  {
    name: "Gold",
    colorKey: "gold",
    price: "2,499.00",
    image: "/images/products/material/yellow.jpg",
  },
  {
    name: "Rose",
    colorKey: "rose",
    price: "2,499.00",
    image: "/images/products/material/pink.jpg",
  },
  {
    name: "Titanium",
    colorKey: "titanium",
    price: "2,499.00",
    image: "/images/products/material/gray.jpg",
  },
];

export default function ColorSelect({ activeColor, setActiveColor }) {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSelect = (colorKey) => {
    if (setActiveColor) {
      setActiveColor(colorKey);
    }
    setSelectedColor(colorKey);
  };

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
              width={100}
              height={100}
            />
          </span>
          <span className="tooltip">{color.name}</span>
        </div>
      ))}
    </>
  );
}
