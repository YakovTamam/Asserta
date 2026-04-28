import React from "react";
import Image from "next/image";
export default function BlogSidebar() {
  return (
    <div className="blog-sidebar sidebar-content-wrap sticky-top">
      <div className="sidebar-item">
        <h5 className="sb-title text-uppercase fw-normal">Categories</h5>
        <ul className="sb-category">
          <li>
            <a href="#" className="text-main-4 link">
              Craftsmanship &amp; Design
            </a>
          </li>
          <li>
            <a href="#" className="text-main-4 link">
              Inspiration &amp; Trends
            </a>
          </li>
          <li>
            <a href="#" className="text-main-4 link">
              Customer Stories
            </a>
          </li>
          <li>
            <a href="#" className="text-main-4 link">
              Behind the Brand
            </a>
          </li>
          <li>
            <a href="#" className="text-main-4 link">
              Care &amp; Maintenance
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar-item">
        <h5 className="sb-title text-uppercase fw-normal">recent posts</h5>
        <ul className="sb-recent">
          <li>
            <div className="wg-recent hover-img">
              <a href="#" className="image img-style">
                <Image
                  src="/images/blog/blog-1.jpg"
                  alt=""
                  className="layzload"
                  width={972}
                  height={790}
                />
              </a>
              <div className="content">
                <ul className="entry_meta">
                  <li>20 Sep, 2024</li>
                  <li>/</li>
                  <li>3 Comments</li>
                </ul>
                <a
                  href="#"
                  className="fw-medium text-uppercase link text-line-clamp-2"
                >
                  Timeless Jewelry: The Craft Behind Elegance
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="wg-recent hover-img">
              <a href="#" className="image img-style">
                <Image
                  src="/images/blog/blog-2.jpg"
                  alt=""
                  className="layzload"
                  width={972}
                  height={790}
                />
              </a>
              <div className="content">
                <ul className="entry_meta">
                  <li>20 Sep, 2024</li>
                  <li>/</li>
                  <li>3 Comments</li>
                </ul>
                <a
                  href="#"
                  className="fw-medium text-uppercase link text-line-clamp-2"
                >
                  Jewelry Styling: Perfect Looks for Any Occasion
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="wg-recent hover-img">
              <a href="#" className="image img-style">
                <Image
                  src="/images/blog/blog-3.jpg"
                  alt=""
                  className="layzload"
                  width={2004}
                  height={790}
                />
              </a>
              <div className="content">
                <ul className="entry_meta">
                  <li>20 Sep, 2024</li>
                  <li>/</li>
                  <li>3 Comments</li>
                </ul>
                <a
                  href="#"
                  className="fw-medium text-uppercase link text-line-clamp-2"
                >
                  Behind the Sparkle: Our Iconic Creations
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="sidebar-item">
        <h5 className="sb-title text-uppercase fw-normal">tags</h5>
        <ul className="sb-tag">
          <li>
            <a href="#" className="text-body text-main-4 link">
              JewelryTrends
            </a>
          </li>
          <li>
            <span className="text-body text-main-4">/</span>
          </li>
          <li>
            <a href="#" className="text-body text-main-4 link">
              TimelessElegance
            </a>
          </li>
          <li>
            <span className="text-body text-main-4">/</span>
          </li>
          <li>
            <a href="#" className="text-body text-main-4 link">
              Craftsmanship
            </a>
          </li>
          <li>
            <span className="text-body text-main-4">/</span>
          </li>
          <li>
            <a href="#" className="text-body text-main-4 link">
              JewelryCare
            </a>
          </li>
          <li>
            <span className="text-body text-main-4">/</span>
          </li>
          <li>
            <a href="#" className="text-body text-main-4 link">
              LuxuryDesign
            </a>
          </li>
          <li>
            <span className="text-body text-main-4">/</span>
          </li>
          <li>
            <a href="#" className="text-body text-main-4 link">
              BehindTheSparkle
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
