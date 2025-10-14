import React, { useState } from "react";
import BillSummery from "../../shared/BillSummery/BillSummery";
import { BlueButton, RoundButtonClose } from "@/shared/components/Button";
import Header from "@/shared/components/ui/Header";
import Finalized from "./Finalized/Finalized";

const BillSummaryPage = ({
  customerDetails,
  itemDetails,
  setViewPrintableBill,
}) => {
  const [finalized, setFinalized] = useState(false);

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
          />
          {!finalized && (
            <Finalized
              itemDetails={itemDetails}
              customerDetails={customerDetails}
              setFinalized={setFinalized}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BillSummaryPage;
