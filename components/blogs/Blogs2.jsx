import { blogEntries } from "@/data/blogs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Blogs2() {
  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tf-grid-layout sm-col-2 lg-col-3">
                {blogEntries.map((entry, index) => {
                  const HeadingTag = entry.headingLevel;
                  return (
                    <div
                      className={`article-blog hover-img ${
                        index == 0 ? "style-row  wd-full" : ""
                      }`}
                      key={index}
                    >
                      <div className="entry_image">
                        <Link href={`/blog-single`} className="image img-style">
                          <Image
                            src={entry.image.src}
                            alt="Blog"
                            className="lazyload"
                            width={entry.image.width}
                            height={entry.image.height}
                          />
                        </Link>
                        <div className="entry_tag">
                          {entry.tags.map((tag, i) => (
                            <Link
                              key={i}
                              href={`/blog-single`}
                              className="name-tag text-caption link"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="blog-content">
                        <div className="box-title">
                          <ul className="meta-list">
                            <li className="entry_author">
                              <div className="avt">
                                <Image
                                  src={entry.author.img}
                                  alt={entry.author.name}
                                  className="lazyload"
                                  width={100}
                                  height={100}
                                />
                              </div>
                              <Link
                                href={`/blog-single`}
                                className="name_author text-main-4 link"
                              >
                                {entry.author.name}
                              </Link>
                            </li>
                            <li className="br-line" />
                            <li className="entry_day">
                              <p className="letter-space-0 text-main-4">
                                {entry.date}
                              </p>
                            </li>
                          </ul>
                          <HeadingTag>
                            <Link
                              href={`/blog-single`}
                              className="link fw-medium text-black text-uppercase"
                            >
                              {entry.title}
                            </Link>
                          </HeadingTag>
                          <p
                            className={`text-main-6 ${
                              entry.headingLevel === "h4"
                                ? "text-line-clamp-2"
                                : ""
                            }`}
                          >
                            {entry.excerpt}
                          </p>
                        </div>
                        <div className="box-btn">
                          <Link
                            href={`/blog-single`}
                            className="tf-btn-line text-uppercase lh-28 fw-normal"
                          >
                            READ MORE
                            <i className="icon-arrow-top-right fs-10" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="wd-full">
                  <div className="wg-pagination">
                    <a href="#" className="tf-btn-line style-line-2">
                      <span className="text-body">PREV</span>
                    </a>
                    <ul className="pagition-list">
                      <li>
                        <p className="pagination-item active">1</p>
                      </li>
                      <li>
                        <a href="#" className="pagination-item link">
                          2
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pagination-item link">
                          3
                        </a>
                      </li>
                    </ul>
                    <a href="#" className="tf-btn-line style-line-2">
                      <span className="text-body">NEXT</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
