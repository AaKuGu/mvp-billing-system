import { BlueButton } from "@/re_usables/components/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { finalizeHandler } from "./func";
import { useOneBillDetailStore } from "../../../re_usables/store";
import { authClient } from "@/lib/auth-client";
import {
  use_billingItems_details,
  use_customer_details,
  use_pricing_details,
} from "../../store";

const Finalized = ({
  customer_details,
  setFinalized,
  item_details,
  pricing_details,
}) => {
  const router = useRouter();
  const { setOneBillDetail } = useOneBillDetailStore();

  const { setBillingItems_null } = use_billingItems_details();
  const { set_customer_details_null } = use_customer_details();
  const { set_pricing_details_null } = use_pricing_details();

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
          pricing_details,
        };

        // alert(
        //   "prepared data : /features/create or update bill/bill sujmmar page/ finalised/ finalized.jsx" +
        //     JSON.stringify(preparedData?.grand_total)
        // );

        finalizeHandler(
          preparedData,
          setFinalized,
          setOneBillDetail,
          router,
          setBillingItems_null,
          set_customer_details_null,
          set_pricing_details_null
        );
      }}
    >
      Finalize
    </BlueButton>
  );
};

export default Finalized;
