"use client";
import { products15 } from "@/data/products";
import React from "react";
import DiscountMarquee from "../common/DiscountMarquee";
import AddtoWishlist from "../common/AddtoWishlist";
import AddtoCart from "../common/AddtoCart";
import QuickView from "../common/QuickView";
import AddtoCompare from "../common/AddtoCompare";
import { initialState, reducer } from "@/reducer/filterReducer";
import { useEffect, useReducer, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import LayoutHandler from "./LayoutHandler";
import Link from "next/link";
import Pagination from "../common/Pagination";
export default function Products1({ defaultLayout = 4 }) {
  const [activeLayout, setActiveLayout] = useState(defaultLayout);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    price,
    availability,
    color,
    size,
    categories,
    materials,
    filtered,
    sortingOption,
    sorted,

    currentPage,
    itemPerPage,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),

    setColor: (value) => {
      const updated = [...color].includes(value)
        ? [...color].filter((elm) => elm != value)
        : [...color, value];
      dispatch({ type: "SET_COLOR", payload: updated });
    },
    setSize: (value) => {
      value == size
        ? dispatch({ type: "SET_SIZE", payload: "All" })
        : dispatch({ type: "SET_SIZE", payload: value });
    },
    setAvailability: (value) => {
      value == availability
        ? dispatch({ type: "SET_AVAILABILITY", payload: "All" })
        : dispatch({ type: "SET_AVAILABILITY", payload: value });
    },

    setCategories: (newCategory) => {
      const updated = [...categories].includes(newCategory)
        ? [...categories].filter((elm) => elm != newCategory)
        : [...categories, newCategory];
      dispatch({ type: "SET_CATEGORIES", payload: updated });
    },
    setMaterial: (newMaterial) => {
      const updated = [...materials].includes(newMaterial)
        ? [...materials].filter((elm) => elm != newMaterial)
        : [...materials, newMaterial];
      dispatch({ type: "SET_MATERIAL", payload: updated });
    },
    removeCategory: (newCategory) => {
      const updated = [...categories].filter(
        (category) => category != newCategory
      );

      dispatch({ type: "SET_CATEGORIES", payload: updated });
    },
    removeMaterial: (newMaterial) => {
      const updated = [...materials].filter(
        (material) => material != newMaterial
      );

      dispatch({ type: "SET_MATERIAL", payload: updated });
    },
    removeColor: (newColor) => {
      const updated = [...color].filter((elm) => elm != newColor);

      dispatch({ type: "SET_COLOR", payload: updated });
    },
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
    clearFilter: () => {
      dispatch({ type: "CLEAR_FILTER" });
    },
  };

  useEffect(() => {
    let filteredArrays = [];

    if (categories.length) {
      const filteredByCategories = [...products15].filter((elm) =>
        categories.includes(elm.category)
      );
      filteredArrays = [...filteredArrays, filteredByCategories];
    }
    if (materials.length) {
      const filteredByCategories = [...products15].filter((elm) =>
        materials.includes(elm.material)
      );
      filteredArrays = [...filteredArrays, filteredByCategories];
    }
    if (availability !== "All") {
      const filteredByavailability = [...products15].filter(
        (elm) => availability.toLowerCase() === elm.availability.toLowerCase()
      );
      filteredArrays = [...filteredArrays, filteredByavailability];
    }
    if (color.length) {
      const filteredByColor = [...products15].filter((elm) =>
        color.every((el) => elm.filterColors.includes(el))
      );
      filteredArrays = [...filteredArrays, filteredByColor];
    }
    if (size !== "All" && size !== "Free Size") {
      const filteredBysize = [...products15].filter((elm) => elm.size == size);
      filteredArrays = [...filteredArrays, filteredBysize];
    }

    if (price.includes("u-")) {
      const filteredByPrice = [...products15].filter(
        (elm) => elm.price >= Number(price.split("-")[1])
      );
      filteredArrays = [...filteredArrays, filteredByPrice];
    } else if (price.includes("up-")) {
      const filteredByPrice = [...products15].filter(
        (elm) => elm.price <= Number(price.split("-")[1])
      );
      filteredArrays = [...filteredArrays, filteredByPrice];
    }

    const commonItems = [...products15].filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    dispatch({ type: "SET_FILTERED", payload: commonItems });
  }, [price, availability, color, materials, size, categories]);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else if (sortingOption === "Title Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
      });
    } else if (sortingOption === "Title Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.title.localeCompare(a.title)),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);
  return (
    <>
      <div className="flat-spacing pt-0">
        <div className="container">
          <div className="tf-shop-control">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                className="tf-btn-filter h4 link"
              >
                <span className="icon icon-filter" />
                <span className="text">FILTER</span>
              </a>
              <div className="meta-filter-shop">
                <div id="applied-filters">
                  {allProps.availability !== "All" && (
                    <span
                      className="filter-tag remove-tag"
                      data-filter="availability"
                      onClick={() => allProps.setAvailability("All")}
                    >
                      {allProps.availability}{" "}
                      <span className="icon icon-close" />
                    </span>
                  )}
                  {allProps.categories.length > 0 &&
                    allProps.categories.map((category) => (
                      <span
                        key={category}
                        className="filter-tag remove-tag"
                        onClick={() => allProps.removeCategory(category)}
                      >
                        {category
                          ?.split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}{" "}
                        <span className="icon icon-close" />
                      </span>
                    ))}
                  {allProps.materials.length > 0 &&
                    allProps.materials.map((material) => (
                      <span
                        key={material}
                        className="filter-tag remove-tag"
                        data-filter="material"
                        data-value={material}
                        onClick={() => allProps.removeMaterial(material)}
                      >
                        {material
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}{" "}
                        <span className="icon icon-close" />
                      </span>
                    ))}
                  {allProps.color.length > 0 &&
                    allProps.color.map((color) => (
                      <span
                        key={color}
                        className="filter-tag remove-tag"
                        data-filter="color"
                        data-value={color}
                        onClick={() => allProps.removeColor(color)}
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}{" "}
                        <span className="icon icon-close" />
                      </span>
                    ))}
                  {allProps.price !== "All" && (
                    <span
                      className="filter-tag remove-tag"
                      data-filter="priceRadio"
                      onClick={() => allProps.setPrice("All")}
                    >
                      {allProps.price === "u-500"
                        ? "Under $500"
                        : allProps.price === "u-1000"
                        ? "Under $1000"
                        : allProps.price === "u-2000"
                        ? "Under $2000"
                        : allProps.price === "up-2000"
                        ? "Over $2000"
                        : null}{" "}
                      <span className="icon icon-close" />
                    </span>
                  )}
                  {allProps.size !== "All" && (
                    <span
                      className="filter-tag remove-tag"
                      onClick={() => allProps.setSize("All")}
                      data-filter="size"
                    >
                      {allProps.size}
                      <span className="icon icon-close" />
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="tf-group-layout">
              <ul className="tf-control-layout">
                <LayoutHandler
                  setActiveLayout={setActiveLayout}
                  activeLayout={activeLayout}
                />
              </ul>
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
                <div className="btn-select">
                  <span className="text-sort-value">{sortingOption}</span>
                  <span className="icon icon-arrow-angle-down" />
                </div>
                <div className="dropdown-menu">
                  {[
                    "Sort by (Default)",
                    "Title Ascending",
                    "Title Descending",
                    "Price Ascending",
                    "Price Descending",
                  ].map((option, i) => (
                    <div
                      onClick={() => allProps.setSortingOption(option)}
                      key={i}
                      className={`select-item ${
                        sortingOption === option ? "active" : ""
                      }`}
                    >
                      <span className="text-value-item">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper-control-shop gridLayout-wrapper">
            <div
              className={`wrapper-shop tf-grid-layout tf-col-${activeLayout}`}
              id="gridLayout"
            >
              {sorted?.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className={`loadItem card_product--V01 grid ${
                    product.outOfStock ? "out-of-stock" : ""
                  }`}
                  data-availability={product.availability}
                  data-category={product.category}
                  data-material={product.material}
                  data-size={product.size}
                >
                  <div className="card_product-wrapper">
                    <Link
                      href={`/${
                        product.outOfStock
                          ? "product-notify-avaiable"
                          : "product-default"
                      }/${product.id}`}
                      className="product-img"
                    >
                      <img
                        src={product.imgSrc}
                        alt={product.title}
                        className="lazyload img-product"
                        width={714}
                        height={900}
                      />
                      <img
                        src={product.hoverImgSrc}
                        alt={product.title}
                        className="lazyload img-hover"
                        width={714}
                        height={900}
                      />
                    </Link>

                    {!product.outOfStock && (
                      <ul className="list-product-btn">
                        <li className="wishlist">
                          <AddtoWishlist product={product} />
                        </li>
                        <li>
                          <AddtoCart product={product} />
                        </li>
                        <li>
                          <QuickView product={product} />
                        </li>
                        <li className="compare">
                          <AddtoCompare product={product} />
                        </li>
                      </ul>
                    )}

                    {product.badge && (
                      <div className="badge-box">
                        <span className={`badge-item ${product.badgeType}`}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {product.variantText && (
                      <div
                        className={`variant-box ${
                          product.variantType === "marquee" ? "bg-primary" : ""
                        }`}
                      >
                        {product.variantType === "notify" ? (
                          <a
                            href="#unavailable"
                            data-bs-toggle="modal"
                            className={`variant-box stock bg-main link ${product.textColor}`}
                          >
                            <p className="text-center d-none d-md-block">
                              {product.variantText}
                            </p>
                            <p className="text-center d-md-none">Notify Me</p>
                          </a>
                        ) : product.variantType === "text" ? (
                          <div className="size-box bg-light-gray text-center">
                            <p className="text-caption">
                              {product.variantText}
                            </p>
                          </div>
                        ) : product.variantType === "marquee" ? (
                          <DiscountMarquee parentClass="marquee-sale  infiniteSlide infiniteSlider" />
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div className="card_product-info">
                    <Link
                      href={`/${
                        product.outOfStock
                          ? "product-notify-avaiable"
                          : "product-default"
                      }/${product.id}`}
                      className="name-product h5 fw-normal link text-line-clamp-2"
                    >
                      {product.title}
                    </Link>
                    <div className="price-wrap">
                      <span className="price-new h5">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="price-old fw-normal">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Product 5 */}
              <div className="loadItem tempo box_image--V02 hover-img">
                <Link
                  href={`/shop-collection-list`}
                  className="box_image-image img-style"
                >
                  <img
                    src="images/collections/discover-1.jpg"
                    alt=""
                    className="lazyload"
                    width={714}
                    height={1080}
                  />
                </Link>
                <div className="box_image-content align-items-center text-center">
                  <Link
                    href={`/shop-collection-list`}
                    className="title h3 fw-normal font-2 text-white link-secondary"
                  >
                    <span className="fst-italic">Diamond</span> For All
                  </Link>
                  <Link
                    href={`/shop-collection-list`}
                    className="tf-btn style-3 btn-fill-white animate-btn animate-dark"
                  >
                    <span className="fw-medium text-uppercase">
                      discover
                      <span className="d-none d-sm-inline">now</span>
                    </span>
                  </Link>
                </div>
              </div>
              {sorted?.slice(4, 13).map((product) => (
                <div
                  key={product.id}
                  className={`loadItem card_product--V01 grid ${
                    product.outOfStock ? "out-of-stock" : ""
                  }`}
                  data-availability={product.availability}
                  data-category={product.category}
                  data-material={product.material}
                  data-size={product.size}
                >
                  <div className="card_product-wrapper">
                    <Link
                      href={`/${
                        product.outOfStock
                          ? "product-notify-avaiable"
                          : "product-default"
                      }/${product.id}`}
                      className="product-img"
                    >
                      <img
                        src={product.imgSrc}
                        alt={product.title}
                        className="lazyload img-product"
                        width={714}
                        height={900}
                      />
                      <img
                        src={product.hoverImgSrc}
                        alt={product.title}
                        className="lazyload img-hover"
                        width={714}
                        height={900}
                      />
                    </Link>

                    {!product.outOfStock && (
                      <ul className="list-product-btn">
                        <li className="wishlist">
                          <AddtoWishlist product={product} />
                        </li>
                        <li>
                          <AddtoCart product={product} />
                        </li>
                        <li>
                          <QuickView product={product} />
                        </li>
                        <li className="compare">
                          <AddtoCompare product={product} />
                        </li>
                      </ul>
                    )}

                    {product.badge && (
                      <div className="badge-box">
                        <span className={`badge-item ${product.badgeType}`}>
                          {product.badge}
                        </span>
                      </div>
                    )}

                    {product.variantText && (
                      <div
                        className={`variant-box ${
                          product.variantType === "marquee" ? "bg-primary" : ""
                        }`}
                      >
                        {product.variantType === "notify" ? (
                          <a
                            href="#unavailable"
                            data-bs-toggle="modal"
                            className={`variant-box stock bg-main link ${product.textColor}`}
                          >
                            <p className="text-center d-none d-md-block">
                              {product.variantText}
                            </p>
                            <p className="text-center d-md-none">Notify Me</p>
                          </a>
                        ) : product.variantType === "text" ? (
                          <div className="size-box bg-light-gray text-center">
                            <p className="text-caption">
                              {product.variantText}
                            </p>
                          </div>
                        ) : product.variantType === "marquee" ? (
                          <DiscountMarquee parentClass="marquee-sale  infiniteSlide infiniteSlider" />
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div className="card_product-info">
                    <Link
                      href={`/${
                        product.outOfStock
                          ? "product-notify-avaiable"
                          : "product-default"
                      }/${product.id}`}
                      className="name-product h5 fw-normal link text-line-clamp-2"
                    >
                      {product.title}
                    </Link>
                    <div className="price-wrap">
                      <span className="price-new h5">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="price-old fw-normal">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Product 15 16 */}
              <div className="loadItem tempo wd-2-cols box_image--V02 style-2 hover-img">
                <Link
                  href={`/shop-collection-list`}
                  className="box_image-image img-style"
                >
                  <img
                    src="images/collections/discover-2.jpg"
                    alt=""
                    className="lazyload"
                    width={1488}
                    height={1080}
                  />
                </Link>
                <div className="box_image-content type-left">
                  <div className="heading">
                    <p className="fw-medium text-white text-uppercase">
                      be love
                    </p>
                    <Link
                      href={`/shop-collection-list`}
                      className="title h2 fw-normal font-2 text-white link link-secondary"
                    >
                      Be <span className="fst-italic">Unmissable.</span>
                    </Link>
                  </div>
                  <Link
                    href={`/shop-collection-list`}
                    className="tf-btn style-3 btn-fill-white animate-btn animate-dark"
                  >
                    <span className="fw-medium text-uppercase">
                      discover more
                    </span>
                  </Link>
                </div>
              </div>
              {/* Pagination */}
              <div className="wd-full tempo">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <FilterSidebar allProps={allProps} />
    </>
  );
}
