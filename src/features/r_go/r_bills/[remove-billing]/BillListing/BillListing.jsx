import { CreateButton, GreenButton } from "@/re_usables/components/Button";
import { ListHeader, MainHeader } from "@/re_usables/components/ui/Header";
import React, { useEffect } from "react";
import { fetchBills } from "../../bills_page/funcs";
import LoadingWrapper from "@/re_usables/components/Loading/LoadingWrapper";
import BillingCard from "../../bills_page/BillingCard";
import { useBillsStore } from "../../re_usables/store";
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
