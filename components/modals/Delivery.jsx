import React from "react";

export default function Delivery() {
  return (
    <div
      className="offcanvas offcanvas-end canvas-sidebar canvas-delivery"
      id="delivery"
    >
      <div className="canvas-header">
        <h3 className="title fw-normal text-uppercase">
          delivery &amp; shipping
        </h3>
        <span
          className="icon-close link icon-close-popup"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="canvas-body">
        <ul className="delivery-list">
          <li>
            <h5 className="title h5 fw-normal text-uppercase">
              Free US Standard Delivery
            </h5>
            <p className="text-main-4">
              When you spend over $175, or $3.95 otherwise.
            </p>
          </li>
          <li>
            <h5 className="title h5 fw-normal text-uppercase">
              Next Day Delivery Services
            </h5>
            <p className="text-main-4">
              For $10.95, receive your order the next working day if ordered
              before 14:00 GMT.
            </p>
          </li>
          <li>
            <h5 className="title h5 fw-normal text-uppercase">
              Nominated Day Delivery Services
            </h5>
            <p className="text-main-4">
              Know when you're going to be in? Place your order before 14:00 GMT
              and opt for a Nominated Day Delivery from just $10.95. Our courier
              will make sure your order arrives on your chosen day.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
