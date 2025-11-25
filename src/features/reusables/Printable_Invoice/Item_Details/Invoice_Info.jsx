import React from "react";

const Invoice_Info = ({ invoice_info }) => {
  const { bill_number, id, created_date } = invoice_info || {};
  return (
    <div className="text-xs sm:text-sm">
      <p className="break-words">
        <span className="font-semibold">Bill No:</span> {bill_number}
      </p>
      <p className="break-words">
        <span className="font-semibold">Bill Date:</span> {created_date}
      </p>
    </div>
  );
};

export default Invoice_Info;
