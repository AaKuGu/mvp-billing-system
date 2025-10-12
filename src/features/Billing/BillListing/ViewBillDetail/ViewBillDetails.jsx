"use client";

import React, { useEffect, useState } from "react";
import { useBillsStore } from "../../CreateOrUpdateBill/store";

const ViewBillDetails = ({ id }) => {
  const [data, setData] = useState(null);
  const { getOneBillByBillId } = useBillsStore();

  useEffect(() => {
    if (id) {
      const bill = getOneBillByBillId(id);
      if (bill) {
        const parsed = JSON.parse(bill.stringifiedBill);
        setData({ ...bill, parsedBill: parsed });
      }
    }
  }, [id, getOneBillByBillId]);

  if (!data)
    return <div className="p-4 text-gray-500">Loading bill details...</div>;

  const createdDate = new Date(data.createdAt).toLocaleString();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Bill ID: {data._id.slice(-6)}
          </h2>
          <p className="text-sm text-gray-500">Created on {createdDate}</p>
        </div>
        <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
          Finalized
        </span>
      </div>

      {/* Bill Items */}
      <div className="space-y-3">
        {data.parsedBill.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm border"
          >
            <div>
              <p className="font-medium text-gray-800">{item.productName}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × {item.unit} @ ₹{item.unitPrice}
              </p>
            </div>
            <div className="text-right font-semibold text-gray-800">
              ₹{item.totalPrice}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t mt-4 pt-3">
        <span className="text-lg font-semibold text-gray-800">Total</span>
        <span className="text-lg font-bold text-blue-600">
          ₹
          {data.parsedBill.reduce(
            (acc, curr) => acc + Number(curr.totalPrice),
            0
          )}
        </span>
      </div>
    </div>
  );
};

export default ViewBillDetails;
