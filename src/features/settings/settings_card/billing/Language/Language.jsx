"use client";

import Header from "@/shared/components/ui/Header";
import React, { useState } from "react";

const Language = () => {
  const [selectedLang, setSelectedLang] = useState("english"); // default English

  return (
    <div className="w-full h-full p-4">
      <Header>Language</Header>
      <main className="mt-4 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="language"
            value="hindi"
            checked={selectedLang === "hindi"}
            onChange={(e) => setSelectedLang(e.target.value)}
          />
          <span>Hindi</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="language"
            value="english"
            checked={selectedLang === "english"}
            onChange={(e) => setSelectedLang(e.target.value)}
          />
          <span>English</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="language"
            value="hindi+english"
            checked={selectedLang === "hindi+english"}
            onChange={(e) => setSelectedLang(e.target.value)}
          />
          <span>Hindi + English</span>
        </label>

        <div className="mt-6">
          <p className="font-medium">Selected: {selectedLang}</p>
        </div>
      </main>
    </div>
  );
};

export default Language;
