"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const DEFAULT = {
  fontSize: 100,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
};

function savePrefs(partial) {
  const current = JSON.parse(localStorage.getItem("a11y") || "{}");
  localStorage.setItem("a11y", JSON.stringify({ ...current, ...partial }));
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT);
  const t = useTranslations("accessibility");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("a11y") || "{}");
    const merged = { ...DEFAULT, ...saved };
    setPrefs(merged);
    applyAll(merged);
  }, []);

  function applyAll(p) {
    document.documentElement.style.fontSize =
      p.fontSize !== 100 ? `${p.fontSize}%` : "";
    document.documentElement.classList.toggle(
      "a11y-high-contrast",
      !!p.highContrast,
    );
    document.documentElement.classList.toggle("a11y-grayscale", !!p.grayscale);
    document.documentElement.classList.toggle(
      "a11y-highlight-links",
      !!p.highlightLinks,
    );
  }

  function update(key, value) {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    applyAll(next);
    savePrefs({ [key]: value });
  }

  function reset() {
    setPrefs(DEFAULT);
    applyAll(DEFAULT);
    localStorage.removeItem("a11y");
  }

  const btnStyle = {
    padding: "5px 12px",
    border: "1px solid #ddd",
    borderRadius: 6,
    background: "#f5f5f5",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("button")}
        title={t("button")}
        style={{
          position: "fixed",
          bottom: 20,
          left: 16,
          zIndex: 9997,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "#111",
          color: "#fff",
          border: "2px solid #fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
        }}
      >
        <Image
          src="/icon/accessibility.svg"
          alt={t("button")}
          width={24}
          height={24}
          style={{ filter: "invert(1)" }}
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 126,
            insetInlineStart: 16,
            zIndex: 9997,
            background: "#fff",
            border: "1px solid #e5e5e5",
            borderRadius: 14,
            padding: "18px 20px",
            width: 250,
            boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: 12,
            }}
          >
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
              {t("title")}
            </h3>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                color: "#999",
                padding: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Font size */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
              {t("fontSize")}
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={() =>
                  update("fontSize", Math.max(80, prefs.fontSize - 10))
                }
                style={btnStyle}
              >
                A−
              </button>
              <span
                style={{
                  fontSize: 12,
                  flex: 1,
                  textAlign: "center",
                  color: "#555",
                }}
              >
                {prefs.fontSize}%
              </span>
              <button
                onClick={() =>
                  update("fontSize", Math.min(150, prefs.fontSize + 10))
                }
                style={btnStyle}
              >
                A+
              </button>
            </div>
          </div>

          <ToggleRow
            label={t("highContrast")}
            active={prefs.highContrast}
            onToggle={() => update("highContrast", !prefs.highContrast)}
          />
          <ToggleRow
            label={t("grayscale")}
            active={prefs.grayscale}
            onToggle={() => update("grayscale", !prefs.grayscale)}
          />
          <ToggleRow
            label={t("highlightLinks")}
            active={prefs.highlightLinks}
            onToggle={() => update("highlightLinks", !prefs.highlightLinks)}
          />

          <button
            onClick={reset}
            style={{
              ...btnStyle,
              width: "100%",
              marginTop: 14,
              background: "#f8f8f8",
              color: "#555",
              border: "1px solid #e5e5e5",
            }}
          >
            {t("reset")}
          </button>
        </div>
      )}
    </>
  );
}

function ToggleRow({ label, active, onToggle }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <span style={{ fontSize: 13, color: "#333" }}>{label}</span>
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={active}
        style={{
          width: 42,
          height: 24,
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
          background: active ? "#111" : "#ddd",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 4,
            insetInlineStart: active ? 20 : 4,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "inset-inline-start 0.2s",
            display: "block",
          }}
        />
      </button>
    </div>
  );
}
