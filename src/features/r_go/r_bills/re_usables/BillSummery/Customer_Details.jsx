import React from "react";

const Customer_Details = ({ customer_details }) => {
  const { customer_name, customer_address_area, whatsapp_num } =
    customer_details || {};

  return (
    <div className="text-sm sm:text-base space-y-2 text-black">
      <div>
        <span className="font-semibold text-gray-700">Customer:</span>{" "}
        {customer_name || <span className="text-gray-500">N/A</span>}
      </div>
      <div>
        <span className="font-semibold text-gray-700">WhatsApp:</span>{" "}
        {whatsapp_num || <span className="text-gray-500">N/A</span>}
      </div>
      <div>
        <span className="font-semibold text-gray-700">Address/Area:</span>{" "}
        {customer_address_area || <span className="text-gray-500">N/A</span>}
      </div>
    </div>
  );
};

export default Customer_Details;
