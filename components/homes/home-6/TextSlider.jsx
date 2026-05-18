"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ITEM_STYLE = { flex: "0 0 auto", display: "block" };
const CLONES = 9;

export default function TextSlider() {
  const t = useTranslations("textSlider");
  const item1 = t("item1");
  const item2 = t("item2");

  return (
    <div className="flat-spacing-9">
      <div className="infiniteslide_wrap" style={{ overflow: "hidden" }}>
        <div className="tf_marquee-V01 style_2 infiniteSlide infiniteSlider">
          {Array.from({ length: CLONES }).map((_, i) => (
            <React.Fragment key={i}>
              <p
                className={`text-main-9${i > 0 ? " infiniteslide_clone" : ""}`}
                style={ITEM_STYLE}
              >
                {item1}
              </p>
              <Image
                alt="Icon"
                className={`img-ic${i > 0 ? " infiniteslide_clone" : ""}`}
                src="/icon/diamond-2.svg"
                width={72}
                height={72}
                style={ITEM_STYLE}
              />
              <p
                className={`text-clip type-2${i > 0 ? " infiniteslide_clone" : ""}`}
                style={ITEM_STYLE}
              >
                {item2}
              </p>
              <Image
                alt="Icon"
                className={`img-ic${i > 0 ? " infiniteslide_clone" : ""}`}
                src="/icon/diamond-3.svg"
                width={72}
                height={72}
                style={ITEM_STYLE}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
