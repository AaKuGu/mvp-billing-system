import React, { useEffect, useState } from "react";
import { dataStyle, srStyle } from "./css";
import { generateHindiName } from "@/shared/funcs";

// Simulated transliteration function (replace with GPT or local mapping)
const transliterateToHindi = async (englishName, setLoading, setHindiName) => {
  const localOverrides = {
    "toda chudi": "टोड़ा चूड़ी",
    // add more explicit mappings if needed
  };

  if (localOverrides[englishName.toLowerCase()]) {
    return localOverrides[englishName.toLowerCase()];
  }

  // For demo: just return the same name with a "Hindi" suffix
  return englishName
    .split(" ")
    .map((word) => word)
    .join(generateHindiName(englishName, setLoading, setHindiName)); // replace with GPT API
};

const TableData = ({ item, i, quantity, unit, unitPrice, totalPrice }) => {
  const [hindiName, setHindiName] = useState(item.itemDetails?.productName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isEnglish = /[a-zA-Z]/.test(item.itemDetails?.productName); // check if English
    if (isEnglish) {
      setLoading(true);
      transliterateToHindi(
        item.itemDetails.productName,
        setLoading,
        setHindiName
      ).then((res) => {
        setHindiName(res);
      });
    }
  }, [item.itemDetails?.productName]);

  return (
    <tr key={item.id || i}>
      <td className={srStyle}>{i + 1}</td>
      <td className={dataStyle}>{loading ? "Loading..." : hindiName}</td>
      <td className={dataStyle}>
        {quantity} {unit} × ₹{unitPrice}
      </td>
      <td className={`w-[20%] border text-center p-1 py-2 md:p-2`}>
        ₹{totalPrice}
      </td>
    </tr>
  );
};

export default TableData;
