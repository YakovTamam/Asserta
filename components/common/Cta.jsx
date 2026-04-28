"use client";

export default function Cta() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="banner_promo wow fadeInUp">
          <h2 className="title fw-normal">Get 15% Off Your First Order</h2>
          <p className="sub-title text-main-4">
            Join us today and enjoy 15% off your first order. Discover timeless
            elegance at irresistible prices!
          </p>
          <form
            className="form-email-2 style-border"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-content">
              <input type="email" placeholder="Email address" required />
            </div>
            <button type="submit" className="tf-btn btn-def-2 type-large px-0">
              sign up now
              <i className="icon-arrow-right-3" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
