"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";
const detailImages = [
  {
    scroll: "gold",
    src: "/images/products/detail/prd-detail-1.jpg",
    width: 1000,
    height: 1000,
    pswpWidth: 744,
    pswpHeight: 744,
  },
  {
    scroll: "rose",
    src: "/images/products/detail/prd-detail-4.jpg",
    width: 1000,
    height: 1000,
    pswpWidth: 744,
    pswpHeight: 744,
  },
  {
    scroll: "titanium",
    src: "/images/products/detail/prd-detail-7.jpg",
    width: 1000,
    height: 1000,
    pswpWidth: 744,
    pswpHeight: 744,
  },
  {
    scroll: "titanium",
    src: "/images/products/detail/prd-detail-8.jpg",
    width: 1000,
    height: 1000,
    pswpWidth: 744,
    pswpHeight: 744,
  },
];

export default function Grid1({
  activeColor = "beige",
  setActiveColor = () => {},
  firstItem = detailImages[0].src,
}) {
  const finalItem = [...detailImages];
  finalItem[0].src = firstItem ?? finalItem[0].src;
  useEffect(() => {
    // Function to initialize Drift
    // Function to check window width
    const checkWindowSize = () => window.innerWidth >= 1200;

    // Only proceed if window is wide enough
    if (!checkWindowSize()) return;

    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");

      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };
    imageZoom();
    const zoomElements = document.querySelectorAll(".tf-image-zoom");

    const handleMouseOver = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.add("zoom-active");
      }
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.remove("zoom-active");
      }
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Empty dependency array to run only once on mount
  const lightboxRef = useRef(null);
  useEffect(() => {
    // Initialize PhotoSwipeLightbox
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    // Store the lightbox instance in the ref for later use
    lightboxRef.current = lightbox;

    // Cleanup: destroy the lightbox when the component unmounts
    return () => {
      lightbox.destroy();
    };
  }, []);

  const observerRef = useRef(null);

  const scrollToTarget = () => {
    // Find the element with the specific data-value attribute
    const heightScroll = window.scrollY;
    const targetElement = document.querySelector(
      `[data-scroll='${activeColor}']`
    );

    // Check if the element exists
    if (targetElement) {
      // Get the element's bounding rectangle
      setTimeout(() => {
        if (window.scrollY == heightScroll) {
          targetElement?.scrollIntoView({
            behavior: "smooth", // Smooth scrolling animation
            block: "center", // Center the element in the viewport
          });
        }
      }, 200);

      // Scroll only if the element is not already in view
    }
  };

  useEffect(() => {
    scrollToTarget();
  }, [activeColor]);

  useEffect(() => {
    setTimeout(() => {
      const options = {
        rootMargin: "-50% 0px",
      };

      // Create the observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const scrollValue = entry.target.getAttribute("data-scroll");
            setActiveColor(scrollValue);
          }
        });
      }, options);

      // Observe all items
      const elements = document.querySelectorAll(".item-scroll-target");
      elements.forEach((el) => observer.observe(el));
      observerRef.current = observer;
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  return (
    <div
      className="wrapper-gallery-scroll flat-single-grid flat-single-stacked"
      id="gallery-started"
    >
      {finalItem.map((item, index) => (
        <a
          key={index}
          href={item.src}
          data-scroll={item.scroll}
          target="_blank"
          className="item item-scroll-target"
          data-pswp-width={`${item.pswpWidth}px`}
          data-pswp-height={`${item.pswpHeight}px`}
        >
          <Image
            className="tf-image-zoom lazyload"
            data-zoom={item.src}
            data-src={item.src}
            alt="img-product"
            src={item.src}
            width={item.width}
            height={item.height}
          />
        </a>
      ))}
    </div>
  );
}
