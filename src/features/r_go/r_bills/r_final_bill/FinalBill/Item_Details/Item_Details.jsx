import React from "react";
import ItemsTable from "./ItemsTable";
import { calculateGrandTotal } from "../../../re_usables/funcs";

const Item_Details = ({ item_details, bill_discount = 0 }) => {
  const { price_after_discount, price_before_discount } = calculateGrandTotal(
    item_details,
    bill_discount
  );

  const discountAmount = price_before_discount - price_after_discount;

  return (
    <>
      <ItemsTable item_details={item_details} />

      {/* Summary Totals */}
      <div className="mt-6 flex justify-end text-sm print:text-xs">
        <div className="w-full sm:w-1/2 border-t border-gray-300 pt-2 space-y-1">
          {/* Subtotal */}
          <div className="flex justify-between py-1">
            <span className="font-medium text-gray-700">Subtotal:</span>
            <span className="text-gray-800">
              ₹{price_before_discount.toFixed(2)}
            </span>
          </div>

          {/* Discount (if any) */}
          {discountAmount > 0 && (
            <div className="flex justify-between py-1">
              <span className="font-medium text-gray-700">Discount:</span>
              <span className="text-red-600">
                - ₹{discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          {/* Grand Total */}
          <div className="flex justify-between py-2 text-lg font-bold text-blue-700 border-t border-gray-300 mt-2">
            <span>Grand Total:</span>
            <span>₹{price_after_discount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item_Details;
