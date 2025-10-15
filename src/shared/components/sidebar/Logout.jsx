import React from "react";
import { FiLogOut } from "react-icons/fi";
import { logout } from "./funcs";
import { useRouter } from "next/navigation";
import useLoadingStore from "@/store/loading";

const Logout = () => {
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  const handleLogout = () => {
    setLoading(true);
    logout(router, setLoading);
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
    >
      <FiLogOut size={18} />
      <span>Logout</span>
    </button>
  );
};

export default Logout;
