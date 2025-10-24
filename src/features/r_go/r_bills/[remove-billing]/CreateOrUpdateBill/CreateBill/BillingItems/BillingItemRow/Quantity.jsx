import { Input } from "@/re_usables/components/form/Input";
import Label from "@/re_usables/components/form/Label";
import React, { useEffect, useState } from "react";
import { onChangeHandler } from "./funcs";

const Quantity = ({
  billingItems,
  setBillingItems,
  rowData,
  index,
  quantity,
  setQuantity,
  unitName,
  customProduct,
  name,
}) => {
  const [max, setMax] = useState(0);

  useEffect(() => {
    onChangeHandler("quantity", quantity, billingItems, setBillingItems, index);
  }, [quantity]);

  useEffect(() => {
    if (unitName && rowData?.dataFromDB?.units?.length) {
      rowData?.dataFromDB?.units?.find((d) => {
        if (d.unitName === unitName) {
          setMax(d.totalQuantity);
        }
      });
    }
  }, [unitName, name]);

  return (
    <div className="flex-1 w-full">
      <Label>Quantity</Label>
      <Input
        type="number"
        max={customProduct ? null : max}
        min={0}
        value={quantity}
        onChange={(e) => {
          let inputValue = Number(e.target.value);

          if (customProduct) {
            setQuantity(inputValue);
          } else {
            // Clamp value to min/max range
            if (inputValue > max) inputValue = max;
            if (inputValue < 0) inputValue = 0;

            setQuantity(inputValue);
          }
        }}
      />
    </div>
  );
};

export default Quantity;
