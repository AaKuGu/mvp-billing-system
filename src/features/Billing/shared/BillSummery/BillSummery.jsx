import React from "react";
import Main from "../../CreateOrUpdateBill/PrintableBill/Main";
import { calculateGrandTotal } from "@/features/Billing/shared/func";
// import { calculateGrandTotal } from "../../PrintableBill/funcs";

const BillSummery = ({
  customerDetails: { customerName, whatsappNum, customerAddressArea },
  itemDetails,
}) => {
  const grandTotal = calculateGrandTotal(itemDetails);

  return (
    <>
      <div className="mb-4 text-3xl w-full">
        <strong>Customer:</strong> {customerName || "N/A"} <br />
        <strong>WhatsApp:</strong> {whatsappNum || "N/A"} <br />
        <strong>Address/Area:</strong> {customerAddressArea || "N/A"} <br />
      </div>
      <Main itemDetails={itemDetails} />
      <div className="text-right mt-4 font-bold w-full  ">₹{grandTotal}</div>
    </>
  );
};

export default BillSummery;
