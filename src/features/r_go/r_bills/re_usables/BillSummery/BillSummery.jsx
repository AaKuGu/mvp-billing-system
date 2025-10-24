"use client";

import React, { useEffect, useState } from "react";
import Main from "./Main/Main";
import { calculateGrandTotal } from "../funcs";

const BillSummery = ({
  customerDetails: { customerName, whatsappNum, customerAddressArea },
  itemDetails,
  price_after_discount,
  price_before_discount,
  discountApplied
}) => {

  return (
    <div className="w-full px-4 py-5 bg-white rounded-md shadow-md space-y-6">
      {/* Customer Info */}
      <div className="text-sm sm:text-base space-y-2">
        <div>
          <span className="font-semibold text-gray-700">Customer:</span>{" "}
          {customerName || <span className="text-gray-500">N/A</span>}
        </div>
        <div>
          <span className="font-semibold text-gray-700">WhatsApp:</span>{" "}
          {whatsappNum || <span className="text-gray-500">N/A</span>}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Address/Area:</span>{" "}
          {customerAddressArea || <span className="text-gray-500">N/A</span>}
        </div>
      </div>
      <div>
        <Main itemDetails={itemDetails} />
      </div>
      {/* Summary Section */}
      <div className="text-right text-sm sm:text-base border-t pt-4 space-y-1">
        <div>
          <span className="text-gray-600 font-medium">Subtotal:</span>{" "}
          <span className="text-gray-800 font-semibold">
            ₹{price_before_discount.toFixed(2)}
          </span>
        </div>
        <div>
          <span className="text-gray-600 font-medium">Discount:</span>{" "}
          <span className="text-red-600 font-semibold">
            - ₹{discountApplied.toFixed(2)}
          </span>
        </div>
        <div className="text-lg sm:text-xl font-bold text-green-700 pt-2">
          Grand Total: ₹{price_after_discount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default BillSummery;
