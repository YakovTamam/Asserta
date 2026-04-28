import Link from "next/link";
import React from "react";

export default function EmptyOrder() {
  return (
    <div className="my-acount-content account-order empty">
      <div className="ic-img">
        <img
          alt="Emty Cart"
          src="images/section/empty-cart.svg"
          width={353}
          height={352}
        />
      </div>
      <p className="title text-lg-2">You haven’t placed any order yet</p>
      <p className="sub-title">It’s time to make your first order</p>
      <Link href={`/account-orders`} className="tf-btn fw-medium">
        BUTTON
      </Link>
    </div>
  );
}
