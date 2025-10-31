import { BlueButton } from "@/re_usables/components/Button";
import ViewUpdateDelete from "@/re_usables/components/ViewUpdateDelete";
import Link from "next/link";
import React from "react";

const BillingCard = ({ data, index }) => {
  const createdDate = new Date(data?.createdAt).toLocaleString();
  const updatedDate = new Date(data?.updatedAt).toLocaleString();

  return (
    <div className="w-full flex items-center justify-between p-4 mb-3 bg-white shadow-md shadow-blue-100 rounded-lg hover:shadow-blue-200 transition-shadow duration-200">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
          {index + 1}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Bill #{index + 1}
          </h3>
          <p className="text-sm text-gray-500">Invoice ID: {data?._id}</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="hidden md:flex flex-col text-right">
        <span className="text-sm text-gray-600">Created: {createdDate}</span>
        <span className="text-sm text-gray-600">Updated: {updatedDate}</span>
      </div>

      {/* Right Section */}
      <div className={`flex flex-col lg:flex-row gap-2`}>
        <Link
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm transition"
          href={`/go/bills/summary/${data?._id}`}
        >
          Summary
        </Link>
        <ViewUpdateDelete
          actions={{ view: `/go/bills/finalBill/${data?._id}` }}
        />
      </div>

      {/* <div className={`gap-2 flex`}>
        <Link href={`/go/bills/summary/${data?._id}`}>View Summary</Link>
        <Link href={`/go/bills/finalBill/${data?._id}`}>View Bill</Link>
      </div> */}
    </div>
  );
};

export default BillingCard;
