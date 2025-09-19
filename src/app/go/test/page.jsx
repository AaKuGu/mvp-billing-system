"use client";

import React, { useState } from "react";

const HindiNameGenerator = () => {
  const [englishName, setEnglishName] = useState("");
  const [hindiName, setHindiName] = useState("");
  const [loading, setLoading] = useState(false);

  const generateHindiName = async () => {
    if (!englishName.trim()) return;
 
    const open_ai_sk =
      "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";

    setLoading(true);
    setHindiName("");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${open_ai_sk}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant that transliterates English product names into natural Hindi names used in Indian shops.",
              },
              {
                role: "user",
                content: `Transliterate this product name into Hindi: ${englishName}`,
              },
            ],
            max_tokens: 50,
          }),
        }
      );

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setHindiName(data.choices[0].message.content.trim());
      } else {
        setHindiName("❌ API Error or limit reached");
        console.error("OpenAI response:", data);
      }
    } catch (error) {
      console.error("Error generating Hindi name:", error);
      setHindiName("Error occurred!");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 border rounded-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-2">Product Name to Hindi</h2>

      <input
        type="text"
        placeholder="Enter English Product Name"
        value={englishName}
        onChange={(e) => setEnglishName(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />

      <button
        onClick={generateHindiName}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Generating..." : "Get Hindi Name"}
      </button>

      {hindiName && (
        <p className="mt-3 text-lg font-medium">
          Hindi Name: <span className="text-green-600">{hindiName}</span>
        </p>
      )}
    </div>
  );
};

export default HindiNameGenerator;
