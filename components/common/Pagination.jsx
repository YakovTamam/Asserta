import React from "react";

export default function Pagination() {
  return (
    <div className="wg-pagination">
      <a href="#" className="tf-btn-line style-line-2">
        <span className="text-body">PREV</span>
      </a>
      <ul className="pagition-list">
        <li>
          <p className="pagination-item active">1</p>
        </li>
        <li>
          <a href="#" className="pagination-item link">
            2
          </a>
        </li>
        <li>
          <a href="#" className="pagination-item link">
            3
          </a>
        </li>
      </ul>
      <a href="#" className="tf-btn-line style-line-2">
        <span className="text-body">NEXT</span>
      </a>
    </div>
  );
}
