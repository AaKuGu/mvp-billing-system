import { GreenButton } from "@/shared/components/Button";
import React from "react";

const BillEye = ({ setViewPrintableBill }) => {
  return (
    <GreenButton onClick={() => setViewPrintableBill((prev) => !prev)}>
      View Bill
    </GreenButton>
  );
};

export default BillEye;
