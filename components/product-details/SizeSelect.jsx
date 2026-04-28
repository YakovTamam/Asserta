"use client";
import React, { useState } from "react";

const SizePicker = ({ hasSizePicker = false }) => {
  const sizeOptions = [
    { size: 48, price: "2,499.00" },
    { size: 50, price: "999.00" },
    { size: 52, price: "1,999.00" },
    { size: 54, price: "2,199.00" },
  ];

  const [selectedSize, setSelectedSize] = useState(48); // default active size

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="variant-picker-item variant-size">
      <div className="variant-picker-label h6 fw-normal">
        Size:{" "}
        <span className="variant-picker-label-value value-currentSize">
          {selectedSize}
        </span>
      </div>
      <div className="variant-picker-values">
        <div className="btn-group">
          {sizeOptions.map(({ size, price }) => (
            <span
              key={size}
              className={`size-btn ${selectedSize === size ? "active" : ""}`}
              data-size={size}
              data-price={price}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </span>
          ))}
        </div>
        {hasSizePicker && (
          <a
            href="#sizeGuide"
            data-bs-toggle="offcanvas"
            className="tf-btn-line style-line-2 fw-normal"
          >
            Size Guide
          </a>
        )}
      </div>
    </div>
  );
};

export default SizePicker;
