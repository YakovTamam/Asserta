"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import { allProducts } from "@/data/products";
export default function Compare() {
  const { removeFromCompareItem, compareItem, setCompareItem } =
    useContextElement();
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([
      ...allProducts.filter((product) => compareItem.includes(product.id)),
    ]);
  }, [compareItem]);

  return (
    <div className="modal modalCentered fade modal-compare" id="compare">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span className="icon-close-popup" data-bs-dismiss="modal">
            <i className="icon-close" />
          </span>
          <div className="modal-heading">
            <h3 className="title fw-normal text-uppercase">compare products</h3>
          </div>
          <div className="modal-body main-list-clear">
            <div className="tf-compare-inner">
              <div className="tf-compare-list list-empty">
                {!compareItem.length ? (
                  <p className="text-empty">Your compare is curently empty</p>
                ) : (
                  ""
                )}
                {items.map((product, i) => (
                  <div
                    key={i}
                    className="tf-compare-item card_product--V01 file-delete"
                  >
                    <div className="card_product-wrapper aspect-ratio-1">
                      <span
                        className="remove icon-close"
                        onClick={() => removeFromCompareItem(product.id)}
                      />
                      <Link
                        href={`/product-default/${product.id}`}
                        className="product-img"
                      >
                        <Image
                          src={product.imgSrc}
                          alt="Image Product"
                          className="lazyload img-product"
                          width={714}
                          height={900}
                        />
                        {product.hoverImgSrc && (
                          <Image
                            src={product.hoverImgSrc}
                            alt="Image Product"
                            className="lazyload img-hover"
                            width={714}
                            height={900}
                          />
                        )}
                      </Link>
                    </div>
                    <div className="card_product-info text-center">
                      <Link
                        href={`/product-default/${product.id}`}
                        className="name-product link text-line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      <div className="price-wrap justify-content-center">
                        <span className="price-new">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="price-old fw-normal text-caption">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="group-btn">
              <Link
                href={`/compare`}
                className="tf-btn btn-fill animate-btn fw-medium"
              >
                COMPARE{" "}
                <span className="count-item-compare">({items.length})</span>
              </Link>
              <button
                type="button"
                onClick={() => setCompareItem([])}
                className="tf-btn fw-medium clear-list-empty"
              >
                <span>CLEAR ALL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
