"use client";
import React, { useEffect, useState } from "react";
import CustomerDetails from "./CustomerDetails";
import BillingItems from "./BillingItems/BillingItems";
import Header from "@/shared/components/ui/Header";
import Form from "@/shared/components/form/Form";
import BillEye from "./BillEye";
import PrintableBill from "./PrintableBill/PrintableBill";
import Modal from "@/shared/components/Modal";
import { RedButton } from "@/shared/components/Button";

const Billing = () => {
  const [customerName, setCustomerName] = useState(null);
  const [whatsappNum, setWhatsappNum] = useState(null);
  const [customerAddressArea, setCustomerAddressArea] = useState("");
  const [billingItems, setBillingItems] = useState();
  const [viewPrintableBill, setViewPrintableBill] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem("billingItems");
    if (savedItems) {
      try {
        setBillingItems(JSON.parse(savedItems));
      } catch (err) {
        console.error("Error parsing billingItems:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (billingItems?.length) {
      localStorage.setItem("billingItems", JSON.stringify(billingItems));
    }
  }, [billingItems]);

  return (
    <div className={`w-full h-screen md:px-20 px-2 `}>
      {/* billingItems={JSON.stringify(billingItems[0]?.itemDetails)} */}
      <Header>Billing</Header>
      <div className={`flex justify-center `}>
        <BillEye setViewPrintableBill={setViewPrintableBill} />
        <RedButton
          onClick={() => {
            if (window.confirm("आप यह बिल साफ़ करना चाहते हैं क्या?")) {
              setBillingItems([]);
              window.localStorage.removeItem("billingItems");
            }
          }}
        >
          Clear
        </RedButton>
      </div>
      <div
        className={`w-full h-[600px] overflow-y-auto md:px-10 px-2  flex flex-col items-center justify-start gap-4`}
      >
        <Form style="w-full">
          <CustomerDetails
            customerName={customerName}
            setCustomerName={setCustomerName}
            setWhatsappNum={setWhatsappNum}
            whatsappNum={whatsappNum}
            customerAddressArea={customerAddressArea}
            setCustomerAddressArea={setCustomerAddressArea}
          />
          <BillingItems
            billingItems={billingItems}
            setBillingItems={setBillingItems}
          />
          {viewPrintableBill && (
            <Modal>
              <PrintableBill
                customerName={customerName}
                whatsappNum={whatsappNum}
                billingItems={billingItems}
                setViewPrintableBill={setViewPrintableBill}
              />
            </Modal>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Billing;
