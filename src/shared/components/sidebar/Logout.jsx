import React from "react";
import { FiLogOut } from "react-icons/fi"; // ✅ react icon
import { RedButton } from "../Button";
import { logout } from "./funcs";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/store/loading";

const Logout = () => {
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  return (
    <RedButton
      onClick={() => {
        setLoading(true);
        logout(router, setLoading);
      }}
    >
      <FiLogOut size={18} /> {/* ✅ Icon */}
      <span>Logout</span>
    </RedButton>
  );
};

export default Logout;
