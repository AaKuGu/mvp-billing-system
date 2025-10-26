import React from "react";

const Bill_Details = ({ price_details }) => {
  const {
    price_before_discount = 0,
    discount = 0,
    price_after_discount = 0,
    gst_percent = 0,
    gst_amount = 0,
    price_after_gst = 0,
    round_off = 0,
    grand_total = 0,
  } = price_details || {};

  return (
    <div className="text-right text-sm sm:text-base border-t pt-4 space-y-1">
      <div>
        <span className="text-gray-600 font-medium">Subtotal:</span>{" "}
        <span className="text-gray-800 font-semibold">
          ₹{price_before_discount}
        </span>
      </div>
      <div>
        <span className="text-gray-600 font-medium">Discount:</span>{" "}
        <span className="text-red-600 font-semibold">- ₹{discount}</span>
      </div>
      <div>
        <span className="text-gray-600 font-medium">Price after Discount:</span>{" "}
        <span className="text-gray-800 font-semibold">
          ₹{price_after_discount}
        </span>
      </div>
      <div>
        <span className="text-gray-600 font-medium">GST ({gst_percent}%):</span>{" "}
        <span className="text-gray-800 font-semibold">₹{gst_amount}</span>
      </div>
      <div>
        <span className="text-gray-600 font-medium">Price after GST:</span>{" "}
        <span className="text-gray-800 font-semibold">₹{price_after_gst}</span>
      </div>
      <div>
        <span className="text-gray-600 font-medium">Round Off:</span>{" "}
        <span className="text-gray-800 font-semibold">₹{round_off}</span>
      </div>
      <div className="text-lg sm:text-xl font-bold text-green-700 pt-2">
        Grand Total: ₹{grand_total}
      </div>
    </div>
  );
};

export default Bill_Details;
