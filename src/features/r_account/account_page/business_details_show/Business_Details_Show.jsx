import React from "react";
import { fetchBusinessDetails_Handler } from "../../common/funcs";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Business_Details_Show = async ({ user_id }) => {
  // const data = await fetchBusinessDetails_Handler(user_id);

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

  const {
    businessName,
    businessDescription,
    businessTagline,
    businessEmail,
    businessContactNo,
    businessAddress,
    gstNumber,
    createdAt,
  } = data;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Business Details</h2>

      <div className="space-y-2">
        <Detail label="Business Name" value={businessName} />
        <Detail label="Tagline" value={businessTagline} />
        <Detail label="Description" value={businessDescription} />
        <Detail label="Email" value={businessEmail} />
        <Detail label="Contact No." value={businessContactNo} />
        <Detail label="Address" value={businessAddress} />
        <Detail label="GST Number" value={gstNumber} />
        <Detail
          label="Created At"
          value={new Date(createdAt).toLocaleString()}
        />
      </div>

      <Link href={`account/business_details/update`}>Update</Link>
    </div>
  );
};

// Reusable row component
const Detail = ({ label, value }) => (
  <div className="flex items-start">
    <span className="w-40 font-medium text-gray-600">{label}:</span>
    <span className="text-gray-800">{value || "—"}</span>
  </div>
);

export default Business_Details_Show;
