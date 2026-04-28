import { products15 } from "@/data/products";
import React from "react";

export default function DropdownFilter({ allProps }) {
  return (
    <div className="meta-dropdown-filter">
      <div className="dropdown dropdown-filter">
        <div
          className="dropdown-toggle"
          id="availability"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
          role="button"
        >
          <span className="text-uppercase">AVAILABILITY</span>
          <span className="icon icon-arrow-angle-down" />
        </div>
        <div className="dropdown-menu" aria-labelledby="availability">
          <ul className="filter-group-check">
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
      <div className="dropdown dropdown-filter">
        <div
          className="dropdown-toggle"
          id="categories"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
          role="button"
        >
          <span className="text-uppercase">CATEGORY</span>
          <span className="icon icon-arrow-angle-down" />
        </div>
        <div className="dropdown-menu" aria-labelledby="categories">
          <ul className="filter-group-check">
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
      <div className="dropdown dropdown-filter">
        <div
          className="dropdown-toggle"
          id="materials"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
          role="button"
        >
          <span className="text-uppercase">METAL COLOR</span>
          <span className="icon icon-arrow-angle-down" />
        </div>
        <div className="dropdown-menu" aria-labelledby="materials">
          <ul className="filter-group-check">
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
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
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
      <div className="dropdown dropdown-filter">
        <div
          className="dropdown-toggle"
          id="stone-color"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
          role="button"
        >
          <span className="text-uppercase">stone colour</span>
          <span className="icon icon-arrow-angle-down" />
        </div>
        <div className="dropdown-menu" aria-labelledby="stone-color">
          <ul className="filter-group-check">
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
                  <span>{color.charAt(0).toUpperCase() + color.slice(1)}</span>
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
      <div className="dropdown dropdown-filter">
        <div
          className="dropdown-toggle"
          id="price"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
          role="button"
        >
          <span className="text-uppercase">price</span>
          <span className="icon icon-arrow-angle-down" />
        </div>
        <div className="dropdown-menu" aria-labelledby="price">
          <ul className="filter-group-check">
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
      <div className="dropdown dropdown-filter">
        <div
          className="dropdown-toggle"
          id="size"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
          role="button"
        >
          <span className="text-uppercase">size</span>
          <span className="icon icon-arrow-angle-down" />
        </div>
        <div className="dropdown-menu" aria-labelledby="size">
          <div className="filter-size-box flat-check-list">
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
  );
}
