"use client";

import React, { useEffect, useState } from "react";
import { calculateGrandTotal } from "../../re_usables/funcs";

const FinalPrice = ({ itemDetails, setBillingItems }) => {
  const [discount, setDiscount] = useState(0);

  const { price_after_discount, price_before_discount } = calculateGrandTotal(
    itemDetails,
    discount
  );

  // Load discount on mount
  useEffect(() => {
    const bill_discount = window.localStorage.getItem("bill_discount");
    if (bill_discount !== null) {
      setDiscount(parseFloat(bill_discount));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    window.localStorage.setItem("bill_discount", discount);
  }, [discount]);

  return (
    <div className="w-full flex flex-col items-end gap-4 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
      {/* Subtotal */}
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-700 font-medium">Subtotal:</span>
        <span className="text-base font-semibold text-gray-800">
          ₹{price_before_discount?.toFixed(2)}
        </span>
      </div>

      {/* Discount input */}
      <div className="flex gap-2 items-center">
        <label htmlFor="discount" className="text-sm text-gray-700 font-medium">
          Discount:
        </label>
        <input
          id="discount"
          type="number"
          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
          value={discount}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setDiscount(isNaN(val) ? 0 : val);
          }}
          min={0}
          max={price_before_discount}
        />
      </div>

      {/* Grand Total */}
      <div className="flex gap-2 items-center border-t border-gray-300 pt-2">
        <span className="text-sm text-gray-700 font-medium">Grand Total:</span>
        <span className="text-lg font-bold text-blue-600">
          ₹{price_after_discount?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default FinalPrice;
