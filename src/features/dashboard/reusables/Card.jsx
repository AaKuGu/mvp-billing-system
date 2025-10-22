import React from "react";

const Card = () => {
  const data = [
    {
      name: "totalRevenue",
      label: "Total Revenue",
      value: 2300,
    },
    {
      name: "totalBills",
      label: "Total Bills",
      value: 23,
    },
  ];

  return (
    <div
      className={`w-full h-[200px] rounded-2xl border p-1 shadow-blue-200 shadow-md`}
    >
      {data?.map((d, i) => (
        <div className={`flex flex-col gap-2`}>
          <div>{d?.label}</div>
          <div>{d?.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Card;
