// import Link from "next/link";
// import React from "react";

// const Back = ({ backLink }) => {
//   return (
//     <Link href={backLink} className="bg-black text-white px-5 py-2">
//       Back
//     </Link>
//   );
// };

// export default Back;

"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Back = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="bg-black text-white px-3 py-1 absolute top-2 left-2 text-[10px]"
    >
      Back
    </button>
  );
};

export default Back;
