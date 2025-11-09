"use client";
import React from "react";

const ShareBill = () => {
  const phoneNumber = "7388958220"; // your target number
  const billUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/bill2`
      : "https://www.korobill.online/bill2";

  // ✅ Move link to a new line so WhatsApp detects it as clickable
  // const message = `Your bill is here 👇\n${billUrl}`;
  const message = `Your bill is here http://localhost:3000/bill2`;

  const handleShare = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <button
        onClick={handleShare}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Share to WhatsApp (7388958220)
      </button>
    </div>
  );
};

export default ShareBill;
