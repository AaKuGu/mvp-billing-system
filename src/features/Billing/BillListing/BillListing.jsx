import { GreenButton } from "@/shared/components/Button";
import Header from "@/shared/components/ui/Header";
import React, { useEffect } from "react";
import { fetchBills } from "./funcs";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import BillingCard from "./BillingCard";
import { useBillsStore } from "../CreateOrUpdateBill/store";
import Link from "next/link";

const BillListing = () => {
  //   const [bills, setBills] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { bills, setBills } = useBillsStore();

  useEffect(() => {
    fetchBills(setBills, setLoading);
  }, []);

  return (
    <div className={`w-full h-full px-2`}>
      {/* {JSON.stringify(bills[0])} */}
      <LoadingWrapper loading={loading}>
        <Header>Billing</Header>
        <div className={`w-full flex justify-end`}>
          <Link href={`bills/create`}>Create Billing</Link>
        </div>
        <div>Bill Listing</div>
        <div
          className={`w-full flex flex-col gap-2 h-[600px] overflow-y-auto `}
        >
          {bills.length > 0 &&
            bills.map((data, i) => (
              <BillingCard data={data} key={i} index={i} />
            ))}
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default BillListing;
