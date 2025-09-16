import React from "react";
import { createEmptyBillData } from "./constant";

const PlusMinusButtons = ({ setBillingItems }) => {
  return (
    <div className="flex gap-2 text-white mt-4">
      <button
        type="button"
        className="rounded-lg px-5 py-2 bg-blue-500"
        onClick={() => {
          setBillingItems((prev) => [...prev, createEmptyBillData()]);
        }}
      >
        +
      </button>
    </div>
  );
};

export default PlusMinusButtons;
