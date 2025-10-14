import { BlueButton } from "@/shared/components/Button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useOneBillDetailStore from "@/features/Billing/BillListing/BillSummary/store";
import { finalizeHandler } from "./func";

const Finalized = ({ customerDetails, setFinalized, itemDetails }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setOneBillDetail } = useOneBillDetailStore();

  return (
    <BlueButton
      onClick={() => {
        const _confirm = confirm(
          `Are you sure you want to finalize this bill? You won’t be able to make changes afterward.`
        );

        if (!_confirm) {
          return;
        }
        const preparedData = { itemDetails, customerDetails };
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
