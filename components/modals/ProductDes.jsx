import React from "react";

export default function ProductDes() {
  return (
    <div
      className="offcanvas offcanvas-end canvas-sidebar canvas-description"
      id="productDes"
    >
      <div className="canvas-header">
        <h3 className="title fw-normal text-uppercase">description</h3>
        <span
          className="icon-close link icon-close-popup"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="canvas-body">
        <ul className="des-list">
          <li>
            <h5 className="title h5 fw-normal text-uppercase">
              A REINVENTION OF JEWELRY BASICS
            </h5>
            <p className="text text-main-4">
              The jewelry essentials embody everyday versatility. Timeless
              staples that go beyond basic jewelry: earrings, rings, necklaces
              and bracelets that are perfect for daily wear but can also be
              stacked for special occasions.
              <br />
              <br />
              Crafted in 18K gold-plated silver or brass and adorned with
              sparkling cubic zirconia to match any style. Everyday jewelry that
              will elevate any style or look and perfect for gifting.
            </p>
          </li>
          <li>
            <h5 className="title h5 fw-normal text-uppercase">
              RECYCLED SILVER
            </h5>
            <p className="text text-main-4">
              As part of our commitment to using more responsible materials, we
              are introducing recycled silver in the manufacturing of many of
              our pieces. The recycled silver we use comes from sources verified
              by recognized organisms.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
