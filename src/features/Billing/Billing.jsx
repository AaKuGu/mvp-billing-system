"use client";
import React, { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import BillingItems from "./BillingItems";
import { emptyBillProduct } from "./constant";

const Billing = () => {
  const [customerName, setCustomerName] = useState("");
  const [whatsappNum, setWhatsappNum] = useState("");
  const [billingItems, setBillingItems] = useState([emptyBillProduct]);
  return (
    <div className={`w-full min-h-screen  md:px-20 px-2`}>
      <header>Billing</header>
      <div
        className={`w-full min-h-screen  flex flex-col items-center justify-center gap-4`}
      >
        <form>
          <CustomerDetails
            customerName={customerName}
            setCustomerName={setCustomerName}
            setWhatsappNum={setWhatsappNum}
            whatsappNum={whatsappNum}
          />
          <BillingItems
            billingItems={billingItems}
            setBillingItems={setBillingItems}
          />
        </form>

        {customerName}
        {whatsappNum}
      </div>
    </div>
  );
};

export default Billing;
