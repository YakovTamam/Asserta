"use client";

export default function UnavailableModal() {
  return (
    <div
      className="modal modalCentered fade modal-unavailable"
      id="unavailable"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span className="icon-close-popup" data-bs-dismiss="modal">
            <i className="icon-close" />
          </span>
          <div className="tf-product-notify">
            <h4 className="title">Notify me when it back in stock</h4>
            <p className="sub-title text-main-6">
              Enter your email address to be notified if the product becomes
              available again.
            </p>
            <form
              className="style-border form-notify"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-content-2">
                <input type="text" required placeholder="Name" />
                <input type="text" required placeholder="Email*" />
              </div>
              <button
                type="submit"
                className="tf-btn btn-fill-2 w-100 fw-medium animate-btn"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
