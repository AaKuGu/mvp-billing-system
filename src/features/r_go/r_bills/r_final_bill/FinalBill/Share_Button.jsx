import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import toast from "react-hot-toast";

const Share_Button = ({ data }) => {
  const { bill_id, whatsapp_num } = data || {};

  const handleShare = () => {
    if (!bill_id) {
      toast.error("Bill ID missing!");
      return;
    }

    if (!whatsapp_num) {
      toast.error("WhatsApp number not provided!");
      return;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://korobill.online";
    const billLink = `${baseUrl}/share/bill/${bill_id}`;
    const message = `Your bill is here:\n${billLink}`;
    const whatsappUrl = `https://wa.me/${whatsapp_num}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-full shadow-md transition-all duration-200"
    >
      <BsWhatsapp className="text-xl" />
      <span>Share Bill</span>
    </button>
  );
};

export default Share_Button;
