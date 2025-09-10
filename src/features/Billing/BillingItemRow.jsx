import React, { useState } from "react";

const BillingItemRow = ({ d, i, billingItems, setBillingItems, fuse }) => {
  const [query, setQuery] = useState(d?.productName || "");
  const [searchedProducts, setSearchedProducts] = useState([]);

  return (
    <div className="flex w-full bg-green-500 p-2 gap-4 relative">
      {/* Product Name Input */}
      <div className="relative flex-1">
        <label className="block text-white">Product Name</label>
        <input
          type="text"
          className="w-full px-2 py-1 rounded"
          value={query}
          onChange={(e) => {
            const newQuery = e.target.value;
            setQuery(newQuery);

            if (!fuse || newQuery.trim() === "") {
              setSearchedProducts([]);
              return;
            }

            const results = fuse.search(newQuery);
            setSearchedProducts(results.map((r) => r.item));
          }}
          onBlur={() => {
            // Commit typed value even if not in DB
            const newBilling = [...billingItems];
            newBilling[i].productName = query;
            setBillingItems(newBilling);
          }}
        />

        {/* Suggestions dropdown */}
        {searchedProducts.length > 0 && (
          <div className="absolute bg-white border rounded shadow-md max-h-40 overflow-y-auto z-10 w-full">
            {searchedProducts.map((p, idx) => (
              <div
                key={idx}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onMouseDown={() => {
                  // update billingItems with selected product
                  const newBilling = [...billingItems];
                  newBilling[i] = { ...newBilling[i], ...p };
                  setBillingItems(newBilling);

                  // update query + clear suggestions
                  setQuery(p.productName);
                  setSearchedProducts([]);
                }}
              >
                {p.productName}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* unit selection */}
      <div className="flex-1">
        <label className="block text-white">Unit</label>
        <select>
          {d?.pricePoints?.map((d, i) => {
            return (
              <option key={i} value={d.unit}>
                {d.unit}
              </option>
            );
          })}
        </select>
      </div>

      {/* Wholesale Price */}
      <div className="flex-1">
        <label className="block text-white">Wholesale Price</label>
        <input
          type="number"
          className="w-full px-2 py-1 rounded"
          value={d?.wholesalePrice || ""}
          onChange={(e) => {
            const newBilling = [...billingItems];
            newBilling[i].wholesalePrice = e.target.value;
            setBillingItems(newBilling);
          }}
        />
      </div>

      {/* quantity */}
      <div className="flex-1">
        <label className="block text-white">Quantity</label>
        <input
          type="number"
          className="w-full px-2 py-1 rounded"
          value={d?.quantity || ""}
          onChange={(e) => {
            const newBilling = [...billingItems];
            newBilling[i].quantity = e.target.value;
            setBillingItems(newBilling);
          }}
        />
      </div>
    </div>
  );
};

export default BillingItemRow;
