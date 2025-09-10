import React from "react";

const CustomerDetails = ({
  customerName,
  setCustomerName,
  setWhatsappNum,
  whatsappNum,
}) => {
  return (
    <>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label>Whatsapp Number</label>
        <input
          type="number"
          value={whatsappNum}
          onChange={(e) => setWhatsappNum(e.target.value)}
        />
      </div>
    </>
  );
};

export default CustomerDetails;
