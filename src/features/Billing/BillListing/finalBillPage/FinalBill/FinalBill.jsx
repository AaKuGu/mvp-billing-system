"use client";

import React from "react";
import { grandTotal, handlePrint } from "./func";

const FinalBill = ({ data, createdDate, customerDetails, itemDetails }) => {
  const grandTotal = itemDetails.reduce(
    (acc, item) => acc + Number(item.totalPrice),
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 font-sans h-full bg-blue-500">
      <div
        id="printable-area"
        className="max-w-3xl mx-auto bg-white p-8 shadow-lg border border-gray-300"
      >
        {/* Shop Header */}
        <div className="text-start mb-6 border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold">KoroBill Stores</h1>
          <p className="text-sm text-gray-600">
            123 Market Street, Mirzapur, India
          </p>
          <p className="text-sm text-gray-600">Phone: 9876543210</p>
          <p className="mt-2 font-semibold text-lg">Bill</p>
        </div>

        {/* Invoice + Customer Info */}
        <div className="mb-6 flex justify-between text-gray-700">
          <div>
            <p>
              <span className="font-semibold">Bill ID:</span>{" "}
              {data._id.slice(-6)}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {createdDate}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Customer:</span>{" "}
              {customerDetails.customerName}
            </p>
            <p>
              <span className="font-semibold">WhatsApp:</span>{" "}
              {customerDetails.whatsappNum}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {customerDetails.customerAddressArea}
            </p>
          </div>
        </div>

        {/* Item Table */}
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2 text-left">#</th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Item
              </th>
              <th className="border border-gray-400 px-4 py-2 text-right">
                Qty
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left">
                Unit
              </th>
              <th className="border border-gray-400 px-4 py-2 text-right">
                Rate
              </th>
              <th className="border border-gray-400 px-4 py-2 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {itemDetails.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.productName}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-right">
                  {item.quantity}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.unitName}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-right">
                  ₹{item.unitPrice}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-right font-semibold">
                  ₹{item.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="mt-6 max-w-md ml-auto text-sm">
          <div className="flex justify-between py-2 font-bold text-lg border-t border-gray-300">
            <span>Grand Total</span>
            <span className="text-blue-600">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-gray-500">
          Thank you for shopping with us!
          <br />
          This is a computer-generated invoice and does not require a signature.
        </p>
      </div>

      <div className="text-center mt-8 flex justify-center">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          🖨️ Print Invoice
        </button>
        <div>share</div>
      </div>

      <style jsx global>{`
        @page {
          margin: 1nm;
        }

        @media print {
          body * {
            visibility: hidden;
            font-size: 12pt;
          }

          #printable-area,
          #printable-area * {
            visibility: visible;
          }

          #printable-area {
            width: 100%;
            padding: 10px !important;
            box-shadow: none !important;
            border: none !important;
            background: white;
          }

          td,
          th {
            page-break-inside: avoid;
          }

          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FinalBill;
