"use client";

import React, { useEffect, useState } from "react";
import { calculateGrandTotal } from "../../re_usables/funcs";
import Discount_Line from "./Discount_Line";
import GST_Line from "./GST_Line";
import { bill_price_details_store } from "../../re_usables/store";

const FinalPrice = ({ itemDetails }) => {
  const [discount, setDiscount] = useState(0);
  const [gst_percent, set_gst_percent] = useState(0);

  const {
    price_after_discount,
    price_before_discount,
    gst_amount,
    grand_total,
    price_after_gst,
  } = calculateGrandTotal(itemDetails, discount, gst_percent);

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
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
      <Discount_Line
        price_before_discount={price_before_discount}
        price_after_discount={price_after_discount}
        discount={discount}
        setDiscount={setDiscount}
      />
      console.log("billing items useffect : ", billingItems);
      <GST_Line
        gst_percent={gst_percent}
        set_gst_percent={set_gst_percent}
        gst_amount={gst_amount}
        price_after_gst={price_after_gst}
      />
      {/* Grand Total */}
      <div className="flex gap-2 items-center border-t border-gray-300 pt-2">
        <span className="text-sm text-gray-700 font-medium">Grand Total:</span>
        <span className="text-lg font-bold text-blue-600">₹{grand_total}</span>
      </div>
    </div>
  );
};

export default FinalPrice;
