import { collections3 } from "@/data/collections";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Collections() {
  return (
    <div className="flat-spacing-6">
      <div className="container-4">
        <div className="tf-grid-layout sm-col-2 md-col-3 column-gap-xl-64">
          {collections3.map((item, index) => (
            <div key={index} className="box_collection--V01 style_3 hover-img">
              <Link href={`/shop-default`} className="image img-style">
                <Image
                  src={item.image}
                  alt={item.label}
                  className="lazyload"
                  width={800}
                  height={800}
                />
              </Link>
              <Link href={`/shop-default`} className="name link">
                <span className="name-cls text-lg text-uppercase">
                  {item.label}
                </span>
                <span className="number-count">{item.count}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
