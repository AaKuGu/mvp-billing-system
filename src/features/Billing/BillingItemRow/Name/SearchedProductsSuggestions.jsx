import React from "react";
import { onSuggestionClick } from "./funcs";

const SearchedProductsSuggestions = ({
  searchedProducts,
  setBillingItems,
  setSearchedProducts,
  billingItems,
  index,
  name,
  setName,
}) => {
  return (
    <>
      {/* searchedProducts={JSON.stringify(searchedProducts)} */}
      {/* Suggestions dropdown */}
      {searchedProducts.length > 0 && (
        <div className="absolute bg-white border rounded shadow-md max-h-40 overflow-y-auto z-10 w-full">
          {searchedProducts.map((p, idx) => (
            <div
              key={idx}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onMouseDown={() => {
                const engLabel = p.productName.find((d) => d.lang === "eng");
                const hiLabel = p.productName.find((d) => d.lang === "hi");
                setName(engLabel?.value);

                onSuggestionClick(
                  billingItems,
                  setBillingItems,
                  index,
                  p,
                  hiLabel.value
                );
                setSearchedProducts([]);
              }}
            >
              {p.productName.find((n) => n.lang === "eng")?.value || ""}&nbsp;
              {p.productName.find((n) => n.lang === "hi")?.value || ""}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchedProductsSuggestions;
