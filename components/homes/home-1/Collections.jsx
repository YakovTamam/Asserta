import { collections } from "@/data/collections";
import React from "react";
import Image from "next/image";
export default function Collections() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <h2 className="s-title font-2 text-center text-capitalize wow fadeInUp">
          <span className="fst-italic">Featured</span> Collections
        </h2>
        <div className="cls-accordion wow fadeInUp" id="accordionCls">
          {collections.map(({ id, title, image, items, content, isOpen }) => (
            <div className="widget-accordion" key={id}>
              <div
                className={`accordion-title ${!isOpen ? "collapsed" : ""}`}
                data-bs-target={`#${id}`}
                data-bs-toggle="collapse"
                aria-expanded={isOpen ? "true" : "false"}
                aria-controls={id}
                role="button"
              >
                <span className="icon icon-arrow-right-down" />
                <span>{title}</span>
              </div>
              <div
                id={id}
                className={`collapse ${isOpen ? "show" : ""}`}
                data-bs-parent="#accordionCls"
              >
                <div className="accordion-body">
                  <div className="image">
                    <Image
                      src={image}
                      alt=""
                      className="lazyload"
                      width={883}
                      height={508}
                    />
                  </div>
                  <div className="cls-info">
                    <h6 className="count-item">{items}</h6>
                    <p className="text-main-4">{content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
