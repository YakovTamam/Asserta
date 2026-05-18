"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";

import Drift from "drift-zoom";
import Image from "next/image";
const slides = [
  {
    id: 1,
    color: "gold",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-1.jpg",
  },
  {
    id: 2,
    color: "gold",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-2.jpg",
  },
  {
    id: 3,
    color: "gold",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-3.jpg",
  },
  {
    id: 4,
    color: "rose",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-4.jpg",
  },
  {
    id: 5,
    color: "rose",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-5.jpg",
  },
  {
    id: 6,
    color: "rose",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-6.jpg",
  },
  {
    id: 7,
    color: "titanium",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-7.jpg",
  },
  {
    id: 8,
    color: "titanium",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-8.jpg",
  },
  {
    id: 9,
    color: "titanium",
    size: 48,
    imgSrc: "/images/products/detail/prd-detail-9.jpg",
  },
];

export default function Slider4({
  activeColor = "Black",
  setActiveColor = () => {},
  firstItem,
  slideItems = slides,
}) {
  const items = [...slideItems];
  items[0].imgSrc = firstItem ?? items[0].imgSrc;

  const [thumbSwiper, setThumbSwiper] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  useEffect(() => {
    // Function to initialize Drift
    // Function to check window width
    const checkWindowSize = () => window.innerWidth >= 1200;

    // Only proceed if window is wide enough
    if (!checkWindowSize()) return;

    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom-inner");
      const pane = document.querySelector(".tf-product-zoom-inner");

      driftAll.forEach((el) => {
        new Drift(el, {
          paneContainer: pane,
          zoomFactor: 2,
          inlinePane: false,
          containInline: false,
        });
      });
    };

    // Call the function
    imageZoom();

    // Optionally, clean up if necessary
    return () => {
      // Clean up logic if required
    };
  }, []); // Empty dependency array to run only once on mount
  const lightboxRef = useRef(null);
  useEffect(() => {
    // Initialize PhotoSwipeLightbox
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
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
  useEffect(() => {
    if (!(items[activeIndex].color == activeColor)) {
      const slideIndex =
        items.filter((elm) => elm.color == activeColor)[0]?.id - 1;
      swiperRef.current.slideTo(slideIndex);
    }
  }, [activeColor]);
  useEffect(() => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(1);
        swiperRef.current.slideTo(
          items.filter((elm) => elm.color == activeColor)[0]?.id - 1
        );
      }
    });
  }, []);

  return (
    <>
      {" "}
      <div className="flat-wrap-media-product">
        <Swiper
          dir="ltr"
          className="swiper tf-product-media-main tf-product-zoom-inner"
          id="gallery-swiper-started"
          thumbs={{ swiper: thumbSwiper }}
          modules={[Thumbs]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            if (items[swiper.activeIndex]) {
              setActiveIndex(swiper.activeIndex);
              setActiveColor(items[swiper.activeIndex]?.color);
            }
          }}
        >
          {items.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="swiper-slide"
              data-color={slide.color}
              data-size={slide.size}
            >
              <a
                href={slide.imgSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="item"
                data-pswp-width="593px"
                data-pswp-height="744px"
              >
                <Image
                  className="tf-image-zoom tf-image-zoom-inner lazyload"
                  data-zoom={slide.imgSrc}
                  data-src={slide.imgSrc}
                  alt="img-product"
                  src={slide.imgSrc}
                  width={1000}
                  height={1000}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-thumbs"
        onSwiper={setThumbSwiper}
        modules={[Thumbs]}
        spaceBetween={8}
        slidesPerView={4}
      >
        {items.map(({ color, size, imgSrc }, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide stagger-item"
            data-color={color}
            data-size={size}
          >
            <div className="item">
              <Image
                className="lazyload"
                data-src={imgSrc}
                alt="img-product"
                src={imgSrc}
                width={828}
                height={1241}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
