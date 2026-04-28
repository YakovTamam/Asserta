import React from "react";

export default function Pickup() {
  return (
    <div
      className="offcanvas offcanvas-end canvas-sidebar canvas-pickup"
      id="pickUp"
    >
      <div className="canvas-header">
        <h3 className="title fw-normal text-uppercase">pickup available</h3>
        <span
          className="icon-close link icon-close-popup"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="canvas-body">
        <ul className="store-list">
          <li className="store-ready-item">
            <h5 className="title h5 fw-normal text-uppercase">
              sydney - george street
            </h5>
            <div className="store-status">
              <span className="icon">
                <i className="icon-check-2" />
              </span>
              <p className="text">
                Pickup available. Usually ready in 24 hours
              </p>
            </div>
            <p className="text-main-4">
              115 George street <br />
              Sydney NSW 2000 <br />
              Australia <br />
              +64 422 453 343
            </p>
            <a
              href="https://www.google.com/maps?q=115+George+street,+Sydney+NSW+2000,Australia"
              target="_blank"
              className="tf-btn-line link"
            >
              <span className="text-caption fw-medium lh-28">
                See Direction on Google map
              </span>
              <i className="icon icon-arrow-top-right" />
            </a>
          </li>
          <li className="store-ready-item">
            <h5 className="title h5 fw-normal text-uppercase">
              San Francisco - Market St
            </h5>
            <div className="store-status">
              <span className="icon">
                <i className="icon-check-2" />
              </span>
              <p className="text">
                Pickup available. Usually ready in 24 hours
              </p>
            </div>
            <p className="text-main-4">
              850 Market St <br />
              San Francisco, CA 94102 <br />
              USA <br />
              +1 (415) 123-4567
            </p>
            <a
              href="https://www.google.com/maps?q=850+Market+St,San+Francisco,CA+94102,USA"
              target="_blank"
              className="tf-btn-line link"
            >
              <span className="text-caption fw-medium lh-28">
                See Direction on Google map
              </span>
              <i className="icon icon-arrow-top-right" />
            </a>
          </li>
          <li className="store-ready-item">
            <h5 className="title h5 fw-normal text-uppercase">
              paris - Rue de Rivoli
            </h5>
            <div className="store-status">
              <span className="icon">
                <i className="icon-check-2" />
              </span>
              <p className="text">
                Pickup available. Usually ready in 24 hours
              </p>
            </div>
            <p className="text-main-4">
              123 Rue de Rivoli <br />
              75001 Paris <br />
              France <br />
              +33 1 23 45 67 89
            </p>
            <a
              href="https://www.google.com/maps?q=123+Rue+de+Rivoli,75001+Paris,France"
              target="_blank"
              className="tf-btn-line link"
            >
              <span className="text-caption fw-medium lh-28">
                See Direction on Google map
              </span>
              <i className="icon icon-arrow-top-right" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
