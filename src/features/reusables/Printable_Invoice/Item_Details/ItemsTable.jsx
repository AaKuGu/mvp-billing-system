import React from "react";

const ItemsTable = ({ item_details }) => {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-full border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-2 py-1 text-left">#</th>
            <th className="border border-gray-400 px-2 py-1 text-left">Item</th>
            <th className="border border-gray-400 px-2 py-1 text-right">Qty</th>
            <th className="border border-gray-400 px-2 py-1 text-left">Unit</th>
            <th className="border border-gray-400 px-2 py-1 text-right">
              Rate
            </th>
            <th className="border border-gray-400 px-2 py-1 text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {item_details?.map((item, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="border border-gray-400 px-2 py-1">{index + 1}</td>
              <td className="border border-gray-400 px-2 py-1 break-words">
                {item.productName}
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right">
                {item.quantity}
              </td>
              <td className="border border-gray-400 px-2 py-1">
                {item.unitName}
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right">
                ₹{item.unitPrice}
              </td>
              <td className="border border-gray-400 px-2 py-1 text-right font-semibold">
                ₹{item.totalPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ItemsTable;
