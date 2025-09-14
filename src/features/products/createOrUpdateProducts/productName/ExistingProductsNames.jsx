import React, { useEffect, useState } from "react";
import { fetchProductsNames } from "./funcs";

const ExistingProductsNames = ({ searchTerm }) => {
  const [productNames, setProductNames] = useState([]);

  useEffect(() => {
    fetchProductsNames(searchTerm, setProductNames);
  }, [searchTerm]);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <p className="font-medium text-gray-700">Existing products:</p>
      <div className="flex gap-2 flex-wrap">
        {productNames.map((product) => {
          const engName = product.productName.find(
            (d) => d.lang.toLowerCase() === "eng"
          );
          return (
            <span
              key={product._id}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full shadow-sm"
            >
              {engName ? engName.value : "(no English name)"}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ExistingProductsNames;
