import React from "react";

export default function Server_Side_Loading({ message }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 animate-fade-in">
      <div className="flex flex-col items-center text-white">
        <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-lg">{message || "Loading..."}</p>
      </div>
    </div>
  );
}
