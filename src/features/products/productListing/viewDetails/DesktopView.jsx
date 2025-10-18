import React from "react";

const DesktopView = ({product}) => {
  return (
    <div className="overflow-x-auto hidden lg:block ">
      <table className="w-full border border-gray-300 text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Level</th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Per Parent Qty</th>
            <th className="p-2 border">Total Qty</th>
            <th className="p-2 border">Total Cost</th>
            <th className="p-2 border">Unit Cost</th>
            <th className="p-2 border">Selling Price</th>
            <th className="p-2 border">Selling %</th>
          </tr>
        </thead>
        <tbody>
          {product.units?.map((u) => (
            <tr key={u._id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{u.level}</td>
              <td className="p-2 border">{u.unitName}</td>
              <td className="p-2 border">{u.perParentQuantity ?? "-"}</td>
              <td className="p-2 border">{u.totalQuantity}</td>
              <td className="p-2 border">{u.totalCost}</td>
              <td className="p-2 border">{u.unitCost}</td>
              <td className="p-2 border">{u.unitSellingPrice}</td>
              <td className="p-2 border">{u.unitSellingPercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopView;
