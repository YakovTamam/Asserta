import React from "react";
import Image from "next/image";

export default function Intro() {
  return (
    <section className="s-brand-intro flat-spacing-6 pb-0">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            <div className="brand-intro_image mb-md-0">
              <Image
                src="/images/section/brand-intro.jpg"
                alt=""
                className="lazyload intro-photo"
                width={918}
                height={1228}
              />
              <div className="brand-box">
                <Image
                  src="/images/section/item-1.png"
                  alt=""
                  className="lazyload"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="brand-intro_subtitle">we are vemus</h6>
            <h2 className="brand-intro_title">
              very piece of jewelry should feel as special as the moment it
              represents.
            </h2>
            <p className="brand-intro_text">
              From the delicate curves of a handcrafted ring to the brilliance
              of a perfectly cut diamond, each piece we create is a reflection
              of artistry, precision, and emotion. Inspired by beauty, heritage,
              and modern sophistication, we blend traditional techniques with
              contemporary designs to bring you jewelry that lasts a lifetime.
            </p>
            <span className="br-line" />
            <div className="brand-intro_author flex-sm-nowrap">
              <div className="author-info">
                <Image
                  alt="Author"
                  className="img-author"
                  src="/images/avatar/avt-1.jpg"
                  width={100}
                  height={100}
                />
                <div className="info">
                  <h5 className="name">
                    <a href="#" className="link">
                      John Smith
                    </a>
                  </h5>
                  <span className="duty text-main-4">Founder of Vemus</span>
                </div>
              </div>
              <div className="author-signature">
                <Image
                  alt="Signature"
                  src="/images/section/signature.svg"
                  width={296}
                  height={81}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
