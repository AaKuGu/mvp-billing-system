import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import Business_Details_Update from "./Business_Details_Update";

const Update = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const data = session?.businessDetails;

  if (!data) {
    return (
      <div className="text-red-600 p-4 bg-red-100 rounded">
        Business details not found.
      </div>
    );
  }

  // return <BusinessRegistrationPage data={data} />;
  return <Business_Details_Update data={data} />;
};

export default Update;
