"use client";

import React from "react";

const TestPrintPage = () => {
  const billData = {
    companyName: "Awesome Company Pvt Ltd",
    companyAddress: "123, Business Street, City, State, ZIP",
    gstNumber: "GSTIN: 22AAAAA0000A1Z5",
    customerName: "John Doe",
    date: "2025-10-16",
    items: [
      { name: "Item A", quantity: 2, price: 10 },
      { name: "Item B", quantity: 1, price: 20 },
      { name: "Item C", quantity: 3, price: 5 },
      { name: "Item C", quantity: 3, price: 5 },
      { name: "Item C", quantity: 3, price: 5 },
      { name: "Item C", quantity: 3, price: 5 },
      { name: "Item C", quantity: 3, price: 5 },
    ],
    total: 55,
    taxPercent: 18,
  };

  const calculateTax = () => {
    return ((billData.total * billData.taxPercent) / 100).toFixed(2);
  };

  const calculateGrandTotal = () => {
    return (billData.total + parseFloat(calculateTax())).toFixed(2);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 font-sans  h-full ">
      <div
        id="printable-area"
        className="max-w-3xl mx-auto bg-white p-8 shadow-lg border border-gray-300"
      >
        <div className="mb-8 border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold">{billData.companyName}</h1>
          <p className="text-sm text-gray-600">{billData.companyAddress}</p>
          <p className="text-sm text-gray-600">{billData.gstNumber}</p>
        </div>

        <div className="flex justify-between mb-6">
          <div>
            <p className="font-semibold">Bill To:</p>
            <p>{billData.customerName}</p>
          </div>
          <div>
            <p className="font-semibold">Date:</p>
            <p>{billData.date}</p>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2 text-left">
                Item
              </th>
              <th className="border border-gray-400 px-4 py-2 text-right">
                Quantity
              </th>
              <th className="border border-gray-400 px-4 py-2 text-right">
                Price ($)
              </th>
              <th className="border border-gray-400 px-4 py-2 text-right">
                Subtotal ($)
              </th>
            </tr>
          </thead>
          <tbody>
            {billData.items.map((item, i) => (
              <tr key={i} className="even:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-right">
                  {item.quantity}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-right">
                  {item.price.toFixed(2)}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-right">
                  {(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 max-w-md ml-auto text-sm">
          <div className="flex justify-between py-1 border-b border-gray-300">
            <span>Subtotal</span>
            <span>${billData.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-300">
            <span>GST ({billData.taxPercent}%)</span>
            <span>${calculateTax()}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Grand Total</span>
            <span>${calculateGrandTotal()}</span>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-gray-500">
          Thank you for your business!
        </p>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          🖨️ Print Invoice
        </button>
      </div>

      <style jsx global>{`
        @page {
          margin: 10mm;
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
            /* Removed position absolute */
            width: 100%;
            padding: 10px !important;
            box-shadow: none !important;
            border: none !important;
            background: white;
          }

          /* Allow rows to break naturally */
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

export default TestPrintPage;
