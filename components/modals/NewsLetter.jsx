"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function NewsLetter() {
  const modalElement = useRef();

  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap");
      const myModal = new bootstrap.Modal(
        document.getElementById("newsletterPopup"),
        {
          keyboard: false,
        },
      );

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
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        },
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset();
        setSuccess(true);
        handleShowMessage();
      } else {
        setSuccess(false);
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false);
      handleShowMessage();
      e.target.reset();
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
                alt="Asserta Newsletter"
                width={876}
                height={1120}
                src="/images/collections/bracelets.jfif"
              />
            </div>

            <div className="content text-center">
              <div className="heading">
                <h2 className="title text-uppercase">
                  15% הנחה על ההזמנה הראשונה
                </h2>
                <p className="sub-title">
                  הצטרפו לרשימת הלקוחות שלנו וקבלו קוד הנחה ישירות למייל
                </p>
              </div>

              <div
                className={`tfSubscribeMsg footer-sub-element ${
                  showMessage ? "active" : ""
                }`}
              >
                {success ? (
                  <p style={{ color: "rgb(52, 168, 83)" }}>
                    ההרשמה בוצעה בהצלחה ✨
                  </p>
                ) : (
                  <p style={{ color: "red" }}>משהו השתבש, נסי שוב</p>
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
                  placeholder="הכניסו מייל וקבלו 15% הנחה"
                  required
                />

                <div className="btn-group">
                  <button
                    type="submit"
                    className="tf-btn btn-fill animate-btn w-100"
                  >
                    <span className="fw-medium">קבלו את ההטבה</span>
                  </button>

                  <a
                    href="#"
                    data-bs-dismiss="modal"
                    className="tf-btn w-100 border-0"
                  >
                    <span className="fw-medium">אשלם מחיר מלא</span>
                  </a>
                </div>
              </form>

              <p className="privacy text-main-6">
                הפרטים שלך נשמרים בצורה מאובטחת בהתאם ל
                <Link
                  href={`/privacy`}
                  className="tf-btn-line style-line-2 text-main link"
                >
                  <span className="text-body">מדיניות הפרטיות</span>
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
