import {
  BlueButton,
  GreenButton,
  RoundButtonClose,
} from "@/shared/components/Button";
import React, { useState } from "react";
import {
  calculateGrandTotal,
  finalizeHandler,
  generateCleanPdf,
  whatsappRedirect,
} from "./funcs";
import toast from "react-hot-toast";
import TableData from "./TableData";
import Main from "./Main";
import { useRouter } from "next/navigation";
import useOneBillDetailStore from "../../BillListing/BillSummary/store";
// import { dataStyle, srStyle } from "./css";

const PrintableBill = ({
  customerName,
  whatsappNum,
  billingItems,
  setViewPrintableBill,
}) => {
  const grandTotal = calculateGrandTotal(billingItems);

  const [finalized, setFinalized] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setOneBillDetail } = useOneBillDetailStore();

  const router = useRouter();

  return (
    <div className="mt-6 overflow-x-auto text-black">
      {/* billingItems={JSON.stringify(billingItems[0]?.itemDetails)} */}
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

            {/* Scrollable container for rows */}
            <Main billingItems={billingItems} />

            <div className="text-right mt-4 font-bold">₹{grandTotal}</div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Thank you for shopping with us!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableBill;
