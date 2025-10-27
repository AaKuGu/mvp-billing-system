import { BlueButton } from "@/re_usables/components/Button";
import ViewUpdateDelete from "@/re_usables/components/ViewUpdateDelete";
import Link from "next/link";
import React from "react";

const Customers_Listing_Card = ({ data, index }) => {
  const createdDate = new Date(data?.createdAt).toLocaleString();
  const updatedDate = new Date(data?.updatedAt).toLocaleString();

  const label_style = `text-gray-400`;

  return (
    <div className="w-full flex items-center justify-between p-4 mb-3 bg-white shadow-md shadow-blue-100 rounded-lg hover:shadow-blue-200 transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
          {index + 1}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            <span className={`${label_style}`}>Name : </span>{" "}
            {data?.customer_name}
          </h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            <span className={`${label_style}`}>Whatsapp Number : </span>{" "}
            {data?.whatsapp_num}
          </h3>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            <span className={`${label_style}`}>Address : </span>{" "}
            {data?.customer_address_area}
          </h3>
        </div>
      </div>

      <div className="hidden md:flex flex-col text-right">
        <span className="text-sm text-gray-600">Created: {createdDate}</span>
        <span className="text-sm text-gray-600">Updated: {updatedDate}</span>
      </div>
    </div>
  );
};

export default Customers_Listing_Card;
