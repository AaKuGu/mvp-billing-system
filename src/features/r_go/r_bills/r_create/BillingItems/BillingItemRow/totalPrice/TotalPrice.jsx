import { Input } from "@/re_usables/components/form/Input";
import Label from "@/re_usables/components/form/Label";
import React, { useEffect } from "react";
import { use_billingItems_details, use_pricing_details } from "../../../store";
import { calculateGrandTotal } from "@/features/r_go/r_bills/re_usables/funcs";

const TotalPrice = ({ customProduct, totalPrice, setTotalPrice }) => {
  const { pricing_details, set_pricing_details } = use_pricing_details();
  const { billingItems } = use_billingItems_details();

  useEffect(() => {
    const { discount = 0, gst_percent = 0 } = pricing_details;

    calculateGrandTotal(
      billingItems,
      set_pricing_details,
      discount,
      gst_percent
    );
  }, [totalPrice]);

  return (
    <div className="flex-1 w-full">
      <Label>Total</Label>
      {customProduct ? (
        <Input
          type="number"
          value={totalPrice}
          onChange={(e) => {
            setTotalPrice(e.target.value);

            console.log("check me /r_create/billing items/row/totalpice");

            const { discount = 0, gst_percent = 0 } = pricing_details;

            calculateGrandTotal(
              billingItems,
              set_pricing_details,
              discount,
              gst_percent
            );
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
