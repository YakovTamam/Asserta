"use client";
import React from "react";

export default function CommingSoonForm() {
  return (
    <form
      className="form-notify style-btn-abs style-border"
      onSubmit={(e) => e.preventDefault()}
    >
      <fieldset>
        <input type="email" required placeholder="Your email address" />
      </fieldset>
      <button
        type="submit"
        className="btn-submit tf-btn btn-fill type-large fw-medium animate-btn"
      >
        Get Notify
      </button>
    </form>
  );
}
