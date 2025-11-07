// import React from "react";
// import { use_billingItems_details } from "../store";
// import { calculateGrandTotal } from "../../re_usables/funcs";

// const GST_Line = ({ pricing_details, set_pricing_details }) => {
//   const { gst_amount, price_after_gst } = pricing_details;
//   const { billingItems } = use_billingItems_details();

//   return (
//     <div className="flex gap-2 items-center">
//       <label htmlFor="discount" className="text-sm text-gray-700 font-medium">
//         Gst %:
//       </label>
//       <input
//         id="gst_%"
//         type="number"
//         className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
//         value={pricing_details?.gst_percent}
//         onChange={(e) => {
//           const val = parseFloat(e.target.value);
//           const { discount = 0 } = pricing_details;

//           calculateGrandTotal(billingItems, set_pricing_details, discount, val);
//           // set_pricing_details((prev) => ({ ...prev, gst_percent: val }));
//         }}
//         min={0}
//         max={100}
//       />{" "}
//       <div className="flex gap-2 items-center">
//         <span className="text-sm text-gray-700 font-medium">GST Amount :</span>
//         <span className="text-base font-semibold text-gray-800">
//           ₹{gst_amount}
//         </span>
//       </div>
//       <div className="flex gap-2 items-center">
//         <span className="text-sm text-gray-700 font-medium">
//           Price After GST :
//         </span>
//         <span className="text-base font-semibold text-gray-800">
//           ₹{price_after_gst}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default GST_Line;



import React from "react";
import { use_billingItems_details } from "../store";
import { calculateGrandTotal } from "../../re_usables/funcs";

const GST_Line = ({ pricing_details, set_pricing_details }) => {
  const { gst_amount = 0, price_after_gst = 0 } = pricing_details || {};
  const { billingItems } = use_billingItems_details();

  return (
    <div
      className={`
        w-full flex flex-wrap md:flex-nowrap gap-3 md:gap-6
        justify-between items-center border border-gray-200 rounded-md
        p-3 md:p-4 bg-white
      `}
    >
      {/* GST Input */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <label
          htmlFor="gst_%"
          className="text-sm text-gray-700 font-medium text-nowrap"
        >
          GST %:
        </label>
        <input
          id="gst_%"
          type="number"
          className="w-full sm:w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right"
          value={pricing_details?.gst_percent}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            const { discount = 0 } = pricing_details;
            calculateGrandTotal(
              billingItems,
              set_pricing_details,
              discount,
              val
            );
          }}
          min={0}
          max={100}
        />
      </div>

      {/* GST Amount */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <span className="text-sm text-gray-700 font-medium text-nowrap">
          GST Amount:
        </span>
        <span className="text-base font-semibold text-gray-800">
          ₹{gst_amount?.toFixed(2)}
        </span>
      </div>

      {/* Price After GST */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <span className="text-sm text-gray-700 font-medium text-nowrap">
          Price After GST:
        </span>
        <span className="text-base font-semibold text-gray-800">
          ₹{price_after_gst?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default GST_Line;
