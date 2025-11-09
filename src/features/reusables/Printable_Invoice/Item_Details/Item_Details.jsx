import React from "react";
import ItemsTable from "./ItemsTable";

const Item_Details = ({ data }) => {
  const { item_details, pricing_details } = data;

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

  const discountAmount = price_before_discount - price_after_discount;

  return (
    <>
      <ItemsTable item_details={item_details} />

      {/* Horizontal compact summary */}
      <div className="mt-3 flex flex-wrap justify-between items-start gap-x-5 gap-y-2 text-[13px] print:text-[11px] leading-tight border-t border-gray-300 pt-2">
        {/* Subtotal */}
        <div className="flex flex-col">
          <span className="font-medium text-gray-600">Subtotal</span>
          <span className="text-gray-800">
            ₹{price_before_discount.toFixed(2)}
          </span>
        </div>
        {/* Discount */}
        {discount > 0 && (
          <>
            <div className="flex flex-col">
              <span className="font-medium text-gray-600">
                Discount ({discount}%)
              </span>
              <span className="text-red-600">
                -₹{discountAmount.toFixed(2)}
              </span>
            </div>
            {/* Price After Discount */}

            <div className="flex flex-col">
              <span className="font-medium text-gray-600">After Discount</span>
              <span className="text-gray-800">
                ₹{price_after_discount.toFixed(2)}
              </span>
            </div>
          </>
        )}

        {/* GST */}
        {gst_percent > 0 && (
          <>
            <div className="flex flex-col">
              <span className="font-medium text-gray-600">
                GST ({gst_percent}%)
              </span>
              <span className="text-gray-800">₹{gst_amount.toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-600">After GST</span>
              <span className="text-gray-800">
                ₹{price_after_gst.toFixed(2)}
              </span>
            </div>
          </>
        )}

        {round_off !== 0 && (
          <div className="flex flex-col">
            <span className="font-medium text-gray-600">Round Off</span>
            <span className="text-gray-800">{round_off.toFixed(2)}</span>
          </div>
        )}
        {/* Grand Total */}
        <div className="flex flex-col text-blue-800 font-semibold">
          <span className="font-semibold text-gray-700">Grand Total</span>
          <span className="text-[14px] font-bold">
            ₹{grand_total.toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
};

export default Item_Details;
