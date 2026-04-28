"use client";

export default function CommentForm() {
  return (
    <div className="leave-comment-wrap">
      <h3 className="fw-normal text-uppercase">Leave a comment</h3>
      <p className="sub-title">
        Your email address will not be published. Required fields are marked *
      </p>
      <form className="form-comment" onSubmit={(e) => e.preventDefault()}>
        <div className="form-content">
          <div className="cols tf-grid-layout sm-col-2">
            <fieldset className="tf-field">
              <input className="tf-input" type="text" placeholder="" />
              <label className="tf-lable">Your Name *</label>
            </fieldset>
            <fieldset className="tf-field">
              <input className="tf-input" type="email" placeholder="" />
              <label className="tf-lable">Your Email *</label>
            </fieldset>
          </div>
          <fieldset className="tf-field d-flex">
            <textarea className="tf-input" placeholder="" defaultValue={""} />
            <label className="tf-lable type-2">Write Comment...*</label>
          </fieldset>
        </div>
        <div className="btn-submit">
          <button type="submit" className="tf-btn btn-fill animate-btn">
            POST COMMENT
          </button>
        </div>
      </form>
    </div>
  );
}
