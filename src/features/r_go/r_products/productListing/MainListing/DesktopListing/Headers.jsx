import React from "react";

const headerTitles = [
  "No.",
  "Product Name",
  "Stock",
  "Main Unit",
  "Cost Price",
  "Selling Price",
  "Actions",
];

const Headers = () => {
  return (
    <tr className="bg-gray-100 text-sm text-gray-700 uppercase tracking-wider ">
      {headerTitles.map((title, index) => (
        <th
          key={index}
          className="px-4 py-3 text-left font-semibold whitespace-nowrap"
        >
          {title}
        </th>
      ))}
    </tr>
  );
};

export default Headers;
