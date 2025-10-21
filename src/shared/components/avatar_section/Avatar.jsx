"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const Avatar = () => {
  const { data: session, isPending, error } = authClient.useSession();

  // Extract initials (e.g., "John Doe" → "JD")
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(session?.user?.name);

  return (
    <Link
      className={`w-[30px] h-[30px] flex items-center justify-center rounded-full border bg-gray-200 text-sm font-semibold`}
      title={session?.user?.name}
      href={`/account`}
    >
      {initials}
    </Link>
  );
};

export default Avatar;
