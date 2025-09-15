import { BlueButton, RoundButtonClose } from "@/shared/components/Button";
import React from "react";
import { calculateGrandTotal, generateCleanPdf } from "./funcs";

const PrintableBill = ({
  customerName,
  whatsappNum,
  billingItems,
  setViewPrintableBill,
}) => {
  const grandTotal = calculateGrandTotal(billingItems);

  return (
    <div className="mt-6 overflow-x-auto text-black">
      <div className="w-full max-w-lg mx-auto bg-white p-2 ">
        <div className="w-full flex justify-end">
          <RoundButtonClose onClick={() => setViewPrintableBill(false)} />
        </div>
        <div id="bill-printable" className={`h-full`}>
          <div className="p-4 font-sans">
            <h2 className="text-center mb-2 text-lg font-bold">
              Bhaiya Ji Cosmetics
            </h2>
            <h2 className="text-center mb-2 text-lg font-bold">8090159071</h2>
            <p className="text-center text-sm text-gray-600 mb-2">
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <div className="mb-4 text-sm">
              <strong>Customer:</strong> {customerName || "N/A"} <br />
              <strong>WhatsApp:</strong> {whatsappNum || "N/A"} <br />
            </div>

            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b p-2 text-left">No.</th>
                  <th className="border-b p-2 text-left">Product</th>
                  <th className="border-b p-2 text-center">Calculation</th>
                  <th className="border-b p-2 text-right">Total</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable container for rows */}
            <div className="h-full">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {billingItems.map((item, i) => {
                    const _itemDetails = item.itemDetails;
                    const unitPrice = _itemDetails.unitPrice;
                    const quantity = Number(_itemDetails?.quantity) || 0;
                    const unit = _itemDetails.unit;
                    const totalPrice = Number(_itemDetails.totalPrice) || 0;

                    return (
                      <tr key={item.id || i}>
                        <td className="p-2">{i + 1}</td>
                        <td className="p-2">{item.itemDetails?.productName}</td>
                        <td className="p-2 text-center">
                          {quantity} {unit} × ₹{unitPrice}
                        </td>
                        <td className="p-2 text-right font-semibold">
                          ₹{totalPrice}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="text-right mt-4 font-bold">₹{grandTotal}</div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Thank you for shopping with us!
            </div>
          </div>
        </div>
        <BlueButton onClick={() => generateCleanPdf()}>Download</BlueButton>
      </div>
    </div>
  );
};

export default PrintableBill;
