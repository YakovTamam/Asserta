"use client";

import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
export default function NewsLetter() {
  const modalElement = useRef();
  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap"); // dynamically import bootstrap
      const myModal = new bootstrap.Modal(
        document.getElementById("newsletterPopup"),
        {
          keyboard: false,
        }
      );

      // Show the modal after a delay using a promise
      await new Promise((resolve) => setTimeout(resolve, 2000));
      myModal.show();

      modalElement.current?.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    };

    showModal();
  }, []);
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };
  return (
    <div
      className="modal modalCentered fade auto-popup modal-auto-newletter"
      id="newsletterPopup"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span className="icon-close-popup" data-bs-dismiss="modal">
            <i className="icon-close" />
          </span>
          <div className="modal-body">
            <div className="image">
              <Image
                alt=""
                width={876}
                height={1120}
                src="/images/banner/banner-newletter.jpg"
              />
            </div>
            <div className="content text-center">
              <div className="heading">
                <h2 className="title text-uppercase">Get 15% OFF</h2>
                <p className="sub-title">
                  SUBCRIBE TO OUR NEWSLETTER &amp; RECEIVE A COUPON
                </p>
              </div>
              <div
                className={`tfSubscribeMsg  footer-sub-element ${
                  showMessage ? "active" : ""
                }`}
              >
                {success ? (
                  <p style={{ color: "rgb(52, 168, 83)" }}>
                    You have successfully subscribed.
                  </p>
                ) : (
                  <p style={{ color: "red" }}>Something went wrong</p>
                )}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendEmail(e);
                }}
                className="form-newleter style-border"
              >
                <input
                  className="text-center"
                  type="email"
                  name="email"
                  placeholder="ENTER YOUR EMAIL WHERE WE SEND YOU 15% OFF"
                  required
                />
                <div className="btn-group">
                  <button
                    type="submit"
                    className="tf-btn btn-fill animate-btn w-100"
                  >
                    <span className="fw-medium">GET IT NOW!</span>
                  </button>
                  <a
                    href="#"
                    data-bs-dismiss="modal"
                    className="tf-btn w-100 border-0"
                  >
                    <span className="fw-medium">NO THANKS!</span>
                  </a>
                </div>
              </form>
              <p className="privacy text-main-6">
                Will be used in accordance with our{" "}
                <Link
                  href={`/privacy`}
                  className="tf-btn-line style-line-2 text-main link"
                >
                  <span className="text-body">Privacy Policy</span>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
