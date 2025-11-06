import { ListHeader, MainHeader } from "@/re_usables/components/ui/Header";
import React from "react";
import Customers_Listing_Card from "./Customers_Listing_Card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { user_docs_ssr } from "@/re_usables/backend/utils/ssr/user_docs_ssr";
import Customer from "@/models/Customer";

const Customer_Page = async () => {
  await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const { data: customers_list } = await user_docs_ssr(Customer);
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
