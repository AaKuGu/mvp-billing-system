import React from "react";

const Customer_Details = ({ customer_details }) => {
  const { customer_name, whatsapp_num, customer_address_area } =
    customer_details || {};
  return (
    <div>
      <p>
        <span className="font-semibold">Customer:</span> {customer_name}
      </p>
      <p>
        <span className="font-semibold">Phone:</span> {whatsapp_num}
      </p>
      <p>
        <span className="font-semibold">Address:</span> {customer_address_area}
      </p>
    </div>
  );
};

export default Customer_Details;
