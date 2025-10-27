"use client";
import React, { useEffect, useState } from "react";
// import BillingItems from "../BillingItems/BillingItems";
import Header from "@/re_usables/components/ui/Header";
import Form from "@/re_usables/components/form/Form";
import BillEye from "./re_usables/BillEye";
import Modal from "@/re_usables/components/Modal";
import { RedButton } from "@/re_usables/components/Button";
// import BillSummery from "../../shared/BillSummery/BillSummery";
import BillSummaryPage from "./BillSummaryPage/BillSummaryPage";
import CustomerDetails from "./customer_details/CustomerDetails";
import BillingItems from "./BillingItems/BillingItems";
import Pricing_Details from "./pricing_details/Pricing_Details";
import {
  use_billingItems_details,
  use_customer_details,
  use_pricing_details,
} from "./store";

const Create_Bill_Page = () => {
  const [viewPrintableBill, setViewPrintableBill] = useState(false);

  const { set_customer_details_null, set_customer_details } =
    use_customer_details();
  const { setBillingItems_null, setBillingItems } = use_billingItems_details();
  const { set_pricing_details_null, set_pricing_details } =
    use_pricing_details();

  useEffect(() => {
    const str_billingItems = localStorage.getItem("billingItems");
    const str_pricing_details = localStorage.getItem("pricing_details");
    const str_customer_details = localStorage.getItem("customer_details");

    // alert(str_customer_details);

    if (str_customer_details) {
      // alert(str_customer_details)
      set_customer_details(JSON.parse(str_customer_details));
    }
    if (str_billingItems) {
      setBillingItems(JSON.parse(str_billingItems));
    }
    if (str_pricing_details) {
      set_pricing_details(JSON.parse(str_pricing_details));
    }
  }, []);

  return (
    <div className={`w-full h-full bg-green-100 px-2 flex flex-col `}>
      <Header>Create Bill</Header>
      <div className={`flex justify-center `}>
        <BillEye setViewPrintableBill={setViewPrintableBill} />
        <RedButton
          onClick={() => {
            if (window.confirm("आप यह बिल साफ़ करना चाहते हैं क्या?")) {
              window.localStorage.removeItem("billingItems");
              window.localStorage.removeItem("customer_details");
              window.localStorage.removeItem("pricing_details");
            }
            set_customer_details_null();
            setBillingItems_null();
            set_pricing_details_null();
          }}
        >
          Clear
        </RedButton>
      </div>
      <div
        className={`w-full h-[600px] overflow-y-auto px-2  flex flex-col items-center justify-start gap-4 `}
      >
        <Form style="w-full ">
          <CustomerDetails />
          <BillingItems />
          <Pricing_Details />
          {viewPrintableBill && (
            <Modal>
              <BillSummaryPage
                // customer_details={{
                //   customerName,
                //   whatsappNum,
                //   customerAddressArea,
                //   customerId,
                // }}
                setViewPrintableBill={setViewPrintableBill}
              />
            </Modal>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Create_Bill_Page;
