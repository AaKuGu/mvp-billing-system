"use client";
import React, { useEffect, useState } from "react";
// import BillingItems from "../BillingItems/BillingItems";
import Header from "@/re_usables/components/ui/Header";
import Form from "@/re_usables/components/form/Form";
import BillEye from "../PrintableBill/BillEye";
import PrintableBill from "../PrintableBill/PrintableBill";
import Modal from "@/re_usables/components/Modal";
import { RedButton } from "@/re_usables/components/Button";
import BillSummery from "../../shared/BillSummery/BillSummery";
import BillSummaryPage from "../BillSummaryPage/BillSummaryPage";
import CustomerDetails from "./CustomerDetails";
import BillingItems from "./BillingItems/BillingItems";
import { onlyItemDetailsHandler } from "../../shared/func";

const CreateBillPage = () => {
  const [customerName, setCustomerName] = useState(null);
  const [whatsappNum, setWhatsappNum] = useState(null);
  const [customerAddressArea, setCustomerAddressArea] = useState("");
  const [billingItems, setBillingItems] = useState();
  const [viewPrintableBill, setViewPrintableBill] = useState(false);
  const [bill_discount, set_bill_discount] = useState(0);

  //==================== get the product data into localstorage =======================================

  useEffect(() => {
    const savedItems = localStorage.getItem("billingItems");
    const bill_discount = window.localStorage.getItem("bill_discount");
    if (bill_discount !== null) {
      set_bill_discount(parseFloat(bill_discount));
    }

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
    <div className={`w-full h-full bg-green-100 px-2 flex flex-col `}>
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
        className={`w-full h-[600px] overflow-y-auto px-2  flex flex-col items-center justify-start gap-4 `}
      >
        <Form style="w-full ">
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
          {/* def : {bill_discount} */}

          {viewPrintableBill && (
            <Modal>
              <BillSummaryPage
                customerDetails={{
                  customerName,
                  whatsappNum,
                  customerAddressArea,
                }}
                itemDetails={onlyItemDetailsHandler(billingItems)}
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
