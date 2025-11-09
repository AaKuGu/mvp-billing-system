import React from "react";

const Customer_Details = ({ customer_details }) => {
  const { customer_name, whatsapp_num, customer_address_area } =
    customer_details || {};
  return (
    <div className="text-xs sm:text-sm sm:text-right">
      <p className="break-words">
        <span className="font-semibold">Customer:</span> {customer_name}
      </p>
      <p className="break-words">
        <span className="font-semibold">Phone:</span> {whatsapp_num}
      </p>
      <p className="break-words">
        <span className="font-semibold">Address:</span> {customer_address_area}
      </p>
    </div>
  );
};

export default Customer_Details;
