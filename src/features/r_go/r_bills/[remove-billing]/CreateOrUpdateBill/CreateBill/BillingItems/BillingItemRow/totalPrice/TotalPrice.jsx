import { Input } from "@/re_usables/components/form/Input";
import Label from "@/re_usables/components/form/Label";
import React from "react";

const TotalPrice = ({ customProduct, totalPrice, setTotalPrice }) => {
  return (
    <div className="flex-1 w-full">
      <Label>Total</Label>
      {customProduct ? (
        <Input
          type="number"
          value={totalPrice}
          onChange={(e) => {
            setTotalPrice(e.target.value);
            // handleTotalPriceChange(e, billingItems, d, setBillingItems, i);
          }}
          placeholder="Enter total"
        />
      ) : (
        <div className="p-2 border rounded bg-gray-50">₹{totalPrice}</div>
      )}
    </div>
  );
};

export default TotalPrice;
