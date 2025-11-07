"use client";

import React from "react";
import Link from "next/link";

const Logo = ({ style = `text-2xl` }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/go"; // full reload → fresh session + layout
  };

  return (
    <Link
      href={`/go`}
      onClick={handleClick}
      className="flex items-center justify-start space-x-1 select-none w-fit"
    >
      <h1 className={`${style} font-extrabold tracking-tight`}>
        <span className="text-teal-500">Koro</span>
        <span className="text-purple-600">Bill</span>
      </h1>
      <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse "></span>
    </Link>
  );
};

export default Logo;
