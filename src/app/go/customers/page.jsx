import Customer_Page from "@/features/r_go/r_customers/Customer_Page";
import { fetch_customers_list_handler } from "@/features/r_go/r_customers/re_usables/server_actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user_id = session?.user?.id;

  const _customers_list = await fetch_customers_list_handler(user_id);

  const customers_list = JSON.parse(_customers_list);

  

  return <Customer_Page customers_list={customers_list} />;
};

export default page;
