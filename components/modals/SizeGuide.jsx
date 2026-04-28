import React from "react";
import Image from "next/image";

export default function SizeGuide() {
  return (
    <div
      className="offcanvas offcanvas-end canvas-sidebar canvas-size"
      id="sizeGuide"
    >
      <div className="canvas-header">
        <h3 className="title fw-normal text-uppercase">size guide</h3>
        <span
          className="icon-close link icon-close-popup"
          data-bs-dismiss="offcanvas"
        />
      </div>
      <div className="canvas-body">
        <div className="tf-page-size-chart-content">
          <p className="title h5 fw-normal text-uppercase">know the size</p>
          <ul className="resize-info-list">
            <li>1. Select an existing ring that fits the desired finger.</li>
            <li>2. Measure the internal diameter of the ring in mm.</li>
            <li>3. Select the diameter below to determine your ring size.</li>
          </ul>
          <div className="img-chart">
            <Image
              src="/images/section/resize-chart.png"
              alt=""
              className="lazyload"
              width={942}
              height={556}
            />
          </div>
        </div>
        <div className="tf-table-res-df">
          <p className="title h5 fw-normal text-uppercase">Size chart</p>
          <p className="sub text-main-4 mb-0">
            At Vemus Jewelry, we want your jewelry to fit flawlessly. Use our
            size guide to ensure the perfect match for rings, bracelets, and
            necklaces.
          </p>
        </div>
        <div className="tf-sizeguide-table">
          <table>
            <thead>
              <tr>
                <th>INTERNAL DIAMETER (MM)</th>
                <th>US</th>
                <th>US</th>
                <th>EU</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>13.6</td>
                <td>E</td>
                <td>2.75</td>
                <td>42</td>
              </tr>
              <tr>
                <td>14.0</td>
                <td>F</td>
                <td>3.25</td>
                <td>44</td>
              </tr>
              <tr>
                <td>14.4</td>
                <td>G</td>
                <td>3.75</td>
                <td>45</td>
              </tr>
              <tr>
                <td>14.9</td>
                <td>H</td>
                <td>4.25</td>
                <td>46.5</td>
              </tr>
              <tr>
                <td>15.1</td>
                <td>I</td>
                <td>4.5</td>
                <td>47</td>
              </tr>
              <tr>
                <td>15.5</td>
                <td>J</td>
                <td>5</td>
                <td>48.5</td>
              </tr>
              <tr>
                <td>15.9</td>
                <td>K</td>
                <td>5.5</td>
                <td>50</td>
              </tr>
              <tr>
                <td>16.3</td>
                <td>l</td>
                <td>6</td>
                <td>51</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
