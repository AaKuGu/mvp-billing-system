import React from "react";
import { createEmptyBillData } from "./funcs";

const PlusMinusButtons = ({ addAnEmptyItem }) => {
  return (
    <div className="flex gap-2 text-white mt-4">
      <button
        type="button"
        className="rounded-lg px-5 py-2 bg-blue-500"
        onClick={() => {
          addAnEmptyItem((prev) => [...prev, createEmptyBillData()]);
        }}
      >
        +
      </button>
    </div>
  );
};

export default PlusMinusButtons;
