"use client";

import React, { useEffect, useState } from "react";
// import { handlePrint } from "./func";
import { useBillsStore, useOneBillDetailStore } from "../re_usables/store";
import FinalBill from "./FinalBill/FinalBill";

const Final_Bill_Page = ({ id }) => {
  const [data, setData] = useState(null);
  const { getOneBillByBillId, bills } = useBillsStore();
  const { oneBillDetail } = useOneBillDetailStore();

  useEffect(() => {
    if (oneBillDetail) {
      const parsed = JSON.parse(oneBillDetail.stringifiedBill);
      setData({ ...oneBillDetail, parsedBill: parsed });
    } else if (bills.length > 0 && id) {
      const bill = getOneBillByBillId(id);
      if (bill) {
        const parsed = JSON.parse(bill.stringifiedBill);
        setData({ ...bill, parsedBill: parsed });
      }
    }
  }, [id, getOneBillByBillId]);

  if (!data)
    return <div className="p-4 text-gray-500">Loading bill details...</div>;

  const { customerDetails, itemDetails, bill_discount } = data.parsedBill;
  const createdDate = new Date(data.createdAt).toLocaleString();

  return (
    <div className={`w-full h-full `}>
      <FinalBill
        data={data}
        createdDate={createdDate}
        customerDetails={customerDetails}
        itemDetails={itemDetails}
        bill_discount={bill_discount}
      />
      {/* <div className={`text-black`}>pipe</div> */}
      {/* Print button */}

      {/* <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">KeroBill Stores</h1>
        <p className="text-gray-600">123 Market Street, Mirzapur, India</p>
        <p className="text-gray-600">Phone: 9876543210</p>
        <p className="mt-2 font-semibold">Invoice</p>
      </div>

      <div className="mb-4 flex justify-between text-gray-700">
        <div>
          <p>
            <span className="font-medium">Invoice ID:</span>{" "}
            {data._id.slice(-6)}
          </p>
          <p>
            <span className="font-medium">Date:</span> {createdDate}
          </p>
        </div>
        <div>
          <p>
            <span className="font-medium">Customer:</span>{" "}
            {customerDetails.customerName}
          </p>
          <p>
            <span className="font-medium">WhatsApp:</span>{" "}
            {customerDetails.whatsappNum}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {customerDetails.customerAddressArea}
          </p>
        </div>
      </div>

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100 border-b text-left">
            <th className="p-2 border-r">#</th>
            <th className="p-2 border-r">Item</th>
            <th className="p-2 border-r">Qty</th>
            <th className="p-2 border-r">Unit</th>
            <th className="p-2 border-r">Rate</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {itemDetails.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 border-r">{index + 1}</td>
              <td className="p-2 border-r">{item.productName}</td>
              <td className="p-2 border-r">{item.quantity}</td>
              <td className="p-2 border-r">{item.unitName}</td>
              <td className="p-2 border-r">₹{item.unitPrice}</td>
              <td className="p-2 font-semibold">₹{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <div className="w-1/2">
          <div className="flex justify-between p-2 border-t font-bold text-gray-800">
            <span>Grand Total:</span>
            <span className="text-blue-600">₹{grandTotal}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-600 text-xs border-t pt-2 print:text-[10px]">
        Thank you for shopping with us!
        <br />
        This is a computer-generated invoice and does not require a signature.
      </div> */}
    </div>
  );
};

export default Final_Bill_Page;
