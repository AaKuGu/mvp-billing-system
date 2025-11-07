"use client";

import { CreateButton, GreenButton } from "@/re_usables/components/Button";
import { ListHeader, MainHeader } from "@/re_usables/components/ui/Header";
import React, { useEffect } from "react";
import BillingCard from "./BillingCard";
import Filter from "@/re_usables/components/filter/Filter";

const Bills_Page_Client = ({ bills }) => {
  const [filteredBills, setFilteredBills] = React.useState(bills);

  return (
    <div className={`w-full h-full flex flex-col px-2`}>
      <MainHeader>Billing</MainHeader>
      <div className={`w-full flex justify-end `}>
        <CreateButton href={`bills/create`}>Create New Bill</CreateButton>
      </div>
      <div>
        <Filter setFilteredBills={setFilteredBills} />
      </div>
      <ListHeader>Bill Listing</ListHeader>
      <div className={`w-full flex flex-col gap-2 h-auto overflow-y-auto `}>
        {filteredBills.length > 0 &&
          filteredBills.map((data, i) => (
            <BillingCard data={data} key={i} index={i} />
          ))}
      </div>
    </div>
  );
};

export default Bills_Page_Client;
