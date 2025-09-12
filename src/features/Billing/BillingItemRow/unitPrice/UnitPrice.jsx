import Label from "@/shared/components/form/Label";
import React from "react";
import { handleUnitPriceChange } from "./funcs";
import { Input } from "@/shared/components/form/Input";

const UnitPrice = ({ unitPrice, customProduct, setUnitPrice }) => {
  // const unitPriceHandlerForDBProduct = () => {
  // const unitValue = selectedProductFromDB.wholesale.find(
  //   (f) => f.unit === d.unit
  // );
  // const newBilling = [...billingItems];
  // newBilling[i].unitPrice = unitValue?.price;
  // setBillingItems(newBilling);
  //   return unitValue?.price;
  // };

  return (
    <div className="flex flex-col items-start w-full">
      <Label>Unit Price</Label>
      {customProduct ? (
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
      )}
    </div>
  );
};

export default UnitPrice;
