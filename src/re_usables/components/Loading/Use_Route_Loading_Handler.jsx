"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { use_loading_store } from "@/store/loading";

export function Use_Route_Loading_Handler() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const { hide_loading } = use_loading_store();

  useEffect(() => {
    // whenever route changes
    if (pathname !== prevPath.current) {
      hide_loading();
      prevPath.current = pathname;
    }
  }, [pathname, hide_loading]);
}
