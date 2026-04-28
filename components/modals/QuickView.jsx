"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from "@/context/Context";
import { Navigation } from "swiper/modules";
import ColorSelect from "../product-details/ColorSelect";
import SizePicker from "../product-details/SizeSelect";
import QuantitySelect from "../common/QuantitySelect";
const imageData = [
  { color: "gold", src: "/images/products/detail/prd-detail-1.jpg" },
  { color: "rose", src: "/images/products/detail/prd-detail-4.jpg" },
  { color: "titanium", src: "/images/products/detail/prd-detail-7.jpg" },
];
export default function QuickView() {
  const [slides, setSlides] = useState([...imageData]);
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1
  const [activeColor, setActiveColor] = useState("gold");

  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    addToCompareItem,
    isAddedtoCompareItem,
    addToWishlist,
    isAddedtoWishlist,
    cartProducts,
  } = useContextElement();
  useEffect(() => {
    setSlides((pre) => {
      const prevSlides = [...pre];
      if (quickViewItem.imgSrc) {
        prevSlides[0].src = quickViewItem.imgSrc;
      }
      return prevSlides;
    });
  }, [quickViewItem]);

  return (
    <div className="modal modalCentered fade modal-quick-view" id="quickView">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="modal"
          />
          <div className="tf-product-media-wrap tf-btn-swiper-item">
            <Swiper
              dir="ltr"
              modules={[Navigation]}
              navigation={{
                prevEl: ".snbqvp1",
                nextEl: ".snbqvn1",
              }}
              className="swiper tf-single-slide"
            >
              {imageData.map((item, index) => (
                <SwiperSlide
                  className="swiper-slide"
                  data-color={item.color}
                  key={index}
                >
                  <div className="item">
                    <Image
                      className="lazyload"
                      data-src={item.src}
                      alt=""
                      width={1000}
                      height={1000}
                      src={item.src}
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div className="nav-swiper-group style-2">
                <div className="nav-thumbs thumbs-prev single-slide-prev snbqvp1">
                  <span className="fw-normal">PRE</span>
                </div>
                <span className="text-main">/</span>
                <div className="nav-thumbs thumbs-next single-slide-next snbqvn1">
                  <span className="fw-normal">NEXT</span>
                </div>
              </div>
            </Swiper>
          </div>
          <div className="tf-product-info-wrap">
            <div className="tf-product-info-inner tf-product-info-list">
              <div className="tf-product-info-heading">
                <Link
                  href={`/product-default/${quickViewItem.id}`}
                  className="product-info-name h4 fw-normal text-uppercase link"
                >
                  {quickViewItem.title}
                </Link>
                <div className="product-info-price">
                  <div className="price-wrap">
                    <span className="price-new price-on-sale h4">
                      ${quickViewItem.price.toFixed(2)}
                    </span>
                    {quickViewItem.oldPrice && (
                      <span className="price-old compare-at-price fw-normal h6">
                        ${quickViewItem.oldPrice.toFixed(2)}
                      </span>
                    )}
                    <p className="badges-on-sale">
                      <i className="icon-tag" />
                      <span className="number-sale" data-person-sale={30}>
                        30% OFF
                      </span>
                    </p>
                  </div>
                </div>
                <p className="product-infor-sub text-main-4">
                  Lorem ipsum dolor sit amet nec etiamconsectetur. Egestas
                  cursus a maecenas massa facilisi adipiscing dolor iaculis. In
                  mattis nec morbi.
                </p>
              </div>
              <div className="tf-product-info-variant">
                <div className="variant-picker-item variant-color">
                  <div className="variant-picker-label h6 fw-normal">
                    Material:
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
                        isAddedToCartProducts(quickViewItem.id)
                          ? cartProducts.filter(
                              (elm) => elm.id == quickViewItem.id
                            )[0].quantity
                          : quantity
                      }
                      setQuantity={(qty) => {
                        if (isAddedToCartProducts(quickViewItem.id)) {
                          updateQuantity(quickViewItem.id, qty);
                        } else {
                          setQuantity(qty);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="tf-product-total-quantity">
                <div className="group-btn">
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="offcanvas"
                    onClick={() => {
                      if (quickViewItem.id) {
                        addProductToCart(quickViewItem.id);
                      }
                    }}
                    className="tf-btn btn-fill-2 text-uppercase fw-medium animate-btn"
                  >
                    {isAddedToCartProducts(quickViewItem.id)
                      ? "added"
                      : "add to bag"}

                    <i className="icon-minus d-none d-sm-block" />
                    <span className="price-add d-none d-sm-block">
                      ${(quickViewItem.price * quantity).toFixed(2)}
                    </span>
                  </a>
                  <div className="group-btn-action">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (quickViewItem.id) {
                          addToWishlist(quickViewItem.id);
                        }
                      }}
                      className="tf-btn-icon hover-tooltip btn-add-wishlist"
                    >
                      <span
                        className={`icon ${
                          isAddedtoWishlist(quickViewItem.id)
                            ? "icon-trash"
                            : "icon-heart-2"
                        } `}
                      />
                      <span className="tooltip">
                        {isAddedtoWishlist(quickViewItem.id)
                          ? "Remove Wishlist"
                          : "Add to Wishlist"}
                      </span>
                    </a>
                    <a
                      className="tf-btn-icon hover-tooltip"
                      onClick={() => {
                        if (quickViewItem.id) {
                          addToCompareItem(quickViewItem.id);
                        }
                      }}
                    >
                      <span className="icon icon-compare" />
                      <span className="tooltip">
                        {" "}
                        {isAddedtoCompareItem(quickViewItem.id)
                          ? "Compared"
                          : "Compare"}
                      </span>
                    </a>
                  </div>
                </div>
                <Link
                  href={`/checkout`}
                  className="tf-btn w-100 text-uppercase fw-medium"
                >
                  buy it now
                </Link>
              </div>
              <Link
                href={`/product-default/${quickViewItem.id}`}
                className="tf-btn-line"
              >
                <span className="text-body">View full details</span>
                <i className="icon icon-arrow-top-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
