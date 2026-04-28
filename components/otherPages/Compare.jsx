"use client";
import { useContextElement } from "@/context/Context";
import { allProducts } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Compare() {
  const {
    compareItem,
    removeFromCompareItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([...allProducts.filter((elm) => compareItem.includes(elm.id))]);
  }, [compareItem]);
  return (
    <div className="flat-spacing-10">
      <div className="container">
        <div className="tf-table-compare">
          <table>
            <thead>
              <tr className="compare-row">
                <th className="compare-col" />
                {items.map((product, i) => (
                  <th key={i} className="compare-col compare-head">
                    <div className="compare-item">
                      <div className="item_image">
                        <Image
                          src={product.imgSrc}
                          alt=""
                          className="lazyload"
                          width={714}
                          height={900}
                        />
                        <span
                          className="remove icon-close"
                          onClick={() => removeFromCompareItem(product.id)}
                        />
                      </div>
                      <Link
                        href={`/product-default/${product.id}`}
                        className="item_name link"
                      >
                        {product.title}
                      </Link>
                      <div className="item_price price-wrap">
                        <span className="price-new fw-medium">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="price-old text-caption">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        onClick={() => addProductToCart(product.id)}
                        className="item_btn tf-btn btn-fill animate-btn w-100"
                      >
                        {isAddedToCartProducts(product.id)
                          ? "ALREADY ADDED"
                          : "ADD TO CART"}
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="compare-row">
                <td className="compare-col compare-title">Availability</td>
                {items.map((product, i) => (
                  <td key={i} className="compare-col">
                    <div className="compare_stock">
                      <span className="icon">
                        <svg
                          width={15}
                          height={14}
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 14C11.366 14 14.5 10.866 14.5 7C14.5 3.13401 11.366 0 7.5 0C3.63401 0 0.5 3.13401 0.5 7C0.5 10.866 3.63401 14 7.5 14Z"
                            fill="#91C283"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.80046 8.96467L10.7341 4.0311C10.8794 3.8857 11.1181 3.88719 11.262 4.0311L11.7383 4.50743C11.8822 4.65135 11.8822 4.89149 11.7383 5.03535L6.80476 9.96897C6.66085 10.1129 6.42219 10.1144 6.27679 9.96897L5.80046 9.49264C5.65506 9.34724 5.65506 9.11007 5.80046 8.96467Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.26111 5.95764L7.26643 8.96296C7.41178 9.10836 7.41007 9.3473 7.26643 9.49093L6.7901 9.96726C6.64646 10.1108 6.40576 10.1108 6.26212 9.96726L3.25681 6.96195C3.11317 6.81831 3.11146 6.57937 3.25681 6.43397L3.73314 5.95764C3.87854 5.8123 4.11571 5.8123 4.26111 5.95764Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      In Stock
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="compare-row">
                <td className="compare-col compare-title">Vendor</td>
                {items.map((product, i) => (
                  <td key={i} className="compare-col compare-value">
                    <span>Vemus</span>
                  </td>
                ))}
              </tr>
              <tr className="compare-row">
                <td className="compare-col compare-title">Material</td>
                {items.map((product, i) => (
                  <td key={i} className="compare-col compare-value">
                    <span>Gold</span>
                  </td>
                ))}
              </tr>
              <tr className="compare-row">
                <td className="compare-col compare-title">Stone Color</td>
                {items.map((product, i) => (
                  <td key={i} className="compare-col compare-value">
                    <span>----</span>
                  </td>
                ))}
              </tr>
              <tr className="compare-row">
                <td className="compare-col compare-title">Size</td>
                {items.map((product, i) => (
                  <td key={i} className="compare-col compare-value">
                    <span>48</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
