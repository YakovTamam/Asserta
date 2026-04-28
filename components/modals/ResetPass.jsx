"use client";
import React from "react";

export default function ResetPass() {
  return (
    <div className="offcanvas offcanvas-end canvas-sidebar" id="reset">
      <div className="canvas-header">
        <h3 className="title fw-normal text-uppercase">Reset password</h3>
        <span
          className="icon-close link icon-close-popup"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="canvas-body">
        <p className="sub-title text-main-4">
          Please enter your registered email address to receive an email to
          reset your password
        </p>
        <form className="form-reset" onSubmit={(e) => e.preventDefault()}>
          <div className="form-content">
            <fieldset className="tf-field">
              <input className="tf-input" type="text" placeholder="" required />
              <label className="tf-lable">First name *</label>
            </fieldset>
          </div>
          <button
            type="submit"
            className="tf-btn btn-fill w-100 fw-medium animate-btn"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}
