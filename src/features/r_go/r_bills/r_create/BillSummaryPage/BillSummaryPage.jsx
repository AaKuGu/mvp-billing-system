import React, { useEffect, useState } from "react";
import { BlueButton, RoundButtonClose } from "@/re_usables/components/Button";
import Header from "@/re_usables/components/ui/Header";
import Finalized from "./Finalized/Finalized";
import BillSummery from "../../re_usables/BillSummery/BillSummery";
import {
  calculateGrandTotal,
  onlyItemDetailsHandler,
} from "../../re_usables/funcs";
import {
  use_billingItems_details,
  use_customer_details,
  use_pricing_details,
} from "../store";

const BillSummaryPage = ({ setViewPrintableBill }) => {
  const [finalized, setFinalized] = useState(false);

  const { customer_details } = use_customer_details();
  const { billingItems } = use_billingItems_details();
  const { pricing_details } = use_pricing_details();

  const item_details = onlyItemDetailsHandler(billingItems);

  // const [bill_details, set_bill_details] = useState(null);
  // const [customer_details, set_customer_details] = useState(null);

  // const {
  //   price_after_discount = 0,
  //   price_before_discount = 0,
  //   discount = 0,
  //   gst_percent = 0,
  //   gst_amount = 0,
  //   price_after_gst = 0,
  //   round_off = 0,
  //   grand_total = 0,
  // } = bill_details || {};

  // const [bill_discount, set_bill_discount] = useState(0);

  // const { price_after_discount, price_before_discount } = calculateGrandTotal(
  //   item_details,
  //   bill_discount
  // );

  // const discountApplied = price_before_discount - price_after_discount;

  // useEffect(() => {
  //   const bill_discount = window.localStorage.getItem("bill_discount");
  //   if (bill_discount !== null) {
  //     set_bill_discount(parseFloat(bill_discount));
  //   }
  // }, []);

  // useEffect(() => {
  //   const customer_details = window.localStorage.getItem("customerDetails");
  //   const bill_details = window.localStorage.getItem("bill_details");

  //   set_customer_details(JSON.parse(customer_details));
  //   set_bill_details(JSON.parse(bill_details));
  // }, []);

  return (
    <div
      className={`w-full h-full flex items-center justify-center text-white text-sm`}
    >
      <div
        className={`bg-white p-2 w-[90%] h-[90%] border-2 border-dashed border-gray-300 flex flex-col items-center justify-between`}
      >
        <div className={`w-full h-fit flex flex-col gap-2`}>
          <div className="w-full flex justify-end">
            <RoundButtonClose onClick={() => setViewPrintableBill(false)} />
          </div>
          <Header style={"text-black"}>Bill Summary</Header>
          <BillSummery
            customer_details={customer_details}
            item_details={item_details}
            pricing_details={pricing_details}
          />
          {!finalized && (
            <Finalized
              item_details={item_details}
              customer_details={customer_details}
              setFinalized={setFinalized}
              pricing_details={pricing_details}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BillSummaryPage;
