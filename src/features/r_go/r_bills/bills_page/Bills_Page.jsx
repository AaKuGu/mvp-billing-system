import { CreateButton, GreenButton } from "@/re_usables/components/Button";
import { ListHeader, MainHeader } from "@/re_usables/components/ui/Header";
import React from "react";
// import { fetchBills } from "./funcs";
import BillingCard from "./BillingCard";
import { fetch_bills_action } from "./server_actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
// import { useBillsStore } from "../re_usables/store";

const Bills_Page = async () => {
  await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const { data } = await fetch_bills_action();

  const bills = data;

  return (
    <div className={`w-full h-full flex flex-col px-2`}>
      <MainHeader>Billing</MainHeader>
      <div className={`w-full flex justify-end`}>
        <CreateButton href={`bills/create`}>Create New Bill</CreateButton>
      </div>
      <ListHeader>Bill Listing</ListHeader>
      <div className={`w-full flex flex-col gap-2 h-auto overflow-y-auto `}>
        {bills.length > 0 &&
          bills.map((data, i) => <BillingCard data={data} key={i} index={i} />)}
      </div>
    </div>
  );
};

export default Bills_Page;
