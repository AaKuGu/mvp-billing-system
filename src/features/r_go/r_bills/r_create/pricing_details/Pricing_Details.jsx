"use client";

import React, { useEffect, useRef, useState } from "react";
// import { calculateGrandTotal } from "../../../re_usables/funcs";
// import { bill_pricing_details_store } from "../../../re_usables/store";
import Discount_Line from "./Discount_Line";
import {
  calculateGrandTotal,
  onlyItemDetailsHandler,
} from "../../re_usables/funcs";
import GST_Line from "./GST_Line";
import { use_billingItems_details, use_pricing_details } from "../store";

const Pricing_Details = () => {
  const { pricing_details, set_pricing_details } = use_pricing_details();
  const { billingItems } = use_billingItems_details();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender.current = false;
      return;
    }

    alert("domi");

    const { discount = 0, gst_percent = 0 } = pricing_details;

    calculateGrandTotal(
      billingItems,
      set_pricing_details,
      discount,
      gst_percent
    );
  }, [billingItems]);

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
      {JSON.stringify(pricing_details)}
      {JSON.stringify(billingItems)}

      <Discount_Line
        pricing_details={pricing_details}
        set_pricing_details={set_pricing_details}
      />

      <GST_Line
        pricing_details={pricing_details}
        set_pricing_details={set_pricing_details}
      />
      <div className="flex gap-2 items-center border-t border-gray-300 pt-2">
        <span className="text-sm text-gray-700 font-medium">Round Off:</span>
        <span className="text-base font-semibold text-gray-800">
          ₹{pricing_details?.round_off}
        </span>
      </div>
      {/* Grand Total */}
      <div className="flex gap-2 items-center border-t border-gray-300 pt-2">
        <span className="text-sm text-gray-700 font-medium">Grand Total:</span>
        <span className="text-lg font-bold text-blue-600">
          ₹{pricing_details?.grand_total}
        </span>
      </div>
    </div>
  );
};

export default Pricing_Details;
