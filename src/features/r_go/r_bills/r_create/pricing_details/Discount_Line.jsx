import { Input } from "@/re_usables/components/form/Input";
import React, { useEffect, useState } from "react";
import { calculateGrandTotal } from "../../re_usables/funcs";
import { use_billingItems_details } from "../store";

const Discount_Line = ({ pricing_details, set_pricing_details }) => {
  const {
    price_before_discount = 0,
    price_after_discount = 0,
    // discount = 0,
  } = pricing_details || {};

  const { billingItems } = use_billingItems_details();

  const [discount, set_discount] = useState(0);

  useEffect(() => {
    const str_pricing_details = localStorage.getItem("pricing_details");
    if (str_pricing_details) {
      alert(str_pricing_details);
      const parsed = JSON.stringify(str_pricing_details);
      const discount = parsed?.discount;
      set_discount(discount);
    }
  }, []);

  useEffect(() => {
    const gst_percent = pricing_details.gst_percent;

    calculateGrandTotal(
      billingItems,
      set_pricing_details,
      discount,
      gst_percent
    );
  }, [discount]);

  return (
    <div className={`w-full flex gap-3 `}>
      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-700 font-medium">
          Total Of Product Costs:
        </span>
        <span className="text-base font-semibold text-gray-800">
          ₹{price_before_discount?.toFixed(2)}
        </span>
      </div>

      {/* Discount input */}
      <div className="flex gap-2 items-center">
        <label htmlFor="discount" className="text-sm text-gray-700 font-medium">
          Discount:
        </label>
        <Input
          id="discount"
          type="number"
          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
          value={discount}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            set_discount(val);
            // set_pricing_details((prev) => ({ ...prev, discount: val }));
          }}
          min={0}
          max={price_before_discount}
        />
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-700 font-medium">
          After Discount :
        </span>
        <span className="text-base font-semibold text-gray-800">
          ₹{price_after_discount?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Discount_Line;
