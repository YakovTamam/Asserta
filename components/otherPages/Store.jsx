import React from "react";
import Image from "next/image";
const storeData = [
  {
    id: 1,
    name: "Vemus Sydney",
    panelId: "vemus-sydney",
    tabId: "store-1",
    address: "15 Geogre st, Sydney, NSW 2000, Australia",
    email: "Store@vemus.com",
    phone: "+64 3452 8540",
    mapLink:
      "https://www.google.com/maps?q=15+Geogre+st,Sydney,NSW+2000,Australia",
    emailHref: "mailto:store@vemus.com",
    phoneHref: "tel:6434528540",
    image: "/images/section/store-1.jpg",
  },
  {
    id: 2,
    name: "Vemus Manhattan",
    panelId: "vemus-manhattan",
    tabId: "store-2",
    address: "350 5th Ave, Manhattan, NY 10118, USA",
    email: "StoreUSA@vemus.com",
    phone: "+1 212 555 1234",
    mapLink: "https://www.google.com/maps?q=350+5th+Ave,Manhattan,NY+10118,USA",
    emailHref: "mailto:store@vemus.com",
    phoneHref: "tel:12125551234",
    image: "/images/section/store-2.jpg",
  },
  {
    id: 3,
    name: "Vemus London",
    panelId: "vemus-london",
    tabId: "store-3",
    address: "221B Baker Street, London NW1 6XE, UK",
    email: "StoreUK@vemus.com",
    phone: "+44 20 7946 0958",
    mapLink:
      "https://www.google.com/maps?q=221B+Baker+Street,London+NW1+6XE,UK",
    emailHref: "mailto:store@vemus.com",
    phoneHref: "tel:442079460958",
    image: "/images/section/store-3.jpg",
  },
  {
    id: 4,
    name: "Vemus Paris",
    panelId: "vemus-paris",
    tabId: "store-4",
    address: "10 Avenue des Champs-Élysées, 75008 Paris, France",
    email: "StoreFrance@vemus.com",
    phone: "+33 1 44 55 01 23",
    mapLink:
      "https://www.google.com/maps?q=10+Avenue+des+Champs-Élysées,75008+Paris,France",
    emailHref: "mailto:store@vemus.com",
    phoneHref: "tel:33144550123",
    image: "/images/section/store-4.jpg",
  },
];

export default function Store() {
  return (
    <div className="flat-spacing flat-animate-tab-2">
      <div className="container">
        <div className="row flex-wrap-reverse">
          <div className="col-md-6">
            <div className="store-accordion" id="vemus-address" role="tablist">
              {storeData.map((store, index) => (
                <div
                  key={store.id}
                  className={`widget-accordion-2 nav-tab-item ${
                    index === 0 ? "active" : ""
                  }`}
                  role="presentation"
                  data-bs-toggle="tab"
                  data-bs-target={`#${store.tabId}`}
                >
                  <div
                    className={`accordion-title ${
                      index === 0 ? "" : "collapsed"
                    }`}
                    data-bs-target={`#${store.panelId}`}
                    role="button"
                    data-bs-toggle="collapse"
                    aria-expanded={index === 0}
                    aria-controls={store.panelId}
                  >
                    <span className="h3 fw-normal">{store.name}</span>
                    <span className="icon ic-accordion-custom" />
                  </div>
                  <div
                    id={store.panelId}
                    className={`collapse ${index === 0 ? "show" : ""}`}
                    data-bs-parent="#vemus-address"
                  >
                    <ul className="store-info-list">
                      <li>
                        <p className="caption">Address:</p>
                        <a
                          href={store.mapLink}
                          className="link text-main-4"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {store.address}
                        </a>
                      </li>
                      <li>
                        <p className="caption">Email:</p>
                        <a href={store.emailHref} className="link text-main-4">
                          {store.email}
                        </a>
                      </li>
                      <li>
                        <p className="caption">Phone:</p>
                        <a href={store.phoneHref} className="link text-main-4">
                          {store.phone}
                        </a>
                      </li>
                    </ul>
                    <a
                      href={store.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-get-dir tf-btn-line text-caption-2 fw-normal"
                    >
                      Get Direction
                      <i className="icon icon-arrow-top-right" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="tab-content mb-md-0 tab-img-store">
              {storeData.map((store, index) => (
                <div
                  key={store.id}
                  className={`img-store tab-pane ${
                    index === 0 ? "active show" : ""
                  }`}
                  id={store.tabId}
                  role="tabpanel"
                >
                  <Image
                    src={store.image}
                    alt="Store"
                    className="lazyload"
                    width={1488}
                    height={1488}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
