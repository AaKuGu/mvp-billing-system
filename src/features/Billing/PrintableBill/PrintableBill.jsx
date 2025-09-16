import {
  BlueButton,
  GreenButton,
  RoundButtonClose,
} from "@/shared/components/Button";
import React from "react";
import {
  calculateGrandTotal,
  generateCleanPdf,
  whatsappRedirect,
} from "./funcs";
import toast from "react-hot-toast";
import TableData from "./TableData";
import Main from "./Main";
import { dataStyle, srStyle } from "./css";

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
          <div className="p-4 font-sans ">
            <div
              className={`w-full flex justify-between border items-center px-2 mb-5`}
            >
              <h2 className="text-center text-sm text-gray-600 mb-2">
                8090159071
              </h2>
              <h2 className="text-center mb-2 text-sm md:text-lg font-bold">
                Bhaiya Ji Cosmetics
              </h2>
              <p className="text-center text-sm text-gray-600 mb-2">
                {new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="mb-4 text-sm">
              <strong>Customer:</strong> {customerName || "N/A"} <br />
              <strong>WhatsApp:</strong> {whatsappNum || "N/A"} <br />
            </div>

            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className={srStyle}>No.</th>
                  <th className={dataStyle}>Product</th>
                  <th className={dataStyle}>Calculation</th>
                  <th className={dataStyle}>Total</th>
                </tr>
              </thead>
            </table>

            {/* Scrollable container for rows */}
            <Main billingItems={billingItems} />

            <div className="text-right mt-4 font-bold">₹{grandTotal}</div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Thank you for shopping with us!
            </div>
          </div>
        </div>
        <BlueButton onClick={() => generateCleanPdf()}>Download</BlueButton>
        <GreenButton
          onClick={() => {
            if (!whatsappNum) {
              toast.error(`Whatsapp Number Jaruri Hai`);
              return;
            } else if (!customerName) {
              toast.error(`Customer Name Jaruri Hai`);
              return;
            }
            whatsappRedirect(
              whatsappNum,
              `Hello ${customerName},\nYour bill has been generated. Please see the attached PDF.`
            );
          }}
        >
          Whatsapp
        </GreenButton>
      </div>
    </div>
  );
};

export default PrintableBill;
