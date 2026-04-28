"use client";
import { blogItems } from "@/data/blogs";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
export default function Blogs() {
  return (
    <section className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="sect-top center text-center wow fadeInUp">
          <h2 className="s-title font-2">
            <span className="fst-italic">Behind</span> the brand
          </h2>
          <p className="s-sub-title">
            Explore our journey, values, and the stories behind our collections.
            Discover what makes our brand unique.
          </p>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd3",
          }}
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
                <Link
                  href={`/blog-single`}
                  className="tf-btn-line hv-2 lh-28 text-uppercase fw-normal"
                >
                  Read More
                  <i className="ic icon-arrow-right-2" />
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default tf-sw-pagination spd3" />
        </Swiper>
      </div>
    </section>
  );
}
