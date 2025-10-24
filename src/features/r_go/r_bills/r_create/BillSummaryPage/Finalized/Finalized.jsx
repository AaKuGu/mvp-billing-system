import { BlueButton } from "@/re_usables/components/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { finalizeHandler } from "./func";
import { useOneBillDetailStore } from "../../../re_usables/store";
import { authClient } from "@/lib/auth-client";

const Finalized = ({
  customerDetails,
  setFinalized,
  itemDetails,
  price_after_discount,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setOneBillDetail } = useOneBillDetailStore();

  const [bill_discount, set_bill_discount] = useState(0);

  const {
    data: session,
    isPending, //loading state
    error: err, //error object
    refetch, //refetch the session
  } = authClient.useSession();

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
        const preparedData = {
          itemDetails,
          customerDetails,
          bill_discount,
          grandTotal: price_after_discount,
          user_id: session?.user?.id,
        };

        alert(
          "prepared data : /features/create or update bill/bill sujmmar page/ finalised/ finalized.jsx" +
            JSON.stringify(preparedData?.grandTotal)
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
