import Label from "@/shared/components/form/Label";
import React from "react";
import { handleUnitPriceChange } from "./funcs";

const UnitPrice = ({ unitPrice, customProduct }) => {
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
    <div className="flex flex-col items-start">
      <Label>Unit Price</Label>
      {customProduct ? (
        <input
          type="number"
          value={unitPrice}
          onChange={(e) =>
            handleUnitPriceChange(e, billingItems, d, setBillingItems, i)
          }
          className="p-2 border rounded w-24"
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
