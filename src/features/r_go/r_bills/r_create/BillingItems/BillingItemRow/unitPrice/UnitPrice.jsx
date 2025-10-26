import Label from "@/re_usables/components/form/Label";
import React from "react";
import { handleUnitPriceChange } from "./funcs";
import { Input } from "@/re_usables/components/form/Input";

const UnitPrice = ({ unitPrice, customProduct, setUnitPrice }) => {
  return (
    <div className="flex-1 w-full">
      <Label>Unit Price</Label>
      {/* {customProduct ? (
        <Input
          type="number"
          value={unitPrice}
          onChange={(e) => {
            setUnitPrice(e.target.value);
            // handleUnitPriceChange(e, billingItems, d, setBillingItems, i)
          }}
          placeholder="Enter"
        />
      ) : (
        <div className="p-2 border rounded bg-gray-50 w-24 text-center">
          ₹{unitPrice}
        </div>
      )} */}
      {
        <Input
          type="number"
          value={unitPrice}
          onChange={(e) => {
            setUnitPrice(e.target.value);
            // handleUnitPriceChange(e, billingItems, d, setBillingItems, i)
          }}
          placeholder="Enter"
        />
      }
    </div>
  );
};

export default UnitPrice;
