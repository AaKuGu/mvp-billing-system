import Label from "@/shared/components/form/Label";
import React from "react";
import { handleTotalPriceChange } from "./funcs";

const TotalPrice = ({ customProduct, totalPrice }) => {
  return (
    <div className="flex-1">
      <Label>Total</Label>
      {customProduct ? (
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => {
            handleTotalPriceChange(e, billingItems, d, setBillingItems, i);
          }}
          className="p-2 border rounded w-full"
          placeholder="Enter total"
        />
      ) : (
        <div className="p-2 border rounded bg-gray-50">₹{totalPrice}</div>
      )}
    </div>
  );
};

export default TotalPrice;
