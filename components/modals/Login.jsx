"use client";
import React from "react";

export default function Login() {
  return (
    <div className="modal modalCentered fade modal-log" id="log">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-top">
            <span className="icon-close-popup" data-bs-dismiss="modal">
              <i className="icon-close" />
            </span>
            <h3 className="title fw-normal text-uppercase">login</h3>
          </div>
          <div className="modal-bottom">
            <form className="form-log" onSubmit={(e) => e.preventDefault()}>
              <div className="form-content">
                <fieldset className="tf-field">
                  <input
                    className="tf-input"
                    type="text"
                    placeholder=""
                    defaultValue="Hello@vemus.com"
                    required
                  />
                  <label className="tf-lable">Username *</label>
                </fieldset>
                <fieldset className="tf-field">
                  <input
                    className="tf-input"
                    type="password"
                    placeholder=""
                    required
                  />
                  <label className="tf-lable">Password *</label>
                </fieldset>
              </div>
              <div className="bottom">
                <div className="checkbox-wrap">
                  <input id="remember" type="checkbox" className="tf-check" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#reset" data-bs-toggle="offcanvas" className="link">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="btn-submit tf-btn btn-fill-2 w-100"
              >
                LOG IN
              </button>
            </form>
            <div className="other-login">
              <a href="#" className="tf-btn btn-fill-3 ic-abs w-100 fw-medium">
                <span className="icon">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx={12} cy={12} r={12} fill="#3B5998" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.1163 7.992L13.9867 7.99275C13.101 7.99275 12.9293 8.4135 12.9293 9.03075V10.3927H15.042L14.7667 12.5265H12.9293V18H10.7265V12.5265H8.8845V10.3927H10.7265V8.82C10.7265 6.99375 11.8417 6 13.47 6C14.25 6 14.9205 6.05775 15.1163 6.084V7.992ZM12 0C5.373 0 0 5.37225 0 12C0 18.627 5.373 24 12 24C18.6278 24 24 18.627 24 12C24 5.37225 18.6278 0 12 0Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Log in with Facebook
              </a>
              <a href="#" className="tf-btn style-2 ic-abs w-100 fw-medium">
                <span className="icon">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M23.0938 9.91258L13.3045 9.91211C12.8722 9.91211 12.5218 10.2625 12.5218 10.6947V13.822C12.5218 14.2542 12.8722 14.6046 13.3044 14.6046H18.8172C18.2135 16.1712 17.0869 17.4832 15.6494 18.3168L18 22.386C21.7707 20.2052 24 16.3789 24 12.0955C24 11.4857 23.9551 11.0497 23.8652 10.5587C23.7968 10.1858 23.473 9.91258 23.0938 9.91258Z"
                        fill="#167EE6"
                      />
                      <path
                        d="M12 19.3037C9.30218 19.3037 6.94699 17.8297 5.68207 15.6484L1.61304 17.9938C3.68374 21.5826 7.56283 23.9994 12 23.9994C14.1768 23.9994 16.2307 23.4133 18 22.3919V22.3863L15.6494 18.3171C14.5742 18.9408 13.3299 19.3037 12 19.3037Z"
                        fill="#12B347"
                      />
                      <path
                        d="M18 22.3932V22.3876L15.6494 18.3184C14.5741 18.9419 13.33 19.3049 12 19.3049V24.0006C14.1767 24.0006 16.2308 23.4145 18 22.3932Z"
                        fill="#0F993E"
                      />
                      <path
                        d="M4.69566 12.0003C4.69566 10.6705 5.05856 9.42637 5.68205 8.3512L1.61302 6.00586C0.586031 7.76962 0 9.81797 0 12.0003C0 14.1826 0.586031 16.2309 1.61302 17.9947L5.68205 15.6494C5.05856 14.5742 4.69566 13.3301 4.69566 12.0003Z"
                        fill="#FFD500"
                      />
                      <path
                        d="M12 4.69566C13.7593 4.69566 15.3753 5.32078 16.6375 6.36061C16.9489 6.61711 17.4014 6.59859 17.6867 6.31336L19.9024 4.09758C20.2261 3.77395 20.203 3.24422 19.8573 2.94431C17.7425 1.10967 14.991 0 12 0C7.56283 0 3.68374 2.41673 1.61304 6.00558L5.68207 8.35092C6.94699 6.16969 9.30218 4.69566 12 4.69566Z"
                        fill="#FF4B26"
                      />
                      <path
                        d="M16.6374 6.36061C16.9488 6.61711 17.4015 6.59859 17.6866 6.31336L19.9024 4.09758C20.226 3.77395 20.2029 3.24422 19.8573 2.94431C17.7425 1.10962 14.991 0 12 0V4.69566C13.7592 4.69566 15.3752 5.32078 16.6374 6.36061Z"
                        fill="#D93F21"
                      />
                    </g>
                  </svg>
                </span>
                Log in with Google
              </a>
            </div>
            <div className="text-center">
              <a
                href="#register"
                data-bs-toggle="modal"
                className="tf-btn-line"
              >
                New customer? Create your account
                <i className="icon-arrow-top-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
