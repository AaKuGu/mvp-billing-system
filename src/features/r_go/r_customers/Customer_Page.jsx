"use client";

import { CreateButton } from "@/re_usables/components/Button";
import { ListHeader, MainHeader } from "@/re_usables/components/ui/Header";
import React, { useState } from "react";
import Customers_Listing_Card from "./Customers_Listing_Card";

const Customer_Page = ({ customers_list }) => {
  return (
    <div className={`w-full h-full flex flex-col px-2`}>
      <MainHeader>Customers</MainHeader>
      {/* <div className={`w-full flex justify-end`}>
        <CreateButton href={`bills/create`}>Create New Customer</CreateButton>
      </div> */}
      <ListHeader>Customers Listing</ListHeader>
      <div className={`w-full flex flex-col gap-2 h-auto overflow-y-auto `}>
        {customers_list.length > 0 &&
          customers_list.map((data, i) => (
            <Customers_Listing_Card data={data} key={i} index={i} />
          ))}
      </div>
    </div>
  );
};

export default Customer_Page;
