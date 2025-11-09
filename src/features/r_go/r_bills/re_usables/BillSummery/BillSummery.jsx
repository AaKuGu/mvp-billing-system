"use client";

import React, { useEffect, useState } from "react";
import Main from "./Main/Main";
import { calculateGrandTotal } from "../funcs";
import Customer_Details from "./Customer_Details";
import Pricing_Details from "./Pricing_Details";

const BillSummery = ({ customer_details, item_details, pricing_details }) => {
  return (
    <div className="w-full px-4 py-5 bg-white rounded-md shadow-md space-y-6 text-black">
      {/* Customer Info */}
      <Customer_Details customer_details={customer_details} />
      <div>
        <Main item_details={item_details} />
      </div>
      <Pricing_Details pricing_details={pricing_details} />
    </div>
  );
};
  
export default BillSummery;
