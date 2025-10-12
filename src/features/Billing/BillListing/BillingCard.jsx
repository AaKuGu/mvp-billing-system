import { BlueButton } from "@/shared/components/Button";
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
          <p className="text-sm text-gray-500">
            Invoice ID: {data?._id?.slice(-6)}
          </p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="hidden md:flex flex-col text-right">
        <span className="text-sm text-gray-600">Created: {createdDate}</span>
        <span className="text-sm text-gray-600">Updated: {updatedDate}</span>
      </div>

      {/* Right Section */}
      <div>
        <Link href={`/go/bills/${data?._id}`}> View</Link>
        {/* <BlueButton onClick={() => {}}>View</BlueButton> */}
      </div>
    </div>
  );
};

export default BillingCard;
