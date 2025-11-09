"use client";

import { GreenButton } from "@/re_usables/components/Button";
import React from "react";

const Print_Invoice_Button = () => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <GreenButton
      onClick={handlePrint}
      className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
    >
      🖨️ Print Invoice
    </GreenButton>
  );
};

export default Print_Invoice_Button;
