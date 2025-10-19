import { CreateButton, GreenButton } from "@/shared/components/Button";
import { ListHeader, MainHeader } from "@/shared/components/ui/Header";
import React, { useEffect } from "react";
import { fetchBills } from "./funcs";
import LoadingWrapper from "@/shared/components/Loading/LoadingWrapper";
import BillingCard from "./BillingCard";
import { useBillsStore } from "../shared/store";
import Link from "next/link";

const BillListing = () => {
  //   const [bills, setBills] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { bills, setBills } = useBillsStore();

  useEffect(() => {
    fetchBills(setBills, setLoading);
  }, []);

  return (
    <div className={`w-full h-full flex flex-col px-2`}>
      <LoadingWrapper loading={loading}>
        <MainHeader>Billing</MainHeader>
        <div className={`w-full flex justify-end`}>
          <CreateButton href={`bills/create`}>Create New Bill</CreateButton>
        </div>
        <ListHeader>Bill Listing</ListHeader>
        <div className={`w-full flex flex-col gap-2 h-auto overflow-y-auto `}>
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

// const BillListing = () => {
//   const [loading, setLoading] = React.useState(false);
//   const { bills, setBills } = useBillsStore();

//   useEffect(() => {
//     fetchBills(setBills, setLoading);
//   }, []);

//   return (
//     <div className="w-full h-full flex flex-col px-2">
//       <LoadingWrapper loading={loading}>
//         <MainHeader>Billing</MainHeader>

//         <div className="w-full flex justify-end">
//           <CreateButton href={`bills/create`}>Create New Bill</CreateButton>
//         </div>

//         <ListHeader>Bill Listing</ListHeader>

//         {/* This should take the remaining height */}
//         <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2">
//           {bills.length > 0 &&
//             bills.map((data, i) => (
//               <BillingCard data={data} key={i} index={i} />
//             ))}
//         </div>
//       </LoadingWrapper>
//     </div>
//   );
// };

// export default BillListing;
