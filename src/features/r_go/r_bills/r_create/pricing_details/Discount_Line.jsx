// import { Input } from "@/re_usables/components/form/Input";
// import React, { useEffect, useState } from "react";
// import { calculateGrandTotal } from "../../re_usables/funcs";
// import { use_billingItems_details } from "../store";

// const Discount_Line = ({ pricing_details, set_pricing_details }) => {
//   const {
//     price_before_discount = 0,
//     price_after_discount = 0,
//     // discount = 0,
//   } = pricing_details || {};

//   const { billingItems } = use_billingItems_details();

//   const [discount, set_discount] = useState(0);

//   return (
//     <div className={`w-full flex gap-3 `}>
//       <div className="flex gap-2 items-center">
//         <span className="text-sm text-gray-700 font-medium">
//           Total Of Product Costs:
//         </span>
//         <span className="text-base font-semibold text-gray-800">
//           ₹{price_before_discount?.toFixed(2)}
//         </span>
//       </div>

//       {/* Discount input */}
//       <div className="flex gap-2 items-center">
//         <label htmlFor="discount" className="text-sm text-gray-700 font-medium">
//           Discount:
//         </label>
//         <Input
//           id="discount"
//           type="number"
//           className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
//           value={pricing_details?.discount}
//           onChange={(e) => {
//             const val = parseFloat(e.target.value);
//             set_discount(val);
//             // set_pricing_details((prev) => ({ ...prev, discount: val }));
//             // set_pricing_details((prev) => ({...prev, }))
//             const { gst_percent = 0 } = pricing_details;

//             calculateGrandTotal(
//               billingItems,
//               set_pricing_details,
//               val,
//               gst_percent
//             );
//           }}
//           min={0}
//           max={price_before_discount}
//         />
//       </div>

//       <div className="flex gap-2 items-center">
//         <span className="text-sm text-gray-700 font-medium">
//           After Discount :
//         </span>
//         <span className="text-base font-semibold text-gray-800">
//           ₹{price_after_discount?.toFixed(2)}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Discount_Line;



import { Input } from "@/re_usables/components/form/Input";
import React, { useState } from "react";
import { calculateGrandTotal } from "../../re_usables/funcs";
import { use_billingItems_details } from "../store";

const Discount_Line = ({ pricing_details, set_pricing_details }) => {
  const { price_before_discount = 0, price_after_discount = 0 } =
    pricing_details || {};

  const { billingItems } = use_billingItems_details();
  const [discount, set_discount] = useState(0);

  return (
    <div
      className={`
        w-full flex flex-wrap md:flex-nowrap gap-3 md:gap-6 
        justify-between items-center border border-gray-200 rounded-md 
        p-3 md:p-4 bg-white
      `}
    >
      {/* Total Before Discount */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <span className="text-sm text-gray-700 font-medium text-nowrap">
          Total Of Product Costs:
        </span>
        <span className="text-base font-semibold text-gray-800">
          ₹{price_before_discount?.toFixed(2)}
        </span>
      </div>

      {/* Discount Input */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <label
          htmlFor="discount"
          className="text-sm text-gray-700 font-medium text-nowrap"
        >
          Discount:
        </label>
        <Input
          id="discount"
          type="number"
          className="w-full sm:w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
          value={pricing_details?.discount}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            set_discount(val);
            const { gst_percent = 0 } = pricing_details;
            calculateGrandTotal(
              billingItems,
              set_pricing_details,
              val,
              gst_percent
            );
          }}
          min={0}
          max={price_before_discount}
        />
      </div>

      {/* Total After Discount */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <span className="text-sm text-gray-700 font-medium text-nowrap">
          After Discount:
        </span>
        <span className="text-base font-semibold text-gray-800">
          ₹{price_after_discount?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Discount_Line;
