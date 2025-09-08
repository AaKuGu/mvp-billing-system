import Sidebar from "@/shared/components/Sidebar";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center flex-col gap-4">
      <Link href={`/go`} className="text-black font-bold text-lg">
        Go
      </Link>
    </div>
  );
};

export default page;
