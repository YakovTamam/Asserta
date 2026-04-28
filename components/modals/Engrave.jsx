import React from "react";

export default function Engrave() {
  return (
    <div
      className="offcanvas offcanvas-end canvas-sidebar canvas-engrave"
      id="engrave"
    >
      <div className="canvas-header">
        <h3 className="title fw-normal text-uppercase">engrave</h3>
        <span
          className="icon-close link icon-close-popup"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="canvas-body">
        <ul className="engrave-list">
          <li>
            <h5 className="title h5 fw-normal text-uppercase">description</h5>
            <p className="text text-main-4">
              Make it personal with our custom engraving service! Whether it’s a
              meaningful name, a special date, or a heartfelt message, we offer
              precise and elegant engravings to add a unique touch to your
              jewelry. Choose from a variety of fonts, symbols, and even custom
              handwriting or fingerprints to create a piece that tells your
              story. Our high-quality engraving ensures lasting beauty, making
              your jewelry truly one-of-a-kind. Perfect for gifts,
              anniversaries, or personal keepsakes.
            </p>
          </li>
          <li>
            <h5 className="title h5 fw-normal text-uppercase">
              material &amp; compatibility
            </h5>
            <ul className="engrave-more-infor">
              <li>
                Available for gold, silver, platinum, stainless steel, titanium
              </li>
              <li>
                Works on rings, necklaces, bracelets, pendants, and charms
              </li>
            </ul>
          </li>
          <li>
            <h5 className="title h5 fw-normal text-uppercase">
              pricing &amp; Turnaround time
            </h5>
            <ul className="engrave-more-infor">
              <li>Prices vary based on complexity ($10 - $50 per engraving)</li>
              <li>Standard time: 2-5 business days (rush orders available)</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
