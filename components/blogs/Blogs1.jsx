import { blogPosts } from "@/data/blogs";
import React from "react";
import BlogSidebar from "./BlogSidebar";
import Link from "next/link";
import Image from "next/image";
export default function Blogs1() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="tf-grid-layout sm-col-2">
              {blogPosts.map((post, index) => (
                <div
                  className={`article-blog hover-img ${
                    index == 2 ? "wd-full" : ""
                  }`}
                  key={index}
                >
                  <div className="entry_image">
                    <Link href={`/blog-single`} className="image img-style">
                      <Image
                        src={post.imgSrc}
                        alt="Blog"
                        className="lazyload"
                        width={index == 2 ? 2004 : 972}
                        height={790}
                      />
                    </Link>
                    <div className="entry_tag">
                      {post.tags.map((tag, i) => (
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
                              src={post.authorImg}
                              alt={post.authorName}
                              className="lazyload"
                              width={100}
                              height={100}
                            />
                          </div>
                          <Link
                            href={`/blog-single`}
                            className="name_author text-main-4 link"
                          >
                            {post.authorName}
                          </Link>
                        </li>
                        <li className="br-line" />
                        <li className="entry_day">
                          <p className="letter-space-0 text-main-4">
                            {post.date}
                          </p>
                        </li>
                      </ul>
                      <h4>
                        <Link
                          href={`/blog-single`}
                          className="link fw-medium text-black text-uppercase"
                        >
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-main-6 text-line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="box-btn">
                      <Link
                        href={`/blog-single`}
                        className="tf-btn-line text-uppercase lh-28 fw-normal"
                      >
                        READ MORE
                        <i className="icon-arrow-top-right icon" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="wd-full">
                <div className="wg-pagination">
                  <Link
                    href={`/blog-single`}
                    className="tf-btn-line style-line-2"
                  >
                    <span className="text-body">PREV</span>
                  </Link>
                  <ul className="pagition-list">
                    <li>
                      <p className="pagination-item active">1</p>
                    </li>
                    <li>
                      <Link
                        href={`/blog-single`}
                        className="pagination-item link"
                      >
                        2
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/blog-single`}
                        className="pagination-item link"
                      >
                        3
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href={`/blog-single`}
                    className="tf-btn-line style-line-2"
                  >
                    <span className="text-body">NEXT</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-none d-lg-block">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
