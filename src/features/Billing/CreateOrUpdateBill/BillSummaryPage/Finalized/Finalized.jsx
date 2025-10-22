import { BlueButton } from "@/shared/components/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useOneBillDetailStore from "@/features/Billing/BillListing/BillSummary/store";
import { finalizeHandler } from "./func";

const Finalized = ({ customerDetails, setFinalized, itemDetails }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setOneBillDetail } = useOneBillDetailStore();

  const [bill_discount, set_bill_discount] = useState(0);

  useEffect(() => {
    const bill_discount = window.localStorage.getItem("bill_discount");
    if (bill_discount !== null) {
      set_bill_discount(parseFloat(bill_discount));
    }
  }, []);

  return (
    <BlueButton
      onClick={() => {
        const _confirm = confirm(
          `Are you sure you want to finalize this bill? You won’t be able to make changes afterward.`
        );

        if (!_confirm) {
          return;
        }
        const preparedData = { itemDetails, customerDetails, bill_discount };

        alert(
          "prepared data : /features/create or update bill/bill sujmmar page/ finalised/ finalized.jsx" +
            JSON.stringify(preparedData)
        );

        finalizeHandler(
          preparedData,
          setFinalized,
          setLoading,
          router,
          setOneBillDetail
        );
      }}
      loading={loading}
    >
      {loading ? "Processing..." : "Finalize"}
    </BlueButton>
  );
};

export default Finalized;
