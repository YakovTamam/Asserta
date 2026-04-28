import { products15 } from "@/data/products";
import React from "react";

export default function Sidebar({ allProps }) {
  return (
    <div className="canvas-wrapper">
      <div className="canvas-header d-flex d-xl-none">
        <span className="title">FILTER</span>
        <span
          className="icon-close link icon-close-popup"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="canvas-body">
        <div className="apply-filter-wrap">
          <div className="meta-filter-shop">
            <div id="applied-filters">
              {allProps.availability !== "All" && (
                <span
                  className="filter-tag remove-tag"
                  data-filter="availability"
                  onClick={() => allProps.setAvailability("All")}
                >
                  {allProps.availability} <span className="icon icon-close" />
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
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
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
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
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
        <div className="widget-facet">
          <div
            className="facet-title h6 fw-normal"
            data-bs-target="#availability"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="availability"
          >
            <span className="h6 fw-normal text-uppercase">availability</span>
            <span className="icon ic-accordion-custom" />
          </div>
          <div id="availability" className="collapse show">
            <ul className="collapse-body filter-group-check current-scrollbar">
              {["In Stock", "Out of Stock"].map((option) => (
                <li
                  className="list-item"
                  key={option}
                  onClick={() => allProps.setAvailability(option)}
                >
                  <input
                    type="radio"
                    className="tf-check style-2"
                    checked={allProps.availability === option}
                    readOnly
                  />
                  <label>
                    <span>{option}</span>
                    <span className="count-wrap">
                      [{" "}
                      <span className="count">
                        {
                          products15.filter(
                            (el) =>
                              el.availability.toLowerCase() ==
                              option.toLowerCase()
                          ).length
                        }
                      </span>{" "}
                      ]
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="widget-facet">
          <div
            className="facet-title h6 fw-normal"
            data-bs-target="#categories"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="categories"
          >
            <span className="h6 fw-normal text-uppercase">category</span>
            <span className="icon ic-accordion-custom" />
          </div>
          <div id="categories" className="collapse show">
            <ul className="collapse-body filter-group-check current-scrollbar">
              {[
                "bracelet",
                "earring",
                "ring",
                "necklace",
                "new-in",
                "gift-idea",
              ].map((category) => (
                <li
                  className="list-item"
                  key={category}
                  onClick={() => allProps.setCategories(category)}
                >
                  <input
                    type="checkbox"
                    className="tf-check style-2"
                    checked={allProps.categories.includes(category)}
                    readOnly
                  />
                  <label className="label">
                    <span>
                      {category
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                    <span className="count-wrap">
                      [{" "}
                      <span className="count">
                        {
                          products15.filter((el) => el.category == category)
                            .length
                        }
                      </span>{" "}
                      ]
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="widget-facet">
          <div
            className="facet-title h6 fw-normal"
            data-bs-target="#materials"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="materials"
          >
            <span className="h6 fw-normal text-uppercase">Material</span>
            <span className="icon ic-accordion-custom" />
          </div>
          <div id="materials" className="collapse show">
            <ul className="collapse-body filter-group-check current-scrollbar">
              {["gold", "sterling-silver", "white-gold", "pink-gold"].map(
                (material) => (
                  <li
                    className="list-item"
                    key={material}
                    onClick={() => allProps.setMaterial(material)}
                  >
                    <input
                      type="checkbox"
                      className="tf-check style-2"
                      checked={allProps.materials.includes(material)}
                      readOnly
                    />
                    <label className="label">
                      <span>
                        {material
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </span>
                      <span className="count-wrap">
                        [{" "}
                        <span className="count">
                          {
                            products15.filter((el) => el.material == material)
                              .length
                          }
                        </span>{" "}
                        ]
                      </span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="widget-facet">
          <div
            className="facet-title h6 fw-normal"
            data-bs-target="#stone-color"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="stone-color"
          >
            <span className="h6 fw-normal text-uppercase">stone colour</span>
            <span className="icon ic-accordion-custom" />
          </div>
          <div id="stone-color" className="collapse show">
            <ul className="collapse-body filter-group-check current-scrollbar">
              {["blue", "pink", "white"].map((color) => (
                <li
                  className="list-item"
                  key={color}
                  onClick={() => allProps.setColor(color)}
                >
                  <input
                    type="checkbox"
                    className="tf-check style-2"
                    checked={allProps.color.includes(color)}
                    readOnly
                  />
                  <label className="label">
                    <img
                      alt="Colour"
                      className="img-check"
                      src={`images/products/material/dia-${color}.jpg`}
                      width={150}
                      height={150}
                    />
                    <span>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </span>
                    <span className="count-wrap">
                      [{" "}
                      <span className="count">
                        {
                          products15.filter((el) =>
                            el.filterColors.includes(color)
                          ).length
                        }
                      </span>{" "}
                      ]
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="widget-facet">
          <div
            className="facet-title h6 fw-normal"
            data-bs-target="#price"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="price"
          >
            <span className="h6 fw-normal text-uppercase">price</span>
            <span className="icon ic-accordion-custom" />
          </div>
          <div id="price" className="collapse show">
            <ul className="collapse-body filter-group-check current-scrollbar">
              {[
                { id: "u-500", label: "Under $500" },
                { id: "u-1000", label: "Under $1000" },
                { id: "u-2000", label: "Under $2000" },
                { id: "up-2000", label: "Over $2000" },
              ].map((option) => (
                <li
                  className="list-item"
                  key={option.id}
                  onClick={() => allProps.setPrice(option.id)}
                >
                  <input
                    type="radio"
                    checked={allProps.price === option.id}
                    className="tf-check style-2"
                    readOnly
                  />
                  <label className="label">
                    <span>{option.label}</span>
                    <span className="count-wrap">
                      [{" "}
                      <span className="count">
                        {option.id.includes("up")
                          ? [...products15].filter(
                              (elm) =>
                                elm.price >= Number(option.id.split("-")[1])
                            ).length
                          : [...products15].filter(
                              (elm) =>
                                elm.price <= Number(option.id.split("-")[1])
                            ).length}
                      </span>{" "}
                      ]
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="widget-facet">
          <div
            className="facet-title h6 fw-normal"
            data-bs-target="#size"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="size"
          >
            <span className="h6 fw-normal text-uppercase">size</span>
            <span className="icon ic-accordion-custom" />
          </div>
          <div id="size" className="collapse show">
            <div className="collapse-body filter-size-box flat-check-list">
              {[
                { value: 5, disabled: false },
                { value: 6, disabled: false },
                { value: 7, disabled: false },
                { value: 8, disabled: false },
                { value: 9, disabled: false },
                { value: 10, disabled: true },
              ].map((sizeObj) => (
                <div
                  key={sizeObj.value}
                  onClick={() => allProps.setSize(sizeObj.value)}
                  className={`check-item size-item size-check${
                    sizeObj.disabled ? " disabled" : ""
                  } ${allProps.size === sizeObj.value ? " active" : ""}`}
                >
                  <span className="count size">{sizeObj.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="canvas-bottom d-xl-none">
        <button
          id="reset-filter"
          className="tf-btn btn-reset"
          onClick={allProps.clearFilter}
        >
          <span className="fw-medium">CLEAR ALL</span>
        </button>
        <button
          type="button"
          className="tf-btn btn-fill animate-btn"
          data-bs-dismiss="offcanvas"
        >
          <span className="fw-medium">APPLY [100]</span>
        </button>
      </div>
    </div>
  );
}
