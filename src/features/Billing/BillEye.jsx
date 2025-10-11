import { GreenButton } from "@/shared/components/Button";
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const BillEye = ({ setViewPrintableBill, viewPrintableBill }) => {
  return (
    <GreenButton
      onClick={() => setViewPrintableBill((prev) => !prev)}
      className="flex items-center gap-2 "
    >
      {viewPrintableBill ? (
        <div className={`flex`}>
          <FiEyeOff className="text-sm" />
        </div>
      ) : (
        <div className={`flex`}>
          <FiEye className="text-sm" />
        </div>
      )}
    </GreenButton>
  );
};

export default BillEye;
