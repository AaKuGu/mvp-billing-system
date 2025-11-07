import { CreateButton, GreenButton } from "@/re_usables/components/Button";
import { ListHeader, MainHeader } from "@/re_usables/components/ui/Header";
import React from "react";
// import { fetchBills } from "./funcs";
import BillingCard from "./BillingCard";
// import { fetch_bills_action } from "./server_actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { user_docs_ssr } from "@/re_usables/backend/utils/ssr/user_docs_ssr";
import Bill from "@/models/Bill";
import Bills_Page_Client from "./Bills_Page_Client";
// import { useBillsStore } from "../re_usables/store";

const Bills_Page_Server = async () => {
  await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const { data } = await user_docs_ssr(Bill);

  const bills = data;

  //   return <div>{JSON.stringify(bills, null, 2)}</div>;
  return <Bills_Page_Client bills={bills} />;
};

export default Bills_Page_Server;
