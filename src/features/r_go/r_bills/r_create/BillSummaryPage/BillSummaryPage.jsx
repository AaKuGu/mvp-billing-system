import React, { useEffect, useState } from "react";
import { BlueButton, RoundButtonClose } from "@/re_usables/components/Button";
import Header from "@/re_usables/components/ui/Header";
import Finalized from "./Finalized/Finalized";
import BillSummery from "../../re_usables/BillSummery/BillSummery";
import { calculateGrandTotal } from "../../re_usables/funcs";

const BillSummaryPage = ({
  customerDetails,
  itemDetails,
  setViewPrintableBill,
}) => {
  const [finalized, setFinalized] = useState(false);

  const [bill_discount, set_bill_discount] = useState(0);

  const { price_after_discount, price_before_discount } = calculateGrandTotal(
    itemDetails,
    bill_discount
  );

  const discountApplied = price_before_discount - price_after_discount;

  useEffect(() => {
    const bill_discount = window.localStorage.getItem("bill_discount");
    if (bill_discount !== null) {
      set_bill_discount(parseFloat(bill_discount));
    }
  }, []);

  return (
    <div
      className={`w-full h-full flex items-center justify-center text-black`}
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
            customerDetails={customerDetails}
            itemDetails={itemDetails}
            price_after_discount={price_after_discount}
            price_before_discount={price_before_discount}
            discountApplied={discountApplied}
          />
          {!finalized && (
            <Finalized
              itemDetails={itemDetails}
              customerDetails={customerDetails}
              setFinalized={setFinalized}
              price_after_discount={price_after_discount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BillSummaryPage;
