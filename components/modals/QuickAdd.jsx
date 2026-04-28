"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ColorSelect from "../product-details/ColorSelect";
import SizePicker from "../product-details/SizeSelect";
import QuantitySelect from "../common/QuantitySelect";
import { useContextElement } from "@/context/Context";
import { allProducts } from "@/data/products";
import AddtoWishlist from "../common/AddtoWishlist";
import AddtoCompare from "../common/AddtoCompare";
export default function QuickAdd() {
  const [activeColor, setActiveColor] = useState("gold");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(allProducts[0]);
  const {
    addProductToCart,

    quickAddItem,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
  } = useContextElement();
  useEffect(() => {
    setProduct(allProducts.filter((elm) => elm.id == quickAddItem)[0]);
  }, [quickAddItem]);

  return (
    <div className="modal modalCentered fade modal-quick-add" id="quickAdd">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="tf-product-info-wrap mt-0">
            <div className="tf-product-info-inner tf-product-info-list mb-0">
              <div className="tf-product-mini-view">
                <Link
                  href={`/product-default/${product.id}`}
                  className="prd-image"
                >
                  <Image
                    alt="Image Product"
                    width={714}
                    height={900}
                    src={product.imgSrc}
                  />
                </Link>
                <div className="prd-content">
                  <Link
                    href={`/product-default/${product.id}`}
                    className="prd-name link h6 fw-normal text-uppercase"
                  >
                    {product.title}
                  </Link>
                  <div className="price-wrap">
                    <span className="price-new price-on-sale h5">
                      ${product.price.toFixed(2)}
                    </span>{" "}
                    {product.oldPrice && (
                      <span className="price-old compare-at-price">
                        ${product.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className="icon-close icon-close-popup"
                  data-bs-dismiss="modal"
                />
              </div>
              <div className="tf-product-info-variant">
                <div className="variant-picker-item variant-color">
                  <div className="variant-picker-label h6 fw-normal">
                    Material:{" "}
                    <span className="variant-picker-label-value value-currentColor">
                      {activeColor}
                    </span>
                  </div>
                  <div className="variant-picker-values">
                    <ColorSelect
                      activeColor={activeColor}
                      setActiveColor={setActiveColor}
                    />
                  </div>
                </div>
                <SizePicker />
                <div className="variant-picker-item">
                  <div className="variant-picker-label h6 fw-normal">
                    Quantity
                  </div>
                  <div className="variant-picker-values">
                    <QuantitySelect
                      quantity={
                        isAddedToCartProducts(product.id)
                          ? cartProducts.filter(
                              (elm) => elm.id == product.id
                            )[0].quantity
                          : quantity
                      }
                      setQuantity={(qty) => {
                        if (isAddedToCartProducts(product.id)) {
                          updateQuantity(product.id, qty);
                        } else {
                          setQuantity(qty);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="tf-product-total-quantity mb-0">
                <div className="group-btn">
                  <a
                    href="#shoppingCart"
                    onClick={() => addProductToCart(product.id, quantity)}
                    data-bs-toggle="offcanvas"
                    className="tf-btn btn-fill-2 text-uppercase fw-medium animate-btn"
                  >
                    {isAddedToCartProducts(product.id)
                      ? "already added"
                      : "add to bag"}
                    <i className="icon-minus d-none d-sm-block" />
                    <span className="price-add d-none d-sm-block">
                      {(product.price * quantity).toFixed(2)}
                    </span>
                  </a>
                  <div className="group-btn-action">
                    <AddtoWishlist
                      additionalClass="tf-btn-icon btn-add-wishlist"
                      product={product}
                      tooltipDirection="top"
                    />

                    <AddtoCompare
                      tooltipDirection="top"
                      product={product}
                      additionalClass="tf-btn-icon"
                    />
                  </div>
                </div>
                <Link
                  href={`/checkout`}
                  className="tf-btn w-100 text-uppercase fw-medium"
                >
                  buy it now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
