"use client";
export default function QuantitySelect({
  quantity = 1,
  setQuantity = () => {},
  styleClass = "",
}) {
  return (
    <>
      <div className={`wg-quantity ${styleClass} `}>
        <button
          className="btn-quantity btn-decrease"
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
        >
          <i className="icon-minus" />
        </button>
        <input
          className="quantity-product"
          type="number"
          name="number"
          value={quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value > 0) {
              setQuantity(value);
            }
          }}
        />
        <span
          className="btn-quantity btn-increase"
          onClick={() => setQuantity(quantity + 1)}
          role="button"
          tabIndex={0}
        >
          <i className="icon-plus" />
        </span>
      </div>
    </>
  );
}
