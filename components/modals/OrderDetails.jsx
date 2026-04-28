import React from "react";

export default function OrderDetails() {
  return (
    <div
      className="modal modalCentered fade modal-order-detail"
      id="orderDetail"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span className="icon-close-popup" data-bs-dismiss="modal">
            <i className="icon-close" />
          </span>
          <div className="modal-top">
            <h3 className="title fw-normal text-uppercase">Order Detail</h3>
          </div>
          <div className="modal-body">
            <ul className="list-infor">
              <li className="order_id">#12345</li>
              <li className="br-line" />
              <li className="order_date">15 May 2024</li>
              <li className="br-line" />
              <li className="order_item">6 items</li>
              <li className="br-line" />
              <li className="order_status">Delivered</li>
            </ul>
            <div className="table-order-detail">
              <table>
                <thead>
                  <tr>
                    <th className="order_product h6 fw-normal">Product</th>
                    <th className="order_price h6 fw-normal">price</th>
                    <th className="order_quantity h6 fw-normal">quantity</th>
                    <th className="order_subtotal h6 fw-normal">subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="order_product">
                      <a href="#" className="image">
                        <img
                          alt="Product"
                          src="/images/products/product-1.jpg"
                          width={714}
                          height={900}
                        />
                      </a>
                      <div className="infor">
                        <a href="#" className="prd-name h6 fw-normal link">
                          Crystal Birthstone Eternity Circle Charm
                        </a>
                        <p className="prd-type">Rose Gold / 50</p>
                      </div>
                    </td>
                    <td className="order_price">$130.00</td>
                    <td className="order_quantity">2</td>
                    <td className="order_subtotal">$260.00</td>
                  </tr>
                  <tr>
                    <td className="order_product">
                      <a href="#" className="image">
                        <img
                          alt="Product"
                          src="/images/products/product-2.jpg"
                          width={714}
                          height={900}
                        />
                      </a>
                      <div className="infor">
                        <a href="#" className="prd-name h6 fw-normal link">
                          Crystal Birthstone Eternity Circle Charm
                        </a>
                        <p className="prd-type">Rose Gold / 50</p>
                      </div>
                    </td>
                    <td className="order_price">$130.00</td>
                    <td className="order_quantity">2</td>
                    <td className="order_subtotal">$260.00</td>
                  </tr>
                  <tr>
                    <td className="order_product">
                      <a href="#" className="image">
                        <img
                          alt="Product"
                          src="/images/products/product-3.jpg"
                          width={714}
                          height={900}
                        />
                      </a>
                      <div className="infor">
                        <a href="#" className="prd-name h6 fw-normal link">
                          Crystal Birthstone Eternity Circle Charm
                        </a>
                        <p className="prd-type">Rose Gold / 50</p>
                      </div>
                    </td>
                    <td className="order_price">$130.00</td>
                    <td className="order_quantity">2</td>
                    <td className="order_subtotal">$260.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="order-total-wrap">
              <h5 className="text fw-normal text-uppercase">Total:</h5>
              <h5 className="order-total fw-normal">$780.00</h5>
            </div>
            <p className="privacy text-main-4 text-center">
              Not happy with the order? You can
              <a href="#" className="tf-btn-line style-line-2">
                <span className="text-body"> Request a free return </span>
              </a>
              in 14 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
