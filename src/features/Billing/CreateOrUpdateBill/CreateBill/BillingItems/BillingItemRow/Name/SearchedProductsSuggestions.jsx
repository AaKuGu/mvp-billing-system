import React, { useEffect, useRef } from "react";
import { onSuggestionClick } from "./funcs";

const SearchedProductsSuggestions = ({
  searchedProducts,
  setBillingItems,
  setSearchedProducts,
  billingItems,
  index,
  name,
  setName,
  setUnitPrice,
  setUnitName,
}) => {
  return (
    <div className={`w-full flex flex-wrap gap-2 absolute top-[100%]  `}>
      {searchedProducts.map((p, idx) => {
        return (
          <div
            key={idx}
            className="p-2 hover:bg-gray-200 cursor-pointer px-5 py-2 border  bg-gray-200"
            onMouseDown={() => {
              // const engLabel = p.productName.find((d) => d.lang === "eng");
              // const hiLabel = p.productName.find((d) => d.lang === "hi");
              // setName(engLabel?.value);

              setName(p.productName);

              onSuggestionClick(
                billingItems,
                setBillingItems,
                index,
                p,
                p.productName,
                setUnitPrice,
                setUnitName
              );
              setSearchedProducts([]);
            }}
          >
            {p.productName}
          </div>
        );
      })}
    </div>
  );
};

export default SearchedProductsSuggestions;
