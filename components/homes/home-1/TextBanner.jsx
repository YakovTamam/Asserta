"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextBanner() {
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
      color: "#1F1F1F",
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
    <section className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="banner_text flex-sm-nowrap">
          <h3
            ref={textRef}
            className="text-color-change fw-normal text-sm-start mb-0"
          >
            We believe jewelry is more than an accessory—it’s a story of
            <br className="d-none d-xl-block" />
            individuality and style. Our curated collection blends timeless
            <br className="d-none d-xl-block" />
            craftsmanship with modern design, creating pieces that empower
            <br className="d-none d-xl-block" />
            you to express your unique elegance every day.
          </h3>
          <Link href={`/contact-us`} className="tf-btn style-4">
            our story
            <i className="icon-arrow-right-2 fs-24" />
          </Link>
        </div>
      </div>
    </section>
  );
}
