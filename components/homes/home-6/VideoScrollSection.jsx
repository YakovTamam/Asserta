"use client";
import { useEffect, useRef } from "react";

export default function VideoScrollSection({ src = null, overlayText = null }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    function clamp(val, min, max) {
      return Math.min(Math.max(val, min), max);
    }

    function handleScroll() {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const progress = clamp(
        (scrollY - sectionTop) / (sectionHeight - windowHeight),
        0,
        1
      );

      if (video.duration && isFinite(video.duration)) {
        video.currentTime = progress * video.duration;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [src]);

  const sectionStyle = {
    position: "relative",
    height: "300vh",
  };

  const stickyStyle = {
    position: "sticky",
    top: 0,
    height: "100vh",
    overflow: "hidden",
  };

  const placeholderStyle = {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg,#0a0a0a,#1a1a2e,#16213e)",
  };

  const videoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  };

  const textStyle = {
    color: "#ffffff",
    fontSize: "clamp(28px, 5vw, 64px)",
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
    padding: "0 24px",
    direction: "rtl",
    textShadow: "0 2px 20px rgba(0,0,0,0.6)",
  };

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={stickyStyle}>
        {src ? (
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="auto"
            style={videoStyle}
          />
        ) : (
          <div style={placeholderStyle} />
        )}

        {overlayText && (
          <div style={overlayStyle}>
            <p style={textStyle}>{overlayText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
