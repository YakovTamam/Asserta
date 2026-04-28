"use client";
import { blogItems } from "@/data/blogs";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function Blogs() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="sect-top center text-center wow fadeInUp">
          <h2 className="s-title font-2 text-capitalize">
            <span className="fst-italic">Our Latest</span> News Update
          </h2>
          <p className="s-sub-title">
            Explore our journey, values, and the stories behind our collections.
            Discover what makes our brand unique.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd11",
          }}
        >
          {blogItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="article-blog style-2 hover-img4 wow fadeInLeft"
                {...(item.delay && { "data-wow-delay": item.delay })}
              >
                <div className="entry_image">
                  <Link href={`/blog-single`} className="image img-style4">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      className="lazyload"
                      width={772}
                      height={776}
                    />
                  </Link>
                  <div className="entry_tag">
                    {item.tags.map((tag, tagIndex) => (
                      <Link
                        key={tagIndex}
                        href={`/blog-single`}
                        className="name-tag text-caption link"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
                <h5>
                  <Link
                    href={`/blog-single`}
                    className="link fw-normal text-line-clamp-2"
                  >
                    {item.title}
                  </Link>
                </h5>
                <ul className="meta-list">
                  <li className="entry_day letter-space-0 text-caption text-main-4">
                    Nov 13, 2025
                  </li>
                  <li className="icon icon-rhombus" />
                  <li className="entry_name letter-space-0 text-caption text-main-4">
                    Vincent P.
                  </li>
                  <li className="icon icon-rhombus" />
                  <li className="entry_comment letter-space-0 text-caption text-main-4">
                    3 Comments
                  </li>
                </ul>

                <Link
                  href={`/blog-single`}
                  className="tf-btn btn-def text-capitalize text-caption-2 text-main link fw-medium"
                >
                  Read More
                  <i className="icon-arrow-right-2 icon" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd11" />
        </Swiper>
      </div>
    </section>
  );
}
