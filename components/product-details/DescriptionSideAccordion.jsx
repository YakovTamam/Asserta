import React from "react";

export default function DescriptionSideAccordion() {
  return (
    <div className="tf-product-accordion">
      <div className="widget-accordion-2 style-3">
        <div
          className="accordion-title collapsed"
          data-bs-target="#description"
          data-bs-toggle="collapse"
          aria-expanded="false"
          aria-controls="description"
          role="button"
        >
          <span>Description</span>
          <span className="icon ic-accordion-custom" />
        </div>
        <div id="description" className="collapse widget-desc">
          <div className="accordion-body">
            <h6 className="text-main-4 fw-normal">
              Link what you love. This sterling silver link chain holds endless
              styling potential. Featuring two openable links, groups of four
              static links between each one and a carabiner closure. Customise
              your link chain – then remix it with meaningful charms.
            </h6>
          </div>
        </div>
      </div>
      <div className="widget-accordion-2 style-3">
        <div
          className="accordion-title collapsed"
          data-bs-target="#material"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="material"
          role="button"
        >
          <span>additional information</span>
          <span className="icon ic-accordion-custom" />
        </div>
        <div id="material" className="collapse widget-material">
          <div className="accordion-body">
            <table className="table-material">
              <tbody>
                <tr>
                  <td className="h6">Material</td>
                  <td className="h6">Gold, Rose Gold, Silver</td>
                </tr>
                <tr>
                  <td className="h6">Color</td>
                  <td className="h6">White</td>
                </tr>
                <tr>
                  <td className="h6">Stone</td>
                  <td className="h6">Diamond</td>
                </tr>
                <tr>
                  <td className="h6">Brand</td>
                  <td className="h6">Vemus</td>
                </tr>
                <tr>
                  <td className="h6">Size</td>
                  <td className="h6">5, 6, 7, 8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="widget-accordion-2 style-3">
        <div
          className="accordion-title collapsed"
          data-bs-target="#shipping"
          data-bs-toggle="collapse"
          aria-expanded="true"
          aria-controls="shipping"
          role="button"
        >
          <span>shipping</span>
          <span className="icon ic-accordion-custom" />
        </div>
        <div id="shipping" className="collapse widget-shipping">
          <div className="accordion-body">
            <h6 className="fw-normal text-main-4">
              Estimated delivery times:
              <span className="fw-medium text-main">12 - 26 days</span>
              (International),
              <span className="fw-medium text-main">3 - 6 days</span>
              (United States).
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
