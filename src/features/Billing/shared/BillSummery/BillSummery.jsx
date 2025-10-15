import React from "react";
import Main from "../../CreateOrUpdateBill/PrintableBill/Main";
import { calculateGrandTotal } from "@/features/Billing/shared/func";

const BillSummery = ({
  customerDetails: { customerName, whatsappNum, customerAddressArea },
  itemDetails,
}) => {
  const grandTotal = calculateGrandTotal(itemDetails);

  return (
    <div className="w-full px-4 py-5 bg-white rounded-md shadow-md space-y-6">
      {/* Customer Info */}
      <div className="text-sm sm:text-base space-y-2">
        <div>
          <span className="font-semibold text-gray-700">Customer:</span>{" "}
          {customerName || <span className="text-gray-500">N/A</span>}
        </div>
        <div>
          <span className="font-semibold text-gray-700">WhatsApp:</span>{" "}
          {whatsappNum || <span className="text-gray-500">N/A</span>}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Address/Area:</span>{" "}
          {customerAddressArea || <span className="text-gray-500">N/A</span>}
        </div>
      </div>

      {/* Bill Table */}
      <div>
        <Main itemDetails={itemDetails} />
      </div>

      {/* Grand Total */}
      <div className="text-right text-lg sm:text-xl font-bold text-green-700 border-t pt-4">
        Grand Total: ₹{grandTotal}
      </div>
    </div>
  );
};

export default BillSummery;
