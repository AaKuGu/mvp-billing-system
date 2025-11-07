"use client";
import React, { useState } from "react";
import { handleQuickFilter, handleReset } from "./funcs";
import { BlueButton } from "../Button";
import { FiRefreshCw } from "react-icons/fi";

const Filter = ({ setFilteredBills }) => {
  const [selectedQuick, setSelectedQuick] = useState(null);

  const quickOptions = ["Today", "Yesterday", "This Week", "This Month"];

  return (
    <div className="w-full bg-white shadow-sm rounded-lg p-2 flex flex-wrap items-end gap-2">
      <h2 className="text-sm font-semibold text-gray-700 ">Filter</h2>
      {/* Quick Filters */}
      <div className="flex gap-1 flex-wrap">
        {quickOptions.map((option) => (
          <button
            key={option}
            onClick={() =>
              handleQuickFilter(option, setSelectedQuick, setFilteredBills)
            }
            className={`px-3 py-1 text-[12px] rounded-lg border transition ${
              selectedQuick === option
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <BlueButton
        onClick={() => handleReset(setSelectedQuick, setFilteredBills)}
        className={`text-sm px-1`}
      >
        <FiRefreshCw className="text-sm" />
      </BlueButton>
    </div>
  );
};

export default Filter;
