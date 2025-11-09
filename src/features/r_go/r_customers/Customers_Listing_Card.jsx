// "use client";

// import { BlueButton } from "@/re_usables/components/Button";
// import ViewUpdateDelete from "@/re_usables/components/ViewUpdateDelete";
// import Link from "next/link";
// import React from "react";

// const Customers_Listing_Card = ({ data, index }) => {
//   const createdDate = new Date(data?.createdAt).toLocaleString();
//   const updatedDate = new Date(data?.updatedAt).toLocaleString();

//   const label_style = `text-gray-400`;

//   return (
//     <div className="w-full flex items-center justify-between p-4 mb-3 bg-white shadow-md shadow-blue-100 rounded-lg hover:shadow-blue-200 transition-shadow duration-200">
//       <div className="flex items-center gap-4">
//         <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
//           {index + 1}
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">
//             <span className={`${label_style}`}>Name : </span>{" "}
//             {data?.customer_name}
//           </h3>
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">
//             <span className={`${label_style}`}>Whatsapp Number : </span>{" "}
//             {data?.whatsapp_num}
//           </h3>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold text-gray-800">
//             <span className={`${label_style}`}>Address : </span>{" "}
//             {data?.customer_address_area}
//           </h3>
//         </div>
//       </div>

//       <div className="hidden md:flex flex-col text-right">
//         <span className="text-sm text-gray-600">Created: {createdDate}</span>
//         <span className="text-sm text-gray-600">Updated: {updatedDate}</span>
//       </div>
//     </div>
//   );
// };

// export default Customers_Listing_Card;

"use client";

import React from "react";

const Customers_Listing_Card = ({ data, index }) => {
  const createdDate = new Date(data?.createdAt).toLocaleString();
  const updatedDate = new Date(data?.updatedAt).toLocaleString();

  return (
    <div className="w-full bg-white shadow-md shadow-blue-100 rounded-lg hover:shadow-lg hover:shadow-blue-200 transition-all duration-200  ">
      {/* Mobile & Tablet Layout */}
      <div className="lg:hidden">
        {/* Header with Index */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold text-sm shadow-sm">
            {index + 1}
          </div>
          <h3 className="text-lg font-bold text-gray-800 break-words flex-1">
            {data?.customer_name}
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Whatsapp */}
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Whatsapp
              </p>
              <p className="text-sm font-semibold text-gray-800 break-words">
                {data?.whatsapp_num}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Address
              </p>
              <p className="text-sm font-semibold text-gray-800 break-words">
                {data?.customer_address_area}
              </p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="pt-2 mt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-gray-500">Created</p>
              <p className="text-gray-700 font-medium">{createdDate}</p>
            </div>
            <div>
              <p className="text-gray-500">Updated</p>
              <p className="text-gray-700 font-medium">{updatedDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between p-5 gap-6">
        {/* Index */}
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold shadow-sm flex-shrink-0">
          {index + 1}
        </div>

        {/* Main Info */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          {/* Name */}
          <div className="min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Customer Name
            </p>
            <p className="text-base font-semibold text-gray-800 break-words">
              {data?.customer_name}
            </p>
          </div>

          {/* Whatsapp */}
          <div className="min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Whatsapp Number
            </p>
            <p className="text-base font-semibold text-gray-800 break-words">
              {data?.whatsapp_num}
            </p>
          </div>

          {/* Address */}
          <div className="min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Address
            </p>
            <p className="text-base font-semibold text-gray-800 break-words">
              {data?.customer_address_area}
            </p>
          </div>
        </div>

        {/* Timestamps */}
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-500">
            Created:{" "}
            <span className="text-gray-700 font-medium">{createdDate}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Updated:{" "}
            <span className="text-gray-700 font-medium">{updatedDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customers_Listing_Card;
