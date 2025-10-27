"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState({
    name: "Aadarsh Gupta",
    email: "prathamtogupta11@gmail.com",
    number: 1,
    click_count: 1,
  });

  console.log("this is console");

  useEffect(() => {
    setData((prev) => ({ ...prev, number: prev.number + 1 }));
  }, [data?.click_count]);

  return (
    <div>
      <button
        onClick={() => {
          setData((prev) => ({ ...prev, click_count: prev.click_count + 1 }));
        }}
      >
        Click
      </button>
    </div>
  );
};

export default page;
