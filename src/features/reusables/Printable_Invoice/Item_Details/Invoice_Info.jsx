import React from "react";

const Invoice_Info = ({ invoice_info }) => {
  const { bill_number, id, created_date } = invoice_info || {};
  return (
    <div>
      <p>
        <span className="font-semibold">Bill No:</span> {bill_number}
      </p>
      {/* <p>
        <span className="font-semibold">Invoice ID:</span> {id}
      </p> */}
      <p>
        <span className="font-semibold">Date:</span> {created_date}
      </p>
    </div>
  );
};

export default Invoice_Info;
