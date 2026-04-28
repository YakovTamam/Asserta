import React from "react";
import Link from "next/link";
import Image from "next/image";
import CommentForm from "./CommentForm";
export default function BlogSingle() {
  return (
    <section className="flat-spacing-14">
      <div className="container">
        <div className="s-blog-detail align-items-start">
          <div className="blog-single">
            <div className="single-wrap flat-spacing-3 pt-0">
              <div className="box-title">
                <ul className="entry_meta">
                  <li>
                    <span className="icon">
                      <i className="icon-author" />
                    </span>
                    <a href="#" className="link">
                      By Vincent
                    </a>
                  </li>
                  <li>
                    <span className="icon">
                      <i className="icon-calender" />
                    </span>
                    <p>19 Sep 24</p>
                  </li>
                  <li>
                    <span className="icon">
                      <i className="icon-tag" />
                    </span>
                    <p className="text-caption">JewelryTrends, Craftsmanship</p>
                  </li>
                  <li>
                    <span className="icon">
                      <i className="icon-comment" />
                    </span>
                    <p className="text-caption">No Comment</p>
                  </li>
                </ul>
                <p className="text-main-4">
                  Jewelry is more than just an accessory—it’s a statement of
                  elegance, personality, and timeless beauty. At Vemus, every
                  piece we create tells a story, blending artistry,
                  craftsmanship, and innovation. In this blog, we take you
                  behind the scenes of some of our most iconic creations,
                  uncovering the inspiration, techniques, and details that make
                  them truly special.
                </p>
              </div>
              <div className="entry_image">
                <Image
                  src="/images/blog/blog-single.jpg"
                  alt=""
                  className="lazyload"
                  width={2176}
                  height={790}
                />
              </div>
              <div className="box-text">
                <h4 className="text-uppercase">
                  The Inspiration Behind Our Iconic Pieces
                </h4>
                <p className="text-main-4">
                  Every collection begins with a story. Whether inspired by
                  nature’s beauty, historical elegance, or modern minimalism,
                  our designs are crafted with meaning and purpose. From
                  delicate floral motifs symbolizing growth and renewal to bold
                  geometric shapes representing strength and sophistication, our
                  pieces are designed to connect with you on a deeper level.
                </p>
              </div>
              <div className="block-quote">
                <span className="icon">
                  <i className="icon-quote-2" />
                </span>
                <div className="quote">
                  <h4 className="fw-normal">
                    Every sparkle tells a story—our iconic creations are crafted
                    to shine beyond a lifetime.
                  </h4>
                  <span className="br-line" />
                  <a href="#" className="name link text-end">
                    Henry Caville
                  </a>
                </div>
              </div>
              <div className="box-text">
                <h4 className="text-uppercase">
                  Craftsmanship: The Art of Perfection
                </h4>
                <p className="text-main-4">
                  Creating a timeless piece of jewelry requires precision and
                  dedication. Our expert artisans use traditional and modern
                  techniques to bring each design to life. Here’s a glimpse into
                  our process:
                </p>
                <ul className="list-info">
                  <li>
                    Hand-Selected Gemstones
                    <span className="text-main-6"> – </span>
                    <span className="text-main-4">
                      We carefully source high-quality diamonds, sapphires, and
                      other precious stones to ensure brilliance and longevity.
                    </span>
                  </li>
                  <li>
                    Intricate Detailing
                    <span className="text-main-6"> – </span>
                    <span className="text-main-4">
                      From delicate engravings to pave-set stones, every detail
                      is meticulously crafted to enhance the beauty of each
                      piece.
                    </span>
                  </li>
                  <li>
                    Expert Metalwork
                    <span className="text-main-6"> – </span>
                    <span className="text-main-4">
                      Whether it’s solid gold, sterling silver, or platinum, our
                      metals are shaped and polished to perfection for a
                      flawless finish.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="box-text">
                <h4 className="text-uppercase">
                  Why Our Customers Love These Pieces
                </h4>
                <p className="text-main-4">
                  What makes these creations truly special is how they resonate
                  with our customers. From anniversary gifts to self-love
                  purchases, each piece holds sentimental value. Our customers
                  often share how these pieces mark important milestones, making
                  them more than just jewelry—they become treasured memories.
                </p>
              </div>
              <div className="entry_image type-group tf-grid-layout sm-col-2">
                <div className="image">
                  <Image
                    src="/images/blog/blog-single-2.jpg"
                    alt=""
                    className="lazyload"
                    width={1068}
                    height={716}
                  />
                </div>
                <div className="image">
                  <Image
                    src="/images/blog/blog-single-3.jpg"
                    alt=""
                    className="lazyload"
                    width={1068}
                    height={716}
                  />
                </div>
              </div>
              <div className="box-text">
                <h4 className="text-uppercase">Final Thoughts</h4>
                <div className="box-btn">
                  <p className="text-main-4">
                    Jewelry has the power to tell a story, and at [Your Brand
                    Name], we take pride in creating pieces that shine beyond
                    the surface. Our iconic creations are crafted to celebrate
                    life’s moments, big and small, ensuring that every sparkle
                    carries meaning.
                    <br />
                    <br />
                    Want to add a piece of timeless elegance to your collection?
                    Explore our signature designs and find the perfect piece
                    that speaks to you.
                  </p>
                  <div className="">
                    <Link
                      href={`/blog-single`}
                      className="tf-btn-line text-uppercase lh-28 fw-normal"
                    >
                      SHOP NOW
                      <i className="icon-arrow-top-right fs-10" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="entry_media">
                  <ul className="entry_tag">
                    <li>
                      <a href="#" className="text-caption">
                        JewelryTrends
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-caption">
                        Craftsmanship
                      </a>
                    </li>
                  </ul>
                  <div className="entry_social">
                    <p>Share:</p>
                    <ul className="tf-social-icon style-large">
                      <li>
                        <a href="#" className="social-facebook">
                          <span className="icon">
                            <i className="icon-facebook" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-pinterest">
                          <span className="icon">
                            <i className="icon-pinterest" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-x">
                          <span className="icon">
                            <i className="icon-x" />
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="social-linkin">
                          <span className="icon">
                            <i className="icon-linkin" />
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="related-post">
                  <a href="#" className="post prev text-black link">
                    <span className="icon">
                      <i className="icon-arrow-left" />
                    </span>
                    <p className="fw-normal">PREVIOUS POST</p>
                  </a>
                  <a href="#" className="post prev text-black link">
                    <p className="fw-normal">NEXT POST</p>
                    <span className="icon">
                      <i className="icon-arrow-right" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <CommentForm />
          </div>
          <div className="blog-sidebar sidebar-content-wrap d-none d-lg-block sticky-top">
            <div className="sidebar-item">
              <div className="sb-author text-center">
                <div className="entry_author">
                  <div className="avatar">
                    <Image
                      src="/images/avatar/avt-2.jpg"
                      alt=""
                      className="lazyload"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="infor">
                    <p className="name">Vincent Pham</p>
                    <p className="duty text-main-4">Vemus Editor Blog Posts</p>
                  </div>
                </div>
                <ul className="tf-social-icon">
                  <li>
                    <a href="#" className="social-facebook">
                      <span className="icon">
                        <i className="icon-facebook" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-instagram">
                      <span className="icon">
                        <i className="icon-instagram" />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-x">
                      <span className="icon">
                        <i className="icon-x" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
        </div>
      </div>
    </section>
  );
}
