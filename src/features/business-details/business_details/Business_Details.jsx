import React from "react";
import { fetchBusinessDetails } from "./funcs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Business_Details = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const data = await fetchBusinessDetails(session?.user?.id);

  return <div>{JSON.stringify(data)}</div>;
};

export default Business_Details;
