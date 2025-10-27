import React from "react";

const Bill_Details = ({ pricing_details }) => {
  const {
    price_before_discount = 0,
    discount = 0,
    price_after_discount = 0,
    gst_percent = 0,
    gst_amount = 0,
    price_after_gst = 0,
    round_off = 0,
    grand_total = 0,
  } = pricing_details || {};

  return (
    <div className="border-t border-gray-300 mt-4 pt-4 flex flex-col items-end text-base sm:text-lg space-y-2">
      {/* Subtotal */}
      <div className="flex justify-between w-full sm:w-[60%] md:w-[45%]">
        <span className="text-gray-600 font-semibold">Subtotal:</span>
        <span className="text-gray-900 font-bold">
          ₹{price_before_discount.toFixed(2)}
        </span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between w-full sm:w-[60%] md:w-[45%]">
          <span className="text-gray-600 font-semibold">Discount:</span>
          <span className="text-red-600 font-bold">
            - ₹{discount.toFixed(2)}
          </span>
        </div>
      )}

      {/* After Discount */}
      <div className="flex justify-between w-full sm:w-[60%] md:w-[45%]">
        <span className="text-gray-600 font-semibold">After Discount:</span>
        <span className="text-gray-900 font-bold">
          ₹{price_after_discount.toFixed(2)}
        </span>
      </div>

      {/* GST */}
      {gst_percent > 0 && (
        <div className="flex justify-between w-full sm:w-[60%] md:w-[45%]">
          <span className="text-gray-600 font-semibold">
            GST ({gst_percent}%):
          </span>
          <span className="text-gray-900 font-bold">
            ₹{gst_amount.toFixed(2)}
          </span>
        </div>
      )}

      {/* After GST */}
      <div className="flex justify-between w-full sm:w-[60%] md:w-[45%]">
        <span className="text-gray-600 font-semibold">After GST:</span>
        <span className="text-gray-900 font-bold">
          ₹{price_after_gst.toFixed(2)}
        </span>
      </div>

      {/* Round Off */}
      {round_off !== 0 && (
        <div className="flex justify-between w-full sm:w-[60%] md:w-[45%]">
          <span className="text-gray-600 font-semibold">Round Off:</span>
          <span className="text-gray-900 font-bold">
            {round_off.toFixed(2)}
          </span>
        </div>
      )}

      {/* Grand Total */}
      <div className="flex justify-between w-full sm:w-[60%] md:w-[45%] border-t border-gray-400 pt-3">
        <span className="text-gray-700 font-bold text-xl sm:text-2xl">
          Grand Total:
        </span>
        <span className="text-green-700 font-extrabold text-xl sm:text-2xl">
          ₹{grand_total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Bill_Details;
