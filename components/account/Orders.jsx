import React from "react";

export default function Orders() {
  return (
    <div className="my-acount-content account-order">
      <h4 className="heading fw-normal">Order History</h4>
      <div className="table-order-history">
        <table>
          <thead>
            <tr>
              <th className="title-case order_code">ORDER ID</th>
              <th className="title-case order_date">ORDER DATE</th>
              <th className="title-case order_status">STATUS</th>
              <th className="title-case order_total">TOTAL</th>
              <th className="title-case order_action">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1001</td>
              <td>27 Mar 2025</td>
              <td>Delivered</td>
              <td>$690.00 / 3 items</td>
              <td>
                <a
                  href="#orderDetail"
                  data-bs-toggle="modal"
                  className="btn-action link"
                >
                  <i className="icon icon-view-2" />
                </a>
              </td>
            </tr>
            <tr>
              <td>#1002</td>
              <td>27 Mar 2025</td>
              <td>Delivered</td>
              <td>$690.00 / 3 items</td>
              <td>
                <a
                  href="#orderDetail"
                  data-bs-toggle="modal"
                  className="btn-action link"
                >
                  <i className="icon icon-view-2" />
                </a>
              </td>
            </tr>
            <tr>
              <td>#1003</td>
              <td>27 Mar 2025</td>
              <td>On the way</td>
              <td>$690.00 / 3 items</td>
              <td>
                <a
                  href="#orderDetail"
                  data-bs-toggle="modal"
                  className="btn-action link"
                >
                  <i className="icon icon-view-2" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
