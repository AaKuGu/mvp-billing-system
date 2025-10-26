import { BlueButton } from "@/re_usables/components/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { finalizeHandler } from "./func";
import { useOneBillDetailStore } from "../../../re_usables/store";
import { authClient } from "@/lib/auth-client";

const Finalized = ({
  customer_details,
  setFinalized,
  item_details,
  price_details,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setOneBillDetail } = useOneBillDetailStore();

  const { data: session } = authClient.useSession();

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
          item_details,
          customer_details,
          price_details,
          user_id: session?.user?.id,
        };

        // alert(
        //   "prepared data : /features/create or update bill/bill sujmmar page/ finalised/ finalized.jsx" +
        //     JSON.stringify(preparedData?.grand_total)
        // );

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
