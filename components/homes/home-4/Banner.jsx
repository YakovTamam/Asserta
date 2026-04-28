"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Banner() {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const wordSplit = new SplitText(element, {
      type: "words",
      wordsClass: "word-wrapper",
    });

    const charSplit = new SplitText(wordSplit.words, {
      type: "chars",
      charsClass: "char-wrapper",
    });

    gsap.set(charSplit.chars, {
      color: "#A9A9A9",
      opacity: 1,
    });

    const animation = gsap.to(charSplit.chars, {
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 35%",
        toggleActions: "play none none reverse",
        scrub: true,
      },
      color: "#ffffff",
      stagger: {
        each: 0.05,
        from: "start",
      },
      duration: 0.5,
      ease: "power2.out",
    });

    return () => {
      animation.kill();
      wordSplit.revert();
      charSplit.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="banner_V04">
      <div className="bn-content">
        <h3 ref={textRef} className="title text-color-change-2 fw-normal">
          We believe jewelry is more than an accessory—it’s a story of
          individuality and style. Our curated collection blends timeless
          craftsmanship with modern design, creating pieces that empower you to
          express your unique elegance every day.
        </h3>
        <Link
          href={`/our-store`}
          className="tf-btn-line style-white text-uppercase lh-32 gap-10"
        >
          <span className="fs-16"> ours story </span>
          <i className="icon icon-arrow-top-right-2 fs-12" />
        </Link>
      </div>
    </div>
  );
}
