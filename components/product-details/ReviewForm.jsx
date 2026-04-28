"use client";
import React from "react";

export default function ReviewForm() {
  return (
    <>
      {" "}
      <h5 className="title">write a review</h5>
      <h6 className="sub-title">
        Your email address will not be published.&nbsp;Required fields are
        marked&nbsp;*
      </h6>
      <div className="your-rate">
        <h6 className="fw-normal">Your rating *</h6>
        <ul className="rate-wrap handle-rating">
          <li className="star" data-value={1}>
            <i className="icon-star" />
          </li>
          <li className="star" data-value={2}>
            <i className="icon-star" />
          </li>
          <li className="star" data-value={3}>
            <i className="icon-star" />
          </li>
          <li className="star" data-value={4}>
            <i className="icon-star" />
          </li>
          <li className="star" data-value={5}>
            <i className="icon-star" />
          </li>
        </ul>
      </div>
      <form
        className="form-review style-border"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="form-content">
          <div className="cols tf-grid-layout sm-col-2">
            <input type="text" placeholder="Name *" />
            <input type="text" placeholder="Email *" />
          </div>
          <textarea
            placeholder="Your review *"
            style={{ height: 249 }}
            defaultValue={""}
          />
        </div>
        <div className="checkbox-wrap">
          <input id="save" type="checkbox" className="tf-check style-2 p-0" />
          <label htmlFor="save" className="h6 fw-normal">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
        <button
          type="submit"
          className="tf-btn btn-fill-2 fw-medium animate-btn"
        >
          Submit
        </button>
      </form>
    </>
  );
}
