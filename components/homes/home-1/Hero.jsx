"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
export default function Hero() {
  useEffect(() => {
    const repelElements = document.querySelectorAll(".hover-repel");

    if (
      typeof window === "undefined" ||
      typeof gsap === "undefined" ||
      repelElements.length === 0
    )
      return;

    const handleMouseMove = (e) => {
      repelElements.forEach((el) => {
        const rect = el.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2 + window.scrollX;
        const centerY = rect.top + rect.height / 2 + window.scrollY;

        const deltaX = centerX - e.pageX;
        const deltaY = centerY - e.pageY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const radius = 300;
        const maxPush = 50;

        if (distance < radius) {
          const force = (1 - distance / radius) * maxPush;
          const angle = Math.atan2(deltaY, deltaX);
          const moveX = Math.cos(angle) * force;
          const moveY = Math.sin(angle) * force;

          gsap.to(el, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Clean up on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="hero-banner ctn-hover">
      <div className="container">
        <div className="hero-main">
          <div className="img_item item-1 hover-repel">
            <Image
              src="/images/section/img-item-1.jpg"
              alt="Treding"
              className="lazyload wow fadeInLeft"
              width={712}
              height={808}
            />
          </div>
          <div className="img_item item-2 hover-repel d-none d-lg-block">
            <Image
              src="/images/section/img-item-2.jpg"
              alt="Treding"
              className="lazyload wow fadeInLeftBottom"
              width={584}
              height={416}
            />
          </div>
          <div className="img_item item-3 hover-repel d-none d-lg-block">
            <Image
              src="/images/section/img-item-3.jpg"
              alt="Treding"
              className="lazyload wow fadeInRightBottom"
              width={416}
              height={416}
            />
          </div>
          <div className="img_item item-4 hover-repel">
            <Image
              src="/images/section/img-item-4.jpg"
              alt="Treding"
              className="lazyload wow fadeInRight"
              width={512}
              height={768}
            />
          </div>
          <div className="hero-content">
            <h6 className="tag">TRENDING</h6>
            <p className="title text-hero font-2">
              UNVEIL YOUR <span className="fst-italic">Signature</span> LOOK
            </p>
            <p className="sub">
              Explore our stunning collection of handcrafted jewelry that blends
              timeless elegance with modern style.
              <br className="d-none d-md-block" />
              Each piece is designed to empower your individuality—make your
              statement today!
            </p>
            <div className="btn-group">
              <Link
                href={`/shop-default`}
                className="tf-btn text-uppercase type-large"
              >
                Shop Now
                <i className="icon-arrow-right-3 fs-24" />
              </Link>
              <Link
                href={`/shop-collection-list`}
                className="link text-uppercase"
              >
                explore more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
