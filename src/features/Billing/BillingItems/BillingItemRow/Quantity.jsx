import { Input } from "@/shared/components/form/Input";
import Label from "@/shared/components/form/Label";
import React, { useEffect } from "react";
import { onChangeHandler } from "./funcs";

const Quantity = ({
  billingItems,
  setBillingItems,
  rowData,
  index,
  quantity,
  setQuantity,
}) => {
  useEffect(() => {
    onChangeHandler("quantity", quantity, billingItems, setBillingItems, index);
  }, [quantity]);
  return (
    <div className="flex-1 w-full">
      <Label>Quantity</Label>
      <Input
        type="number"
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      />
    </div>
  );
};

export default Quantity;
