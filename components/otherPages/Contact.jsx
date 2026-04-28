"use client";
import React from "react";

export default function Contact() {
  return (
    <section className="s-contact-us flat-spacing-6">
      {/* Map */}
      <div className="wg-map d-flex">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7880.148272329334!2d151.20657421407668!3d-33.858885268389294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae682c546039%3A0x16da940d587922a1!2sCircular%20Quay!5e0!3m2!1sen!2s!4v1745205798630!5m2!1sen!2s"
          width="100%"
          height={461}
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {/* /Map */}
      <div className="container">
        <div className="row">
          <div className="col-xxl-5 offset-xxl-1 col-lg-6">
            <div className="left-col mb-lg-0">
              <h3 className="title fw-normal">Visit Our Store</h3>
              <ul className="store-info-list">
                <li>
                  <p className="caption">Address:</p>
                  <a
                    href="https://www.google.com/maps?q=15+Geogre+st,Sydney,NSW+2000,Australia"
                    className="link text-main-4"
                    target="_blank"
                  >
                    15 Geogre st, Sydney, NSW 2000, Australia
                  </a>
                </li>
                <li>
                  <p className="caption">Email:</p>
                  <a href="mailto:store@vemus.com" className="link text-main-4">
                    Store@vemus.com
                  </a>
                </li>
                <li>
                  <p className="caption">Phone:</p>
                  <a href="tel:6434528540" className="link text-main-4">
                    +64 3452 8540
                  </a>
                </li>
                <li>
                  <p className="caption">Opening Hour:</p>
                  <p className="text-main-4">
                    Mon - Fri: 8am to 4.30pm GST <br />
                    Sat: 9am to 3pm GST <br />
                    Sun: Close
                  </p>
                </li>
              </ul>
              <ul className="tf-social-icon">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="social-facebook"
                  >
                    <span className="icon">
                      <i className="icon-facebook" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    className="social-instagram"
                  >
                    <span className="icon">
                      <i className="icon-instagram" />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" target="_blank" className="social-x">
                    <span className="icon">
                      <i className="icon-x" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.snapchat.com/"
                    target="_blank"
                    className="social-snapchat"
                  >
                    <span className="icon">
                      <i className="icon-snapchat" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="right-col">
              <h3 className="title fw-normal">Get In Touch</h3>
              <p className="sub-title text-main-4">
                Our one-to-one support is a big part of Vemus company. Contact
                us by phone or email to get help from our qualified team.
              </p>
              <form
                className="form-contact style-border"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-content">
                  <div className="cols tf-grid-layout sm-col-2">
                    <fieldset>
                      <input type="text" placeholder="Name *" required />
                    </fieldset>
                    <fieldset>
                      <input type="email" placeholder="Email *" required />
                    </fieldset>
                  </div>
                  <textarea
                    placeholder="Message"
                    style={{ height: 229 }}
                    defaultValue={""}
                  />
                </div>
                <button
                  type="submit"
                  className="tf-btn btn-fill animate-btn w-100"
                >
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
