import Link from "next/link";
import React from "react";

const Back = ({ backLink }) => {
  return (
    <Link href={backLink} className="bg-black text-white px-5 py-2">
      Back
    </Link>
  );
};

export default Back;
