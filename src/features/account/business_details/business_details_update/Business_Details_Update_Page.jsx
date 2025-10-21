import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import { fetchBusinessDetails_Handler } from "../business_details_show/funcs";
import BusinessRegistrationPage from "../business_details_register/Business_Details_Registration";
import Business_Details_Update from "./Business_Details_Update";

const Update = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user_id = session.user.id;

  const data = await fetchBusinessDetails_Handler(user_id);

  // return <BusinessRegistrationPage data={data} />;
  return <Business_Details_Update data={data} />;
};

export default Update;
