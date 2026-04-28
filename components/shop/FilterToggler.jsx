"use client";

import { useEffect } from "react";

const FilterToggle = () => {
  useEffect(() => {
    const handleOpenClick = () => {
      if (window.innerWidth <= 1200) {
        document
          .querySelectorAll(".sidebar-filter, .overlay-filter")
          .forEach((el) => {
            el.classList.add("show");
          });
      }
    };

    const handleCloseClick = () => {
      document
        .querySelectorAll(".sidebar-filter, .overlay-filter")
        .forEach((el) => {
          el.classList.remove("show");
        });
    };

    const openButtons = document.querySelectorAll(
      ".tf-btn-filter, .sidebar-btn"
    );
    const closeButtons = document.querySelectorAll(
      ".close-filter, .overlay-filter"
    );

    openButtons.forEach((btn) =>
      btn.addEventListener("click", handleOpenClick)
    );
    closeButtons.forEach((btn) =>
      btn.addEventListener("click", handleCloseClick)
    );

    // Cleanup on unmount
    return () => {
      openButtons.forEach((btn) =>
        btn.removeEventListener("click", handleOpenClick)
      );
      closeButtons.forEach((btn) =>
        btn.removeEventListener("click", handleCloseClick)
      );
      handleCloseClick();
    };
  }, []);

  return (
    <>
      <button className="tf-btn-filter h5 link">
        <span className="icon icon-filter d-xl-none" />
        <span className="text">FILTER</span>
      </button>
      <div className="overlay-filter" id="overlay-filter" />
    </>
  ); // this component is only for attaching logic
};

export default FilterToggle;
