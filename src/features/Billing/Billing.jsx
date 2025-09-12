"use client";
import React, { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import BillingItems from "./BillingItems";
import Header from "@/shared/components/ui/Header";
import Form from "@/shared/components/form/Form";

const Billing = () => {
  const [customerName, setCustomerName] = useState("");
  const [whatsappNum, setWhatsappNum] = useState("");
  return (
    <div className={`w-full min-h-screen  md:px-20 px-2`}>
      <Header>Billing</Header>
      <div
        className={`w-full min-h-screen  flex flex-col items-center justify-start gap-4`}
      >
        <Form>
          <CustomerDetails
            customerName={customerName}
            setCustomerName={setCustomerName}
            setWhatsappNum={setWhatsappNum}
            whatsappNum={whatsappNum}
          />
          <BillingItems />
        </Form>
      </div>
    </div>
  );
};

export default Billing;
