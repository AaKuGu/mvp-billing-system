"use client";
import React, { useEffect, useState } from "react";
// import BillingItems from "../BillingItems/BillingItems";
import Header from "@/shared/components/ui/Header";
import Form from "@/shared/components/form/Form";
import BillEye from "../PrintableBill/BillEye";
import PrintableBill from "../PrintableBill/PrintableBill";
import Modal from "@/shared/components/Modal";
import { RedButton } from "@/shared/components/Button";
import BillSummery from "../../shared/BillSummery/BillSummery";
import BillSummaryPage from "../BillSummaryPage/BillSummaryPage";
import CustomerDetails from "./CustomerDetails";
import BillingItems from "./BillingItems/BillingItems";

const CreateBillPage = () => {
  const [customerName, setCustomerName] = useState(null);
  const [whatsappNum, setWhatsappNum] = useState(null);
  const [customerAddressArea, setCustomerAddressArea] = useState("");
  const [billingItems, setBillingItems] = useState();
  const [viewPrintableBill, setViewPrintableBill] = useState(false);

  const onlyItemDetailsHandler = () => {
    return billingItems?.map((d) => d?.itemDetails);
  };

  //==================== get the product data into localstorage =======================================

  useEffect(() => {
    const savedItems = localStorage.getItem("billingItems");
    console.log("saved items ; ", savedItems);
    const savedCustomerDetails = localStorage.getItem("customerDetails");
    if (savedCustomerDetails) {
      // alert("saved customer details : " + savedCustomerDetails);
      try {
        const parsedDetails = JSON.parse(savedCustomerDetails);
        setCustomerName(parsedDetails.customerName || "");
        setWhatsappNum(parsedDetails.whatsappNum || "");
        setCustomerAddressArea(parsedDetails.customerAddressArea || "");
      } catch (err) {
        console.error("Error parsing customerDetails:", err);
      }
    }
    if (savedItems) {
      try {
        // alert("yes");
        // alert("saved items : " + savedItems);
        setBillingItems(JSON.parse(savedItems));
      } catch (err) {
        console.error("Error parsing billingItems:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (billingItems?.length) {
      console.log("billing items useffect : ", billingItems);
      localStorage.setItem("billingItems", JSON.stringify(billingItems));
    }
  }, [billingItems]);

  useEffect(() => {
    // alert("customerDetailsChange useEffect ran");

    // alert(customerName);

    localStorage.setItem(
      "customerDetails",
      JSON.stringify({
        customerName,
        whatsappNum,
        customerAddressArea,
      })
    );
    // setCustomerDetailsChange((prev) => !prev);
  }, [customerName, whatsappNum, customerAddressArea]);

  return (
    <div className={`w-full h-screen md:px-4 px-2 `}>
      <Header>Create Bill</Header>
      <div className={`flex justify-center `}>
        <BillEye setViewPrintableBill={setViewPrintableBill} />
        <RedButton
          onClick={() => {
            if (window.confirm("आप यह बिल साफ़ करना चाहते हैं क्या?")) {
              setBillingItems([]);
              window.localStorage.removeItem("billingItems");
              setCustomerName("");
              setCustomerAddressArea("");
              setWhatsappNum("");
              window.localStorage.removeItem("customerDetails");
            }
          }}
        >
          Clear
        </RedButton>
      </div>
      <div
        className={`w-full h-[600px] overflow-y-auto md:px-10 px-2  flex flex-col items-center justify-start gap-4 `}
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
              <BillSummaryPage
                customerDetails={{
                  customerName,
                  whatsappNum,
                  customerAddressArea,
                }}
                itemDetails={onlyItemDetailsHandler()}
                setViewPrintableBill={setViewPrintableBill}
              />
            </Modal>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CreateBillPage;
